import type {
  CSSAbsoluteUnitValue,
  CSSLocalFontRelativeUnitValue,
  CSSPercentageUnitValue,
  CSSRespectUnitValue,
  CSSRootFontRelativeUnitValue,
  CSSViewportUnitValue,
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
export type CSSMarginEdgeSizeValues =
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
export type CSSPaddingEdgeSizeValues =
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
export type CSSRadiusValues =
  | CSSRadiusAbsoluteValues
  | CSSRadiusRelativeValues
  | CSSRadiusViewportValues
  | CSSRadiusRespectValues
  | CSSRadiusPercentageValues
  | CSSGlobalValue
  | CSSVariableValue
  | number;
