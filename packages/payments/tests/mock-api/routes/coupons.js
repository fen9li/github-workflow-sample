const Coupons = require('../resources/coupons')

module.exports = app => {
  app.get('/api/coupons', (request, response) => {
    setTimeout(
      () => response.json(Coupons.getAllCoupons()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
