import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify<string, string, number, Buffer>(scrypt);

export async function hash(data: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(data, salt, 64);
  return `${salt}.${derivedKey.toString('hex')}`;
}

export async function compare(data: string, hashed: string): Promise<boolean> {
  const [salt, hash] = hashed.split('.');
  const hashBuffer = Buffer.from(hash, 'hex');

  const derivedKey = await scryptAsync(data, salt, 64);

  return timingSafeEqual(hashBuffer, derivedKey);
}
