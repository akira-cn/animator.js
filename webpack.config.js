const path = require('path')
const fs = require('fs')

const jsLoaders = []
if(fs.existsSync('./.babelrc')) {
  // use babel
  const babelConf = JSON.parse(fs.readFileSync('.babelrc'))
  jsLoaders.push({
    loader: 'babel-loader',
    options: babelConf,
  })
}

module.exports = {
  entry: './src/animator.js',
  output: {
    filename: 'animator-dev.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/js/',
    library: 'Animator',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: jsLoaders,
    }],
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
      '*': 'http://127.0.0.1:9091',
    },
  },
}
