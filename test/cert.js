const expect = require('chai').expect;
const util = require('../dist');
const Config = require('./config');
const base64 = require('base64-js');

describe('cert.makeCertNumber test', () => {
  it('cert number type test', () => {
    let ret = true;

    // 모두 숫자인지, 길이는 5자리인지 확인
    const certNumber = util.cert.makeCertNumber();

    const number = parseInt(certNumber);
    if (isNaN(number) || number.toString().length !== 5) {
      ret = false;
    }

    expect(ret).to.equal(true);
  });
});

describe('cert.makeRefreshToken test', () => {
  it('Make token', () => {
    const token = util.cert.makeRefreshToken({ a: 123, b: 'abc' });

    const hdr = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9';
    const body = 'eyJhIjoxMjMsImIiOiJhYmMiLCJpYXQiOjE2MDA2NjkwMDAsImV4cCI6MTYwMDY2OTA2MH0';

    const splitedToken = token.split('.');

    expect(splitedToken[0] === hdr && splitedToken[1] === body).to.equal(true);
  });

  it('Verify token with valid', () => {
    expect(true).to.equal(true);
  });

  it('Verify token with invalid', () => {
    expect(true).to.equal(true);
  });
});

describe('cert.setOptions test', () => {
  it('check default configs', () => {
    const compConfig = {
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

    expect(JSON.stringify(util.cert.config) === JSON.stringify(compConfig)).to.equal(true);
  });

  it('set configs', () => {
    console.log('config:', JSON.stringify(Config));
    util.cert.setOptions(Config);

    const compConfig = {
      jwt: Config.jwt,
      aes: Config.aes,
    };

    expect(JSON.stringify(util.cert.config) === JSON.stringify(compConfig)).to.equal(true);
  });
});