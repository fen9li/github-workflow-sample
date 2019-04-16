const Products = require('../resources/products')

module.exports = app => {
  app.get('/api/products', (request, response) => {
    setTimeout(
      () => response.json(Products.getAllProducts()),
      Math.floor(Math.random() * 650) + 100
    )
  })
}
