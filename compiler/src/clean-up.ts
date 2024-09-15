import { findProjectRoot } from '../../lib/find-project-root.mjs';
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
    writeFileSync(styleFilePath, '/*______________________________*/', 'utf-8');
    console.log('...💫(reseted module css)');
    if (existsSync(stylesDir)) {
      writeFileSync(globalFilePath, '/*______________________________*/', 'utf-8');
    }
    console.log('...💫(reseted global css)');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
