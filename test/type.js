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

    expect(util.Type.isJSON(JSON.stringify(obj))).to.equal(true);
  });

  it('Input not JSON data', () => {
    const str = '{ a: 1, b: true }';

    expect(util.Type.isJSON(str)).to.equal(false);
  });
});

describe('type.unescapeUnicode test', () => {
  it('Single ascii string', () => {
    const input = 'abcdefg';
    const comp = 'abcdefg';
    const output = util.Type.unescapeUnicode(input);

    expect(comp === output).to.equal(true);
  });

  it('Single unicode string', () => {
    const input = '\uD14C\uC2A4\uD2B8';
    const comp = '테스트';
    const output = util.Type.unescapeUnicode(input);

    expect(comp === output).to.equal(true);
  });

  it('Non string', () => {
    const input = 1234;
    const comp = 1234;
    const output = util.Type.unescapeUnicode(input);

    expect(comp === output).to.equal(true);
  });

  it('Object type', () => {
    const input = {
      a: 'abc123!@#',
      b: '\uD14C\uC2A4\uD2B8',
      c: 123,
      d: null,
      e: {
        a: 'abc123!@#',
        b: '\uD14C\uC2A4\uD2B8',
        c: 123,
        d: null,
        e: {
          a: 'abc123!@#',
          b: '\uD14C\uC2A4\uD2B8',
          c: 123,
          d: null,
        },
      },
    };

    const comp = {
      a: 'abc123!@#',
      b: '\uD14C\uC2A4\uD2B8',
      c: 123,
      d: null,
      e: {
        a: 'abc123!@#',
        b: '\uD14C\uC2A4\uD2B8',
        c: 123,
        d: null,
        e: {
          a: 'abc123!@#',
          b: '\uD14C\uC2A4\uD2B8',
          c: 123,
          d: null,
        },
      },
    };

    const output = util.Type.unescapeUnicode(input);

    expect(JSON.stringify(comp) === JSON.stringify(output)).to.equal(true);
  });
});