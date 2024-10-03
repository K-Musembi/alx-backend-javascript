const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.status(200).send('Welcome to the payment system');
});


app.get('/cart/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  res.status(200).send(`Payment methods for cart ${id}`);
});


app.get('/cart/:id', (req, res) => {
  res.status(404).send('Invalid cart ID');
});


app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});

module.exports = app;
