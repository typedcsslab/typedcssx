import { buildIn, isInDevelopment } from '../../_internal';

let resolveGlobalStyleSheet: (value: string) => void;
let globalStyleSheetPromise: Promise<string>;
const styleSheetQueue: [string][] = [];
let isProcessing = false;

function createGlobalStyleSheetPromise() {
  globalStyleSheetPromise = new Promise<string>((resolve) => {
    resolveGlobalStyleSheet = (value: string) => {
      styleSheetQueue.push([value]);
      resolve(value);
    };
  });
}

async function executeBuildIn(styleSheet: string): Promise<void> {
  if (!isInDevelopment && styleSheet) buildIn(styleSheet);
}

async function processStyleSheets() {
  while (styleSheetQueue.length > 0) {
    const [styleSheet] = styleSheetQueue.shift() as [string];
    await executeBuildIn(styleSheet);
  }
  isProcessing = false;
}

export function styleBuildIn(): void {
  if (!isProcessing && styleSheetQueue.length > 0) {
    isProcessing = true;
    processStyleSheets();
  }
}

export { resolveGlobalStyleSheet, globalStyleSheetPromise, createGlobalStyleSheetPromise };
