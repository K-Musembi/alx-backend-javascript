const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai.js');

describe('calculateNumber - SUM', () => {
  it('should return 6 when type is SUM and inputs are 1.4 and 4.5', () => {
    expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
  });
});

describe('calculateNumber - SUBTRACT', () => {
  it('should return -4 when type is SUBTRACT and inputs are 1.4 and 4.5', () => {
    expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
  });
});

describe('calculateNumber - DIVIDE', () => {
  it('should return 0.2 when type is DIVIDE and inputs are 1.4 and 4.5', () => {
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
  });

  it('should return "Error" when type is DIVIDE and second input rounds to 0', () => {
    expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
  });
});
