import { create } from '../src/core/method/create';

test('cssx.create returns an object with string values', () => {
  const styleObject = {
    test: {
      color: 'red',
      fontSize: '16px',
    },
  };

  const styles = create(styleObject);
  expect(typeof styles).toBe('object');
  expect(typeof styles.test).toBe('string');

  const styleElement = document.createElement('style');
  styleElement.textContent = `.${styles.test} { color: ${styleObject.test.color}; font-size: ${styleObject.test.fontSize}; }`;
  document.head.appendChild(styleElement);

  document.body.innerHTML = `<div class="${styles.test}">Test Element</div>`;
  const element = document.querySelector(`.${styles.test}`) as HTMLElement;
  const computedStyle = window.getComputedStyle(element);
  expect(computedStyle.color).toBe('red');
  expect(computedStyle.fontSize).toBe('16px');
});
