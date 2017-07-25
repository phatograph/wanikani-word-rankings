const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './app.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules|bower_components/,
      },
      {
        test:   /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: "style-loader!css-loader",
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
