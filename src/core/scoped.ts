import type { ClassesObjectType, ReturnStyleType, HTMLType, CustomCSSProperties, ExactClassesObjectType } from '../_internal';
import { sheet } from './method/sheet';
import { style } from './method/style';
import { global } from './method/global';
import { root } from './method/root';

export class Scoped {
  static sheet<T extends ClassesObjectType>(object: ExactClassesObjectType<T> | ClassesObjectType): ReturnStyleType<T> {
    return sheet(object);
  }
  static style(object: CustomCSSProperties): string {
    return style(object);
  }
  static global(object: HTMLType): void {
    return global(object);
  }
  static root(object: CustomCSSProperties): void {
    return root(object);
  }
}
