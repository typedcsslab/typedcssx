import type { ExtendedCSSProperties } from '../../_internal';
import { isDevAndTest, isServer, injectServerCSS, injectClientGlobalCSS, styleCompiler, genBase62Hash } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './root-build-in-helper';

export function root(object: ExtendedCSSProperties): void {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = styleCompiler(object, undefined, '--root');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']); // global.css

  if (isDevAndTest) isServer ? injectServerCSS(base62Hash, styleSheet, 'root') : injectClientGlobalCSS(styleSheet, 'root');
}
