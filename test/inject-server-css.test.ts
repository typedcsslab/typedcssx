import { getServerCSS } from '../src/_internal/utils/inject-server-css';

test('returns null when isDevServer is false', () => {
  // Assuming isDevServer is set to false in this test environment
  // running the case where isDevServer is true in e2e testing.
  const injectedCSS = getServerCSS();
  expect(injectedCSS).toBeNull();
});
