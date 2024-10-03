const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment.js');

describe('sendPaymentRequestToApi', () => {
  let cSpy;
  beforeEach(() => {
    cSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    cSpy.restore();
  });

  it('should log "The total is: 120" and be called once when inputs are 100 and 20', () => {
    sendPaymentRequestToApi(100, 20);
    expect(cSpy.calledOnceWithExactly('The total is: 120')).to.be.true;
    expect(cSpy.calledOnce).to.be.true;
  });

  it('should log "The total is: 20" and be called once when inputs are 10 and 10', () => {
    sendPaymentRequestToApi(10, 10);
    expect(cSpy.calledOnceWithExactly('The total is: 20')).to.be.true;
    expect(cSpy.calledOnce).to.be.true;
  });
});
