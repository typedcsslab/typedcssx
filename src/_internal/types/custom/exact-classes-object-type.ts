import type { CustomCSSProperties } from './custom-css-properties';

type Exact<T, U> = T extends U ? (U extends T ? T : never) : never;

export type ExactClassesObjectType<T> = {
  [K in keyof T]: Exact<T[K], CustomCSSProperties>;
};
