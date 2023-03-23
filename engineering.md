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
> 动态依赖：在代码运行过程中，比如说一个判断，循环，函数，执行了代码里面的内容时，才会导入别的东西。不运行代码时不知道依赖关系的。动态依赖是同步执行的。

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

## 原理



   

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

npm 的安装机制

1. npm 会检查本地的 node_modules 目录中是否已经安装过该模块，如果已经安装，则不再重复安装
2. npm 检查缓存中是否有相同模块，如果有，直接从缓存中读取安装
3. 如果本地和缓存中均不存在，npm 会从 registry 指定的地址下载安装包，然后将其写入到本地的 node_modules 目录中，同时缓存起来

npm 缓存相关命令

```shell
# 清除缓存
npm cache clean -f

# 获取缓存位置
npm config get cache

# 设置缓存位置
npm config set cache "新的缓存路径"
```

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

2. 使用git初始化 `git init`

3. 使用npm初始化 `npm init -y`

4. 添加.gitignore文件，内容如下：

   ```
   node_modules
   .DS_Store // 是苹果电脑才有用的
   ```

5. git提交：init proj

6. 关联并推送到gitee

7. 新建`index.js`
   ```js
    // index.js
    console.log("这里是index.js")
   ```

8. 设置`package.json`的脚本`start`，用于运行`index.js`命令
   ```json
    {
        "scripts": {
            "start": "node index.js"
        }
    }
   ```

9.  安装`qrcode`

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






## 上传包

npm init -y  // 先生成包管理文件

npm adduser

npm publish



## package.json

#### script

scripts 脚本里面，访问我们当前配置文件信息的需求



如果命令行有一个命令是 echo hello

就可以这样写script字段

```json
{
    "scripts" : {
        "dev" : "echo hello",
        "build": "echo $npm_package_config_env"
    }
}
```

执行的时候可以写 npm run dev 

因为 dev 是自定义的脚本，所以执行的时候，需要npm run

例如 start 、test  就不需要写 run

想要获取package.json文件中某一个字段的值，通过

process.env.npm_package_字段

这里需要注意一下，字段如果是对象的话，比如说访问config，必须精确到这个对象的某一个属性，不能直接访问对象

process.env.npm_package_name

process.env.npm_package_config_dev

```json
{
    "config" : {
        "dev" : "echo hello"
    },
    "name": "foo"
}
```

上面那两行代码，是直接写到js文件中执行的，而且，执行这个js文件的话，是要写在script字段里面，

```js
{
    "scripts" : {
        "start" : "node ./index.js"
    }
}
```

然后，npm start 才可以，不能直接通过node 访问

如果要在终端命令行上面执行的话，会报错

```js
process.env.npm_package_name : 无法将“process.env.npm_package_na
me”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称  
的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
+ process.env.npm_package_name
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (process.env.npm_p  
   ackage_name:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

需要在命令行，输入node，然后回车，

输入 process ，回车

就可以用了



## cross-env

### cross-env是什么

运行跨平台设置和使用环境变量脚本

### 出现原因

当使用 NODE_ENV=production， 来设置环境变量时，大多数 Windows 命令提示将会阻塞（报错）。（异常是 Windows 上的 Bash，他是用本机 Bash）。换言之，Windows 不支持 NODE_DEV=production 的设置方式。

### 解决

cross-env 使得开发者可以使用单个命令，而不必担心平台正确设置或使用环境变量。这个迷你的包（cross-env）能够提供一个设置环境变量的 scripts，让你能够以 Unix 方式设置环境变量，然后在 Windows 上也能兼容运行。

### 安装

npm i -D cross-env


## 模块规范

   1.commenJS规范
    2.module
    3.commenJS规范特点
    4.module.exports和exports的区别

#### 前端
1.requirejs 遵循AMD规范 define()定义一个模块，require()加载一个模块
2.seaJS 遵循CMD规范 define()定义一个模块，require()加载一个模块
3.es6提供新的模块规范 export 导出一个模块，import 加载一个模块

#### 后端
nodejs遵循commenJS规范
1.module.exports 和 exports 导出一个模块
2.require() 加载一个模块

#### commenJS规范（就是CMD）
commenJS规范：规定了一个文件就是模块，module这个变量就代表当前模块,这个变量是一个对象
,这个对象上的exports属性(module.exports)就是模块对外输出的一个接口,我们加载一个模块就是
加载这个模块的module.exports属性

##### module 是一个对象
1.module.id 模块的标识
2.module.exports  模块对外输出的接口, 默认值是一个{}
3.module.filename 模块名称，一般是个绝对路径
4.module.paths 模块路径

1.module.id 模块的识别符，通常是带有绝对路径的模块文件名。

2.module.filename 模块的文件名，带有绝对路径。

3.module.loaded 返回一个布尔值，表示模块是否已经完成加载。

4.module.parent 返回一个对象，表示调用该模块的模块。

5.module.children 返回一个数组，表示该模块要用到的其他模块。

6.module.exports 表示模块对外输出的值

##### commenJS规范特点
1.形成单独的作用域，代码之间互不影响
2.模块可以多次加载，但是只会在第一次加载时运行一次，
3.然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。

##### module.exports和exports的区别
1.module.exports
  就是模块对外输出的一个接口,我们加载一个模块就是加载这个模块的module.exports属性
2.exports
  而exports变量，实际上是nodeJS为了方便，为每个模块提供一个exports变量，指向module.exports。
  这等同在每个模块头部，有一行这样的命令。  
```js
  const exports=module.exports;
  //正确
  let a = 123
  exports.a=a;
  //错误
  exports={
    a
  }
