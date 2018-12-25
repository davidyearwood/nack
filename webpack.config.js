const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      Presentational: path.resolve(__dirname, 'src/components/presentational'),
      Container: path.resolve(__dirname, 'src/components/container'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
};
