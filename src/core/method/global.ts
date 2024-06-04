import type { HTMLType } from '../../_internal';
import { isInDevelopment, injectCSSGlobal, cssCodeGenSheet } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './global-build-in-helper';

export function global(object: HTMLType): void {
  const { styleSheet } = cssCodeGenSheet(object, '--global');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']);

  if (isInDevelopment) injectCSSGlobal(styleSheet, 'global');
}
