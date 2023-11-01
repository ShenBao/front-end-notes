const path = require('path');
const LogPlugin = require('./plugins/LogPlugin.js')

module.exports ={
  entry:'./index.js',
  mode: "development",
  module:{
    rules: [
      {
        test: /\.js$/,
        use:['uglify-loader']
      }
    ]
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'laoders')]
  },
  plugins:[
    new LogPlugin({
      output: path.resolve(__dirname,'webpack.log.json')
    })
  ]
}