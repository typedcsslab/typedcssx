import type { ReturnStyleType, ClassesObjectType } from '../../_internal';
import { cssCodeGenSheet, isInDevelopment, injectCSS } from '../../_internal';
import styles from '../styles/style.module.css';
import { resolveGlobalStyleSheet } from './sheet-build-in-helper';

export function sheet<T extends ClassesObjectType>(object: T & ClassesObjectType): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = cssCodeGenSheet(object);
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy<T & ClassesObjectType>(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        if (isInDevelopment) {
          const sheet = (styleSheet.match(`\\\n.${className}\\s*{[^}]+}`) || '')[0];
          injectCSS(className, sheet, 'sheet');
        }
        return isInDevelopment ? className : styles[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
