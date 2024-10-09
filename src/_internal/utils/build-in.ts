'use server';

import * as fs from 'fs';
import * as path from 'path';
import { isServer } from './helper';

export const buildIn = (styleSheet: string, global?: string): void => {
  const styleFilePath = path.join(__dirname, '../../core/styles/style.module.css');
  const globalFilePath = path.join(__dirname, '../../core/styles/global.css');

  const filePath = global === '--global' ? globalFilePath : styleFilePath;
  const message = global === '--global' ? ' ✅ Generating global static css \n' : ' ✅ Generating module static css \n';

  if (!isServer) return;
  try {
    if (fs.existsSync(filePath)) {
      const cssData = fs.readFileSync(filePath, 'utf-8');
      if (!cssData.includes(styleSheet)) {
        fs.appendFileSync(filePath, styleSheet, 'utf-8');
        console.log(message + styleSheet);
      }
    } else {
      fs.appendFileSync(filePath, styleSheet, 'utf-8');
      console.log(message + styleSheet);
    }
  } catch (error) {
    console.error('Error writing to file:', error);
    console.error('Stack trace:', error);
  }
};
