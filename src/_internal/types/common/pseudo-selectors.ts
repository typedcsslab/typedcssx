import type { HtmlTags } from '../../utils/html-tags';
import type { LanguageCodes } from '../../utils/language-codes';
import type { CustomCSSProperties } from '../custom/custom-css-properties';
import type { CustomNthArgsType } from './nth-selectors';

type Langs = `lang${LanguageCodes}`;
type LanguagesType = {
  [key in Langs]?: CustomCSSProperties;
};

type Not = `not${HtmlTags}`;
type NotType = {
  [key in Not]?: CustomCSSProperties;
};

type Has = `has${HtmlTags}`;
type HasType = {
  [key in Has]?: CustomCSSProperties;
};

type HasChild = `hasChild${HtmlTags}`;
type HasChildType = {
  [key in HasChild]?: CustomCSSProperties;
};

type HasPlus = `hasPlus${HtmlTags}`;
type HasPlusType = {
  [key in HasPlus]?: CustomCSSProperties;
};

export type HasEPE = `has${HtmlTags | string}Plus${HtmlTags | string}`;
type HasEPEType = {
  [key in HasEPE]?: CustomCSSProperties;
};

export type HasECE = `has${HtmlTags | string}Child${HtmlTags | string}`;
type HasECEType = {
  [key in HasECE]?: CustomCSSProperties;
};

export type ArgsPseudos = HasECEType | HasEPEType | HasPlusType | HasChildType | HasType | NotType | LanguagesType | CustomNthArgsType;

export type AndStrings = `&${string}`;
export type AndStringsType = {
  [key in AndStrings]: CustomCSSProperties;
};
