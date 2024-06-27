import { pseudo, camelToKebabCase, isClassesObjectType, exception } from '..';
import type { PropertyType, ClassesObjectType, CustomCSSProperties, CustomHTMLType } from '..';

export function sheetCompiler(object: ClassesObjectType | CustomHTMLType, base62Hash?: string, core?: string) {
  let styleSheet = '';
  let bigIndent = false;
  const mediaQueries: Record<string, string> = {};

  const classNameType = (property: string) => {
    if (core === '--global') return property;
    else return '.' + property + '_' + base62Hash;
  };

  const rules = (indent: string, rulesValue: unknown, property: unknown) => {
    if (typeof property !== 'string') return '';
    const value = (rulesValue as Record<string, unknown>)[property];
    const cssProp = camelToKebabCase(property);
    return indent + cssProp + ': ' + value + ';\n';
  };

  const selector = (className: string, property: string, rule: string, indent = '  ') => {
    return `${indent}${className}${property} {\n${rule}${indent}}\n`;
  };

  const stringConverter = (className: string, properties: PropertyType | CustomCSSProperties, indentLevel = 0): PropertyType => {
    const classSelector: PropertyType = {};
    const indent = '  '.repeat(indentLevel);
    const innerIndent = '  '.repeat(indentLevel + 1);
    let cssRule = '';

    for (const property in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, property)) {
        const value = (properties as PropertyType)[property];
        const isClassInc = pseudo.classes.includes(property);
        const isElementInc = pseudo.elements.includes(property);
        const classIndex = pseudo.classes.indexOf(property);
        const elementIndex = pseudo.elements.indexOf(property);
        const isPseudoOrMediaClass = property.startsWith('@') ? isClassInc || isElementInc : classIndex || elementIndex;
        let colon = '';

        if (typeof value === 'string' || typeof value === 'number') {
          const CSSProp = camelToKebabCase(property);
          const applyValue = typeof value === 'number' && exception.includes(CSSProp) ? value : typeof value === 'number' ? value + 'px' : value;
          cssRule += `${bigIndent ? '    ' : '  '}${CSSProp}: ${applyValue};\n`;
        } else if (isPseudoOrMediaClass) {
          if (isClassInc) colon = ':';
          if (isElementInc) colon = '::';
          const kebabPseudoClass = camelToKebabCase(property.replace('&', ''));
          const styles = stringConverter(className + colon + kebabPseudoClass, value, indentLevel + 1);
          Object.assign(classSelector, styles);
        } else if (property.startsWith('@media')) {
          const mediaRule = property;
          let nestedRules = '';
          let regularRules = '';

          for (const mediaProp in value as PropertyType) {
            if (Object.prototype.hasOwnProperty.call(value, mediaProp)) {
              const mediaValue = value[mediaProp] as PropertyType;
              const mediaClassIndex = pseudo.classes.indexOf(mediaProp);
              const isMediaClassInc = pseudo.classes.includes(mediaProp);
              const isMediaElementInc = pseudo.elements.includes(mediaProp);
              if (mediaProp.startsWith('not') || mediaProp.startsWith('lang') ? mediaClassIndex : isMediaClassInc || isMediaElementInc) {
                if (isMediaClassInc) colon = ':';
                if (isMediaElementInc) colon = '::';
                const kebabMediaProp = camelToKebabCase(mediaProp);
                let pseudoClassRule = '';
                for (const pseudoProp in mediaValue) {
                  if (Object.prototype.hasOwnProperty.call(mediaValue, pseudoProp)) {
                    pseudoClassRule += rules(innerIndent + '  ', mediaValue, pseudoProp);
                  }
                }
                nestedRules += selector(indent + className, colon + kebabMediaProp, pseudoClassRule, innerIndent);
              } else {
                const CSSProp = camelToKebabCase(mediaProp);
                const applyValue =
                  typeof mediaValue === 'number' && exception.includes(CSSProp) ? mediaValue : typeof mediaValue === 'number' ? mediaValue + 'px' : mediaValue;
                regularRules += rules(innerIndent + '  ', { [mediaProp]: applyValue }, mediaProp);
              }
            }
          }
          if (regularRules) {
            mediaQueries[mediaRule] =
              (mediaQueries[mediaRule] || '') + `\n${mediaRule} {\n${indent}  ${className} {\n${regularRules}  }\n${nestedRules}${indent}}\n${indent}\n`;
          } else {
            mediaQueries[mediaRule] = (mediaQueries[mediaRule] || '') + `\n${mediaRule} {\n${nestedRules}${indent}}\n`;
          }
        }
      }
    }

    classSelector[className] = cssRule;
    return classSelector;
  };

  const createStyles = (styleObject: PropertyType | CustomCSSProperties | ClassesObjectType, indentLevel = 0): string => {
    let styleSheet = '';

    const processStyles = (styles: PropertyType | CustomCSSProperties | ClassesObjectType, currentIndentLevel = 0): void => {
      const indent = '  '.repeat(currentIndentLevel);
      for (const property in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, property)) {
          const value = (styles as PropertyType)[property] as unknown as PropertyType;
          if (isClassesObjectType(value)) {
            if (property.startsWith('@media')) {
              bigIndent = true;
              const mediaStyles = createStyles(value, currentIndentLevel + 1);
              styleSheet += `\n${indent}${property} {${mediaStyles}${indent}}\n`;
              bigIndent = false;
            } else {
              const classSelectors = stringConverter(classNameType(property), value, currentIndentLevel);
              for (const selector in classSelectors) {
                if (Object.prototype.hasOwnProperty.call(classSelectors, selector) && classSelectors[selector] !== '') {
                  styleSheet += `\n${indent}${selector} {\n${classSelectors[selector]}${indent}}\n`;
                }
              }
            }
          }
        }
      }
    };

    processStyles(styleObject, indentLevel);
    return styleSheet;
  };

  styleSheet = createStyles(object);

  for (const media in mediaQueries) {
    if (Object.prototype.hasOwnProperty.call(mediaQueries, media)) {
      styleSheet += mediaQueries[media];
    }
  }

  return { styleSheet };
}
