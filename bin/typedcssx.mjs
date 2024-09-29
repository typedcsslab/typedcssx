#!/usr/bin/env node

import { execSync } from 'child_process';
import { join } from 'path';

if (process.argv.includes('--compile')) {
  try {
    console.log('Running TypeScript compiler...');
    execSync('npx tsc --noEmit --incremental false', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    execSync('npx tsx compiler/src/index.ts', {
      stdio: 'inherit',
      cwd: join(process.cwd(), 'node_modules/typedcssx'),
    });

    console.log('Compilation completed successfully.');
  } catch (error) {
    console.error('Compilation failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('Usage: typedcssx --compile');
}
