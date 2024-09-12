import { findProjectRoot } from '../../src/_internal';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

export const cleanUp = async () => {
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
