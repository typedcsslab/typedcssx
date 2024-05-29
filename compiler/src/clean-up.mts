import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const styleFilePath = path.join(__dirname, '../../dist/core/styles/style.module.css');
const globalFilePath = path.join(__dirname, '../../dist/core/styles/global.css');
const packageJsonPath = path.join(__dirname, '../../dist/core/styles/package.json');

export const cleanUp = () => {
  try {
    const packageJsonContent = JSON.stringify({ type: 'module' }, null, 2);
    fs.writeFileSync(packageJsonPath, packageJsonContent, 'utf-8');

    fs.writeFileSync(styleFilePath, '/*_*/', 'utf-8');
    console.log('...💫(reseted module css)');

    fs.writeFileSync(globalFilePath, '/*_*/', 'utf-8');
    console.log('...💫(reseted global css)');

    fs.unlinkSync(packageJsonPath);
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
