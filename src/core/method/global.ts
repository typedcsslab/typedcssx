import type { HTMLType } from '../../_internal';
import { isInDevelopment, buildIn, cssCodeGenSheet, injectCSSGlobal } from '../../_internal';

export function global(object: HTMLType): void {
  const { styleSheet } = cssCodeGenSheet(object, '--global');

  if (!isInDevelopment) buildIn(styleSheet, '--global');
  if (isInDevelopment) injectCSSGlobal(styleSheet, 'global');
}
