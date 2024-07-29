import type {
  CSSCalcExpressionFunctioin,
  CSSColumnsValue,
  CSSLengthSubValue,
  CSSFontSizeSubValue,
  CSSGlobalValue,
  CSSNumericValue,
  CSSEdgeSizeValue,
  CSSRadiusValues,
} from '../common/css-values';
import type { AndStrings, AndStringsType, ArgsPseudos } from '../common/pseudo-selectors';
import type { CSSColorValue, CSSVariableProperties, CSSVariableValue } from '../common/css-variables';
import { MediaQuery, MediaQueryType } from './custom-html-type';
import { HtmlTags } from '../../utils/html-tags';
import { LanguageCodes } from '../../utils/language-codes';

type CustomExtendProperties = {
  width?: CSSNumericValue | CSSLengthSubValue | 'auto';
  height?: CSSNumericValue | CSSLengthSubValue | 'auto';
  margin?: CSSEdgeSizeValue;
  marginBottom?: CSSNumericValue | 'auto';
  marginLeft?: CSSNumericValue | 'auto';
  marginRight?: CSSNumericValue | 'auto';
  marginTop?: CSSNumericValue | 'auto';
  padding?: CSSEdgeSizeValue;
  paddingBottom?: CSSNumericValue;
  paddingLeft?: CSSNumericValue;
  paddingRight?: CSSNumericValue;
  paddingTop?: CSSNumericValue;
  fontSize?: CSSNumericValue | CSSFontSizeSubValue;
  scale?: CSSNumericValue | `${number}` | 'none';
  opacity?: CSSNumericValue | `${number}`;
  lineHeight?: CSSNumericValue | `${number}` | 'normal';
  letterSpacing?: CSSNumericValue | 'normal';
  wordSpacing?: CSSNumericValue | 'normal';
  borderWidth?: CSSNumericValue | 'thin' | 'medium' | 'thick';
  borderRadius?: CSSRadiusValues | number;
  top?: CSSNumericValue | 'auto' | number;
  right?: CSSNumericValue | 'auto';
  bottom?: CSSNumericValue | 'auto';
  left?: CSSNumericValue | 'auto';
  maxWidth?: CSSNumericValue | CSSLengthSubValue | 'auto';
  maxHeight?: CSSNumericValue | CSSLengthSubValue | 'auto';
  minWidth?: CSSNumericValue | CSSLengthSubValue | 'auto';
  minHeight?: CSSNumericValue | CSSLengthSubValue | 'auto';
  flexBasis?: CSSNumericValue | 'auto';
  gap?: CSSNumericValue | CSSCalcExpressionFunctioin;
  rowGap?: CSSNumericValue;
  columnGap?: CSSNumericValue | 'normal';
  columns?: CSSColumnsValue;
  gridColumn?: string;
  gridRow?: string;
  color?: CSSColorValue | CSSGlobalValue;
  background?: CSSColorValue | CSSGlobalValue | 'none';
  backgroundColor?: CSSColorValue | CSSGlobalValue;
};

type PseudoElementsAndClassKeys =
  | 'active'
  | 'hover'
  | 'link'
  | 'visited'
  | 'empty'
  | `lang${LanguageCodes}`
  | `not${HtmlTags}`
  | `notClass${string}`
  | `has${HtmlTags}`
  | `hasChild${HtmlTags}`
  | `hasPlus${HtmlTags}`
  | `hasClass${string}`
  | `hasClassChild${string}`
  | `hasClassPlus${string}`
  | 'firstChild'
  | 'lastChild'
  | `nthChild${number | 'Odd' | 'Even'}`
  | `nthLastChild${number | 'Odd' | 'Even'}`
  | `nthLastOfType${number | 'Odd' | 'Even'}`
  | `nthOfType${number | 'Odd' | 'Even'}`
  | 'checked'
  | 'disabled'
  | 'enabled'
  | 'focus'
  | 'inRange'
  | 'invalid'
  | 'valid'
  | 'optional'
  | 'outOfRange'
  | 'readOnly'
  | 'readWrite'
  | 'required'
  | 'target'
  | 'after'
  | 'before'
  | 'firstLetter'
  | 'firstLine'
  | 'marker'
  | 'selection';

type PseudoElementsAndClassType = {
  [K in PseudoElementsAndClassKeys]?: CustomCSSProperties;
};

export type CustomCSSProperties =
  | ArgsPseudos
  | AndStringsType
  | (CustomExtendProperties & {
      [K in keyof React.CSSProperties]: React.CSSProperties[K] | CSSVariableValue;
    })
  | CSSVariableProperties
  | MediaQueryType
  | PseudoElementsAndClassType;

export type ExtendedCSSProperties =
  | CustomCSSProperties
  | {
      [K in AndStrings | PseudoElementsAndClassKeys | MediaQuery]?: CustomCSSProperties;
    };
