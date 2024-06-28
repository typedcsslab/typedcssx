import type { CustomCSSProperties } from './custom-css-properties';

export type ClassesObjectType = {
  [className: string]: CustomCSSProperties;
};

export type ExactClassesObjectType<T extends Record<string, CustomCSSProperties>> = T;
