import type { CustomCSSProperties } from './custom-css-properties';

type JSXType = keyof JSX.IntrinsicElements | '*';

type HTMLType = {
  [K in JSXType]?: CustomCSSProperties;
};

export type CustomHTMLType = HTMLType;
