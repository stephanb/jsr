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
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
    extensions: ['.ts', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
    ]
  },
}
