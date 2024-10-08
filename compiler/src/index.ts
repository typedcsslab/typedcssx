import * as path from 'path';
import * as fs from 'fs';
import ts from 'typescript';
import fg from 'fast-glob';
import { cleanUp } from './clean-up';
import { createBuildIn } from '../../src/core/method/create-build-in-helper.js';
import { setBuildIn } from '../../src/core/method/set-build-in-helper.js';
import { globalBuildIn } from '../../src/core/method/global-build-in-helper.js';
import { rootBuildIn } from '../../src/core/method/root-build-in-helper.js';

function isCSSX(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

  let isUsed = false;

  function checkNode(node: ts.Node) {
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
      const expressionText = node.expression.getText(sourceFile);
      const methodName = node.name.getText(sourceFile);
      const methods = ['create', 'set', 'root', 'global'];
      if (expressionText === 'cssx' && methods.includes(methodName)) {
        isUsed = true;
      }
    }

    ts.forEachChild(node, checkNode);
  }

  checkNode(sourceFile);

  return isUsed;
}

async function getAppRoot(): Promise<string> {
  const threeLevelsUp = path.join(process.cwd(), '../../../../..');
  const pnpmExists = fs.existsSync(path.join(threeLevelsUp, 'node_modules/.pnpm'));

  return pnpmExists ? path.join(process.cwd(), '../../../../../') : path.join(process.cwd(), '../../');
}

(async () => {
  await cleanUp();
  const appRoot = await getAppRoot();
  const files = await fg([path.join(appRoot, '**/*.{ts,tsx}')]);
  const styleFiles = files.filter(isCSSX);
  console.log('\n💬 The following CSS caches were accepted:\n');
  for (const file of styleFiles) {
    const filePath = path.resolve(file);
    await import(filePath);
    createBuildIn();
    setBuildIn();
    globalBuildIn();
    rootBuildIn();
  }
})();
