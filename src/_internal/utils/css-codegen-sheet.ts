import { genBase62Hash, pseudo, camelToKebabCase } from '..';
import type { PropertyType, SerializeType, ClassesObjectType, CustomCSSProperties } from '../types';

export function cssCodeGenSheet(object: ClassesObjectType, core?: string) {
  const base62Hash = genBase62Hash(object, 5);

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

  const stringConverter = (className: string, properties: PropertyType | CustomCSSProperties, indentLevel = 0): SerializeType => {
    const classSelector: SerializeType = {};
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
          const applyValue = typeof value === 'number' ? value + 'px' : value;
          cssRule += `${bigIndent ? '    ' : '  '}${CSSProp}: ${applyValue};\n`;
        } else if (isPseudoOrMediaClass) {
          if (isClassInc) colon = ':';
          if (isElementInc) colon = '::';
          const kebabPseudoClass = camelToKebabCase(property);
          const styles = stringConverter(className + colon + kebabPseudoClass, value, indentLevel + 1);
          Object.assign(classSelector, styles);
        } else if (property.startsWith('@media')) {
          const mediaRule = property;
          let nestedRules = '';
          let containsPseudo = false;

          for (const mediaProp in value as PropertyType) {
            if (Object.prototype.hasOwnProperty.call(value, mediaProp)) {
              const mediaValue = value[mediaProp as keyof PropertyType] as PropertyType;
              const mediaClassIndex = pseudo.classes.indexOf(mediaProp);
              const isMediaClassInc = pseudo.classes.includes(mediaProp);
              const isMediaElementInc = pseudo.elements.includes(mediaProp);
              if (mediaProp.startsWith('not') || mediaProp.startsWith('lang') ? mediaClassIndex : isMediaClassInc || isMediaElementInc) {
                containsPseudo = true;
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
                nestedRules += rules(innerIndent + '  ', value, mediaProp);
              }
            }
          }

          if (containsPseudo) {
            mediaQueries[mediaRule] = (mediaQueries[mediaRule] || '') + `\n${mediaRule} {\n${nestedRules}${indent}}\n`;
          } else {
            mediaQueries[mediaRule] =
              (mediaQueries[mediaRule] || '') + `\n${mediaRule} {\n${innerIndent}${className} {\n${nestedRules}${innerIndent}}\n${indent}}\n`;
          }
        }
      }
    }

    classSelector[className] = cssRule;
    return classSelector;
  };

  const isClassesObjectType = (object: any): object is ClassesObjectType => {
    return typeof object === 'object' && !Array.isArray(object);
  };

  const createStyles = (styleObject: CustomCSSProperties | ClassesObjectType, classNamePrefix = '', indentLevel = 0): string => {
    let styleSheet = '';

    const processStyles = (styles: PropertyType | CustomCSSProperties | ClassesObjectType, prefix = '', currentIndentLevel = 0): void => {
      const indent = '  '.repeat(currentIndentLevel);
      for (const property in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, property)) {
          const value = (styles as PropertyType)[property];
          if (isClassesObjectType(value)) {
            if (property.startsWith('@media')) {
              bigIndent = true;
              const mediaStyles = createStyles(value, prefix, currentIndentLevel + 1);
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

    processStyles(styleObject, classNamePrefix, indentLevel);
    return styleSheet;
  };

  styleSheet = createStyles(object);

  for (const media in mediaQueries) {
    if (Object.prototype.hasOwnProperty.call(mediaQueries, media)) {
      styleSheet += mediaQueries[media];
    }
  }

  return { styleSheet, base62Hash };
}
