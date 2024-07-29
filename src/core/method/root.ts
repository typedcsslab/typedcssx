import type { ExtendedCSSProperties } from '../../_internal';
import { isInDevelopment, injectCSSGlobal, styleCompiler } from '../../_internal';
import { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise } from './root-build-in-helper';

export function root(object: ExtendedCSSProperties): void {
  const { styleSheet } = styleCompiler(object, undefined, '--root');
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  resolveGlobalStyleSheet([styleSheet, '--global']);

  if (isInDevelopment) injectCSSGlobal(styleSheet, 'root');
}
