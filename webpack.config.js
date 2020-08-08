const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "validator.js",
    libraryTarget: "commonjs2",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
