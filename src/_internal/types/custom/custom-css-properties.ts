import type {
  CSSCalcExpressionFunctioin,
  CSSColumnsValue,
  CSSLengthSubValue,
  CSSFontSizeSubValue,
  CSSGlobalValue,
  CSSNumericValue,
  CSSMarginEdgeSizeValues,
  CSSPaddingEdgeSizeValues,
  CSSRadiusValues,
} from '../common/css-values';
import type { AndStringsType, ArgsPseudos } from '../common/pseudo-selectors';
import type { CSSColorValue, CSSVariableProperties, CSSVariableValue } from '../common/css-variables';

type CustomExtendProperties = {
  width?: CSSNumericValue | CSSLengthSubValue | 'auto';
  height?: CSSNumericValue | CSSLengthSubValue | 'auto';
  margin?: CSSMarginEdgeSizeValues | number;
  marginBottom?: CSSNumericValue | 'auto';
  marginLeft?: CSSNumericValue | 'auto';
  marginRight?: CSSNumericValue | 'auto';
  marginTop?: CSSNumericValue | 'auto';
  padding?: CSSPaddingEdgeSizeValues | number;
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
  top?: CSSNumericValue | 'auto';
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
  active?: CustomCSSProperties;
  hover?: CustomCSSProperties;
  link?: CustomCSSProperties;
  visited?: CustomCSSProperties;
  empty?: CustomCSSProperties;
  lang?: undefined;
  not?: undefined;
  notClass?: undefined;
  has?: undefined;
  hasChild?: undefined;
  hasPlus?: undefined;
  hasClass?: undefined;
  hasClassChild?: undefined;
  hasClassPlus?: undefined;
  firstChild?: CustomCSSProperties;
  lastChild?: CustomCSSProperties;
  nthChild?: undefined;
  nthLastChild?: undefined;
  nthLastOfType?: undefined;
  nthOfType?: undefined;
  checked?: CustomCSSProperties;
  disabled?: CustomCSSProperties;
  enabled?: CustomCSSProperties;
  focus?: CustomCSSProperties;
  inRange?: CustomCSSProperties;
  invalid?: CustomCSSProperties;
  valid?: CustomCSSProperties;
  optional?: CustomCSSProperties;
  outOfRange?: CustomCSSProperties;
  readOnly?: CustomCSSProperties;
  readWrite?: CustomCSSProperties;
  required?: CustomCSSProperties;
  target?: CustomCSSProperties;
  after?: CustomCSSProperties;
  before?: CustomCSSProperties;
  firstLetter?: CustomCSSProperties;
  firstLine?: CustomCSSProperties;
  marker?: CustomCSSProperties;
  selection?: CustomCSSProperties;
};

export type CustomCSSProperties =
  | ArgsPseudos
  | AndStringsType
  | (CustomExtendProperties & {
      [K in keyof React.CSSProperties]: React.CSSProperties[K] | CSSVariableValue;
    })
  | CSSVariableProperties;
