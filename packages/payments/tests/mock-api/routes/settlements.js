const Settlements = require('../resources/settlements')
const SettlementDetails = require('../resources/settlement-details')

module.exports = app => {
  app.get('/api/settlements', (request, response) => {
    setTimeout(
      () => response.json(Settlements.getAllSettlements()),
      Math.floor(Math.random() * 650) + 100
    )
  })

  app.get('/api/settlement/**', (request, response) => {
    setTimeout(
      () => response.json(SettlementDetails),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
