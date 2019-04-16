const Disputes = require('../resources/disputes')

module.exports = app => {
  app.get('/api/disputes', (request, response) => {
    setTimeout(
      () => response.json(Disputes.getAllDisputes()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
