import type { ReturnStyleType, ClassesObjectType } from '../../_internal';
import { cssCodeGenSheet, isInDevelopment, buildIn, injectCSS } from '../../_internal';
import path from 'path';

const styleFilePath = path.join(__dirname, '../styles/style.module.css');
let resolveGlobalStyleSheet: (value: string) => void;
let globalStyleSheetPromise: Promise<string>;

function createNewGlobalStyleSheetPromise() {
  globalStyleSheetPromise = new Promise<string>((resolve) => {
    resolveGlobalStyleSheet = resolve;
  });
}

function applyGlobalBuildIn(): void {
  globalStyleSheetPromise.then((styleSheet) => {
    if (!isInDevelopment && styleSheet) {
      buildIn(styleSheet);
    }
    createNewGlobalStyleSheetPromise();
  });
}

export function sheetBuildIn() {
  applyGlobalBuildIn();
}

export function sheet<T extends ClassesObjectType>(object: T & ClassesObjectType): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = cssCodeGenSheet(object);
  if (typeof globalStyleSheetPromise === 'undefined') createNewGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy<ClassesObjectType>(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        if (isInDevelopment) {
          const sheet = (styleSheet.match(`\\\n.${className}\\s*{[^}]+}`) || '')[0];
          injectCSS(className, sheet, 'sheet');
        }
        const importStyles = import(styleFilePath);
        return isInDevelopment ? className : importStyles.then((styles) => styles[className]);
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
