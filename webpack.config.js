const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

module.exports = {
  mode: argv.production ? 'production' : 'development',

  entry: ['./index.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'JSR',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
    extensions: ['.ts', '.json', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
    ]
  },

  devtool: argv.production ? false : 'eval-source-map', /*'inline-source-map'*/
  watch: argv.production ? false : true,
  devServer: {
    port: 5432,
    open: true,
    hot: true,
    index: 'index.html'
  }
}
