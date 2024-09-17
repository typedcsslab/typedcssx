import { CustomCSSProperties, ClassesObjectType } from '..';
import * as crypto from 'crypto';

const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

function bufferToInteger(buffer: Uint8Array): number {
  let result = 0;
  for (let i = 0; i < buffer.length; i++) {
    result = result * 256 + buffer[i];
  }
  return result;
}

function encodeBase36(buffer: Uint8Array): string {
  let num = bufferToInteger(buffer);
  let result = '';
  while (num > 0) {
    result = chars[num % 36] + result;
    num = Math.floor(num / 36);
  }
  return result;
}

function getStartingChar(hashBuffer: Uint8Array): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const firstByte = hashBuffer[0];
  return chars[firstByte % chars.length];
}

export function genBase36Hash(object: ClassesObjectType | CustomCSSProperties, n: number) {
  const serialized = JSON.stringify(object);
  const hashBuffer = crypto.createHash('sha512').update(serialized).digest();
  const base36Hash = encodeBase36(hashBuffer);
  const startingChar = getStartingChar(hashBuffer);

  return startingChar + base36Hash.slice(0, n - 1);
}
