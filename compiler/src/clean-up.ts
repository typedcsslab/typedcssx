import { writeFileSync } from 'fs';
import { join } from 'path';

export const cleanUp = async () => {
  const styleFilePath = join(__dirname, '../../src/core/styles/style.module.css');
  const globalFilePath = join(__dirname, '../../src/core/styles/style.module.css');

  try {
    writeFileSync(styleFilePath, '/*______________________________*/', 'utf-8');
    console.log('...💫(reseted module css)');
    writeFileSync(globalFilePath, '/*______________________________*/', 'utf-8');
    console.log('...💫(reseted global css)');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
