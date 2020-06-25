const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
// const HtmlWebpackPlugin = require("html-webpack-plugin"); // 实现 文件的自动打包和引入
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

function getEntry() {
  return fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, "app.ts");
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry;
    }
    return entries;
  }, {});
}

module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/dist/",
  },
  mode: "development",
  plugins: [
    // 配置插件
    // new HtmlWebpackPlugin({
    //   template: "./excamples/index.html", // 指定模板 html 文件
    //   filename: "index.html", // 输出的 HTML 文件名称
    // }),
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
