import type { ReturnStyleType, ClassesObjectType, ExactClassesObjectType } from '../../_internal';
import { isDevAndTest, sheetCompiler, isDevelopment, injectServerCSS, genBase36Hash, isServer, injectClientCSS } from '../../_internal';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './create-build-in-helper';
import styles from '../styles/style.module.css';

export function create<T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType): ReturnStyleType<T> {
  const base36Hash = genBase36Hash(object, 6);
  const { styleSheet } = sheetCompiler(object, base36Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy(object, {
    get: function (target, key: string) {
      if (typeof key === 'string' && key in target) {
        const className = key + '_' + base36Hash;
        if (isDevelopment) isServer ? injectServerCSS(base36Hash, styleSheet, 'create') : injectClientCSS(base36Hash, styleSheet, 'create');
        return isDevAndTest ? className : styles[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
