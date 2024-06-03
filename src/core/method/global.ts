import type { HTMLType } from '../../_internal';
import { isInDevelopment, buildIn, cssCodeGenSheet, injectCSSGlobal } from '../../_internal';

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
      buildIn(styleSheet, '--global');
    }
    createNewGlobalStyleSheetPromise();
  });
}

export function globalBuildIn() {
  applyGlobalBuildIn();
}

export function global(object: HTMLType): void {
  const { styleSheet } = cssCodeGenSheet(object, '--global');
  resolveGlobalStyleSheet(styleSheet);

  if (isInDevelopment) injectCSSGlobal(styleSheet, 'global');
}
