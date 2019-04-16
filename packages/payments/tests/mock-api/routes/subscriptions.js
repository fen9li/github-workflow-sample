const Subscriptions = require('../resources/subscriptions')

module.exports = app => {
  app.get('/api/subscriptions', (request, response) => {
    setTimeout(
      () => response.json(Subscriptions.getAllSubscriptions()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
