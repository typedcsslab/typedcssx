import type { CustomCSSProperties } from './custom-css-properties';
import { MediaQuery } from './custom-html-type';

export type ClassesObjectType = {
  [key in MediaQuery]: {
    [className: string]: CustomCSSProperties;
  };
};

type Exact<T, U> = T extends U ? T : never;

export type ExactClassesObjectType<T> = {
  [K in keyof T | string]: K extends keyof T ? Exact<T[K], CustomCSSProperties> : CustomCSSProperties;
};
