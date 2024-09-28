import type { CSSXStyleDefinition, CSSXTypedStyle, CSSXReturnStyle, CustomHTMLType, ExtendedCSSProperties } from '../_internal';
import { create } from './method/create';
import { set } from './method/set';
import { global } from './method/global';
import { root } from './method/root';
import { union } from './method/union';

class cssx {
  static create<T extends CSSXStyleDefinition>(object: CSSXTypedStyle<T> | CSSXStyleDefinition): CSSXReturnStyle<T> {
    return create(object);
  }

  static set(object: ExtendedCSSProperties): string {
    return set(object);
  }

  static global(object: CustomHTMLType): void {
    return global(object);
  }

  static root(object: ExtendedCSSProperties): void {
    return root(object);
  }

  static union(...classes: Array<string | undefined | false>): string {
    return union(...classes);
  }
}

export default cssx;
export { union };
