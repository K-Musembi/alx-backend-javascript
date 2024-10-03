const sinon = require('sinon');
const { expect } = require('chai');
const { Utils } = require('./utils.js');
const { sendPaymentRequestToApi } = require('./3-payment.js');

describe('sendPaymentRequestToApi', () => {
  let spy;
  beforeEach(() => {
    spy = sinon.spy(Utils, 'calculateNumber');
  });

  afterEach(() => {
    spy.restore();
  });

  it('should call Utils.calculateNumber with SUM, 100, and 20', () => {
    sendPaymentRequestToApi(100, 20);
    expect(spy.calledOnceWithExactly('SUM', 100, 20)).to.be.true;
  });
});
