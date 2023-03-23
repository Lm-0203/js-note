# 为什么需要模块化

当前端工程到达一定规模后，就会出现下面的问题：

- 全局变量污染

- 依赖混乱

上面的问题，共同导致了**代码文件难以细分**

模块化就是为了解决上面两个问题出现的

模块化出现后，我们就可以把臃肿的代码细分到各个小文件中，便于后期维护管理

# 前端模块化标准

前端主要有两大模块化标准：

- CommonJS，简称CMJ，这是一个**社区**规范，出现时间较早，目前仅node环境支持，依赖类型：动态依赖
- ES Module，简称ESM，这是随着ES6发布的**官方**模块化标准，目前浏览器和新版本node环境均支持，依赖类型：静态依赖，动态依赖

> 静态依赖：在运行代码之前就要分析出依赖关系，代码还没有运行，就要知道某个模块依赖哪些模块，
> 动态依赖：在代码运行过程中，比如说一个判断，循环，函数，执行了代码里面的内容时，才会导入别的东西。不运行代码时不知道依赖关系的。

> node环境
>
> 下载地址：https://nodejs.org/zh-cn/
>
> ![image-20210423130904669](http://mdrs.yuanjin.tech/img/20210423130904.png)

# CommonJS如何实现模块化

node天生支持CommonJS模块化标准

node规定：

1. node中的每个js文件都是一个CMJ模块，通过node命令运行的模块，叫做入口模块

    也就是如果在终端运行 `node index.js` `index.js` 就是入口模块

2. 模块中的所有全局定义的变量、函数，都不会污染到其他模块


3. 当一个模块需要给其他模块提供一些变量时，用 `module.exports` 导出

4. 模块可以暴露（导出）一些内容给其他模块使用，需要暴露什么内容，就在模块中给`module.exports`赋值 或者 给`exports`对象添加某个属性

    ```js
    function isOdd(n) {
        return n % 2 !== 0;
    }

    function sum(a, b) {
        return a + b;
    }

    module.exports = {
        isOdd,
        sum,
    }
    ```

    ```js
    var boy = 'liuyang'
    exports.boy = boy;
    ```

5. 一个模块可以导入其他模块，使用函数`require("要导入的模块路径")`即可完成，该函数返回目标模块的导出结果

   1. 导入模块时，可以省略`.js`
   2. 导入模块时，必须以`./`或`../`开头

    ```js
    const { isOdd, sum } = require('./math');
    const math = require('./math');
    console.log(math.isOdd(3));
    console.log(isOdd(4));
    ```

    ```js
    var { boy, girl } = require('模块路径')
    ```

6. 模块有缓存。一个模块在被导入时会运行一次，然后它的导出结果会被node缓存起来，后续对该模块导入时，不会重新运行，直接使用缓存结果

   ```js
    // 多次 require math.js 文件， math.js 文件只会在第一次 require 的时候执行，后面的 require 都是用的第一次 require 结果的缓存
    require('./math');
    require('./math');
    require('./math');
    require('./math');
    require('./math');
   ```

   

## 练习题

### 导入导出练习

按照要求完成下面的模块

**1. 配置模块 config.js**

它需要导出一个对象，规格如下：

```js
module.exports = {
    wordDuration: 300, // 打印每个字的时间间隔
    text: `西风烈，
        长空雁叫霜晨月。
        霜晨月，
        马蹄声碎，
        喇叭声咽。
        雄关漫道真如铁，
        而今迈步从头越。
        从头越，
        苍山如海，
        残阳如血。` // 要打印的文字
}

```

**2. 延迟模块 delay.js**

该模块的文件名为`delay`，你需要把下面的函数导出：

```js
/**
 * 该函数返回一个Promise，它会等待指定的毫秒数，时间到达后该函数完成
 * @param {number} ms 毫秒数
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = delay;

```

**3. 打印模块 print.js**

该模块负责导出一个打印函数，该函数需要获取当前的打印配置：

```js
/**
 * 该函数会做以下两件事：
 * 1. console.clear() 清空控制台
 * 2. 读取config.js中的text配置，打印开始位置到index位置的字符
 * @param {number} index 
 */
const config = require('./config.js')
function print(index){
    console.clear();
    const txt = config.text.substring(0, index + 1);
    console.log(txt);
    return txt;
}

module.exports = print;
```

**4. 主模块 main.js**

这是启动模块，它会利用其它模块，逐字打印出所有的文本，打印每个字的间隔时间在`config.js`中已有配置

```js
/**
 * 运行该函数，会逐字打印config.js中的文本
 * 每个字之间的间隔在config.js已有配置
 */
const delay = require('./delay.js');
const config = require('./config.js');
const print = require('./print.js');

async function run() {
    for(let i = 0; i < config.text.length; i ++) {
        await delay(config.wordDuration);
        console.log(print(i))
    }
}

async function run() {
  let index = 0;
  while (index < config.text.length) {
    print(index); // 打印到这个位置
    await delay(config.wordDuration);
    index++;
  }
}

run();
```

# ES Module

过去在浏览器中引用js

```js
// index.js
var a = 123;
```

```html
<script src="./index.js"></script>
<script>
    // 会污染全局变量
    console.log(a); // 123
    console.log(window.a); // 123
</script>
```

用 ES Module 的方式引入js

```js
// index.js
var a = 123;
```

```html
<!-- type 属性值是 module -->
<script src="./index.js" type="module" ></script>
<script>
    // 会污染全局变量
    console.log(a); // Uncaught ReferenceError: a is not defined
    console.log(window.a); // undefined
</script>
```

## 如何导出

**ES Module**的导出

ES Module分为两种导出方式：

- 具名导出（普通导出），可以导出多个
- 默认导出，只能导出一个

一个模块可以同时存在两种导出方式，最终会合并为一个「对象」导出

```js
export const a = 1; // 具名，常用
export function b() {} // 具名，常用
export const c = () => {}  // 具名，常用
const d = 2;
export { d } // 具名
const k = 10
export { k as temp } // 具名

// export default 3 // 默认，常用
// export default function() {} // 默认，常用
// const e = 4;
// export { e as default } // 默认

const f = 4, g = 5, h = 6
export { f, g, h as default} // 基本 + 默认

// 以上代码将导出下面的对象
/*
{
	a: 1,
	b: fn,
	c: fn,
	d: 2,
	temp: 10,
	f: 4,
	g: 5,
	default: 6
}
*/
```

**注意：导出代码必须为顶级代码，即不可放到代码块中**

## 如何导入

针对具名导出和默认导出，有不同的导入语法
模块路径可以是绝对路径，也可以是相对路径，文件名不能省略后缀
导入结果也是有缓存的
import 后面的 {} 是导入语法，和解构赋值不是一回事儿

```js
// 仅运行一次该模块，不导入任何内容
import "模块路径"
// 常用，导入属性 a、b，放到变量a、b中。a->a, b->b
import { a, b } from "模块路径"   
// 常用，导入属性 default，放入变量c中。default->c
import c from "模块路径"  
// 常用，default->c，a->a, b->b
import c, { a, b } from "模块路径" 
// 常用，将模块对象放入到变量obj中
import * as obj from "模块路径" 


// 导入属性a、b，放到变量temp1、temp2 中
import { a as temp1, b as temp2 } from "模块路径" 
// 导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名
import { default as a } from "模块路径" 
//导入属性default、b，放入变量a、b中
import { default as a, b } from "模块路径" 
// 以上均为静态导入

import("模块路径") // 动态导入，返回一个Promise，完成时的数据为模块对象
```

**注意：静态导入的代码必须为在代码顶端，也不可放入代码块中。也就是不可以放到循环，判断，函数体里面。但是CMJ可以**

**另外，静态导入的代码绑定的符号是常量，不可更改**

## 练习题

导出两个函数 sum，isOdd

```js
export function sum() {};
export function isOdd() {};
```

```js
function sum() {};
function isOdd() {};
export { sum, isOdd }
```

```js
function sum() {};
function isOdd() {};
export default { sum, isOdd }
```

```js
export default {
    sum() {},
    isOdd() {}
}
```

动态导入

```js
// math.js
export default {
    sum() {},
    isOdd() {}
}
```

```js
setTimeout(async () => {
  const m = await import('./math.js');
  const math = m.default;
  const result = math.isOdd(1, 2);
  console.log(result);
}, 1000);
```

npm官网：https://www.npmjs.com/

npm全命令：https://docs.npmjs.com/cli/v7/commands

# 概念

1. 什么是**包**？

   包（package）是一个或多个js模块的集合，它们共同完成某一类功能

   可以简单的认为每一个工程就是一个包

   有些包是为了给别人用的，这种包也叫第三方库

2. 什么是**包管理器**？

   包管理器是一个管理包的工具，前端常见的包管理器有npm、yarn、cnpm、pnpm等

   包管理器具备以下能力：

   - 让开发者可以轻松的下载包
   - 让开发者可以轻松的升级和卸载包
   - 能够自动管理包的依赖

3. 什么是**cli**

   cli是一个命令行工具，它提供一个终端命令，通过该命令可以完成一些功能

# node查找包的顺序

```js
require("a")
```

1. 查找是否有内置模块a
2. 查找当前目录的node_modules中是否有a
3. 依次查找上级目录的node_modules中是否有a，直到根目录

# 配置源

## 查看源

```shell
npm config get registry
```

## 配置淘宝镜像源

```shell
npm config set registry https://registry.npm.taobao.org
```

## 配置官方源

```shell
	npm config set registry https://registry.npmjs.org/
```

# 初始化

```shell
npm init # 初始化工程，帮助生成 package.json 文件
npm init -y # 初始化工程，全部使用默认配置生成 package.json 文件
```

# package.json

```json
{
  "dependencies": { // 本地普通依赖
    "qrcode": "^1.4.4" // 依赖包qrcode，版本1.4.4，主版本号不变，此版本号和补丁版本可增
  },
  "devDenpendencies": { // 开发依赖
    "webpack": "^5.0.0" 
  }
}
```

# 安装

## 本地安装

会将包下载到当前命令行所在目录的node_modules中

绝大部分安装都使用本地安装

```shell
# 下面的 install 可以替换为 i
npm install 包名
npm install --save 包名
npm install 包名@版本号
```

若仅作为开发依赖，则添加参数`-D`

```shell
# 下面的 install 可以替换为 i
npm install -D 包名
npm install -D 包名@版本号
```

若要还原安装

```shell
# 下面的 install 可以替换为 i
npm install
npm install --production # 仅还原dependencies中的依赖
```

## 全局安装

会将包下载到一个全局的位置

只有需要使用某个全局命令时，才需要进行全局安装

```shell
# 下面的 install 可以替换为 i
npm install -g 包名
npm install -g 包名@版本号
```

# 卸载

## 本地卸载

卸载本地的安装包

```shell
# 下面的 uninstall 均可替换为 un
npm uninstall 包名
```

## 全局卸载

卸载全局的安装包

```shell
# 下面的 uninstall 均可替换为 un
npm uninstall -g 包名
```

# 查看包信息

## 查看包所有的版本

```shell
# view 可以替换为 v
npm view 包名 versions
```

# 练习1：全局安装练习

1. 全局安装`moeda`
2. 运行命令`moeda 1 cny`，查看当前人民币汇率

# 练习2：开发流程练习

1. 创建一个工程，名为`qr-shower`

2. 使用git初始化

3. 使用npm初始化

4. 添加.gitignore文件，内容如下：

   ```
   node_modules
   .DS_Store
   ```

5. git提交：init proj

6. 关联并推送到gitee

7. 新建`index.js`

8. 设置`package.json`的脚本`start`，用于运行`index.js`命令

9. 安装`qrcode`

10. 编写下面的代码

    ```js
    var QRCode = require('qrcode');
    
    QRCode.toString('I am a pony!', { type: 'terminal' }, function (err, data) {
      console.log(data);
    });
    ```

11. 运行脚本`npm start`，查看效果

12. 开发完成，提交，然后推送到gitee

13. 删除本地工程

14. 从gitee拉取工程

15. 还原依赖

16. 重新运行



