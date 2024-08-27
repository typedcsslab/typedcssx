#!/usr/bin/env node

const { execSync } = require('child_process');
const { join, dirname } = require('path');
const { existsSync } = require('fs');

function findNextJsProjectRoot(startPath) {
  let currentPath = startPath;
  while (currentPath !== '/') {
    if (
      existsSync(join(currentPath, 'package.json')) &&
      (existsSync(join(currentPath, 'next.config.js')) || existsSync(join(currentPath, 'next.config.mjs')))
    ) {
      return currentPath;
    }
    currentPath = dirname(currentPath);
  }
  return null;
}

if (process.argv.includes('--compile')) {
  try {
    const packageRoot = findNextJsProjectRoot(__dirname);
    if (!packageRoot) {
      throw new Error('Could not find Next.js project root');
    }

    console.log('Running TypeScript compiler...');
    execSync('npx tsc --noEmit', {
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
