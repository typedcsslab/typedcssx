import { isServer, isDevelopment } from '..';

let styleElement: HTMLStyleElement;

function createStyleElement(scoped: string) {
  const existingStyleElement = document.querySelector(`[data-scope="${scoped}"]`);
  if (existingStyleElement) {
    existingStyleElement.remove();
  }

  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-scope', scoped);
  styleElement.setAttribute('type', 'text/css');
  document.head.appendChild(styleElement);

  return styleElement;
}

export function injectClientGlobalCSS(sheet: string, scoped: string) {
  if (isDevelopment) console.log('💫 ' + scoped + ' executing ...' + sheet);
  if (isServer) return;

  styleElement = createStyleElement(scoped);
  styleElement.textContent = sheet;
}
