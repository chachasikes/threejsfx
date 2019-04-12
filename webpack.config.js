const path = require('path');
const ThreeWebpackPlugin = require('@wildpeaks/three-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/js'),
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    //...
    new ThreeWebpackPlugin()
  ]
};
