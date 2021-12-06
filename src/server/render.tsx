import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'
import { Request, Response } from 'express'
import { StaticRouter } from 'react-router'
import { Stats } from 'webpack'
import { dependencies } from '../../package.json'

import Routes from '../routes'
import { waitAndRequireStatsFile } from './utils'

const isDevMode = process.env.NODE_ENV === 'development'

const render = (stats: Stats) => async (req: Request, res: Response) => {
  // styled components
  const sheet = new ServerStyleSheet()
  let appStr = ''
  let styleTags = ''
  let scriptTags = ''

  try {
    // for DevMode global.WEBPACK_STATS_PATH is replaced with absolute path on build time
    const extractorOptions = isDevMode ? await waitAndRequireStatsFile(global.WEBPACK_STATS_PATH) : { stats }
    const extractor = new ChunkExtractor(extractorOptions)
    // Wrap your application using "collectChunks"
    const jsx = extractor.collectChunks(
      sheet.collectStyles(
        <StaticRouter location={req.url}>
          <Routes />
        </StaticRouter>
      )
    )
    // Render your application
    appStr = renderToString(jsx)

    // You can now collect your script tags
    scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();

    // You can also collect your "preload/prefetch" links
    // const linkTags = extractor.getLinkTags() // or extractor.getLinkElements();
    // And you can even collect your style tags (if you use "mini-css-extract-plugin")
    // styleTags = extractor.getStyleTags() // or extractor.getStyleElements();
    styleTags = sheet.getStyleTags()
  } catch (error) {
    // handle error
    // sentry
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).send('500 error')
  } finally {
    sheet.seal()
  }
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      ${styleTags}
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>PerfAnalytics Dashboard</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700;900&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/${dependencies.antd}/antd.css">
    </head>
    <body>
      <div id="root">${appStr}</div>
      <noscript>
      You need to enable JavaScript to run this app.
      </noscript>
      ${scriptTags}
    </body>
  </html>
`)
}

export default render
