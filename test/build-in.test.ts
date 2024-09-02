import { buildIn, isServer } from '../src/_internal';
import { readFileSync, writeFileSync } from 'fs';

const filePath = '../src/core/styles/style.module.css';

test('buildIn should append styleSheet to style file and verify its content', () => {
  if (!isServer) return;
  const styleSheet = '.test-style { color: red; }';

  // Run the test
  buildIn(styleSheet);

  // Check the file contents
  const fileContent = readFileSync(filePath, 'utf-8');
  expect(fileContent).toContain(styleSheet);

  // Cleanup: Reset file contents after testing
  writeFileSync(filePath, '/*_*/', 'utf-8');
});
