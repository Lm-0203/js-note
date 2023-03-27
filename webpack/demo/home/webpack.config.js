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
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      // 对模块联邦进行配置，如何暴露一个模块
      // 模块联邦的名称
      // 该名称将成为一个全局变量，通过该变量将可获取当前联邦的所有暴露模块
      name: "home",
      // 模块联邦 生成的文件名，全部变量将置入到该文件中
      filename: "home-entry.js",
      exposes: {
        // key：相对于模块联邦的路径
        // 这里的 ./now 将决定该模块的访问路径为 home/now
        // value：具体的路径
        "./now": "./src/now.js",
      },

      shared: {
        // jquery 为共享模块
        // 需要共享的模块都需要配置
        jquery: {
            singleton: true, //  全局唯一
        }
      }
    }),
  ],
};
