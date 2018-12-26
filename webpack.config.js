const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      Presentational: path.resolve(__dirname, "src/components/presentational"),
      Container: path.resolve(__dirname, "src/components/container")
    },
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
