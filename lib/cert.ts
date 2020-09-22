import { v4 as uuid4v } from 'uuid';
import jwt from 'jsonwebtoken';
import { UtilConfig } from './config';

export class Cert {
  // 기본 값
  defConfig: UtilConfig = {
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

  config: UtilConfig = this.defConfig;

  constructor() {
  }

  resetOptions(): void {
    this.config = { ...this.defConfig };
  }

  setOptions(config: UtilConfig): void {
    // 기존 값에 새로운 값을 덮어씌도록 함
    if (config.jwt != null) {
      this.config = {
        ...this.config,
        jwt: config.jwt,
      }
    }

    if (config.aes != null) {
      this.config = {
        ...this.config,
        aes: config.aes,
      }
    }
  }

  makeCertNumber(): string {
    return parseInt(uuid4v().slice(0, 5), 16).toString().slice(0, 5);
  }

  makeRefreshToken(payload: object): string {
    return jwt.sign(payload, this.config.jwt!.secret, this.config.jwt!.options.refresh);
  }

  verifyRefreshToken(token: string): object | string {
    return jwt.verify(token, this.config.jwt!.secret, this.config.jwt!.options.refresh);
  }

  makeAccessToken(payload: object): string {
    return jwt.sign(payload, this.config.jwt!.secret, this.config.jwt!.options.access);
  }

  verifyAccessToken(token: string): object | string {
    return jwt.verify(token, this.config.jwt!.secret, this.config.jwt!.options.access);
  }

  makeCertToken(payload: object): string {
    return jwt.sign(payload, this.config.jwt!.secret, this.config.jwt!.options.cert);
  }

  verifyCertToken(token: string): object | string {
    return jwt.verify(token, this.config.jwt!.secret, this.config.jwt!.options.cert);
  }
}