import { v4 as uuid4v } from 'uuid';
import jwt, {SignOptions} from 'jsonwebtoken';

interface JWTOptions {
  refresh: SignOptions,
  access: SignOptions,
  cert: SignOptions,
}

interface JWT {
  secret: jwt.Secret,
  options: JWTOptions,
}

interface AES {
  key: Array<Number>,
  counter: number,
}

interface Config {
  jwt: JWT,
  aes: AES,
}

export class Cert {
  // 기본 값
  config: Config = {
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

  constructor() {
  }

  setOptions(config: { jwt?: JWT, aes?: AES }): void {
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
    console.log('secret:', JSON.stringify(this));
    return jwt.sign(payload, this.config.jwt.secret, this.config.jwt.options.refresh);
  }

  verifyRefreshToken(token: string): object | string {
    return jwt.verify(token, this.config.jwt.secret, this.config.jwt.options.refresh);
  }

  makeAccessToken(payload: object): string {
    return jwt.sign(payload, this.config.jwt.secret, this.config.jwt.options.refresh);
  }

  verifyAccessToken(token: string): object | string {
    return jwt.verify(token, this.config.jwt.secret, this.config.jwt.options.refresh);
  }

  makeCertToken(payload: object): string {
    return jwt.sign(payload, this.config.jwt.secret, this.config.jwt.options.refresh);
  }

  verifyCertToken(token: string): object | string {
    return jwt.verify(token, this.config.jwt.secret, this.config.jwt.options.refresh);
  }
}