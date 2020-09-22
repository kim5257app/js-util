import { UtilConfig } from './config';
export declare class Cert {
    defConfig: UtilConfig;
    config: UtilConfig;
    constructor();
    resetOptions(): void;
    setOptions(config: UtilConfig): void;
    makeCertNumber(): string;
    makeRefreshToken(payload: object): string;
    verifyRefreshToken(token: string): object | string;
    makeAccessToken(payload: object): string;
    verifyAccessToken(token: string): object | string;
    makeCertToken(payload: object): string;
    verifyCertToken(token: string): object | string;
}
