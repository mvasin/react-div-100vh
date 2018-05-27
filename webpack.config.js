const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/docs"),
  output: {
    path: path.join(__dirname, "docs"),
    filename: "bundle.js"
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/docs/index.html")
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 8000,
    stats: "minimal"
  }
};
