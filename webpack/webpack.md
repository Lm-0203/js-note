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