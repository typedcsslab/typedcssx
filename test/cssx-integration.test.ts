import cssx from '../src/core/cssx';

test('cssx.create returns an object with string values', () => {
  const styles = cssx.create({ test: { color: 'aqua' } });
  expect(typeof styles).toBe('object');
  expect(typeof styles.test).toBe('string');
});

test('cssx.set returns a string', () => {
  const style = cssx.set({ color: 'aqua' });
  expect(typeof style).toBe('string');
});

test('cssx.global returns undefined', () => {
  const result = cssx.global({});
  expect(result).toBeUndefined();
});

test('cssx.root returns undefined', () => {
  const result = cssx.root({});
  expect(result).toBeUndefined();
});

test('cssx.union returns a string', () => {
  const result = cssx.union('test', '', false, undefined);
  expect(result).toBe('test');
});
