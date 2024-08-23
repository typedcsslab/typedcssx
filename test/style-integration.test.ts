import Style from '../src/core/style';

test('Style.create returns an object with string values', () => {
  const styles = Style.create({ test: { color: 'aqua' } });
  expect(typeof styles).toBe('object');
  expect(typeof styles.test).toBe('string');
});

test('Style.set returns a string', () => {
  const style = Style.set({ color: 'aqua' });
  expect(typeof style).toBe('string');
});

test('Style.global returns undefined', () => {
  const result = Style.global({});
  expect(result).toBeUndefined();
});

test('Style.root returns undefined', () => {
  const result = Style.root({});
  expect(result).toBeUndefined();
});
