#!/usr/bin/env bun
import chalk from 'chalk'; // from 'commander'
import { program } from 'commander';
import { existsSync } from 'fs';
import { join } from 'path';
import { cwd, exit as exitWithCode } from 'process';

// ####################
// # Class & Function #
// ####################
// Some variables that would be used in multiple times

// Generic functions
const header_max_length = 7;
/** Print information log message */
function printInfo(msg: unknown, header = 'INFO'): void {
  console.log(chalk`{green ${header.padEnd(header_max_length)}%}:`, msg);
}
/** Print error log message */
function printError(msg: unknown, header = 'ERROR'): void {
  console.error(chalk`{red ${header.padEnd(header_max_length)}%}:`, msg);
}
/** I'm doing this because TypeScript is dumb :( */
function exit(code?: number | string | null | undefined): never {
  exitWithCode(code);
}

// Prevent calling script without NPM (or Bun)
// Method 1: Check package name
// Method 2: Check 'package.json' existance
if (process.env.npm_package_name !== 'blue-archive-sound-sorter' || !existsSync(join(cwd(), 'package.json'))) {
  printError('Call this script with NPM or Bun');
  printError("e.g. 'npm run bass' or 'bun run bass'");
  exit(1);
}

program.name('bass').description('Extract BGM files from MediaPatch directory of Blue Archive JP').version('3.0.0');

// sort
program.command('sort').description("Renames BGM files based on data of 'MediaCatalog.json' file.")
.option('-s, --source <path>', 'Path which have \'MediaCatalog.json\' and media files', './.source/MediaPatch/')
