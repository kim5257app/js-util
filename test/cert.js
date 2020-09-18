const expect = require('chai').expect;
const util = require('../dist');

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
