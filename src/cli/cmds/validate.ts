import path from 'path';
import { validateFile } from '../../lib/index';
import consoleReporter from '../reporters/validate/console';
import defaultReporter from '../reporters/validate/default';
import jsonPrettyReporter from '../reporters/validate/json-pretty';
import jsonReporter from '../reporters/validate/json';

const reporterMap: any = {
  console: consoleReporter,
  default: defaultReporter,
  json: jsonReporter,
  'json-pretty': jsonPrettyReporter,
};

const buildStats = (results: any) => {
  let numValid = 0;
  let numInvalid = 0;
  let numError = 0;
  const numResults = results.length;
  results.forEach((result: any) => {
    if (result.valid) {
      numValid++;
    } else {
      numInvalid++;
    }
    if (result.error) {
      numError++;
    }
  });
  return {
    exitCode: numInvalid > 0 ? 1 : 0,
    numValid,
    numInvalid,
    numError,
    numResults,
    results,
  };
};

export const command = 'validate [options] <files..>';
export const desc = 'validate files against a browserslist target';
export const builder = (yargs: any) =>
  yargs
    .usage(`Usage: $0 ${command}`)
    .option('t', {
      alias: 'targets',
      describe: 'The browserslist query/targets',
      default: 'defaults',
      type: 'string',
    })
    .option('r', {
      alias: 'reporter',
      describe: 'The reporter to use',
      default: 'default',
      choices: ['default', 'console', 'json', 'json-pretty'],
    })
    .positional('files', {
      describe: 'the files to validate',
      type: 'string',
    });

export const handler = async (argv: any) => {
  const { cwd, exit, log, files, targets, reporter } = argv;
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const file = path.resolve(cwd, files[i]);
    const result = await validateFile(file, targets);
    results.push(result);
  }
  const stats = buildStats(results);
  reporterMap[reporter](stats, log);
  exit(stats.exitCode);
};
