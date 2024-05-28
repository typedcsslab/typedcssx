import type { ReturnStyleType, ClassesObjectType } from '../../_internal';
import { cssCodeGenSheet, isInDevelopment, buildIn, injectCSS } from '../../_internal';
import module from '../styles/style.module.css';

export function sheet<T extends ClassesObjectType>(object: T & ClassesObjectType): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = cssCodeGenSheet(object);

  if (!isInDevelopment) buildIn(styleSheet);

  return new Proxy<ClassesObjectType>(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        const className = prop + '_' + base62Hash;
        if (isInDevelopment) {
          const sheet = (styleSheet.match(`\\\n.${className}\\s*{[^}]+}`) || '')[0];
          injectCSS(className, sheet, 'sheet');
        }
        return isInDevelopment ? className : module[className];
      }
    },
  }) as unknown as ReturnStyleType<T>;
}
