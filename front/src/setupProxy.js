const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://115.68.226.104/:3002'
    })
  )

  app.use(
    proxy('/auth', {
      target: 'http://115.68.226.104:3002'
    })
  )
}