```
 注意:
  不能直接将exports变量指向一个值，等于切断了exports与module.exports的联系，
  他将不再是一个接口，而仅仅当前模块中的一个局部变量。

  总结：
    1.commenJS规范
    2.module变量
    3.commenJS规范特点
    4.module.exports和exports的区别



### Module属性
1. modelu.id 当前模块的唯一标识，一般是绝对路径
2. module.path 当前模块路径
3. module.exports 模块对外输出额的接口
4. module.filename 当前模块文件名，一般是绝对路径

```js
Module {
  id: '.',
  path: 'C:\\Users\\Lmljhlb\\Desktop\\es6',
  exports: { counter: [Function: counter], start: [Function: start], num: 145 },
  parent: null,
  filename: 'C:\\Users\\Lmljhlb\\Desktop\\es6\\counter.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\Lmljhlb\\Desktop\\es6\\node_modules',
    'C:\\Users\\Lmljhlb\\Desktop\\node_modules',
    'C:\\Users\\Lmljhlb\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
```

#### module.exports 与 exports的区别

module.exports 是模块对外输出的一个接口，我们加载一个模块，就是加载这个模块的modul.exports属性



### NodeJs模块分类
1. 核心模块
```js
const fs = require('fs');
const text = fs.readFileSync('./index.js', 'utf-8');
console.log(text);
```
核心模块指的是那些被编译进Node的二进制模块

预置在Node中，提供Node的基本功能，如fs、http、https等。

核心模块使用C/C++实现，外部使用JS封装

fs核心模块  http核心模块 url解析url路径 path处理路径 queryString查询字符串
2. 文件模块(用户模块)
+ 文件可放在任何位置

+ 加载模块文件时加上路径即可

```js
// 1..和. / 当前文件夹
// 2...和.. / 上一级
// 3. / 磁盘根目录
const foo = require('./foo.js'); //加载当前文件夹下的foo.js
const foo = require('../foo.js'); //加载上一级目录下的foo.js
const foo = require('/foo.js'); //加载当前C盘根目录下的foo.js
```

+ 加载js文件时.js可以省略, 默认加载以.js结尾的文件

```js
const foo = require('./foo');
//等同于
const foo = require('./foo.js');
```

1.没有扩展名，文件类型加载顺序.js > json > .node;

2.所以其他不是js文件类型的文件， 加载时最好加上扩展名提高性能


3. 第三方模块
+ Node使用npm(Node Package Manager)安装的第三方模块

+ npm会将模块安装(可以说是下载到)到应用根目录下的node_modules文件夹中


1. 下载模块
npm install 模块名 
npm install gulp

2. 引入模块
```js
const http = require('gulp');
```



### 第三方模块查找机制
1. 在当前文件夹下的 node_modules文件夹下找对应的包名

2. 找包里面的package.json文件

3. 找package.json文件中的main属性，执行main属性对应的值，返回该模块

4. 如果找不到package.json文件或者package.json文件中没有main属性，node默认找index.js文件，作为入口文件

5. 如果没有index.js文件，node会返回当前文件夹的上一级，重复1，2，3，4，如果还是找不到，逐级往上找，直到找到当前的磁盘根目录，例如：C盘 ,找到就返回这个模块，如果还找不到，就会到path路径中找，找到返回，找不到报错！

**模块加载的顺序: 缓存模块>核心模块>用户模块>第三方模块。**

### 安装第三方模块
1. 生成默认的package.json文件（只能用npm）
  + npm init + 回车
  + npm init -y
2. 安装模块
  + 本地安装（安装到项目）
    + 线上环境（正式环境）package.json  dependencies(是一个对象，属性名是模块名，属性值是版本号)
      npm install 模块名 --save  或者 npm i 模块名 -S(大写)
    + 开发环境  devDependencies(是一个对象，属性名是模块名，属性值是版本号)
      npm install 模块名 --save-dev  或者 npm i 模块名 -D(大写)
    + 全局安装
      npm install 模块名 -g

### 模块化

针对于JavaScript程序做一种模式拆分

#### AMD——异步模块定义

amd是一个规范，就跟es6规范一样

RequireJs是AMD规范最好的实现者之一

requirejs在浏览器中可以作为js文件的模块加载器，也可以用在Node环境中

通过define函数定义，第一个参数是依赖的文件，采取依赖前置

#### CMD

```js
mosule.exports = {
    aa: '123'
}

const aa = require('./a.js');

//  aa是一个对象，对象里面有一个aa属性
```

模块有自己的作用域，在模块里定义的函数，变量都是私有的，其他文件访问不到，除非抛出

### 模块载入策略

原生模块和文件模块在同一个项目里面会进行缓存

原生模块在启动的时候就已经加载了。

文件模块，分为3类，以后缀名区分 .js，.node，.json

