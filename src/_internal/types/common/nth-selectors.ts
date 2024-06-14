import type { CustomCSSProperties } from '../custom/custom-css-properties';

type NthChild = `nthChild${number | 'Odd' | 'Even'}`;
type NthLastChild = `nthLastChild${number | 'Odd' | 'Even'}`;
type NthLastOfType = `nthLastOfType${number | 'Odd' | 'Even'}`;
type NthOfType = `nthOfType${number | 'Odd' | 'Even'}`;

export type CustomNthSelectors = NthChild | NthLastChild | NthLastOfType | NthOfType;

export type CustomNthArgsType = {
  [key in CustomNthSelectors]?: CustomCSSProperties;
};
