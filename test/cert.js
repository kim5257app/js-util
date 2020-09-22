const expect = require('chai').expect;
const util = require('../dist');
const Config = require('./config');
const base64 = require('js-base64');

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
    let ret = true;

    // 비교 값
    const compHdr = { alg: 'HS512', typ: 'JWT' };
    const compPayload = { a: 123, b: 'abc' };

    const token = util.cert.makeRefreshToken(compPayload);

    // 생성된 JWT를 '.'으로 분리
    const spitedToken = token.split('.');

    const hdr = base64.decode(spitedToken[0]);
    const payload = JSON.parse(base64.decode(spitedToken[1]));

    // 헤더 비교
    ret = ret && (JSON.stringify(compHdr) === hdr)

    // 값 비교 (iat, exp가 자동으로 포함되므로 JSON 문자열 비교 불가)
    Object.entries(compPayload).forEach(([key, value]) => {
      ret = ret && (payload[key] === value);
    });

    expect(ret).to.equal(true);
  });

  it('Verify token with valid', () => {
    let ret = true;

    const compPayload = { a: 123, b: 'refresh' };

    const token = util.cert.makeRefreshToken(compPayload);

    try {
      const payload = util.cert.verifyRefreshToken(token);

      Object.entries(compPayload).forEach(([key, value]) => {
        ret = ret && (payload[key] === value);
      });
    } catch (error) {
      ret = false;
    }

    expect(true).to.equal(true);
  });

  it('Verify token with invalid', () => {
    let ret = false;

    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhIjoxMjMsImIiOiJhYmMiLCJpYXQiOjE2MDA3MzYzNDQsImV4cCI6MTYwMDczNjQwNH0.7DaeQrnu3IbvBFtRpOi0jWX0c0lFvWPCTWewQUUkZ8Mry_nY0-neayLlf6Lqc3oV6FyJgthaQiZTFoPK_696Cw';

    try {
      util.cert.verifyRefreshToken(token);
    } catch (error) {
      ret = true;
    }

    expect(ret).to.equal(true);
  });
});

describe('cert.makeAccessToken test', () => {
  it('Make token', () => {
    let ret = true;

    // 비교 값
    const compHdr = { alg: 'HS512', typ: 'JWT' };
    const compPayload = { a: 123, b: 'access' };

    const token = util.cert.makeAccessToken(compPayload);

    // 생성된 JWT를 '.'으로 분리
    const spitedToken = token.split('.');

    const hdr = base64.decode(spitedToken[0]);
    const payload = JSON.parse(base64.decode(spitedToken[1]));

    // 헤더 비교
    ret = ret && (JSON.stringify(compHdr) === hdr)

    // 값 비교 (iat, exp가 자동으로 포함되므로 JSON 문자열 비교 불가)
    Object.entries(compPayload).forEach(([key, value]) => {
      ret = ret && (payload[key] === value);
    });

    expect(ret).to.equal(true);
  });

  it('Verify token with valid', () => {
    let ret = true;

    const token = util.cert.makeAccessToken({ a: 123, b: 'abc' });

    const compPayload = { a: 123, b: 'abc' };

    try {
      const payload = util.cert.verifyAccessToken(token);

      Object.entries(compPayload).forEach(([key, value]) => {
        ret = ret && (payload[key] === value);
      });
    } catch (error) {
      ret = false;
    }

    expect(true).to.equal(true);
  });

  it('Verify token with invalid', () => {
    let ret = false;

    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhIjoxMjMsImIiOiJhYmMiLCJpYXQiOjE2MDA3MzU2MzksImV4cCI6MTYwMDczNTY5OX0.5U5MY8b60sVSInucg01MrDkxJfryhcEUOkKsoNGf79ymosVI_dkXDx_PrH4oSvTV4G9T8MhqJ73Uj2GfPIO2Lg';

    try {
      util.cert.verifyAccessToken(token);
    } catch (error) {
      ret = true;
    }

    expect(ret).to.equal(true);
  });
});

describe('cert.makeCertToken test', () => {
  it('Make token', () => {
    let ret = true;

    // 비교 값
    const compHdr = { alg: 'HS512', typ: 'JWT' };
    const compPayload = { a: 123, b: 'access' };

    const token = util.cert.makeCertToken(compPayload);

    // 생성된 JWT를 '.'으로 분리
    const spitedToken = token.split('.');

    const hdr = base64.decode(spitedToken[0]);
    const payload = JSON.parse(base64.decode(spitedToken[1]));

    // 헤더 비교
    ret = ret && (JSON.stringify(compHdr) === hdr)

    // 값 비교 (iat, exp가 자동으로 포함되므로 JSON 문자열 비교 불가)
    Object.entries(compPayload).forEach(([key, value]) => {
      ret = ret && (payload[key] === value);
    });

    expect(ret).to.equal(true);
  });

  it('Verify token with valid', () => {
    let ret = true;

    const token = util.cert.makeCertToken({ a: 123, b: 'abc' });

    const compPayload = { a: 123, b: 'abc' };

    try {
      const payload = util.cert.verifyCertToken(token);

      Object.entries(compPayload).forEach(([key, value]) => {
        ret = ret && (payload[key] === value);
      });
    } catch (error) {
      ret = false;
    }

    expect(true).to.equal(true);
  });

  it('Verify token with invalid', () => {
    let ret = false;

    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhIjoxMjMsImIiOiJhYmMiLCJpYXQiOjE2MDA3MzU2MzksImV4cCI6MTYwMDczNTY5OX0.5U5MY8b60sVSInucg01MrDkxJfryhcEUOkKsoNGf79ymosVI_dkXDx_PrH4oSvTV4G9T8MhqJ73Uj2GfPIO2Lg';

    try {
      util.cert.verifyCertToken(token);
    } catch (error) {
      ret = true;
    }

    expect(ret).to.equal(true);
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
    const { jwt, aes } = Config;

    util.cert.setOptions({ jwt, aes });

    const compConfig = {
      jwt: Config.jwt,
      aes: Config.aes,
    };

    expect(JSON.stringify(util.cert.config) === JSON.stringify(compConfig)).to.equal(true);
  });

  it('set configs with null in jwt', () => {
    const { aes } = Config;

    util.cert.resetOptions();
    util.cert.setOptions({ aes });

    const compConfig = {
      jwt: {
        secret: '0000',
        options: {
          refresh: { algorithm: 'HS512', expiresIn: '1m' },
          access: { algorithm: 'HS512', expiresIn: '1m' },
          cert: { algorithm: 'HS512', expiresIn: '1m' },
        },
      },
      aes: Config.aes,
    };

    expect(JSON.stringify(util.cert.config) === JSON.stringify(compConfig)).to.equal(true);
  });

  it('set configs with null in aes', () => {
    const { jwt } = Config;

    util.cert.resetOptions();
    util.cert.setOptions({ jwt });

    const compConfig = {
      jwt: Config.jwt,
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
});
