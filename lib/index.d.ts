export default class Storage {
    private readonly storage;
    private readonly rsa;
    constructor(publicKey: string, privateKey: string);
    setItem(key: string, value: object): void;
    getItem(key: string): object | null;
    removeItem(key: string): void;
    get length(): number;
}
