import type { ExtendedCSSProperties } from '../../_internal';
import { isDevelopment, isDevAndTest, isServer, injectServerCSS, injectClientCSS, styleCompiler, genBase62Hash } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './set-build-in-helper';

export function set(object: ExtendedCSSProperties): string {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = styleCompiler(object, base62Hash);
  const classHash = '_' + base62Hash;
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  if (isDevelopment) isServer ? injectServerCSS(base62Hash, styleSheet, 'set') : injectClientCSS(base62Hash, styleSheet, 'set');
  return isDevAndTest ? classHash : styles[classHash];
}
