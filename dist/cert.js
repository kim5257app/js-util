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
        this.config = {
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
    }
    setOptions(config) {
        // 기존 값에 새로운 값을 덮어씌도록 함
        this.config = Object.assign(Object.assign({}, this.config), config);
    }
    makeCertNumber() {
        return parseInt(uuid_1.v4().slice(0, 5), 16).toString().slice(0, 5);
    }
    makeRefreshToken(payload) {
        let ret;
        const config = this.config.jwt;
        if (config != null) {
            ret = jsonwebtoken_1.default.sign(payload, config.secret, config.options.refresh);
        }
        else {
            ret = '';
        }
        return ret;
    }
    verifyRefreshToken(token) {
        let ret;
        const config = this.config.jwt;
        if (config != null) {
            ret = jsonwebtoken_1.default.verify(token, config.secret, config.options.refresh);
        }
        else {
            ret = {};
        }
        return ret;
    }
}
exports.Cert = Cert;
