import { isWindowDefined, isDocumentDefined, isInDevelopment } from '../index';

const isServer = !isWindowDefined || !isDocumentDefined;
let styleElement: HTMLStyleElement;

function createStyleElement(scoped: string) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-scope', scoped);
  styleElement.setAttribute('type', 'text/css');
  document.head.appendChild(styleElement);

  return styleElement;
}

export function injectCSSGlobal(sheet: string, scoped: string) {
  if (isInDevelopment) console.log('💫 ' + scoped + ' executing ...' + sheet);
  if (isServer) return;
  if (styleElement == undefined) styleElement = createStyleElement(scoped);

  styleElement.textContent = sheet;
}
