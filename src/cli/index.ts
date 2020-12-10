import yargs from 'yargs';
import cleanPackageName from '../lib/clean-package-name';

export const cli = (
  args: Array<any>,
  cwd: string,
  exit: () => {},
  log: () => {},
  pkg: any = {}
) => {
  yargs
    .usage('Usage: $0 <command> [options]')
    .commandDir('cmds')
    .help('help')
    .alias('h', 'help')
    .version(`${cleanPackageName(pkg.name)} version ${pkg.version}`)
    .alias('v', 'version')
    .demandCommand(1, 'you need to specify a command to use')
    .strict()
    .parse(args, { cwd, exit, log });
};
