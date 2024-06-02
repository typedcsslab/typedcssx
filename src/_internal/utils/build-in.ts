'use server';

import { readFileSync, appendFileSync } from 'fs';
import { isWindowDefined, get } from './helper';

export const buildIn = (styleSheet: string, global?: string) => {
  const styleFilePath = get.dir(__dirname, '../../core/styles/style.module.css');
  const globalFilePath = get.dir(__dirname, '../../core/styles/global.css');
  const filePath = global === '--global' ? globalFilePath : styleFilePath;
  const message = global === '--global' ? ' ✅ Generating global static css \n' : ' ✅ Generating module static css \n';

  if (!isWindowDefined) {
    try {
      const cssData = readFileSync(filePath, 'utf-8');
      if (!cssData.includes(styleSheet)) {
        appendFileSync(filePath, styleSheet, 'utf-8');
        console.log(message + styleSheet);
      }
    } catch (error) {
      console.log('write error');
    }
  }
};
