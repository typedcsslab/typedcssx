import * as path from 'path';
import * as fs from 'fs';
import { cleanUp } from './clean-up';
import { createBuildIn } from '../../src/core/method/create-build-in-helper';
import { setBuildIn } from '../../src/core/method/set-build-in-helper';
import { globalBuildIn } from '../../src/core/method/global-build-in-helper';
import { rootBuildIn } from '../../src/core/method/root-build-in-helper';
import fg = require('fast-glob');

(async () => {
  await cleanUp();
  let appRoot = '';
  const threeLevelsUp = path.join(process.cwd(), '../../../../..');
  const pnpmExists = fs.existsSync(path.join(threeLevelsUp, 'node_modules/.pnpm'));

  if (pnpmExists) {
    appRoot = path.join(process.cwd(), '../../../../../');
  } else {
    appRoot = path.join(process.cwd(), '../../');
  }
  const csstsPattern = [path.join(appRoot, '**/*.css.ts'), path.join(appRoot, '**/*.css.tsx')];
  const files = await fg(csstsPattern);
  console.log('\n💬 The f ollowing CSS caches were accepted:\n');
  for (const file of files) {
    const filePath = path.resolve(file);
    await import(filePath);
    createBuildIn();
    setBuildIn();
    globalBuildIn();
    rootBuildIn();
  }
})();
