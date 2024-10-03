const { Utils } = require('./utils.js');

function sendPaymentRequestToApi(totalAmount, totalShipping) {
  const sumTotal = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  
  console.log(`The total is: ${sumTotal}`);
}

module.exports = sendPaymentRequestToApi;
