import type { ExtendedCSSProperties } from '../../_internal';
import { isDevAndTest, isServer, injectServerCSS, injectClientGlobalCSS, styleCompiler, genBase36Hash } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './root-build-in-helper';
import '../styles/global.css';

export function root(object: ExtendedCSSProperties): void {
  const base36Hash = genBase36Hash(object, 8);
  const { styleSheet } = styleCompiler(object, undefined, '--root');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']); // global.css

  if (isDevAndTest) isServer ? injectServerCSS(base36Hash, styleSheet) : injectClientGlobalCSS(styleSheet, 'root');
}
