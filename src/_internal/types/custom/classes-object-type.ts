import type { CustomCSSProperties } from './custom-css-properties';
import { MediaQuery } from './custom-html-type';

export type ClassesObjectType = Record<MediaQuery, Record<string, CustomCSSProperties>>;

export type ExactClassesObjectType<T> = {
  readonly [K in keyof T | string]: K extends keyof T ? Pick<T, K> : CustomCSSProperties;
};

export type ReturnStyleType<T> = { [key in keyof T]: string };
