const path = require('path');

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
    modules:[path.resolve(__dirname, 'laoders')]
  }
}