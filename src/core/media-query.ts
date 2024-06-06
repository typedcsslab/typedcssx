import type { CustomCSSProperties, ClassesObjectType, ReturnStyleType } from '../_internal';
import styles from '../core/styles/style.module.css';
import { isClassesObjectType, isInDevelopment } from '../_internal';

export const media = (query: string, secondary?: string) => {
  return <T extends ClassesObjectType>(object: T | CustomCSSProperties): T => {
    const mediaQuery = `@media (${query}${secondary ? ' and ' + secondary : ''})`;

    if (isClassesObjectType(object)) {
      const result: ClassesObjectType = {};

      Object.keys(object).forEach((className) => {
        result[className] = {
          ...((isInDevelopment ? className : styles[className]) as ReturnStyleType<T>),
        };
      });

      return {
        ...({ [mediaQuery]: object } as unknown as T),
        ...(result as T),
      };
    } else {
      return { [mediaQuery]: object } as T;
    }
  };
};
