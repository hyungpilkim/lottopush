const proxy = require('http-proxy-middleware');

const baseUrlDev = 'http://localhost:3002'
const baseUrlProd = 'http://115.68.226.104:3002'
const baseUrl = baseUrlProd

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: baseUrl
    })
  )

  app.use(
    proxy('/auth', {
      target: baseUrl
    })
  )
}