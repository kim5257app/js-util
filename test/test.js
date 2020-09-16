const expect = require('chai').expect;
const util = require('../dist');

describe('common.console function test', () => {
  it('First', () => {
    const result = util.test();
    expect(result).to.equal(undefined);
  });
});