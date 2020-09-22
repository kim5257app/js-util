"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cert = void 0;
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Cert {
    constructor() {
        // 기본 값
        this.defConfig = {
            jwt: {
                secret: '0000',
                options: {
                    refresh: { algorithm: 'HS512', expiresIn: '1m' },
                    access: { algorithm: 'HS512', expiresIn: '1m' },
                    cert: { algorithm: 'HS512', expiresIn: '1m' },
                },
            },
            aes: {
                key: [
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                ],
                counter: 5,
            },
        };
        this.config = this.defConfig;
    }
    resetOptions() {
        this.config = Object.assign({}, this.defConfig);
    }
    setOptions(config) {
        // 기존 값에 새로운 값을 덮어씌도록 함
        if (config.jwt != null) {
            this.config = Object.assign(Object.assign({}, this.config), { jwt: config.jwt });
        }
        if (config.aes != null) {
            this.config = Object.assign(Object.assign({}, this.config), { aes: config.aes });
        }
    }
    makeCertNumber() {
        return parseInt(uuid_1.v4().slice(0, 5), 16).toString().slice(0, 5);
    }
    makeRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.config.jwt.secret, this.config.jwt.options.refresh);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.config.jwt.secret, this.config.jwt.options.refresh);
    }
    makeAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.config.jwt.secret, this.config.jwt.options.access);
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.config.jwt.secret, this.config.jwt.options.access);
    }
    makeCertToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.config.jwt.secret, this.config.jwt.options.cert);
    }
    verifyCertToken(token) {
        return jsonwebtoken_1.default.verify(token, this.config.jwt.secret, this.config.jwt.options.cert);
    }
}
exports.Cert = Cert;
