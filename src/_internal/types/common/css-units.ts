type AbsoluteCSSUnit = 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt';
type LocalFontRelativeCSSUnit = 'cap' | 'ch' | 'em' | 'ex' | 'ic' | 'lh';
type RootFontRelativeCSSUnit = 'rcap' | 'rch' | 'rem' | 'rex' | 'ric' | 'rlh';
type ViewportCSSUnit = 'vh' | 'vw' | 'vmin' | 'vmax' | 'vb' | 'vi';
type RespectCSSUnit = 'svw' | 'svh' | 'lvw' | 'lvh' | 'dvw' | 'dvh';
type PercentageCSSUnit = '%';

export type CSSAbsoluteUnitValue = '0' | `${number}${AbsoluteCSSUnit}`;
export type CSSLocalFontRelativeUnitValue = '0' | `${number}${LocalFontRelativeCSSUnit}`;
export type CSSRootFontRelativeUnitValue = '0' | `${number}${RootFontRelativeCSSUnit}`;
export type CSSViewportUnitValue = '0' | `${number}${ViewportCSSUnit}`;
export type CSSRespectUnitValue = '0' | `${number}${RespectCSSUnit}`;
export type CSSPercentageUnitValue = '0' | `${number}${PercentageCSSUnit}`;
