import type { CustomHTMLType } from '../../_internal';
import { isDevAndTest, isServer, injectServerCSS, injectClientGlobalCSS, sheetCompiler, genBase36Hash } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './global-build-in-helper';
import '../styles/global.css';

export function global(object: CustomHTMLType): void {
  const base36Hash = genBase36Hash(object, 8);
  const { styleSheet } = sheetCompiler(object, undefined, '--global');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']);

  if (isDevAndTest) isServer ? injectServerCSS(base36Hash, styleSheet) : injectClientGlobalCSS(styleSheet, 'global');
}
