import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, injectCSS, cssCodeGenStyle } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './style-build-in-helper';

export function style(object: CustomCSSProperties): string {
  const { styleSheet, base62Hash } = cssCodeGenStyle(object);
  const className = '_' + base62Hash;
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  function returnFunction() {
    if (isInDevelopment) injectCSS(className, styleSheet, 'style');
    return isInDevelopment ? className : styles[className];
  }

  return returnFunction() as unknown as string;
}
