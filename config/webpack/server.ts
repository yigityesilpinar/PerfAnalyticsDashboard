import webpack from 'webpack'
import path from 'path'

// import externals from './externals'
import nodeExternals from 'webpack-node-externals'
const externals = nodeExternals()
import { SRC_PATH, PROJECT_ROOT_DIR, OUTPUT_DIR } from '../paths'

const isDevelopment = process.env.NODE_ENV === 'development'

const serverConfig: webpack.Configuration = {
  name: 'server',
  entry: [isDevelopment ? path.resolve(SRC_PATH, 'server/render.tsx') : path.resolve(SRC_PATH, 'server/index.ts')],
  target: 'node',
  externals,
  mode: isDevelopment ? 'development' : 'production',
  ...(isDevelopment ? { devtool: 'source-map' } : {}),
  output: {
    path: OUTPUT_DIR,
    filename: 'server.js',
    ...(isDevelopment ? { libraryTarget: 'commonjs2' } : {})
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
    alias: {
      src: path.resolve(PROJECT_ROOT_DIR, 'src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      CLIENT_BUILD: JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'global.WEBPACK_STATS_PATH': JSON.stringify(path.resolve(OUTPUT_DIR, 'loadable-stats.json'))
    }),
    //! Critical to keep server bundle chunk together
    //! e.g react-universal-component ssr is not working without
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}

export default serverConfig
