import type { ExtendedCSSProperties } from '../../_internal';
import { isDevAndTest, injectClientCSS, styleCompiler, genBase36Hash, injectServerCSS, isServer } from '../../_internal';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './set-build-in-helper';
import styles from '../styles/style.module.css';

export function set(object: ExtendedCSSProperties): string {
  const base36Hash = genBase36Hash(object, 8);
  const { styleSheet } = styleCompiler(object, base36Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  const injectCSS = isServer ? injectServerCSS : injectClientCSS;
  if (isDevAndTest) injectCSS(base36Hash, styleSheet, 'set');
  return isDevAndTest ? base36Hash : styles[base36Hash];
}
