import { set } from '../src/core/method/set';

test('cssx.set creates a class with correct styles', () => {
  const styleObject = {
    color: 'blue',
    margin: '10px',
  };

  const style = set(styleObject);
  expect(typeof style).toBe('string');

  const styleElement = document.createElement('style');
  styleElement.textContent = `.${style} { color: ${styleObject.color}; margin: ${styleObject.margin}; }`;
  document.head.appendChild(styleElement);

  document.body.innerHTML = `<div class="${style}">Test Element</div>`;
  const element = document.querySelector(`.${style}`) as HTMLElement;
  const computedStyle = window.getComputedStyle(element);
  expect(computedStyle.color).toBe('blue');
  expect(computedStyle.margin).toBe('10px');
});
