import { globalStyleSheetPromise } from '../src/core/method/set-build-in-helper';
import { set } from '../src/core/method/set';

test('set function should create globalStyleSheetPromise and add styles to it', () => {
  expect(globalStyleSheetPromise).toBeUndefined();
  set({ color: 'red' });
  expect(globalStyleSheetPromise).toBeDefined();
  expect(globalStyleSheetPromise).resolves.toContain('color: red');
});
