#!/usr/bin/env node

import { execSync } from 'child_process';
import { join } from 'path';

try {
  const typecheck = process.argv.includes('--compile');
  if (typecheck)
    console.log('Running TypeScript compiler...'),
      execSync('npx tsc --noEmit --incremental false', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
  else console.log('pre compile run...');
  const argv = process.argv.includes('--log') ? ' --log' : '';
  execSync('npx tsx compiler/src/index.ts' + argv, {
    stdio: 'inherit',
    cwd: join(process.cwd(), 'node_modules/typedcssx'),
  });
  const completed = typecheck ? 'completed ' : '';
  console.log(`Compilation ${completed}successfully`);
} catch (error) {
  console.error('Compilation failed:', error.message);
  process.exit(1);
}
