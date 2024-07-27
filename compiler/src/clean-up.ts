import { writeFileSync } from 'fs';
import * as path from 'path';

const styleFilePath = path.join(__dirname, '../../src/core/styles/style.module.css');
const globalFilePath = path.join(__dirname, '../../src/core/styles/global.css');

export const cleanUp = async () => {
  try {
    writeFileSync(styleFilePath, '/*------------------------------*/', 'utf-8');
    console.log('...💫(reseted module css)');

    writeFileSync(globalFilePath, '/*------------------------------*/', 'utf-8');
    console.log('...💫(reseted global css)');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
