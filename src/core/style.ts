import type { ClassesObjectType, ReturnStyleType, CustomHTMLType, CustomCSSProperties, ExactClassesObjectType } from '../_internal';
import { create } from './method/create';
import { set } from './method/set';
import { global } from './method/global';
import { root } from './method/root';

export class Style {
  static create<T extends ClassesObjectType>(object: ExactClassesObjectType<T>): ReturnStyleType<T> {
    return create(object);
  }
  static set(object: CustomCSSProperties): string {
    return set(object);
  }
  static global(object: CustomHTMLType): void {
    return global(object);
  }
  static root(object: CustomCSSProperties): void {
    return root(object);
  }
}
