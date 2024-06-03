import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, buildIn, injectCSS, cssCodeGenStyle } from '../../_internal';

const stylesPath = '../styles/style.module.css';
let resolveGlobalStyleSheet: (value: string) => void;
let globalStyleSheetPromise: Promise<string>;

function createNewGlobalStyleSheetPromise() {
  globalStyleSheetPromise = new Promise<string>((resolve) => {
    resolveGlobalStyleSheet = resolve;
  });
}

function applyGlobalBuildIn(): void {
  if (typeof globalStyleSheetPromise === 'undefined') createNewGlobalStyleSheetPromise();

  globalStyleSheetPromise.then((styleSheet) => {
    if (!isInDevelopment && styleSheet) {
      buildIn(styleSheet);
    }
    createNewGlobalStyleSheetPromise();
  });
}

export function styleBuildIn() {
  applyGlobalBuildIn();
}

export function style(object: CustomCSSProperties): string {
  const { styleSheet, base62Hash } = cssCodeGenStyle(object);
  const className = '_' + base62Hash;
  resolveGlobalStyleSheet(styleSheet);

  function returnFunction() {
    if (isInDevelopment) injectCSS(className, styleSheet, 'style');
    return () => {
      const importStyles = import(stylesPath);
      return isInDevelopment ? className : importStyles.then((styles) => styles[className]);
    };
  }

  return returnFunction() as unknown as string;
}
