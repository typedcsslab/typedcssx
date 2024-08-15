import { genBase62Hash, sheetCompiler } from '../src/_internal';
import { max_lg } from '../src/core';

test('sheetCompiler produces expected output', async () => {
  const object = {
    e2e: {
      color: 'pink',
      [max_lg]: {
        color: 'aqua',
      },
    },
  };

  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = sheetCompiler(object, base62Hash);

  expect(styleSheet).toContain('.e2e_');
  expect(styleSheet).toContain('color: pink;');
  expect(styleSheet).toContain('@media (max-width: 1024px)');
  expect(styleSheet).toContain('color: aqua;');
});
