/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('node:path');

const styleFilePath = path.join(__dirname, '../../src/core/styles/style.module.css');
const globalFilePath = path.join(__dirname, '../../src/core/styles/global.css');

export const cleanUp = async () => {
  try {
    fs.writeFileSync(styleFilePath, '/*------------------------------*/', 'utf-8');
    console.log('...💫(reseted module css)');

    fs.writeFileSync(globalFilePath, '/*------------------------------*/', 'utf-8');
    console.log('...💫(reseted global css)');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};
