import fg from 'fast-glob';
import path from 'node:path';
import fs from 'fs';
import { cleanUp } from './clean-up';

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

  for (const file of files) {
    const filePath = path.resolve(file);
    await import(filePath);
  }

  return console.log('✅ (build cache applied the above css successfully)');
})();
