const Invoices = require('../resources/invoices')

module.exports = app => {
  app.get('/api/invoices**', (request, response) => {
    setTimeout(
      () => response.json(Invoices.getAllInvoices()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
