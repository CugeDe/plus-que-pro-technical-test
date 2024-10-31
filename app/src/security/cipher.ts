import 'server-only';

import Cryptr from 'cryptr';

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

const getCryptr = () => {
  if (!SECRET_KEY) throw new Error('NEXTAUTH_SECRET is not defined');

  return new Cryptr(SECRET_KEY);
};

export const encrypt = (text: string): string => getCryptr().encrypt(text);

export const decrypt = (encrypted: string): string => getCryptr().decrypt(encrypted);
