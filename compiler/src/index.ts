import * as path from 'path';
import * as fs from 'fs';
import ts from 'typescript';
import { globby } from 'globby';
import { cleanUp } from './clean-up';
import { createBuildIn } from '../../dist/core/method/create-build-in-helper.js';
import { setBuildIn } from '../../dist/core/method/set-build-in-helper.js';
import { globalBuildIn } from '../../dist/core/method/global-build-in-helper.js';
import { rootBuildIn } from '../../dist/core/method/root-build-in-helper.js';

function isCSSX(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

  const checker = (node: ts.Node): boolean => {
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
      const expressionText = node.expression.getText(sourceFile);
      const methodName = node.name.getText(sourceFile);
      return expressionText === 'cssx' && ['create', 'set', 'root', 'global'].includes(methodName);
    }
    return ts.forEachChild(node, checker) || false;
  };

  return checker(sourceFile);
}

async function getAppRoot(): Promise<string> {
  const threeLevelsUp = path.join(process.cwd(), '../../../../..');
  return fs.existsSync(path.join(threeLevelsUp, 'node_modules/.pnpm')) ? path.join(process.cwd(), '../../../../../') : path.join(process.cwd(), '../../');
}

(async () => {
  await cleanUp();
  const appRoot = await getAppRoot();
  const files = await globby([path.join(appRoot, '**/*.{ts,tsx}')]);
  const styleFiles = files.filter(isCSSX);
  const importPromises = styleFiles.map(styleFile => import(path.resolve(styleFile)));
  await Promise.all(importPromises);

  for (let i = 0; i < styleFiles.length; i++) {
    await createBuildIn();
  }
  for (let i = 0; i < styleFiles.length; i++) {
    await setBuildIn();
  }
  for (let i = 0; i < styleFiles.length; i++) {
    await globalBuildIn();
  }
  for (let i = 0; i < styleFiles.length; i++) {
    await rootBuildIn();
  }
})();
