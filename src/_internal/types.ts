import type { CSSColorNames } from './colors';
import type { LanguageCodes } from './utils/language-codes';
import type { HtmlTags } from './utils/html-tags';

type AbsoluteCSSUnit = 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt';
type LocalFontRelativeCSSUnit = 'cap' | 'ch' | 'em' | 'ex' | 'ic' | 'lh';
type RootFontRelativeCSSUnit = 'rcap' | 'rch' | 'rem' | 'rex' | 'ric' | 'rlh';
type ViewportCSSUnit = 'vh' | 'vw' | 'vmin' | 'vmax' | 'vb' | 'vi';
type RespectCSSUnit = 'svw' | 'svh' | 'lvw' | 'lvh' | 'dvw' | 'dvh';
type PercentageCSSUnit = '%';

type CSSAbsoluteUnitValue = '0' | `${number}${AbsoluteCSSUnit}`;
type CSSLocalFontRelativeUnitValue = '0' | `${number}${LocalFontRelativeCSSUnit}`;
type CSSRootFontRelativeUnitValue = '0' | `${number}${RootFontRelativeCSSUnit}`;
type CSSViewportUnitValue = '0' | `${number}${ViewportCSSUnit}`;
type CSSRespectUnitValue = '0' | `${number}${RespectCSSUnit}`;
type CSSPercentageUnitValue = '0' | `${number}${PercentageCSSUnit}`;
type CSSGlobalValue = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
type CSSLengthSubValue = 'none' | 'max-content' | 'min-content' | 'fit-content' | `fit-content(${number}${CSSNumericValue})`;
type CSSFontSizeSubValue = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'math';
type CSSArithmeticOperations = '+' | '-' | '*' | '/';
type CSSCalcExpressionFunctioin = `calc(${string} ${CSSArithmeticOperations} ${string})`;
type CSSColumnsValue = `${CSSNumericValue | number}` | 'auto' | `${CSSNumericValue | number} auto` | `auto ${CSSNumericValue | number}` | 'auto auto';

type CSSUnitsAndGlobalValue =
  | CSSAbsoluteUnitValue
  | CSSLocalFontRelativeUnitValue
  | CSSRootFontRelativeUnitValue
  | CSSViewportUnitValue
  | CSSRespectUnitValue
  | CSSPercentageUnitValue
  | CSSCalcExpressionFunctioin
  | CSSVariableValue
  | CSSGlobalValue;

type CSSNumericValue = CSSUnitsAndGlobalValue | number;

type CSSSizeValue<T extends string | number> = `${T}` | `${T} ${T}` | `${T} ${T} ${T}` | `${T} ${T} ${T} ${T}`;

type CSSAbsoluteUnitAndAutoValue = CSSAbsoluteUnitValue | 'auto';
type CSSRelativeUnitAndAutoValue = CSSLocalFontRelativeUnitValue | 'auto';
type CSSViewportUnitAndAutoValue = CSSViewportUnitValue | 'auto';
type CSSRespectUnitAndAutoValue = CSSRespectUnitValue | 'auto';
type CSSPercentageUnitAndAutValue = CSSPercentageUnitValue | 'auto';

type CSSEdgeSizeAbsoluteWithAutoValues = CSSSizeValue<CSSAbsoluteUnitAndAutoValue>;
type CSSEdgeSizeRelativeWithAutoValues = CSSSizeValue<CSSRelativeUnitAndAutoValue>;
type CSSEdgeSizeViewportWithAutoValues = CSSSizeValue<CSSViewportUnitAndAutoValue>;
type CSSEdgeSizeRespectWithAutoValues = CSSSizeValue<CSSRespectUnitAndAutoValue>;
type CSSEdgeSizePercentageWithAutoValues = CSSSizeValue<CSSPercentageUnitAndAutValue>;
type CSSEdgeSizeCalcExpressionFunctioin = CSSSizeValue<CSSCalcExpressionFunctioin>;

