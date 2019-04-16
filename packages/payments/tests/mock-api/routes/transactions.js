const Transactions = require('../resources/transactions')

module.exports = app => {
  app.get('/api/transactions', (request, response) => {
    setTimeout(
      () => response.json(Transactions.getAllTransactions()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
