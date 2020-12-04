import { transformAsync } from '@babel/core';
import { diffChars } from 'diff';
import presetEnv from '@babel/preset-env';

export const validate = async (input: string, targets: string) => {
  let results: any = {
    valid: false,
    results: {
      input,
    },
  };
  const start = Date.now();
  // https://babeljs.io/docs/en/options
  const transformOptions: any = {
    sourceType: 'unambiguous',
    babelrc: false,
    babelrcRoots: false,
    compact: false,
    configFile: false,
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
          },
        ],
      ],
    });
    results.results.withTargets = withTargets;

    const diff = diffChars(noTargets?.code || '', withTargets?.code || '');
    results.diff = diff;

    // for "valid", we could just:
    // noTargets?.code === withTargets?.code
    // but i think the following line might be quicker for super long strings :shrug:
    results.valid =
      diff.length === 1 && diff[0].added !== true && diff[0].removed !== true;
  } catch (err) {
    results.error = err.message;
  }
  const end = Date.now();
  return {
    ...results,
    times: {
      start,
      end,
      duration: end - start,
    },
  };
};

export const detect = () => {};
