const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

module.exports = {
  entry: './lib/animator.js',
  output: {
    filename: `animator-dev.js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/js/',
    library: 'Animator',
    libraryTarget: 'umd'
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //   }
    // })
  ],

  devServer: {
    proxy: {
      "*": "http://127.0.0.1:8360",
    }
  }
};
