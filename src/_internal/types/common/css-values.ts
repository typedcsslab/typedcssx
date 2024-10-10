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
export type CSSCalcExpressionFunction = `calc(${string} ${CSSArithmeticOperations} ${string})`;
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
  | CSSCalcExpressionFunction
  | CSSVariableValue
  | CSSGlobalValue;

export type CSSNumericValue = CSSUnitsAndGlobalValue | number;

type CSSUnitValue = `${number}${CSSUnit}` | '0' | 'auto';
type CSSMarginPaddingSizeValue<T extends CSSUnitValue> = `${T}` | `${T} ${T}` | `${T} ${T} ${string}` | `${T} ${T} ${string} ${string}`;
export type CSSEdgeSizeValue = CSSMarginPaddingSizeValue<CSSUnitValue> | number;

type CSSSizeValue<T extends string | number> = `${T}` | `${T} ${T}` | `${T} ${T} ${string}` | `${T} ${T} ${string} ${string}`;
type CustomRadiusValue<T extends CSSUnitValue> = `${T} ${T} / ${string} ${string}`;
type CSSRadiusValue<T extends CSSUnitValue> = CSSSizeValue<T> | CustomRadiusValue<T>;
type CSSRadiusSizeValue = CSSRadiusValue<CSSUnitValue>;
export type CSSRadiusValues = CSSRadiusSizeValue | CSSGlobalValue | CSSVariableValue;
