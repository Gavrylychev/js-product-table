var webpack = require('webpack');

var config = {
  context: '/home/alexander/Documents/product-table/src',
  entry: {
    app: './main.js',
  },
  output: {
    path:'/home/alexander/Documents/product-table/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

module.exports = config;