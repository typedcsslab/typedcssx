import { root } from '../src/core/method/root';

test('Style.root insert style into the head with data-scope="root"', () => {
  root({
    '--color-heading': '#333',
  });

  const styleElements = document.head.querySelectorAll('style[data-scope="root"]');
  expect(styleElements.length).toBeGreaterThan(0);

  const styleContent = styleElements[0].textContent;
  expect(styleContent).toContain('--color-heading: #333');
});
