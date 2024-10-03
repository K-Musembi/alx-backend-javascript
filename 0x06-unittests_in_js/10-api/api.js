const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


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


app.get('/available_payments', (req, res) => {
  res.status(200).json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});


app.post('/login', (req, res) => {
  const { userName } = req.body;
  if (userName) {
    res.status(200).send(`Welcome ${userName}`);
  } else {
    res.status(400).send('Bad Request: Missing userName');
  }
});


app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});

module.exports = app;
