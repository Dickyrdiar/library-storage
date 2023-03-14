"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var RSA = /** @class */ (function () {
    function RSA(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    RSA.prototype.encrypt = function (data) {
        var encrypted = crypto_1.default.publicEncrypt(this.publicKey, Buffer.from(JSON.stringify(data)));
        return encrypted.toString('base64');
    };
    RSA.prototype.decrypt = function (data) {
        var decrypted = crypto_1.default.privateDecrypt(this.privateKey, Buffer.from(data, 'base64'));
        return JSON.parse(decrypted.toString('utf8'));
    };
    return RSA;
}());
var Storage = /** @class */ (function () {
    function Storage(publicKey, privateKey) {
        this.storage = {};
        this.rsa = new RSA(publicKey, privateKey);
    }
    Storage.prototype.setItem = function (key, value) {
        this.storage[key] = this.rsa.encrypt(value);
    };
    Storage.prototype.getItem = function (key) {
        var value = this.storage[key];
        return value ? this.rsa.decrypt(value) : null;
    };
    Storage.prototype.removeItem = function (key) {
        delete this.storage[key];
    };
    Object.defineProperty(Storage.prototype, "length", {
        // public clear(): void {
        //   this.storage = {};
        // }
        get: function () {
            return Object.keys(this.storage).length;
        },
        enumerable: false,
        configurable: true
    });
    return Storage;
}());
exports.default = Storage;
// Example usage:
var publicKey = "-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI25JU6zRZ6GOM+BOI8/s7VY/WuIJ14f\nG7iFE99xM8LkgCqI/N/q5TKMBF5D5QQKjrtmcO3JqDRP9ufyhEv45s8CAwEAAQ==\n-----END PUBLIC KEY-----";
var privateKey = "-----BEGIN PRIVATE KEY-----\nMIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAjbklTrNFnoY4z4E4\njz+ztVj9a4gnXh8buIUT33EzwuSAKoj83+rlMowEXkPlBAqOu2Zw7cmoNE/25/KE\nS/jmzwIDAQABAkBd1mlMskcqD7W8QvL1z0GLg4oZPwR6nyiJDUuHR7c/yOx6I99q\n1Llw3iqbs5a5l5I5wFkR8alvLvkX7QZWa5nBAiEA1m+lvmq3M5m5p5ngZ6l8U6Wr\nkS9nAt6gDlWktQ8zvZ0CIQD4N4ZdmWQ2AxyTke0rJrTgkocPUMoMWzvnH+iFubDe\n1wIgG58WyML+MSq3tXxn67kAedFck+TGtdbOoHHYfyKH2fECIQDdPvLNGio7Rth0\n99uX2/Roo3qYAy1J8IZatEEzyZNB5wIhAKYPk";
