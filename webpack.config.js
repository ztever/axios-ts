const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 实现 文件的自动打包和引入
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: resolve("dist"),
    filename: "app.bundle.js",
  },
  plugins: [
    // 配置插件
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 指定模板 html 文件
      filename: "index.html", // 输出的 HTML 文件名称
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新所需插件
    new webpack.NamedModulesPlugin(), // 热更新所需插件
    new CleanWebpackPlugin({ dry: true }), // 清除缓存中上一次打包的不用的文件
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    // 设置别名
    alias: {
      "@": resolve("src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
        use: "tslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
