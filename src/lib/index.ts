import { transformAsync } from '@babel/core';
import fastDiff from 'fast-diff';
import presetEnv from '@babel/preset-env';
import browserslist from 'browserslist';
import fs from 'fs';

export const getTimes = (start: number, end: number) => ({
  start,
  end,
  duration: end - start,
});

export const validateFile = async (file: string, targets: string) =>
  new Promise((resolve) => {
    const start = Date.now();
    let results: any = {
      valid: false,
      targets,
    };
    fs.readFile(file, async (err, data) => {
      if (err) {
        results.error = err.message;
      } else {
        results = await validate(data.toString('utf8'), targets);
      }
      const end = Date.now();
      return resolve({
        ...results,
        file,
        validateFileTime: getTimes(start, end),
      });
    });
  });

export const validate = async (input: string, targets: string) => {
  const start = Date.now();
  let results: any = {
    valid: false,
    targets,
    results: {
      input,
    },
  };
  // https://babeljs.io/docs/en/options
  const transformOptions: any = {
    sourceType: 'unambiguous',
    babelrc: false,
    babelrcRoots: false,
    compact: false,
    configFile: false,
    comments: true,
    retainLines: true,
  };
  try {
    const noTargets = await transformAsync(input, {
      ...transformOptions,
    });
    results.results.noTargets = noTargets;
    results.inputMatchesNoTargets = input === noTargets?.code;
    const withTargets = await transformAsync(input, {
      ...transformOptions,
      presets: [
        [
          presetEnv,
          {
            targets,
            useBuiltIns: 'usage',
            corejs: 3,
            /*
            loose: true,
            debug: true
            */
          },
        ],
      ],
    });
    results.results.withTargets = withTargets;

    results.diff = fastDiff(noTargets?.code || '', withTargets?.code || '');
    results.valid = noTargets?.code === withTargets?.code;

    // browserlist stats
    results.browserslist = browserslist(targets);
    results.browserslistCoverage = browserslist.coverage(browserslist(targets));
  } catch (err) {
    results.error = err.message;
  }
  const end = Date.now();
  return {
    ...results,
    validateTime: getTimes(start, end),
  };
};

export const detect = () => {};
