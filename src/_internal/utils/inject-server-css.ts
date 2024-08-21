import { isDevelopment, isDevServer } from '..';

const styleSheets: Record<string, string> = {};

export function injectServerCSS(hash: string, sheet: string, context: string) {
  if (isDevelopment) console.log('💫 ' + context + ' executing ...' + sheet);
  styleSheets[hash] = sheet;

  return sheet;
}

export function getServerCSS(): string | null {
  return isDevServer ? Object.values(styleSheets).join('\n') : null;
}
