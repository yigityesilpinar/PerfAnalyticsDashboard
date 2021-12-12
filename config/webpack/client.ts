import webpack, { Configuration, WebpackPluginInstance } from 'webpack'
import path from 'path'

import CompressionPlugin from 'compression-webpack-plugin'
import BrotliPlugin from 'brotli-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

import { OUTPUT_DIR, SRC_PATH, PROJECT_ROOT_DIR } from '../paths'

const publicPath = '/'

const isDevelopment = process.env.NODE_ENV === 'development'

const clientConfig: Configuration = {
  name: 'client',
  entry: {
    vendors: ['react', 'react-dom', 'styled-components'],
    main: [isDevelopment && 'webpack-hot-middleware/client', path.resolve(SRC_PATH, 'index.tsx')].filter(
      Boolean
    ) as string[]
  },
  mode: isDevelopment ? 'development' : 'production',
  ...(isDevelopment ? { devtool: 'source-map' } : {}),
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
  output: {
    path: OUTPUT_DIR,
    publicPath,
    chunkFilename: '[name]-bundle.js',
    filename: '[name]-bundle.js'
  },
  ...(isDevelopment
    ? {
        devServer: {
          static: OUTPUT_DIR,
          hot: true
        }
      }
    : {}),
  plugins: [
    ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      CLIENT_BUILD: JSON.stringify(true)
    }),
    ...(isDevelopment ? [] : [new CompressionPlugin()]),
    ...(isDevelopment ? [] : [new BrotliPlugin() as unknown as WebpackPluginInstance]),
    new LoadablePlugin({ writeToDisk: true }) as unknown as WebpackPluginInstance,
    new CopyPlugin({
      patterns: [{ from: 'node_modules/@yigitysl/perfanalyticsjs/dist/PerfAnalytics.js', to: 'PerfAnalytics.js' }]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'defaultVendors',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
}

export default clientConfig
