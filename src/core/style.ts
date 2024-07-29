import type { ClassesObjectType, ExactClassesObjectType, ReturnStyleType, CustomHTMLType, ExtendedCSSProperties } from '../_internal';
import { create } from './method/create';
import { set } from './method/set';
import { global } from './method/global';
import { root } from './method/root';

class Style {
  static create<T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType): ReturnStyleType<T> {
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
}

export default Style;
