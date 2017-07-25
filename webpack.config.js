const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './app.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new webpack.DefinePlugin({
    }),
  ],
  devServer: {
    port: process.env.APP_PORT,
    contentBase: 'build',
    historyApiFallback: true,
  }
};
