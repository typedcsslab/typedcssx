import type { CustomCSSProperties } from './custom-css-properties';

type JSXType = keyof JSX.IntrinsicElements | '*';

type HTMLType = {
  [K in JSXType]?: CustomCSSProperties;
};

type ClassName = `.${string}`;

type ClassNameType = {
  [K in ClassName]?: CustomCSSProperties;
};

type Attribute = `${string}[${string}]${string}`;

type AttributeType = {
  [K in Attribute]?: CustomCSSProperties;
};

type Consecutive = `${JSXType} ${string}`;

type ConsecutiveType = {
  [K in Consecutive]?: CustomCSSProperties;
};

type Pseudo = `${JSXType}:${string}`;

type PseudoType = {
  [K in Pseudo]?: CustomCSSProperties;
};

export type CustomHTMLType = HTMLType | PseudoType | ClassNameType | AttributeType | ConsecutiveType;
