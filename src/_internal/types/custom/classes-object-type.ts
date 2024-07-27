import type { CustomCSSProperties } from './custom-css-properties';

export type ClassesObjectType = {
  [key: string]:
    | CustomCSSProperties
    | {
        [className: string]: CustomCSSProperties | ClassesObjectType;
      };
};

export type ExactClassesObjectType<T> = {
  [K in keyof T | string]: K extends keyof T ? T[K] : CustomCSSProperties | ClassesObjectType;
};
