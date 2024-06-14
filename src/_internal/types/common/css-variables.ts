import type { CSSColorNames } from './colors';

type CSSVariableKey = `--${string}-${string}`;
export type CSSVariableValue = `var(${CSSVariableKey})`;

export type CSSColorValue = CSSColorNames | CSSVariableValue;
export type CSSVariableProperties = { [key: CSSVariableKey]: string };
