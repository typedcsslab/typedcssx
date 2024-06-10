import { camelToKebabCase, pseudo } from '..';
import type { CustomCSSProperties, PropertyType } from '..';

export function cssCodeGenStyle<T extends CustomCSSProperties>(object: T, base62Hash?: string, root?: string) {
  const classNameType = () => {
    if (root === '--root') return ':root';
    else return '._' + base62Hash;
  };
  let bigIndent = false;

  const stringConverter = (className: string, properties: CustomCSSProperties, indentLevel = 0): { mainRules: string; pseudoRules: string; media: string } => {
    let mainRules = '';
    let pseudoRules = '';
    let mediaQueries = '';

    const indent = '  '.repeat(indentLevel);

    for (const property in properties) {
      const value = (properties as unknown as PropertyType)[property];

      if (pseudo.classes.includes(property) || pseudo.elements.includes(property) || property.includes('&')) {
        const CSSProp = camelToKebabCase(property.replace('&', ''));
        const pseudoSelector = property.includes('&') ? `${CSSProp}` : pseudo.classes.includes(property) ? `:${CSSProp}` : `::${CSSProp}`;
        const pseudoRuleSet = stringConverter(className + pseudoSelector, value as never, indentLevel + 1);
        pseudoRules += `${indent}${className}${pseudoSelector} {\n${pseudoRuleSet.mainRules}${pseudoRuleSet.pseudoRules}${indent}}\n`;
        mediaQueries += pseudoRuleSet.media;
      } else if (property.startsWith('@media')) {
        bigIndent = true;
        const mediaRule = stringConverter(className, value as never, indentLevel + 1);
        const mainRule = mediaRule.mainRules ? `{\n  ${className} {\n${mediaRule.mainRules}  }` : '{';
        mediaQueries += `\n${property} ${mainRule}\n${mediaRule.pseudoRules}${mediaRule.media}}\n`;
        bigIndent = false;
      } else if (typeof value === 'string' || typeof value === 'number') {
        const CSSProp = camelToKebabCase(property);
        const applyValue =
          typeof value === 'number' && (CSSProp === 'line-height' || CSSProp === 'opacity' || CSSProp === 'scale')
            ? value
            : typeof value === 'number'
            ? value + 'px'
            : value;
        mainRules += `${bigIndent ? '    ' : '  '}${CSSProp}: ${applyValue};\n`;
      }
    }

    return { mainRules, pseudoRules, media: mediaQueries };
  };

  const className = classNameType();
  const { mainRules, pseudoRules, media } = stringConverter(className, object);

  let styleSheet = '';

  if (mainRules) {
    styleSheet += `\n${className} {\n${mainRules}}\n\n`;
  }

  if (pseudoRules) {
    styleSheet += pseudoRules;
  }

  if (media) {
    styleSheet += media;
  }

  return { styleSheet };
}
