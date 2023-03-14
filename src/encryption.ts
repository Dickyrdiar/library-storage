import crypto from 'crypto';

export default class RSA {
  private readonly publicKey: any
  private readonly privateKey: any

  constructor(publicKey: any, privateKey: any) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  public encrypt(data: any): string {
    const encrypted = crypto.publicEncrypt(this.publicKey, Buffer.from(JSON.stringify(data)));
    return encrypted.toString('base64');
  }

  public decrypt(data: string): any {
    const decrypted = crypto.privateDecrypt(this.privateKey, Buffer.from(data, 'base64'));
    return JSON.parse(decrypted.toString('utf8'));
  }
}