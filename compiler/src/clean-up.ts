import { writeFileSync } from 'fs';
import { join } from 'path';

export const cleanUp = async () => {
  const styleFilePath = join(__dirname, '../../dist/core/styles/style.module.css');
  const globalFilePath = join(__dirname, '../../dist/core/styles/global.css');
  try {
    writeFileSync(styleFilePath, '', 'utf-8');
    writeFileSync(globalFilePath, '', 'utf-8');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
