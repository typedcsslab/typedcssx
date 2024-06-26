/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');
const fs = require('fs');
const { cleanUp } = require('./clean-up');
const { createBuildIn } = require('../../src/core/method/create-build-in-helper');
const { setBuildIn } = require('../../src/core/method/set-build-in-helper');
const { globalBuildIn } = require('../../src/core/method/global-build-in-helper');
const { rootBuildIn } = require('../../src/core/method/root-build-in-helper');
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
