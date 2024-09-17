#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv.includes('--compile')) {
  try {
    console.log('Running TypeScript compiler...');
    execSync('npm run compiler', {
      stdio: 'inherit',
      cwd: join(__dirname, '../../typedcssx'),
    });

    console.log('Compilation completed successfully.');
  } catch (error) {
    console.error('Compilation failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('Usage: typedcssx --compile');
}
