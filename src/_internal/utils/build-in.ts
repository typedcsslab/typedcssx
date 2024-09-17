'use server';

import { readFileSync, appendFileSync, existsSync } from 'fs';
import { isServer } from './helper';
import { join } from 'path';

export const buildIn = async (styleSheet: string, global?: string): Promise<void> => {
  const styleFilePath = join(__dirname, '../../core/styles/style.module.css');
  const globalFilePath = join(__dirname, '../../core/styles/global.css');

  const filePath = global === '--global' ? globalFilePath : styleFilePath;
  const message = global === '--global' ? ' ✅ Generating global static css \n' : ' ✅ Generating module static css \n';

  if (!isServer) return;
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
};
