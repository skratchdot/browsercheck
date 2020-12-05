#!/usr/bin/env node
var pkg = require('./package.json');
var lib = require('./dist/cli/index');
lib.cli(
    process.argv.slice(2),
    process.cwd(),
    process.exit,
    console.log,
    pkg
);
