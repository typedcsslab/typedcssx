import path from 'path';
import htmltags from './htmltags';

export const isWindowDefined = typeof window !== 'undefined';
export const isDocumentDefined = typeof document !== 'undefined';
export const isInDevelopment = process.env.NODE_ENV === 'development';

const dir = (direname: string, relativePath: string) => {
  return path.join(direname, relativePath);
};

export const get = {
  dir,
};

export const toPascalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const camelToKebabCase = (property: string) => {
  const pseudoCamelPropWithArgs = ['nthChild', 'nthLastChild', 'nthLastOfType', 'nthOfType', 'lang', 'not'];

  const toKebabCase = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

  for (const prop of pseudoCamelPropWithArgs) {
    const index = property.indexOf(prop);
    if (index !== -1) {
      const afterProp = property.slice(index + prop.length);

      if (prop === 'not') {
        const afterNot = afterProp.charAt(0).toUpperCase() + afterProp.slice(1).toLowerCase();
        const afterNotKebab = afterProp.replace(/_/g, '-').toLowerCase();
        if (!htmltags.includes(afterNot)) {
          return `:not(.${afterNotKebab})`;
        }
      }

      return `${toKebabCase(prop)}${afterProp && `(${afterProp.toLowerCase()})`}`;
    }
  }

  return toKebabCase(property);
};
