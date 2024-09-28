import type { CSSXReturnStyle, CSSXTypedStyle, CSSXStyleDefinition } from '../../_internal';
import { isDevAndTest, sheetCompiler, injectServerCSS, genBase36Hash, isServer, injectClientCSS } from '../../_internal';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './create-build-in-helper';
import styles from '../styles/style.module.css';

export function create<T extends CSSXStyleDefinition>(object: CSSXTypedStyle<T> | CSSXStyleDefinition): CSSXReturnStyle<T> {
  const base36Hash = genBase36Hash(object, 6);
  const { styleSheet } = sheetCompiler(object, base36Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  const injectCSS = isServer ? injectServerCSS : injectClientCSS;
  if (isDevAndTest) injectCSS(base36Hash, styleSheet, 'create');
  Object.keys(object).forEach(key => {
    Object.defineProperty(object, key, {
      get: () => {
        const className = key + '_' + base36Hash;
        return isDevAndTest ? className : styles[className];
      },
    });
  });
  return object as CSSXReturnStyle<T>;
}
