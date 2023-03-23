+ [ ] 微信小程序
+ [ ] 整理笔记
+ [ ] 看node的书
+ [ ] 看js设计模式
+ [ ] node视频
+ [ ] hooks
+ [ ] ts
+ [ ] async promise
+ [ ] 响应式布局
+ [ ] generator
+ [ ] 为何你总是会受伤
+ [ ] 好好说话
+ [ ] 三国演义
+ [ ] gulp



## 安全沙箱限制

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 浏览器安全沙箱 -->
    <div>browser-safe-sandbox</div>
    <script>
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.baidu.com');

        xhr.send();
    </script>
</body>
</html>
```

用html直接去访问浏览器的话，会报错，因为浏览器的安全沙箱

![safe-sandbox](C:\Users\Lmljhlb\Desktop\笔记\node\img\safe-sandbox.png)

但是node就没有这个局限

```js
const https = require('https');

https.get('https://www.baidu.com', (res) => {
    let str = '';
    res.on('data', (chunk) => {
        str += chunk;
    })

    res.on('end', () => {
        console.log(str);  // 打印出来的res 是一个百度首页的html代码
    })
})

```



## 版本号

例如 13.4.6

+ major： 13 主版本号
+ minor:    4    次版本号
+ patch：  6    打补丁，一般认为patch这个版本号，偶数是稳定的patch，奇数是不稳定的patch
+ ^ 锁定主版本号
+ ~ 锁定主版本和次版本
+ 什么都不写，锁死了
+ ‘*’ 最新版

![版本符号](img\版本符号.png)



## path 模块基本操作

```js
const path = require('path');

path.resolve(__dirname, '../');
```



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



























































# day1

cmd  command的缩写
mkdir 文件夹名   创建文件夹
cd 文件夹名      打开文件夹
cd ../           返回上一级
cls              清屏
path             显示路径
.exit表示提出

后端 数据
前端 页面+交互

区别：
浏览器环境
1：window 全局对象
2：
node
1：global 全局对象
2: this指向global

node里面的模块遵循commonJs规范，
commonJs定义的模块分为：模块标识（module），模块定义（exports），模块引用（require）

# 命令

## npm基本操作

+ C:  
  如果我们访问的C盘，那么我们需要在命令行中输入C:就可以了

+ cd..
  返回上层目录

+ cd mm
  访问mm文件夹

+ 连续按两次Ctrl+C 、 .exit
  退出

+ mkdir <folderName>
  创建文件夹

+ cls
  清屏

+ npm config set prefix  C:\nodejs\node_global   设置全局路径

+ npm config set cache C:\nodejs\node_cache  设置缓存路径

+ npm root -g 查看全局命令

+ npm view node-sass versions  查看包的全部版本

+ npm outdated  查询过期版本号

  > + 例如在package.json文件里面
  >
  >   ![版本号](img\版本符号.png)
  >
  >   这个尖角 ^ 表示只要求ant-design-vue这个包的主版本号是1，后面就是1这个版本的最高的版本

+ npm update   更新过期的包

  package.json里面要求ant-design-vue这个包的主版本号是2，但是现在下载的是1，执行完这个命令以后，就会把它更新到所要求的那个主版本号，最新的一个版本

+ npm cache clean --force   清除缓存

+ npm adduser

+ npm config get registry  查看当前源
## fs核心模块基本操作
- 判断文件或文件夹是否存在
  
  + fs.exists
- 操作文件
  + 读取文件 readFile
  + 写入文件 writeFile
  + 拷贝文件  copyFile
  + 重命名文件 rename
  + 删除文件  unlinkFile
  + 追加文件  appendFile
- 操作文件夹
  + 创建文件夹 mkdir
  + 删除文件夹 rmdir
  + 读取文件夹 readdir
  + 重命名文件夹 rename
- 获取文件和文件夹信息
  + fs.statSync
  ```js
  const stats = fs.statSync('./file.js');
  console.log(stats);

  fs.stat('./file.js', (err, data) => {
      if (!err) {
          console.log(data)
      }
  })
  ```

### fs文件file操作 + dir操作
#### 1、判断文件或文件夹是否存在
```js
const isexist = fs.existsSync('./file.js');
console.log(isexist);

// 异步，没有错误参数
fs.exists('./file.js', data => { console.log(data); })
```

#### 1、创建文件夹 mkdirSync
```js
fs.mkdirSync('./img')

