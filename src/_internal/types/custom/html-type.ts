import type { CustomCSSProperties } from './custom-css-properties';

type JSXType = keyof JSX.IntrinsicElements | '*';

export type HTMLType = {
  [K in JSXType]?: CustomCSSProperties;
};
