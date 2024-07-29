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

type NotClass<T extends string> = `notClass${Capitalize<T>}${string}`;
type NotClassType = {
  [key in NotClass<string>]?: CustomCSSProperties;
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

export type HasEPE = `has${HtmlTags}Plus${HtmlTags | string}`;
type HasEPEType = {
  [key in HasEPE]?: CustomCSSProperties;
};

export type HasECE = `has${HtmlTags}Child${HtmlTags | string}`;
type HasECEType = {
  [key in HasECE]?: CustomCSSProperties;
};

type HasClass<T extends string> = `hasClass${Capitalize<T>}${string}`;
type HasClassType = {
  [key in HasClass<string>]?: CustomCSSProperties;
};

type HasClassChild<T extends string> = `hasClassChild${Capitalize<T>}${string}`;
type HasClassChildType = {
  [key in HasClassChild<string>]?: CustomCSSProperties;
};

type HasClassPlus<T extends string> = `hasClassPlus${Capitalize<T>}${string}`;
type HasClassPlusType = {
  [key in HasClassPlus<string>]?: CustomCSSProperties;
};

export type HasCPC = `hasClass${string}Plus${string | HtmlTags}`;
type HasCPCType = {
  [key in HasCPC]?: CustomCSSProperties;
};

export type HasCCC = `hasClass${string}Child${string | HtmlTags}`;
type HasCCCType = {
  [key in HasCCC]?: CustomCSSProperties;
};

export type ArgsPseudos =
  | HasCCCType
  | HasCPCType
  | HasClassPlusType
  | HasClassChildType
  | HasClassType
  | HasECEType
  | HasEPEType
  | HasPlusType
  | HasChildType
  | HasType
  | NotClassType
  | NotType
  | LanguagesType
  | CustomNthArgsType;

export type AndStrings = `&${string}`;
export type AndStringsType = {
  [key in AndStrings]: CustomCSSProperties;
};
