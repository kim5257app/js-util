const expect = require('chai').expect;
const util = require('../dist');

describe('type.isJSON test', () => {
  it('Input JSON data', () => {
    const obj = {
      a: 1,
      b: true,
      c: 'str',
      d: null,
      e: [1, 2, '3'],
      f: {
        a: 1,
        b: true,
      },
    };

    expect(util.type.isJSON(JSON.stringify(obj))).to.equal(true);
  });

  it('Input not JSON data', () => {
    const str = '{ a: 1, b: true }';

    expect(util.type.isJSON(str)).to.equal(false);
  });
});
