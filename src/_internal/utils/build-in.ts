'use server';

import { isServer } from './helper';
export const buildIn = async (styleSheet: string, global?: string) => {
  if (!isServer) return;

  const fs = await import('fs');
  const path = await import('path');
  const styleFilePath = path.join(__dirname, '../../core/styles/style.module.css');
  const globalFilePath = path.join(__dirname, '../../core/styles/global.css');
  const filePath = global === '--global' ? globalFilePath : styleFilePath;
  const message = global === '--global' ? ' ✅ Generating global static css \n' : ' ✅ Generating module static css \n';
  try {
    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, styleSheet, 'utf-8');
      if (process.argv.includes('--log')) console.log(message + styleSheet);
    }
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};
