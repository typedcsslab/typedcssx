import type { ClassesObjectType, HasEPE, HasECE, HasCPC, HasCCC } from '..';
import htmlTags from './html-tags';
import * as path from 'path';

export const isWindowDefined = typeof window !== 'undefined';
export const isDocumentDefined = typeof document !== 'undefined';
export const isInDevelopment = process.env.NODE_ENV === 'development';

const exception = ['line-height', 'font-weight', 'opacity', 'scale', 'z-index'];

export const applyCssValue = (value: string | number, cssProp: string): string => {
  if (typeof value === 'number') {
    return exception.includes(cssProp) ? value.toString() : value + 'px';
  }
  return value;
};

export const isClassesObjectType = (object: object): object is ClassesObjectType => {
  return typeof object === 'object' && !Array.isArray(object);
};

export const toPascalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const pascalCaseHtmlTags = htmlTags.map((code) => toPascalCase(code));

const isHasEPEType = (property: string): property is HasEPE => {
  const regex = new RegExp(`^has(${pascalCaseHtmlTags.join('|')})Plus(${pascalCaseHtmlTags.join('|')})?(.*?)$`);
  return regex.test(property);
};
const isHasECEType = (property: string): property is HasECE => {
  const regex = new RegExp(`^has(${pascalCaseHtmlTags.join('|')})Child(${pascalCaseHtmlTags.join('|')})?(.*?)$`);
  return regex.test(property);
};

function isHasCPCTypeKey(key: string): key is HasCPC {
  const regex = /^hasClass.*Plus.*$/;
  return regex.test(key);
}

function isHasCPCType(property: string): property is HasCPC {
  return isHasCPCTypeKey(property);
}

function isHasCCCTypeKey(key: string): key is HasCPC {
  const regex = /^hasClass.*Child.*$/;
  return regex.test(key);
}

function isHasCCCType(property: string): property is HasCCC {
  return isHasCCCTypeKey(property);
}

const dir = (direname: string, relativePath: string) => {
  return path.join(direname, relativePath);
};

export const get = {
  dir,
};

export const camelToKebabCase = (property: string) => {
  const toKebabCase = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

  if (property.startsWith('hasClassChild')) {
    const afterProp = property.slice('hasClassChild'.length);
    const afterNotKebab = afterProp.replace(/_/g, '-').toLowerCase();
    return `:has(> .${afterNotKebab})`;
  }

  if (property.startsWith('hasClassPlus')) {
    const afterProp = property.slice('hasClassPlus'.length);
    const afterNotKebab = afterProp.replace(/_/g, '-').toLowerCase();
    return `:has(+ .${afterNotKebab})`;
  }

  if (isHasCCCType(property)) {
    const regex = /^hasClass(.*?)Child(.*?)$/;
    const matches = property.match(regex);
    if (matches) {
      const [, class1, class2] = matches;
      return `:has(.${class1.replace(/_/g, '-').toLowerCase()} > ${
        pascalCaseHtmlTags.includes(class2) ? class2.toLowerCase() : '.' + class2.replace(/_/g, '-').toLowerCase()
      })`;
    }
  }

  if (isHasCPCType(property)) {
    const regex = /^hasClass(.*?)Plus(.*?)$/;
    const matches = property.match(regex);
    if (matches) {
      const [, class1, class2] = matches;
      return `:has(.${class1.replace(/_/g, '-').toLowerCase()} + ${
        pascalCaseHtmlTags.includes(class2) ? class2.toLowerCase() : '.' + class2.replace(/_/g, '-').toLowerCase()
      })`;
    }
  }

  if (isHasECEType(property)) {
    const regex = /^has(.*?)Child(.*?)$/;
    const matches = property.match(regex);
    if (matches) {
      const [, tag1, tag2] = matches;
      return `:has(${tag1.toLowerCase()} > ${pascalCaseHtmlTags.includes(tag2) ? tag2.toLowerCase() : '.' + tag2.replace(/_/g, '-').toLowerCase()})`;
    }
  }

  if (isHasEPEType(property)) {
    const regex = /^has(.*?)Plus(.*?)$/;
    const matches = property.match(regex);
    if (matches) {
      const [, tag1, tag2] = matches;
      return `:has(${tag1.toLowerCase()} + ${pascalCaseHtmlTags.includes(tag2) ? tag2.toLowerCase() : '.' + tag2.replace(/_/g, '-').toLowerCase()})`;
    }
  }

  const pseudoCamelPropWithArgs = [
    'nthChild',
    'nthLastChild',
    'nthLastOfType',
    'nthOfType',
    'lang',
    'notClass',
    'not',
    'hasClass',
    'hasChild',
    'hasPlus',
    'has',
  ];

  for (const prop of pseudoCamelPropWithArgs) {
    const index = property.indexOf(prop);
    if (index !== -1) {
      const afterProp = property.slice(index + prop.length);
      const afterNotKebab = afterProp.replace(/_/g, '-').toLowerCase();

      if (prop === 'notClass') {
        return `:not(.${afterNotKebab})`;
      }

      if (prop === 'not') {
        if (property.includes('not(')) {
          return `:not${afterProp.toLowerCase()}`;
        } else {
          return `:not(${afterProp.toLowerCase()})`;
        }
      }

      if (prop === 'hasClass') {
        return `:has(.${afterNotKebab})`;
      }

      if (prop === 'hasChild') {
        return `:has(> ${afterProp.toLowerCase()})`;
      }

      if (prop === 'hasPlus') {
        return `:has(+ ${afterProp.toLowerCase()})`;
      }

      if (prop === 'has') {
        if (property.includes('has(')) {
          return `:has${afterProp.toLowerCase()}`;
        } else {
          return `:has(${afterProp.toLowerCase()})`;
        }
      }

      return `${toKebabCase(prop)}${afterProp && `(${afterProp.toLowerCase()})`}`;
    }
  }

  return toKebabCase(property);
};
