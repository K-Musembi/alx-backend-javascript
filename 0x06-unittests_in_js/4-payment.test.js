const sinon = require('sinon');
const { expect } = require('chai');
const { Utils } = require('./utils.js');
const { sendPaymentRequestToApi } = require('./4-payment.js');

describe('sendPaymentRequestToApi', () => {
  let stub, cSpy;
  beforeEach(() => {
    stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    cSpy = sinon.spy(console, 'log');
  });
  
  afterEach(() => {
    stub.restore();
    cSpy.restore();
  });
  
  it('should call Utils.calculateNumber with SUM, 100, and 20', () => {
    sendPaymentRequestToApi(100, 20);
    expect(stub.calledOnceWithExactly('SUM', 100, 20)).to.be.true;
    expect(cSpy.calledOnceWithExactly('The total is: 10')).to.be.true;
  });
});
