class PaymentRequiredError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 402;
  }
}

module.exports = PaymentRequiredError;
