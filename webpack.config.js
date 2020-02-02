const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/index.html"),
    filename: "index.html",
    inject: "body"
});

module.exports = [{
  name: 'styled-react-forms-npm',
  entry: path.join(__dirname, "./lib/index.js"),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    library: "styledreact",
    libraryTarget: "commonjs2"
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: "babel-loader",
              exclude: /node_modules/
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
  },
  resolve: {
      extensions: [".js", ".jsx"]
  },
  externals: {
    react: "commonjs2 react",
    "react-dom": "commonjs2 react-dom",
    "styled-components": "commonjs2 styled-components",
    "styled-system": "commonjs2 styled-system"
  },
},
{
  name: 'styled-react-forms-dev',
  context: path.join(__dirname, "./src"),
  entry: path.join(__dirname, "./src/index.js"),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "/dist-dev"),
    filename: "index.js"
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: "babel-loader",
              exclude: /node_modules/
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
      extensions: [".js", ".jsx"]
  },
  devServer: {
      port: 3001
  }
}];