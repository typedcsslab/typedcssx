import htmltags from './html-tags';
import languageCodes from './language-codes';
import { toPascalCase } from './helper';

const pascalCaseLanguageCodes = languageCodes.map((code) => toPascalCase(code));

const classes = [
  'active',
  'hover',
  'link',
  'visited',
  ...Array.from(pascalCaseLanguageCodes, (code) => `lang${code}`),
  'empty',
  ...Array.from(htmltags, (tag) => `not${tag}`),
  ...Array.from(htmltags, (tag) => `has${tag}`),
  'firstChild',
  'lastChild',
  'firstOfType',
  'lastOfType',
  'nthChildOdd',
  'nthChildEven',
  ...Array.from({ length: 1000 }, (_, i) => `nthChild${i + 1}`),
  'nthLastChildOdd',
  'nthLastChildEven',
  ...Array.from({ length: 1000 }, (_, i) => `nthLastChild${i + 1}`),
  'nthLastOfTypeOdd',
  'nthLastOfTypeEven',
  ...Array.from({ length: 1000 }, (_, i) => `nthLastOfType${i + 1}`),
  'nthOfTypeOdd',
  'nthOfTypeEven',
  ...Array.from({ length: 1000 }, (_, i) => `nthOfType${i + 1}`),
  'onlyOfType',
  'onlyChild',
  'checked',
  'disabled',
  'enabled',
  'focus',
  'inRange',
  'invalid',
  'valid',
  'optional',
  'outOfRange',
  'readOnly',
  'readWrite',
  'required',
  'target',
];
const elements = ['after', 'before', 'firstLetter', 'firstLine', 'marker', 'selection'];
export const pseudo = {
  classes,
  elements,
};
