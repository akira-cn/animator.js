module.exports = function (env = {}) {
  const webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

  const version = packageConf.version,
    proxyPort = 9091,
    plugins = [],
    jsLoaders = []

  if(env.production) {
    // compress js in production environment

    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: false
        }
      })
    )
  }

  if(fs.existsSync('./.babelrc')) {
    console.log(env.production)
    // use babel
    const babelConf = JSON.parse(fs.readFileSync('.babelrc'))
    jsLoaders.push({
      loader: 'babel-loader',
      options: babelConf
    })
  }

  return {
    entry: './src/animator.js',
    output: {
      filename: env.production ? `animator-${version}.js` : 'animator-dev.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/static/js/',
      library: 'Animator',
      libraryTarget: 'umd'
    },

    plugins,

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders
      }]
    },

    devServer: {
      proxy: {
        '*': `http://127.0.0.1:${proxyPort}`
      }
    },
    //devtool: 'inline-source-map',
  }
}
