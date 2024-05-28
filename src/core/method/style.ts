import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, buildIn, injectCSS, cssCodeGenStyle } from '../../_internal';
import module from '../styles/style.module.css';

export function style(object: CustomCSSProperties): string {
  const { styleSheet, base62Hash } = cssCodeGenStyle(object);
  const className = '_' + base62Hash;

  if (!isInDevelopment) buildIn(styleSheet);

  function returnFunction() {
    if (isInDevelopment) injectCSS(className, styleSheet, 'style');
    return isInDevelopment ? className : module[className];
  }

  return returnFunction();
}
