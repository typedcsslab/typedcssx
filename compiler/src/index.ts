import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';
import { cleanUp } from './clean-up';
import { createBuildIn } from '../../src/core/method/create-build-in-helper';
import { setBuildIn } from '../../src/core/method/set-build-in-helper';
import { globalBuildIn } from '../../src/core/method/global-build-in-helper';
import { rootBuildIn } from '../../src/core/method/root-build-in-helper';

function isStyleClass(filePath: string): boolean {
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
  const csstsPattern = [path.join(appRoot, '**/*.ts'), path.join(appRoot, '**/*.tsx')];
  const files = fs.globSync(csstsPattern);
  const styleFiles = files.filter(file => {
    return isStyleClass(file);
  });
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
