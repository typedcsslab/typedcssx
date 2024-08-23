import { genBase62Hash, styleCompiler } from '../src/_internal';
import { max_lg } from '../src/core/media';

test('styleCompiler produces expected output', async () => {
  const object = {
    color: 'blue',
    margin: '10px',
    [max_lg]: {
      color: 'aqua',
      margin: '24px',
    },
  };

  const base62Hash = genBase62Hash(object, 5);
  const { styleSheet } = styleCompiler(object, base62Hash);

  expect(styleSheet).toContain('color: blue;');
  expect(styleSheet).toContain('margin: 10px');
  expect(styleSheet).toContain('@media (max-width: 1024px)');
  expect(styleSheet).toContain('color: aqua;');
  expect(styleSheet).toContain('margin: 24px');
});
