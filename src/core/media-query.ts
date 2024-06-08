import type { CustomCSSProperties, ClassesObjectType, ReturnStyleType, ExactClassesObjectType } from '../_internal';
import styles from '../core/styles/style.module.css';
import { isClassesObjectType, isInDevelopment } from '../_internal';

export const media = (query: string, secondary?: string) => {
  return <T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType | CustomCSSProperties): ClassesObjectType => {
    const mediaQuery = `@media (${query}${secondary ? ' and ' + secondary : ''})`;

    if (isClassesObjectType(object)) {
      const result: ClassesObjectType = {};

      Object.keys(object).forEach((className) => {
        result[className] = {
          ...((isInDevelopment ? className : styles[className]) as ReturnStyleType<T>),
        };
      });

      return {
        ...{ [mediaQuery]: object },
        ...result,
      };
    } else {
      return { [mediaQuery]: object };
    }
  };
};
