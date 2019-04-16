const Customers = require('../resources/customers')

module.exports = app => {
  app.get('/api/customers', (request, response) => {
    setTimeout(
      () => response.json(Customers.getAllCustomers()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
