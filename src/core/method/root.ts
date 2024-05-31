import type { CustomCSSProperties } from '../../_internal';
import { isInDevelopment, buildIn, injectCSSGlobal, cssCodeGenStyle } from '../../_internal';

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

export function root(object: CustomCSSProperties): void {
  const { styleSheet } = cssCodeGenStyle(object, '--root');

  resolveGlobalStyleSheet(styleSheet);
  if (isInDevelopment) injectCSSGlobal(styleSheet, 'root');
}

applyGlobalBuildIn();
