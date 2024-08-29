#!/usr/bin/env node

const { findNextJsProjectRoot } = require('../src/_internal');
const { execSync } = require('child_process');
const { join } = require('path');

if (process.argv.includes('--compile')) {
  try {
    const packageRoot = findNextJsProjectRoot(__dirname);
    if (!packageRoot) {
      throw new Error('Could not find Next.js project root');
    }

    console.log('Running TypeScript compiler...');
    execSync('npx tsc --noEmit compiler/src/index.ts', {
      stdio: 'inherit',
      cwd: join(packageRoot, 'node_modules/typedcssx'),
    });

    console.log('Executing compiler...');
    execSync('npx tsx compiler/src/index.ts', {
      stdio: 'inherit',
      cwd: join(packageRoot, 'node_modules/typedcssx'),
    });

    console.log('Compilation completed successfully.');
  } catch (error) {
    console.error('Compilation failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('Usage: typedcssx --compile');
}
