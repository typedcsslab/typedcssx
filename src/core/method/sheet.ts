import type { ReturnStyleType, ClassesObjectType } from '../../_internal';
import { cssCodeGenSheet, isInDevelopment, injectCSS, genBase62Hash } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './sheet-build-in-helper';

export function sheet<T extends ClassesObjectType>(object: T & ClassesObjectType): ReturnStyleType<T> {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = cssCodeGenSheet(object, base62Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy<T & ClassesObjectType>(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        if (isInDevelopment) injectCSS(className, styleSheet, 'sheet');

        return isInDevelopment ? className : styles[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
