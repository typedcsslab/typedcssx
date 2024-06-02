import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, buildIn, injectCSSGlobal, cssCodeGenStyle } from '../../_internal';

let resolveGlobalStyleSheet: (value: string) => void;
let globalStyleSheetPromise: Promise<string>;

function createNewGlobalStyleSheetPromise() {
  globalStyleSheetPromise = new Promise<string>((resolve) => {
    resolveGlobalStyleSheet = resolve;
  });
}

function applyGlobalBuildIn(): void {
  if (typeof globalStyleSheetPromise === 'undefined') createNewGlobalStyleSheetPromise();

  globalStyleSheetPromise.then((styleSheet) => {
    if (!isInDevelopment && styleSheet) {
      buildIn(styleSheet);
    }
    createNewGlobalStyleSheetPromise();
  });
}

export function root(object: CustomCSSProperties): void {
  const { styleSheet } = cssCodeGenStyle(object, '--root');

  resolveGlobalStyleSheet(styleSheet);
  if (isInDevelopment) injectCSSGlobal(styleSheet, 'root');
}

applyGlobalBuildIn();
