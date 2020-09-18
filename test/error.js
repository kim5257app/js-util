const expect = require('chai').expect;
const util = require('../dist');

describe('Error test', () => {
  it('Error.make', () => {
    let ret = false;

    try {
      // Wrong JSON value
      JSON.parse('test');
    } catch (error) {
      const err = util.Error.make(error);

      if ( (err.result != null)
        && (err.code != null)
        && (err.name != null)
        && (err.message != null) ) {
        ret = true;
      }
    }

    expect(ret).to.equal(true);
  });

  it('Error.throwError', () => {
    let ret = false;

    try {
      util.Error.throwError({
        result: 'error',
        code: -1,
        name: 'ERROR',
        message: 'Unknown Error',
      });
    } catch (error) {
      if ( (error.result != null)
        && (error.code != null)
        && (error.name != null)
        && (error.message != null) ) {
        ret = true;
      }
    }

    expect(ret).to.equal(true);
  });

  it('Error.makeFail', () => {
    let ret = false;
    const fail = util.Error.makeFail('ERROR', 'Unknown Error');

    if ( (fail.result != null)
      && (fail.code != null)
      && (fail.name != null)
      && (fail.message != null) ) {
      ret = true;
    }

    expect(ret).to.equal(true);
  });

  it('Error.throwFail', () => {
    let ret = false;

    try {
      util.Error.throwFail('ERROR', 'Unknown Error');
    } catch (error) {
      if ( (error.result != null)
        && (error.code != null)
        && (error.name != null)
        && (error.message != null) ) {
        ret = true;
      }
    }

    expect(ret).to.equal(true);
  });
});