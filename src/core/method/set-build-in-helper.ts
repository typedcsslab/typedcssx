import { buildIn, isDevelopment } from '../../_internal';

let resolveGlobalStyleSheet: (value: string) => void;
let globalStyleSheetPromise: Promise<string>;
const styleSheetQueue: [string][] = [];
let isProcessing = false;

function createGlobalStyleSheetPromise() {
  globalStyleSheetPromise = new Promise<string>(resolve => {
    resolveGlobalStyleSheet = (value: string) => {
      styleSheetQueue.push([value]);
      resolve(value);
    };
  });
}

function processStyleSheets() {
  while (styleSheetQueue.length > 0) {
    const [styleSheet] = styleSheetQueue.shift() as [string];
    if (!isDevelopment && styleSheet) buildIn(styleSheet);
  }
  isProcessing = false;
}

export async function setBuildIn(): Promise<void> {
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  if (!isProcessing && styleSheetQueue.length > 0) {
    isProcessing = true;
    processStyleSheets();
  }
}

export { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise };
