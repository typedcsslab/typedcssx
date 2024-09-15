'use server';

import { readFileSync, appendFileSync, mkdirSync, existsSync } from 'fs';
import { isServer } from './helper';
import { join, dirname } from 'path';
import * as fs from 'fs';

// Those affected by builds that exist in dist
// Functions required on the outside and inside
async function findProjectRoot(startPath: string): Promise<string | null> {
  if (!isServer) return null;
  let currentPath = startPath;
  while (currentPath !== '/') {
    const packageJsonPath = join(currentPath, 'package.json');
    const lockFiles = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lockb'].some(file => fs.existsSync(join(currentPath, file)));
    if (fs.existsSync(packageJsonPath) && lockFiles) {
      return currentPath;
    }
    currentPath = dirname(currentPath);
  }
  return null;
}

export const buildIn = async (styleSheet: string, global?: string): Promise<void> => {
  const projectRoot = await findProjectRoot(__dirname);

  if (!projectRoot) {
    console.error('Next.js project root not found');
    return;
  }

  const srcDir = join(projectRoot, 'src');
  let stylesDir: string;

  if (existsSync(srcDir)) {
    stylesDir = join(srcDir, 'styles');
  } else {
    stylesDir = join(projectRoot, 'styles');
  }

  const styleFilePath = join(__dirname, '../../core/styles/style.module.css');
  const globalFilePath = join(stylesDir, 'typedcssx-global.css');

  const filePath = global === '--global' ? globalFilePath : styleFilePath;
  const message = global === '--global' ? ' ✅ Generating global static css \n' : ' ✅ Generating module static css \n';

  if (!existsSync(stylesDir)) {
    mkdirSync(stylesDir);
  }

  if (isServer) {
    try {
      if (existsSync(filePath)) {
        const cssData = readFileSync(filePath, 'utf-8');
        if (!cssData.includes(styleSheet)) {
          appendFileSync(filePath, styleSheet, 'utf-8');
          console.log(message + styleSheet);
        }
      } else {
        appendFileSync(filePath, styleSheet, 'utf-8');
        console.log(message + styleSheet);
      }
    } catch (error) {
      console.error('Error writing to file:', error);
      console.error('Stack trace:', error);
    }
  }
};
