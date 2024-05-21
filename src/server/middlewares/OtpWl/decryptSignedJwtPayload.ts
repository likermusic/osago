import { compactDecrypt, decodeJwt, importPKCS8 } from 'jose';

export const decryptSignedJwtPayload = async (jwe: string, pkcs8PrivateKey: string, alg = 'RSA-OAEP-256') => {
  const privateKey = await importPKCS8(pkcs8PrivateKey, alg);
  const { plaintext } = await compactDecrypt(jwe, privateKey);
  const jwtText = new TextDecoder().decode(plaintext);

  return decodeJwt(jwtText);
};
