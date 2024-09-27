import { isDevelopment } from '..';

const styleSheets: Record<string, string> = {};

export function injectServerCSS(hash: string, sheet: string, context: string) {
  if (isDevelopment) console.log('💫 ' + context + ' executing ...' + sheet);
  styleSheets[hash] = sheet;
}

export function getServerCSS(): string {
  return Object.values(styleSheets).join('\n');
}
