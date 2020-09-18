import jwt, { SignOptions } from 'jsonwebtoken';
interface JWTOptions {
    refresh?: SignOptions;
    access?: SignOptions;
    cert?: SignOptions;
}
interface JWT {
    secret: jwt.Secret;
    options: JWTOptions;
}
interface AES {
    key: Array<Number>;
    counter: number;
}
interface Config {
    jwt?: JWT;
    aes?: AES;
}
export declare class Cert {
    config: Config;
    constructor();
    setOptions(config: object): void;
    makeCertNumber(): string;
    makeRefreshToken(payload: object): string;
    verifyRefreshToken(token: string): object | string;
}
export {};
