import React, { ReactElement } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'
import { Request, Response } from 'express'
import { StaticRouter } from 'react-router'
import { Stats } from 'webpack'

import packageJSON from '../../package.json'
import config, { PassedToClient } from '../server/config'
import Routes from '../routes'
import { waitAndRequireStatsFile } from './utils'

const isDevMode = process.env.NODE_ENV === 'development'

const render = (stats: Stats) => async (req: Request, res: Response) => {
  // styled components
  const sheet = new ServerStyleSheet()
  let appStr = ''
  let styleTags = ''
  let scriptTags: ReactElement[] = []
  let linkTags: ReactElement[] = []

  const passedToClient: PassedToClient = {
    perfAnalyticsApi: config.get('perfAnalyticsApi')
  }
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
    scriptTags = extractor.getScriptElements() // or extractor.getScriptElements();

    // You can also collect your "preload/prefetch" links
    linkTags = extractor.getLinkElements()
    // And you can even collect your style tags (if you use "mini-css-extract-plugin")
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
  const html = renderToStaticMarkup(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <style dangerouslySetInnerHTML={{ __html: styleTags }} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>PerfAnalytics Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700;900&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href={`https://cdnjs.cloudflare.com/ajax/libs/antd/${packageJSON.dependencies.antd}/antd.css`}
        />
        {linkTags}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: appStr }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.passedToClient=${JSON.stringify(passedToClient)}`
          }}
        />
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
      {scriptTags}
    </html>
  )
  res.type('html').send(`<!DOCTYPE html>${html}`)
}

export default render
