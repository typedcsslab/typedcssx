/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'node:path';
import fs from 'fs';
import { cleanUp } from './clean-up';
import { createBuildIn } from '../../src/core/method/create-build-in-helper';
import { setBuildIn } from '../../src/core/method/set-build-in-helper';
import { globalBuildIn } from '../../src/core/method/global-build-in-helper';
import { rootBuildIn } from '../../src/core/method/root-build-in-helper';
const fg = require('fast-glob');

(async () => {
  cleanUp();
  let appRoot = '';
  const threeLevelsUp = path.join(process.cwd(), '../../../../..');
  const pnpmExists = fs.existsSync(path.join(threeLevelsUp, 'node_modules/.pnpm'));

  if (pnpmExists) {
    appRoot = path.join(process.cwd(), '../../../../../');
  } else {
    appRoot = path.join(process.cwd(), '../../');
  }
  const csstsPattern = path.join(appRoot, '**/*.css.ts');
  const files: string[] = await fg([csstsPattern]);
  console.log('\n💬 The following CSS caches were accepted:\n');
  for (const file of files) {
    const filePath = path.resolve(file);
    await import(filePath);
    createBuildIn();
    setBuildIn();
    globalBuildIn();
    rootBuildIn();
  }
})();
