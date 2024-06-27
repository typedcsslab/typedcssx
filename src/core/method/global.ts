import type { CustomHTMLType } from '../../_internal';
import { isInDevelopment, injectCSSGlobal, sheetCompiler } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './global-build-in-helper';

export function global(object: CustomHTMLType): void {
  const { styleSheet } = sheetCompiler(object, undefined, '--global');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']);

  if (isInDevelopment) injectCSSGlobal(styleSheet, 'global');
}
