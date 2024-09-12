'use server';

import * as fs from 'fs';
import * as path from 'path';
import { isServer } from './helper';

export async function findProjectRoot(startPath: string): Promise<string | null> {
  if (!isServer) return null;
  let currentPath = startPath;
  while (currentPath !== '/') {
    const packageJsonPath = path.join(currentPath, 'package.json');
    const lockFiles = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lockb'].some(file => fs.existsSync(path.join(currentPath, file)));
    if (fs.existsSync(packageJsonPath) && lockFiles) {
      return currentPath;
    }
    currentPath = path.dirname(currentPath);
  }
  return null;
}
