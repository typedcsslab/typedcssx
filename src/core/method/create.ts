import type { ReturnStyleType, ClassesObjectType, ExactClassesObjectType } from '../../_internal';
import { isInDevelopment, isDevelopAndTest, injectCSS, sheetCompiler, genBase62Hash } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './create-build-in-helper';

export function create<T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType): ReturnStyleType<T> {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = sheetCompiler(object, base62Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        if (isInDevelopment) injectCSS(base62Hash, styleSheet, 'create');
        return isDevelopAndTest ? className : styles[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
