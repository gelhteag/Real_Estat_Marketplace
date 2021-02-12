const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./index.html", to: "index.html" }]),
  ],
  devServer: { host:"0.0.0.0",port:3000,contentBase: path.join(__dirname, "dist"), compress: true},
};
