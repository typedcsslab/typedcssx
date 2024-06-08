import type { ReturnStyleType, ClassesObjectType, ExactClassesObjectType } from '../../_internal';
import { cssCodeGenSheet, isInDevelopment, injectCSS, genBase62Hash } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './sheet-build-in-helper';

export function sheet<T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType): ReturnStyleType<T> {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = cssCodeGenSheet(object, base62Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        const mediaBlockRegex = new RegExp(`(?:\\@media[^{]+\\{[\\s\\S]*?\\.${className}\\s*\\{[\\s\\S]*?\\})`, 'g');
        const classRuleRegex = new RegExp(`\\n\\.${className}\\s*\\{[\\s\\S]*?\\}`, 'g');
        const sheet = (Array.from(styleSheet.match(mediaBlockRegex) || []) as string[])
          .concat(Array.from(styleSheet.match(classRuleRegex) || []) as string[])
          .join('');
        if (isInDevelopment) injectCSS(className, sheet, 'sheet');

        return isInDevelopment ? className : styles[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
