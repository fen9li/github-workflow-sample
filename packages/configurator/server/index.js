const nuxtConfig = require('../nuxt.config.js')
const { Nuxt, Builder } = require('nuxt')
const fs = require('fs')
const path = require('path')
const useTLS = process.env.USE_TLS === 'true'
const useHTTP2 = process.env.USE_HTTP2 === 'true'

const fastify = require('fastify')({
  http2: useHTTP2 && useTLS,
  https: useTLS
    ? {
        key: fs.readFileSync(path.join(__dirname, '../cert/server.key')),
        cert: fs.readFileSync(path.join(__dirname, '../cert/server.crt')),
      }
    : false,
})
const { getProvider, setProvider, deleteProvider } = require('./firebase.js')

nuxtConfig.dev = process.env.NODE_ENV !== 'production'

async function start() {
  const nuxt = new Nuxt(nuxtConfig)

  const {
    host = process.env.HOST,
    port = process.env.PORT,
  } = nuxt.options.server

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  fastify.get('*', ({ req }, { res }) => {
    nuxt.render(req, res)
  })

  fastify.get('/api/config/:providerName', getProvider)
  fastify.post('/api/config/:providerName', setProvider)
  fastify.delete('/api/config/:providerName', deleteProvider)

  fastify.listen(port, host, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    } else {
      console.log(`Server listening at ${address}`)
    }
  })
}

start()
