import { global } from '../src/core/method/global';

test('cssx.global insert style into the head with data-scope="global"', () => {
  global({
    h1: {
      fontSize: 24,
    },
  });

  const styleElements = document.head.querySelectorAll('style[data-scope="global"]');
  expect(styleElements.length).toBeGreaterThan(0);

  const styleContent = styleElements[0].textContent;
  expect(styleContent).toContain('h1');
  expect(styleContent).toContain('font-size: 24px');
});
