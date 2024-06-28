import type { ReturnStyleType, ClassesObjectType, ExactClassesObjectType } from '../../_internal';
import { sheetCompiler, isInDevelopment, injectCSS, genBase62Hash } from '../../_internal';
import styles from '../styles/style.module.css';
import { createGlobalStyleSheetPromise, globalStyleSheetPromise, resolveGlobalStyleSheet } from './create-build-in-helper';

export function create<T extends ClassesObjectType>(object: ExactClassesObjectType<T>): ReturnStyleType<T> {
  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = sheetCompiler(object, base62Hash);
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet(styleSheet);

  return new Proxy(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        const classRuleRegex = new RegExp(`\\n\\.${className}[^{]*\\{[^}]*\\}`, 'g');
        const mediaBlockRegex = new RegExp(
          `\\n@media[^{]+\\{(?:[^{}]*\\{[^{}]*\\})*[^{}]*\\.${className}[^{}]*\\{[^{}]*\\}(?:[^{}]*\\{[^{}]*\\})*[^{}]*\\}`,
          'g'
        );
        const sheet = (Array.from(styleSheet.match(classRuleRegex) || []) as string[])
          .concat(Array.from(styleSheet.match(mediaBlockRegex) || []) as string[])
          .join('');
        if (isInDevelopment) injectCSS(className, sheet, 'sheet');

        return isInDevelopment ? className : styles[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
