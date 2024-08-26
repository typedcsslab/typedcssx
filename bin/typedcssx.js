#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

function findPackageRoot(startDir) {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, 'node_modules', 'typedcssx', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return path.dirname(packageJsonPath);
    }
    currentDir = path.dirname(currentDir);
  }
  throw new Error('Could not find typedcssx package');
}

if (args.includes('--compile')) {
  try {
    const packageRoot = findPackageRoot(process.cwd());
    const compilerPath = path.join(packageRoot, 'compiler/src/index.ts');

    console.log('Running TypeScript compiler...');
    execSync(`npx tsc --noEmit "${compilerPath}"`, { stdio: 'inherit' });
    
    console.log('Executing compiler...');
    execSync(`npx tsx "${compilerPath}"`, { stdio: 'inherit' });
    
    console.log('Compilation completed successfully.');
  } catch (error) {
    console.error('Compilation failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('Usage: typedcssx --compile');
}