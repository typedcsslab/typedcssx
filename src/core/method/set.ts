import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, injectCSS, styleCompiler, genBase62Hash } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './set-build-in-helper';

export function set(object: CustomCSSProperties): string {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = styleCompiler(object, base62Hash);
  const className = '_' + base62Hash;
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  function returnFunction() {
    if (isInDevelopment) injectCSS(className, styleSheet, 'style');
    return isInDevelopment ? className : styles[className];
  }

  return returnFunction() as unknown as string;
}
