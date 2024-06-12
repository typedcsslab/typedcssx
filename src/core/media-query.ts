import type { CustomCSSProperties, ClassesObjectType, ExactClassesObjectType } from '../_internal';

export const media = (query: string, secondary?: string) => {
  return <T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType | CustomCSSProperties): ClassesObjectType => {
    const mediaQuery = `@media (${query}${secondary ? ' and ' + secondary : ''})`;

    return { [mediaQuery]: object };
  };
};
