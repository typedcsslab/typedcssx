import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, buildIn, injectCSS, cssCodeGenStyle } from '../../_internal';
import styles from '../styles/style.module.css';

let resolveGlobalStyleSheet: (value: string) => void;
const globalStyleSheetPromise = new Promise<string>((resolve) => {
  resolveGlobalStyleSheet = resolve;
});

export function applyGlobalBuildIn(): void {
  globalStyleSheetPromise.then((styleSheet) => {
    if (!isInDevelopment && styleSheet) {
      buildIn(styleSheet);
    }
  });
}

export function style(object: CustomCSSProperties): string {
  const { styleSheet, base62Hash } = cssCodeGenStyle(object);
  const className = '_' + base62Hash;
  resolveGlobalStyleSheet(styleSheet);

  function returnFunction() {
    if (isInDevelopment) injectCSS(className, styleSheet, 'style');
    return isInDevelopment ? className : styles[className];
  }

  return returnFunction();
}

applyGlobalBuildIn();
