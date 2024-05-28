import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, buildIn, injectCSSGlobal, cssCodeGenStyle } from '../../_internal';

export function root(object: CustomCSSProperties): void {
  const { styleSheet } = cssCodeGenStyle(object, '--root');

  if (!isInDevelopment) buildIn(styleSheet, '--global');
  if (isInDevelopment) injectCSSGlobal(styleSheet, 'root');
}
