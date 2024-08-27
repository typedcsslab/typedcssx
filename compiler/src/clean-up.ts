import { existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

function findNextJsProjectRoot(startPath: string): string | null {
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

export const cleanUp = async () => {
  const projectRoot = findNextJsProjectRoot(__dirname);

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

  const styleFilePath = join(__dirname, '../../src/core/styles/style.module.css');
  const globalFilePath = join(stylesDir, 'typedcssx-global.css');

  try {
    writeFileSync(styleFilePath, '/*------------------------------*/', 'utf-8');
    console.log('...💫(reseted module css)');

    writeFileSync(globalFilePath, '/*------------------------------*/', 'utf-8');
    console.log('...💫(reseted global css)');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
