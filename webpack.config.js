const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

module.exports = {
  mode: argv.production ? 'production' : 'development',

  entry: ['./src/index.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `typeof self !== 'undefined' ? self : this`
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
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
    index: 'index.html',
    inline: true
  }
}
