import type { CustomCSSProperties, ClassesObjectType } from '../_internal';

export const media = (query: string, secondary?: string) => {
  return (target: CustomCSSProperties | ClassesObjectType): ClassesObjectType => {
    const mediaQuery = `@media (${query}${secondary ? ' and ' + secondary : ''})`;
    return { [mediaQuery]: target } as ClassesObjectType;
  };
};
