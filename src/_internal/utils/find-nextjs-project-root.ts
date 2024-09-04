'use server';

import * as fs from 'fs';
import * as path from 'path';
import { isServer } from './helper';

export async function findNextJsProjectRoot(startPath: string): Promise<string | null> {
  if (!isServer) return null;
  let currentPath = startPath;
  while (currentPath !== '/') {
    if (
      fs.existsSync(path.join(currentPath, 'package.json')) &&
      (fs.existsSync(path.join(currentPath, 'next.config.js')) || fs.existsSync(path.join(currentPath, 'next.config.mjs')))
    ) {
      return currentPath;
    }
    currentPath = path.dirname(currentPath);
  }
  return null;
}