type CSSMarginEdgeSizeValues =
  | CSSEdgeSizeAbsoluteWithAutoValues
  | CSSEdgeSizeRelativeWithAutoValues
  | CSSEdgeSizeViewportWithAutoValues
  | CSSEdgeSizeRespectWithAutoValues
  | CSSEdgeSizePercentageWithAutoValues
  | CSSEdgeSizeCalcExpressionFunctioin
  | CSSGlobalValue
  | CSSVariableValue;

type CSSEdgeSizeAbsoluteValues = CSSSizeValue<CSSAbsoluteUnitValue>;
type CSSEdgeSizeRelativeValues = CSSSizeValue<CSSLocalFontRelativeUnitValue>;
type CSSEdgeSizeViewportValues = CSSSizeValue<CSSViewportUnitValue>;
type CSSEdgeSizeRespectValues = CSSSizeValue<CSSRespectUnitValue>;
type CSSEdgeSizePercentageValues = CSSSizeValue<CSSPercentageUnitValue>;

type CSSPaddingEdgeSizeValues =
  | CSSEdgeSizeAbsoluteValues
  | CSSEdgeSizeRelativeValues
  | CSSEdgeSizeViewportValues
  | CSSEdgeSizeRespectValues
  | CSSEdgeSizePercentageValues
  | CSSEdgeSizeCalcExpressionFunctioin
  | CSSGlobalValue
  | CSSVariableValue;

type CustomRadiusValue<T extends CSSAbsoluteUnitValue | CSSLocalFontRelativeUnitValue | CSSViewportUnitValue | CSSRespectUnitValue | CSSPercentageUnitValue> =
  `${T} ${T} / ${T} ${T}`;

type CSSRadiusValue<T extends CSSAbsoluteUnitValue | CSSLocalFontRelativeUnitValue | CSSViewportUnitValue | CSSRespectUnitValue | CSSPercentageUnitValue> =
  | CSSSizeValue<T>
  | CustomRadiusValue<T>;

type CSSRadiusAbsoluteValues = CSSRadiusValue<CSSAbsoluteUnitValue>;
type CSSRadiusRelativeValues = CSSRadiusValue<CSSLocalFontRelativeUnitValue>;
type CSSRadiusViewportValues = CSSRadiusValue<CSSViewportUnitValue>;
type CSSRadiusRespectValues = CSSRadiusValue<CSSRespectUnitValue>;
type CSSRadiusPercentageValues = CSSRadiusValue<CSSPercentageUnitValue>;
type CSSRadiusValues =
  | CSSRadiusAbsoluteValues
  | CSSRadiusRelativeValues
  | CSSRadiusViewportValues
  | CSSRadiusRespectValues
  | CSSRadiusPercentageValues
  | CSSVariableValue;

