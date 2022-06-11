const path = require('path')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEV = NODE_ENV === 'development'

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  PUBLIC: path.resolve(__dirname, 'src/public'),
}

module.exports = {
  mode: NODE_ENV,
  entry: [
    path.join(paths.SRC, 'index.js'),

    ...IS_DEV ? [ 'webpack-plugin-serve/client' ] : [],
  ],
  output: {
    path: paths.DIST,
    filename: IS_DEV ? 'bundle.js' : 'bundle.[hash].js',
    publicPath: '/',
  },
  plugins: [
    ...IS_DEV ? [
      new Serve({
        static: paths.DIST,
        port: 8080,
        liveReload: true,
      }),
    ] : [],

    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: paths.PUBLIC },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.js$/,
        include: /node_modules\/@j-tec/,
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/env' ],
        },
      },
      {
        test: /\.(css)$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img/',
        },
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
  },
  devtool: IS_DEV ? 'cheap-module-source-map' : false,
  watch: IS_DEV, // keep dev-server up
}