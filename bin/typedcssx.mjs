#!/usr/bin/env node

import { findProjectRoot } from '../lib/find-project-root.mjs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  if (process.argv.includes('--compile')) {
    try {
      const packageRoot = await findProjectRoot(__dirname);
      if (!packageRoot) {
        throw new Error('Could not find Next.js project root');
      }

      console.log('Running TypeScript compiler...');
      execSync('npx tsc --noEmit compiler/src/index.ts', {
        stdio: 'inherit',
        cwd: join(packageRoot, 'node_modules/typedcssx'),
      });

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
})();
