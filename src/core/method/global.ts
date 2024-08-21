import type { CustomHTMLType } from '../../_internal';
import { isDevAndTest, isServer, injectServerCSS, injectClientGlobalCSS, sheetCompiler, genBase62Hash } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './global-build-in-helper';

export function global(object: CustomHTMLType): void {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = sheetCompiler(object, undefined, '--global');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']);

  if (isDevAndTest) isServer ? injectServerCSS(base62Hash, styleSheet, 'global') : injectClientGlobalCSS(styleSheet, 'global');
}
