import { buildIn, isDevelopment } from '../../_internal';

let resolveGlobalStyleSheet: (value: [string, string?]) => void;
let globalStyleSheetPromise: Promise<[string, string?]>;
const styleSheetQueue: [string, string?][] = [];
let isProcessing = false;

function createGlobalStyleSheetPromise() {
  globalStyleSheetPromise = new Promise<[string, string?]>(resolve => {
    resolveGlobalStyleSheet = (value: [string, string?]) => {
      styleSheetQueue.push(value);
      resolve(value);
    };
  });
}

async function processStyleSheets() {
  while (styleSheetQueue.length > 0) {
    const [styleSheet, option] = styleSheetQueue.shift() as [string, string?];
    if (!isDevelopment && styleSheet) await buildIn(styleSheet, option);
  }
  isProcessing = false;
}

export async function globalBuildIn(): Promise<void> {
  if (typeof globalStyleSheetPromise === 'undefined') createGlobalStyleSheetPromise();
  if (!isProcessing && styleSheetQueue.length > 0) {
    isProcessing = true;
    processStyleSheets();
  }
}

export { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise };
