import type { CustomCSSProperties } from './custom-css-properties';
import { MediaQuery } from './custom-html-type';

export type CSSXStyleDefinition = Record<MediaQuery, Record<string, CustomCSSProperties>>;

export type CSSXTypedStyle<T> = {
  readonly [K in keyof T | string]: K extends keyof T ? T[K] : CustomCSSProperties;
};

export type CSSXReturnStyle<T> = { [key in keyof T]: string };
