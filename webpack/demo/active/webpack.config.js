const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    clean: true,
  },
  target: "web",
  devtool: "source-map",
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      // 远程使用其他项目的暴露模块
      remotes: {
        // key: 自定义远程暴露的联邦名
        // 比如 abc，则之后引用该联邦模块则使用 import abc from
        // value: 模块联邦名@模块联邦访问地址
        // 远程访问时，将从下面地址加载
        home: "home@http://localhost:8080/home-entry.js",
      },
      shared: {
        // jquery 为共享模块
        // 需要共享的模块都需要配置
        jquery: {
          singleton: true, //  全局唯一
        },
      },
    }),
  ],
};