export type CustomExtendProperties = {
  width?: CSSNumericValue | CSSLengthSubValue;
  height?: CSSNumericValue | CSSLengthSubValue;
  margin?: CSSMarginEdgeSizeValues;
  marginBottom?: CSSNumericValue | 'auto';
  marginLeft?: CSSNumericValue | 'auto';
  marginRight?: CSSNumericValue | 'auto';
  marginTop?: CSSNumericValue | 'auto';
  padding?: CSSPaddingEdgeSizeValues;
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
  borderRadius?: CSSRadiusValues;
  top?: CSSNumericValue | 'auto';
  right?: CSSNumericValue | 'auto';
  bottom?: CSSNumericValue | 'auto';
  left?: CSSNumericValue | 'auto';
  maxWidth?: CSSNumericValue | CSSLengthSubValue;
  maxHeight?: CSSNumericValue | CSSLengthSubValue;
  minWidth?: CSSNumericValue | CSSLengthSubValue;
  minHeight?: CSSNumericValue | CSSLengthSubValue;
  flexBasis?: CSSNumericValue;
  gap?: CSSNumericValue | CSSCalcExpressionFunctioin;
  rowGap?: CSSNumericValue;
  columnGap?: CSSNumericValue | 'normal';
  columns?: CSSColumnsValue;
  gridColumn?: string;
  gridRow?: string;
  color?: CSSColorValue;
  background?: CSSColorValue | 'none';
  backgroundColor?: CSSColorValue;
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

type NthChild = `nthChild${number | 'Odd' | 'Even'}`;
type NthLastChild = `nthLastChild${number | 'Odd' | 'Even'}`;
type NthLastOfType = `nthLastOfType${number | 'Odd' | 'Even'}`;
type NthOfType = `nthOfType${number | 'Odd' | 'Even'}`;
type CustomNthSelectors = NthChild | NthLastChild | NthLastOfType | NthOfType;

type CustomNthArgsType = {
  [key in CustomNthSelectors]?: CustomCSSProperties;
};

type Langs = `lang${LanguageCodes}`;
type LanguagesType = {
  [key in Langs]?: CustomCSSProperties;
};

type Not = `not${HtmlTags}`;
type NotType = {
  [key in Not]?: CustomCSSProperties;
};

type NotClass<T extends string> = `notClass${Capitalize<T>}${string}`;
type NotClassType = {
  [key in NotClass<string>]?: CustomCSSProperties;
};

type Has = `has${HtmlTags}`;
type HasType = {
  [key in Has]?: CustomCSSProperties;
};

type HasChild = `hasChild${HtmlTags}`;
type HasChildType = {
  [key in HasChild]?: CustomCSSProperties;
};

type HasPlus = `hasPlus${HtmlTags}`;
type HasPlusType = {
  [key in HasPlus]?: CustomCSSProperties;
};

export type HasEPE = `has${HtmlTags}Plus${HtmlTags | string}`;
type HasEPEType = {
  [key in HasEPE]?: CustomCSSProperties;
};

export type HasECE = `has${HtmlTags}Child${HtmlTags | string}`;
type HasECEType = {
  [key in HasECE]?: CustomCSSProperties;
};

type HasClass<T extends string> = `hasClass${Capitalize<T>}${string}`;
type HasClassType = {
  [key in HasClass<string>]?: CustomCSSProperties;
};

type HasClassChild<T extends string> = `hasClassChild${Capitalize<T>}${string}`;
type HasClassChildType = {
  [key in HasClassChild<string>]?: CustomCSSProperties;
};

type HasClassPlus<T extends string> = `hasClassPlus${Capitalize<T>}${string}`;
type HasClassPlusType = {
  [key in HasClassPlus<string>]?: CustomCSSProperties;
};

export type HasCPC = `hasClass${string}Plus${string | HtmlTags}`;
type HasCPCType = {
  [key in HasCPC]?: CustomCSSProperties;
};

export type HasCCC = `hasClass${string}Child${string | HtmlTags}`;
type HasCCCType = {
  [key in HasCCC]?: CustomCSSProperties;
};

type ArgsPseudos =
  | HasCCCType
  | HasCPCType
  | HasClassPlusType
  | HasClassChildType
  | HasClassType
  | HasECEType
  | HasEPEType
  | HasPlusType
  | HasChildType
  | HasType
  | NotClassType
  | NotType
  | LanguagesType
  | CustomNthArgsType;

type AndStrings = `&${string}`;
type AndStringsType = {
  [key in AndStrings]: CustomCSSProperties;
};

type CSSVariableKey = `--${string}-${string}`;
type CSSVariableValue = `var(${CSSVariableKey})`;
type CSSColorValue = CSSColorNames | CSSVariableValue;

export type CSSVariableProperties = { [key: CSSVariableKey]: string };

export type CustomCSSProperties =
  | ArgsPseudos
  | AndStringsType
  | (CustomExtendProperties & {
      [K in keyof React.CSSProperties]: React.CSSProperties[K] | CSSVariableValue;
    })
  | CSSVariableProperties;

export type ClassesObjectType = {
  [className: string]: CustomCSSProperties;
};

type Exact<T, U> = T extends U ? (U extends T ? T : never) : never;

export type ExactClassesObjectType<T> = {
  [K in keyof T]: Exact<T[K], CustomCSSProperties>;
};

export type ReturnStyleType<T> = { [key in keyof T]: string };

type JSXType = keyof JSX.IntrinsicElements | '*';

export type HTMLType = {
  [K in JSXType]?: CustomCSSProperties;
};

export type SerializeType = Record<string, string>;

export type PropertyType = {
  [key: string]: string;
};
