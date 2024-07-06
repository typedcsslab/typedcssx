import type {
  CSSAbsoluteUnitValue,
  CSSLocalFontRelativeUnitValue,
  CSSRootFontRelativeUnitValue,
  CSSPercentageUnitValue,
  CSSRespectUnitValue,
  CSSViewportUnitValue,
  CSSUnit,
} from './css-units';
import type { CSSVariableValue } from './css-variables';

type CSSArithmeticOperations = '+' | '-' | '*' | '/';
export type CSSCalcExpressionFunctioin = `calc(${string} ${CSSArithmeticOperations} ${string})`;
export type CSSColumnsValue = `${CSSNumericValue | number}` | 'auto' | `${CSSNumericValue | number} auto` | `auto ${CSSNumericValue | number}` | 'auto auto';
export type CSSLengthSubValue = 'none' | 'max-content' | 'min-content' | 'fit-content' | `fit-content(${number}${CSSNumericValue})`;
export type CSSFontSizeSubValue = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'math';
export type CSSGlobalValue = 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';

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

export type CSSNumericValue = CSSUnitsAndGlobalValue | number;

type CSSPaddingUnitValue = `${number}${CSSUnit}` | '0';
type CSSPaddingSizeValue<T extends CSSPaddingUnitValue> = `${T}` | `${T} ${T}` | `${T} ${T} ${string}` | `${T} ${T} ${string} ${string}`;
export type CSSPaddingValue = CSSPaddingSizeValue<CSSPaddingUnitValue> | number;

type CSSMarginUnitValue = `${number}${CSSUnit}` | '0' | 'auto';
type CSSMarginSizeValue<T extends CSSMarginUnitValue> = `${T}` | `${T} ${T}` | `${T} ${T} ${string}` | `${T} ${T} ${string} ${string}`;
export type CSSMarginValue = CSSMarginSizeValue<CSSMarginUnitValue> | number;

type CSSSizeValue<T extends string | number> = `${T}` | `${T} ${T}` | `${T} ${T} ${T}` | `${T} ${T} ${T} ${T}`;

type CustomRadiusValue<
  T extends
    | CSSAbsoluteUnitValue
    | CSSLocalFontRelativeUnitValue
    | CSSRootFontRelativeUnitValue
    | CSSViewportUnitValue
    | CSSRespectUnitValue
    | CSSPercentageUnitValue
> = `${T} ${T} / ${T} ${T}`;

type CSSRadiusValue<
  T extends
    | CSSAbsoluteUnitValue
    | CSSLocalFontRelativeUnitValue
    | CSSRootFontRelativeUnitValue
    | CSSViewportUnitValue
    | CSSRespectUnitValue
    | CSSPercentageUnitValue
> = CSSSizeValue<T> | CustomRadiusValue<T>;

type CSSRadiusAbsoluteValues = CSSRadiusValue<CSSAbsoluteUnitValue>;
type CSSRadiusLocalFontValues = CSSRadiusValue<CSSLocalFontRelativeUnitValue>;
type CSSRadiusRootFontValues = CSSRadiusValue<CSSRootFontRelativeUnitValue>;
type CSSRadiusViewportValues = CSSRadiusValue<CSSViewportUnitValue>;
type CSSRadiusRespectValues = CSSRadiusValue<CSSRespectUnitValue>;
type CSSRadiusPercentageValues = CSSRadiusValue<CSSPercentageUnitValue>;
export type CSSRadiusValues =
  | CSSRadiusAbsoluteValues
  | CSSRadiusLocalFontValues
  | CSSRadiusRootFontValues
  | CSSRadiusViewportValues
  | CSSRadiusRespectValues
  | CSSRadiusPercentageValues
  | CSSGlobalValue
  | CSSVariableValue;