fs.mkdir('./css', err => {
    if (!err) {
        console.log('创建成功！')
    }
})
```

#### 1、读取文件/文件夹  readFileSync   readdirSync

第一个参数：文件路径

第二个参数：字符编码;

当没有字符编码时，读出的内容就是buffer数据格式

有第二个参数时，读出的内容就是传入的编码

```js  
//  没有这个文件会报错
const data = fs.readFileSync('./a.js');
console.log(data); //<Buffer 31 32 33> //数据格式 二进制

const data = fs.readFileSync('./a.js', 'utf-8') //utf-8 字符编码
console.log(data); //123
```
```js
fs.readFile('./a.js', (err, data) => {
    console.log(data);
})

fs.readFile('./a.js', 'utf-8', (err, data) => {

    console.log(data);
})
```

```js
// 一个参数 文件夹的路径， 返回值：该文件夹下的子目录的名字组成的数组

const data = fs.readdirSync('./js'); 
console.log(data);//[ 'detail.js', 'index.js', 'list.js' ]

// 异步返回值undefined
fs.readdir('./js', (err, data) => {
    if (!err) {
        console.log(data); //[ 'detail.js', 'index.js', 'list.js' ]
    }
})
```

#### 2、写入文件/文件夹  writeFileSync
1.会覆盖文件原有的内容

2.如果要写入的目标文件不存在会自动创建

第一个参数文件路径

第二个参数文件内容 string 或者buffer

第三个参数字符编码 'utf-8';可选

```js
fs.writeFileSync('./a.js', "hello");

fs.writeFileSync('./a.js', "hello", 'utf-8');

const data = fs.readFileSync('./b.js');
fs.writeFileSync('./a.js', data, 'utf-8');


fs.writeFile('./a.js', '1709C', "utf-8", err => {
    if (!err) {
        console.log('写入成功！')
    }
})
```

#### 3、追加文件内容 appendFileSync

```js
fs.appendFileSync('./a.js', 'wangxiaoli');

fs.appendFile('./a.js', "89900", err => {
    if (!err) {
        console.log('追加成功！')
    }
})

```

#### 4、拷贝文件 copyFileSync

第一个参数要拷贝的文件路径

第二个参数目标文件的路径

```js
fs.copyFileSync('./a.js', './b.js');

fs.copyFile('./a.js', './b.js', err => {
    if (!err) {
        console.log('拷贝成功！')
    }
})

```

#### 5、删除文件/文件夹 unlinkSync  rmdirSync 
一个参数，文件路径
```js
fs.unlinkSync('./b.js');

fs.unlink('./a.js', err => {
    if (!err) {
        console.log('删除成功！')
    }
})
```

文件夹
```js
//  一个参数 文件夹的路径
// 成功删除，返回值undefined
// 没有这个文件，会报错： no such file or directory, rmdir './scss/style'
fs.rmdirSync('./css');

fs.rmdir('./img', err => {
    if (!err) {
        console.log('删除成功！');
    }
})
```


#### 6、文件重命名/文件  renameSync  renameSync
第一个参数 旧路径

第二个参数 新路径

```js
fs.renameSync('./b.js','./c.js');
//把b文件重命名为c文件

fs.rename('./a.js', './c.js',err => {
    if (!err) {
        console.log('重命名成功！')
    }
})
```

```js
fs.renameSync('./js', './img');

fs.rename('./js', './css', err => {
    if (!err) {
        console.log('命名成功')
    }
})
```









### 获取文件或文件夹的信息

#### 获取文件或文件夹的信息：fs.statSync
```js
// 返回一个对象，包含了所有的文件或文件夹的信息
const stats = fs.statSync('./file.js');
console.log(stats);

fs.stat('./file.js', (err, data) => {
    if (!err) {
        console.log(data)
    }
})
```
#### stats.isFile()
#### stats.isDirectory()

### 流操作

```js
// 读取流
let rs = fs.createReadStream('./node.md');  //返回可读流，是一个对象
// 写入流，不存在文件直接生成，会覆盖
let ws = fs.createWriteStream('./nodeCopy.md');  //返回可写流，是一个对象
// 拷贝流
rs.pipe(ws);  //.pipe()绑定可写流到可读流
```

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



