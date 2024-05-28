'use server';

import { createWriteStream, readFile } from 'fs';
import { isWindowDefined, get } from './helper';

export const buildIn = (styleSheet: string, global?: string) => {
  const styleFilePath = get.dir(__dirname, '../../core/styles/style.module.css');
  const globalFilePath = get.dir(__dirname, '../../core/styles/global.css');
  const filePath = global === '--global' ? globalFilePath : styleFilePath;
  const message = global === '--global' ? ' ✅ Generating global static css \n' : ' ✅ Generating module static css \n';

  if (!isWindowDefined)
    readFile(filePath, 'utf-8', (error, data) => {
      if (error || data.includes(styleSheet)) {
        return;
      } else {
        const writeStream = createWriteStream(filePath, { flags: 'a' });
        writeStream.write(styleSheet, 'utf-8', (error) => {
          if (error) {
            console.log('write error');
          } else {
            console.log(message + styleSheet);
          }
          writeStream.end();
        });
      }
    });
};
