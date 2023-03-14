import RSA from './src/encryption'
import dotenv from 'dotenv'
dotenv.config()

// enviroment
const variablePublic = process.env.RSA_PUBLIC_KEY
const variablePrivate = process.env.RSA_PRIVATE_KEY

export default class Storage {
  private readonly storage: { [key: string]: string };
  private readonly rsa: RSA;

  constructor() { 
    this.storage = {};
    this.rsa = new RSA(variablePublic, variablePrivate);
  }

  public setItem(key: string, value: any): void {
    this.storage[key] = this.rsa.encrypt(value);
  }

  public getItem(key: string): any | null {
    const value = this.storage[key];
    return value ? this.rsa.decrypt(value) : null;
  }

  public removeItem(key: string): void {
    delete this.storage[key];
  }

  public get length(): number {
    return Object.keys(this.storage).length;
  }
}






