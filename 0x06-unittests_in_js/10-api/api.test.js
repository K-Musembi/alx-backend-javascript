const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./api.js');

const { expect } = chai;
chai.use(chaiHttp);

describe('Index page', () => {
  it('should return status code 200', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return the correct message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Welcome to the payment system');
        done();
      });
  });
});

describe('Cart page', () => {
  it('should return status code 200 when :id is a number', (done) => {
    chai.request(app)
      .get('/cart/123')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Payment methods for cart 123');
        done();
      });
  });

  it('should return status code 404 when :id is NOT a number', (done) => {
    chai.request(app)
      .get('/cart/abc')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.equal('Invalid cart ID');
        done();
      });
  });
});

describe('Available payments', () => {
  it('should return status code 200 and correct payment methods', (done) => {
    chai.request(app)
      .get('/available_payments')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        });
        done();
      });
  });
});

describe('Login', () => {
  it('should return status code 200 and welcome message with userName', (done) => {
    chai.request(app)
      .post('/login')
      .send({ userName: 'Alice' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome Alice');
        done();
      });
  });

  it('should return status code 400 if no userName is sent', (done) => {
    chai.request(app)
      .post('/login')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Bad Request: Missing userName');
        done();
      });
  });
});
