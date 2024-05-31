import type { HTMLType } from '../../_internal';
import { isInDevelopment, buildIn, cssCodeGenSheet, injectCSSGlobal } from '../../_internal';

let resolveGlobalStyleSheet: (value: string) => void;
const globalStyleSheetPromise = new Promise<string>((resolve) => {
  resolveGlobalStyleSheet = resolve;
});

export function applyGlobalBuildIn(): void {
  globalStyleSheetPromise.then((styleSheet) => {
    if (!isInDevelopment && styleSheet) {
      buildIn(styleSheet, '--global');
    }
  });
}

export function global(object: HTMLType): void {
  const { styleSheet } = cssCodeGenSheet(object, '--global');

  resolveGlobalStyleSheet(styleSheet);
  if (isInDevelopment) injectCSSGlobal(styleSheet, 'global');
}

applyGlobalBuildIn();
