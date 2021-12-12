/* eslint-disable  @typescript-eslint/no-var-requires */
import express from 'express'
import * as Sentry from '@sentry/node'
import { version } from '../../package.json'
import config from '../server/config'
const expressStaticGzip = require('express-static-gzip')

const isProd = process.env.NODE_ENV === 'production'
const port = config.get('port')
const host = config.get('host')
const app = express()

app.get('/version', (_req, res) => {
  res.json({ version })
})

if (!isProd) {
  const webpack = require('webpack')
  const webpackDevMiddlewareFn = require('webpack-dev-middleware')
  const webpackHotMiddlewareFn = require('webpack-hot-middleware')
  const webpackHotServerMiddlewareFn = require('webpack-hot-server-middleware')
  const clientConfig = require('../../config/webpack/client').default
  const serverConfig = require('../../config/webpack/server').default
  const compiler = webpack([clientConfig, serverConfig])
  const [clientCompiler] = compiler.compilers
  const webpackDevMiddleware = webpackDevMiddlewareFn(compiler, {
    publicPath: clientConfig.devServer.publicPath || '/',
    serverSideRender: true
  })
  const webpackHotMiddleware = webpackHotMiddlewareFn(clientCompiler)

  app.use(webpackDevMiddleware)
  // should be berfore static after dev middleware, in clientConfig needs devServer hot true option
  app.use(webpackHotMiddleware)
  app.use(webpackHotServerMiddlewareFn(compiler))
} else {
  // PRODUCTION
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  })
  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.errorHandler())
  app.use(
    expressStaticGzip('dist', {
      enableBrotli: true,
      orderPreference: ['br']
    })
  )
  const render = require('./render').default
  // for production read once at server start
  const statsJSON = require('../../dist/loadable-stats.json')
  app.get('*', render(statsJSON))
}

app.listen(port,host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://localhost:${port}`)
})
