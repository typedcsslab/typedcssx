import type { ArgsPseudos, AndStrings } from '../common/pseudo-selectors';
import type { CustomCSSProperties } from './custom-css-properties';

type JSXType = keyof JSX.IntrinsicElements | '*';

type HTMLType = {
  [K in JSXType]?: CustomCSSProperties;
};

export type CustomHTMLType = HTMLType | ArgsPseudos | AndStrings;
