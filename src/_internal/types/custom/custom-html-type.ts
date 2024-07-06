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

type KeyframeSelector = 'from' | 'to' | `${number}%`;
type KeyframesDefinition = {
  [K in KeyframeSelector]?: CustomCSSProperties;
};
type AtKeyframes = {
  [K in `@keyframes ${string}`]: KeyframesDefinition;
};

export type CustomHTMLType = HTMLType | ClassNameType | AttributeType | ConsecutiveType | PseudoType | AtKeyframes;
