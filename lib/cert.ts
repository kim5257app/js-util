import { v4 as uuid4v } from 'uuid';
import jwt, {SignOptions} from 'jsonwebtoken';

interface JWTOptions {
  refresh?: SignOptions,
  access?: SignOptions,
  cert?: SignOptions,
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
  jwt?: JWT,
  aes?: AES,
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

  setOptions(config: object): void {
    // 기존 값에 새로운 값을 덮어씌도록 함
    this.config = { ...this.config, ...config };
  }

  makeCertNumber(): string {
    return parseInt(uuid4v().slice(0, 5), 16).toString().slice(0, 5);
  }

  makeRefreshToken(payload: object): string {
    let ret: string;
    const config = this.config.jwt;

    if (config != null) {
      ret = jwt.sign(payload, config.secret, config.options.refresh);
    } else {
      ret = '';
    }

    return ret;
  }

  verifyRefreshToken(token: string): object | string {
    let ret: object | string;
    const config = this.config.jwt;

    if (config != null) {
      ret = jwt.verify(token, config.secret, config.options.refresh);
    } else {
      ret = {}
    }

    return ret;
  }
}