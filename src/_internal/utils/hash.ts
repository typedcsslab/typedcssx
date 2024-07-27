import { CustomCSSProperties, ClassesObjectType } from '..';
import * as crypto from 'crypto';

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function bufferToInteger(buffer: Uint8Array): number {
  let result = 0;
  for (let i = 0; i < buffer.length; i++) {
    result = result * 256 + buffer[i];
  }
  return result;
}

function encodeBase62(buffer: Uint8Array): string {
  let num = bufferToInteger(buffer);
  let result = '';
  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

export function genBase62Hash(object: ClassesObjectType | CustomCSSProperties, n: number) {
  const serialized = JSON.stringify(object);
  const hashBuffer = crypto.createHash('sha256').update(serialized).digest();
  const base62Hash = encodeBase62(hashBuffer);

  return base62Hash.slice(0, n);
}
