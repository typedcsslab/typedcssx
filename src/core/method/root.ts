import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, injectCSSGlobal, cssCodeGenStyle } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './root-build-in-helper';

export function root(object: CustomCSSProperties): void {
  const { styleSheet } = cssCodeGenStyle(object, undefined, '--root');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']);

  if (isInDevelopment) injectCSSGlobal(styleSheet, 'root');
}
