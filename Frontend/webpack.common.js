const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.    
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: 'images/**',
        to: '.',
        toType: 'dir'
      },
      {
        from: 'index.html',
        to: '.',
        toType: 'dir'
      },
      {
        from: 'images/favicon.ico',
        to: 'favicon.ico',
      },
      {
        from: 'public/**',
        to: '.',
        toType: 'dir'
      },
      {
        from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: 'node_modules/@webcomponents/webcomponentsjs/[name].[ext]'
      }
    ], {}),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/,
      exclude: /service-worker.js/
    })]
  }
};