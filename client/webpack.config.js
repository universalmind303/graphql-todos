const webpack = require('webpack');
const path = require('path');
const ProvidePlugin = require("webpack/lib/ProvidePlugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const ROOT = path.resolve(__dirname, '../')


module.exports = {
  entry: {
    app: APP_DIR + '/index.jsx',
    vendor: APP_DIR + '/vendor.jsx'
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  devServer: {
    proxy: {'**': 'http://localhost:8000'},
    contentBase: BUILD_DIR,
    hot: true,
    compress: true,
    port: 9000
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'}) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) },
      { test: /\.(woff|woff2)$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }

    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: ["app", "vendor"]
    }),
    new ExtractTextPlugin({filename: 'style.css'}),
    new ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        jquery: "jquery",
        "Tether": "tether",
        "window.Tether": "tether",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip"
    }),
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html'
    })
  ]
};