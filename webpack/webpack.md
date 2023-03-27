# 关于webpack的诸多问题

## 为什么要学习 webpack？

前端有很多打包工具，其中 webpack 是生态最完整、使用最广泛。

学习webpack的意义主要有以下几点：
1. 理解前端开发中出现的常见问题，以及应对的解决办法
2. 帮助理解常见的脚手架，如 vue-cli，create-react-app，umi-js
3. 可以脱离脚手架搭建工程，甚至自己完成脚手架开发
4. 应对工程化方面的进阶面试题

## webpack 学习那个版本？

截止到 2022-01-04，webpack的版本是webpack5，但目前使用最广泛的是 webpack4

webpack的版本会不断更新，但它的核心原理是不变的。因此，学习webpack4成了最好的选择

学习的过程中，把重心放到 第一章 和 第五章

# webpack scope hoisting

> https://webpack.docschina.org/plugins/module-concatenation-plugin

介绍一下 webpack scope hoisting （webpack 作用域优化）

> webpack scope hoisting 是 webpack 的内置优化，它是针对模块的优化，在生产环境打包是会自动开启
> 在未开启 scope hoisting 时，webpack 会将每个模块的代码放置在一个独立的函数环境中，这样是为了保证模块的作用域互不干扰。
> 但是生成函数过多，在执行之前，或者是执行过程中，会处理很多执行上下文，执行栈的问题，代码的尺寸会增加，运行效率有点低
> 而 scope hoisting 的作用恰恰相反，是把多个模块的代码合并到一个函数环境中执行。在这一过程中，webpack 会按照顺序正确的合并模块代码，同时对涉及的标识符做适当的处理以避免重名。
> 这样做的好处是减少了函数调用，对运行效率有一定的提升，同时也降低了打包体积。
> 但是 scope hoisting 的启用是有前提的，如果遇到某些模块多次被其他模块引用，或者使用了动态导入(比如CMJ)的模块，或者是非 ESM 模块，都不会有 scope hoisting。

# webpack 更新了什么？

## 清除输出目录

webpack5 清除输出目录(也就是dist目录)开箱即用，无须安装 clean-webpack-plugin，具体做法如下：

```js
module.exports = {
    optout: {
        clean: true,
    }
}
```

## top-level-await

webpack5 现在允许在模块的顶级代码中直接使用 await, 不需要放在 async 里面

```js
// src/index.js
const resp = await fetch("https://www.baidu.com");
const jsonBody = await resp.json();

export default jsonBody;
```

目前，top-level-await还未成为正式标准，因此，对于webpack5 而言，该功能是作为experiments发布的，需要在 webpack.config.js 中配置开启

```js
// webpack.config.js
module.exports = {
    experiments: {
        topLevelAwait: true,
    }
}
```

## 打包优化体积

webpack5 对模块的合并，作用域提升，tree shaking 等处理的更加智能

## 打包缓存开箱即用

在 webpack4 中，需要使用 cache-loader 缓存打包结果以优化之后的打包性能

而在 webpack5 中，默认就已经开启了打包缓存，无须再安装 cache-loader

默认情况下，webpack5 是将模块的打包结果缓存到内存中，可以通过 cache 配置进行更改

```js
const path = require("path");

module.exports = {
    cache: {
        // 缓存类型，支持：memory、filesystem
        type: "filesystem",
        // 缓存目录，仅类型为 filesystem 有效
        cacheDirectory: path.resolve(__dirname, "node_module/.cache/webpack"),
    },
}
```

> 关于cache的更毒品配置参考：https://webpack.docschina.org/configuration/cache/#cache

## 资源模块

在 webpack4 中，针对资源型文件我们通常使用 file-loader、url-loader、raw-loader 进行处理

由于大部分前端项目都会用到资源型文件，因此 webpack5 原生支持了资源型模块

> https://webpack.docschina.org/guides/asset-modules

## 模块联邦

在大型项目中，往往会把项目中的某个区域或功能模块作为单独的徐昂亩开发，最终形成微前端架构

涉及到很多非常棘手的问题：
+ 如何避免公共模块重复打包
+ 如何将某个项目中一部分模块分享出去，同时还要避免重复打包
+ 如何管理依赖的不同版本
+ 如何更新模块
+ ......

webpack5 尝试着通过 模块联邦 来解决此类问题

现有两个微前端工程，他们各自独立开发、测试、部署，但是他们有一些相同的公共模块，并有一些自己的模块需要分享给其他工程使用，同时又要引入其他工程的模块

### 初始化工程

+ home项目
  + 初始化 package.json `npm init -y`
  + 安装依赖 `npm i -D webpack webpack-cli webpack-dev-server style-loader css-loader html-webpack-plugin` `npm i jquery`
  + 修改package.json
    ```json
    {
        "scripts": {
            "build": "webpack",
            "dev": "webpack serve"
        },
    }
    ```