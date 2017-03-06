const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

let webpackConf = require('../webpack.config.js');

webpackConf.output.filename = `animator-${packageConf.version}.min.js`;

webpackConf.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_console: false,
  }
}));

webpack(webpackConf, function(){
  let cdnUploader = require('./cdn-uploader');
  let file = path.resolve(webpackConf.output.path, webpackConf.output.filename);

  cdnUploader.upload(file).then(function(res){
    let readmeFile = path.resolve(__dirname, '..', 'README.md');
    let content = fs.readFileSync(readmeFile, 'utf-8');
    content = content.replace(/script src="(.*)"/igm, `script src="${res[file]}"`);
    fs.writeFileSync(readmeFile, content);
  });  
});
