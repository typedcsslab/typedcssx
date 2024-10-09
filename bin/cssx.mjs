#!/usr/bin/env node

import { execSync } from 'child_process';
import { join } from 'path';

try {
  if (process.argv.includes('--compile'))
    console.log('Running TypeScript compiler...'),
      execSync('npx tsc --noEmit --incremental false', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
  else console.log('pre compile run...');

  execSync('npx tsx compiler/src/index.ts', {
    stdio: 'inherit',
    cwd: join(process.cwd(), 'node_modules/typedcssx'),
  });

  console.log('Compilation completed successfully.');
} catch (error) {
  console.error('Compilation failed:', error.message);
  process.exit(1);
}
