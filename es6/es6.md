ES6 声明变量的六种方法:
ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。

# ES6 课程概述

ECMAScript、JavaScript、NodeJs，它们的区别是什么？

+ ECMAScript：简称ES，是一个语言标准（循环、判断、变量、数组等数据类型）

+ JavaScript：运行在浏览器端的语言，该语言使用ES标准。 ES + web api = JavaScript

+ NodeJs：运行在服务器端的语言，该语言使用ES标准。 ES + node api = JavaScript

+ 无论JavaScript，还是NodeJs，它们都是ES的超集（super set）

## es5 和 es6 的区别



| js版本 | 作用域                 |
| ------ | ---------------------- |
| es5    | 全局作用域和函数作用域 |
| es6    | 块级作用域             |



| 定义（声明）变量 | 定义的变量是否提升 | 在同一个作用域内，是否可以重复定义 | 变量定义后，是否可以修改                                               |
| ---------------- | ------------------ | ---------------------------------- | ---------------------------------------------------------------------- |
| var              | 是                 | 是                                 | 是                                                                     |
| let              | 否                 | 否                                 | 是                                                                     |
| const            | 否                 | 否                                 | 否，但是对象的属性或者数组的某一位可以修改，只要不修改他俩的地址就可以 |



## var、let、const的区别

+ let 和 const 是es6 新增的语法，有块级作用域，var 存在于函数作用域
+ let 和 const 不存在变量提升，var存在变量提升
+ let 和 const 有暂时性死区，var 没有
+ let 和 const 声明的变量不会挂载到window 上面，var 声明的变量会挂载到window上面，全局变量是window的属性，全局函数是window的方法
+ let 和 var 可以先声明再赋值，const 不行
+ const 简单类型一旦声明就不能再更改，对于引用数据类型（对象，数组）来说的话，指针指向的地址不能更改，内部数据可以改

# let命令
## 基本用法
+ for循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
```js
for(let i = 0; i < 5; i ++) {
    let i = 'abc';
    console.log(i);
}
```
上述代码正确运行，输出了3次'abc'。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域

##### 不存在变量提升
```js
console.log(a);
let a = 123;

// Uncaught ReferenceError: Cannot access 'a' before initialization
```

##### 暂时性死区（temporal dead zone，简称 TDZ）

##### ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

 ```js
 var tem = 123;
 if(true) {
     console.log(tem);  //同上述一样的引用错误，报错也是一样的
     let tem = 'abc';
 }
 ```

 ```js
 var parent = 'gu';
 if(true) {
     parent = 'wang';
     child = 'cheng';  //只有child这个变量存在暂时性死区
     let child = 'fie';
 }
 ```

 ##### 用 typeof就会报错
 ```js
 typeof a; //报错
 let a = 123;
 ```

 ##### 有些‘死区’比较隐蔽，不容易被发现
 ```js
 function bar(x = y, y = 2) {  //报错内容和上述一样
     return [x, y];
 }
 bar();
 ```

##### 不存在重复声明
```js
let a = 123;
let a = 456;  //Uncaught SyntaxError: Identifier 'a' has already been declared
```

##### 不能在函数内部重复声明参数
```js
function fun(arg) {
    let arg; //Uncaught SyntaxError: Identifier 'arg' has already been declared
}
fun();
```

## 块级作用域
+ let实际上是为JavaScript新增了块级作用域
+ let关键字可以将变量绑定到所在的任意作用域中（通常是{ .. }内部）
+ 块级作用域的出现使得获得广泛应用的匿名立即执行函数表达式（匿名IIFE）不再必要了
+ 有作用域链
```js
var tem = new Date();
function f() {
    console.log(tem);  //undefined
    if(false) {
        var tem = 'hello world';
    }
}
f();  
```


```js
function f1() {
    let n = 5;
    if(true) {
        let n = 10;
    }
    console.log(n); //5
}
f1();
```

+ ES6允许块级作用域的任意嵌套
```js
{{{{
    {
        let insane = 'hello world'
    }
    console.log(insane); //报错 insane is not defined
}}}}
```
上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量

+ 内层作用域可以定义外层作用域相同的变量名
```js
{{{{
    let insane = 'Hello World';
    {let insane = 'Hello World'}
}}}}
```
## 块级作用域与函数声明
在es5中运行不会报错，在es6中会。
```js
function f() {
    console.log('I am outside!');
}
(function() {
    if(false) {
        function f() {
            console.log('I am inside!');
        }
    }
    f();  //f is not a function
})();
```

## const命令
##### 声明常量
    - 改变常量的值会报错 TypeError: Assignment to constant variable
##### 只声明不赋值，会报错
```js
const foo;
//SyntaxError: Missing initializer in const declaration
```
+ 与let相同，只在声明所在的块作用域内有效
+ const声明的常量不提升，同样存在暂时性死区，只能在声明的位置后面使用。
+ 不可重复声明
+ 对于原始值来说，保证值是固定的，对于引用值来说，指针是固定的（总是指向一个固定的地址）

##### 将对象冻结
```js
const foo = Object.freeze({});

//常规模式下，下面一行不起作用
//严格模式下，该行会报错
foo.prop = 123;
```

##### 除了将对象本身冻结，对象的属性也应该冻结。
```js
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach(key, i) => {
        if(typeof obj[key] === 'object') {
            constantize(obj[key])
        }
    }
}
```

# 解构

ES6允许按照一定的模式，从数组和对象中，对变量进行赋值，这被称为解构（Destructuring）
## 数组的解构赋值
1. 有顺序，按照对应的位置对数组进行赋值
2. 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值
```js
function* fibs() {  //Generator函数，原生具有Iterator接口
    let a = 0;
    let b = 1;
    while(true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
let [first, second, third, fourth, fifth, sixth] = fibs();

```
### 基本用法

#### 模式匹配

```js
let [a, b, c] = [1, 2, 3];

let [x, , y] = [1, 2, 3];
// x  --> 1   y --> 3

let [head, ...tail] = [1, 2, 3, 4];
// head  1
// tail  [2, 3, 4]
```


##### 可以嵌套数组进行结构

```js
let [a, [b], d] = [1, [2, 3], 4];
// a  1
// b  2
// d  4
```

##### 解构不成功，变量的值就等于undefined
```js
let [foo] = [];
let [bar, foo] = [1];

// 以上两种情况，foo的值都为undefined,而且，如果两种情况同时声明会报错
```

##### 不完全解构
```js
let [x, y] = [1, 2, 3];
// x 1
// y 2
```

```js
let [a, [b], d] = [1, [2, 3], 4];
// a 1
// b 2
// d 4
```

###### 如果等号右边不是数组，或者说不是可遍历的结构，那么将会报错
```js
let [num] = 1;
let [bool] = false;
let [nan] = NaN;
let [unde] = undefined;
let [kong] = null;
let [obj] = {};

// 前五个不具备Iterator接口，最后一个表达式本身不具备Iterator接口（为什么对象不具备Iterator接口）
```

##### set结构，也可以用数组的解构赋值
```js
let [x, y, z] = new Set(['a', 'b', 'c']); //返回一个对象
// x  'a'
```

##### 解构赋值允许指定默认值，变量的值全等于===undefined，默认值生效

##### 默认值可以是其他变量，但是该变量必须已经声明



## 对象的解构赋值
变量必须与属性同名，才能取到正确的值

## 应用
1. 变量交换
2. 从函数返回多个值
```js
function add([x, y]) {
    return x + y;
}
add([1, 2]);
```

3. 函数参数的定义
```js
[[1, 2], [3, 4]].map(([a, b]) => a + b);
```

```js
function move({x, y} = {x: 0, y: 0}) {
    return [x, y];
}


```

##### 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
```js
let arr = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr;
// first  1
// last   3
```

对象解构时，等号左边可以是数组
数组解构时，等号左边不可以写对象形式

##### set结构，也可以用数组的解构赋值
```js
let [x, y, z] = new Set(['a', 'b', 'c']); //返回一个对象
// x  'a'
```

# 数组的扩展
##### 扩展运算符
```js
let arr = [1, 3, 4];
console.log(...arr);
// 1, 3, 4
```

###### 复制数组
```js
var arr1 = [1, 4, 8];
var arr2 = [...arr1];
console.log(arr2);
```

##### 合并数组
```js
let arr1 = [1, 2, 3];
let arr2 = ['a', 'b', 'c'];
let newArr = [...arr1, ...arr2];
```

##### 与解构赋值一起使用
```js
// 扩展运算符必须是最后一个元素
let [x, y, ...z] = [1, 2, 4, 8, 9, 0];
console.log(x, y, z);
// 1, 2, [4, 8, 9, 0];
```

##### 把伪数组转换成真正的数组
```js
let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}

console.log(Array.from(obj));
```

```js
let obj = {
    length: 3,
}

console.log(Array.from(obj)); 
// [undefined, undefined, undefined]
```



# promise

### promise是什么？

promise：是一个构造函数，用new来调用，

可以看做一个密闭的容器，内部封装异步的操作并可以获取其结果

#### 异步操作有哪些？

setTimeout setInterval ajax 图片加载 文件操作

### promise 解决什么问题？

回调地域问题（回调函数的深层嵌套），不便于阅读，不便于异常处理, 每一个函数都要处理一下异常

回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件



promise链式调用 ---> async / await

## 状态
### pending  fulfilled  rejected



状态的改变是单向的，不可逆的
```js
// 参数是一个回调函数，回调函数有两个参数，第一个是解决，第二个拒绝
// 这个回调函数是一个同步函数，异步方法写在这个函数里面

new Promise ((resolve, reject) => {
    // 延时器相当于一个异步方法
    
    setTimeout(() => {
      resolve();  
    },)
})

new Promise ((resolve, reject) => {
    resolve();
    reject();  
    //只会执行第一个
})
```

```js
console.log(
    new Promise((resolve, reject) =>{
        reject('拒绝状态');
    }).then(value => {
        console.log(value);
    }, reason => {
        console.log(reason);
    })
)

// then 如果返回一个值的话，下一个then的会接收，返回一个promise的话，由这个promise调用下一个then
```

### promise 状态改变

pending ---> fulfilled

pending ---> rejected

`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。

在es6中，为了行文方便，promise那一章后面的`resolved`统一只指`fulfilled`状态，不包含`rejected`状态。所以有时候也会用resolved 表示已解决

### promise 的原型对象（实例）方法

```js
let p1 = new Promise(); 
p1.then();
p1.catch(error => {}); // error 是接收的失败的信息
p1.fanally();   // 不管成功，失败，都会触发
```



```js
new Promise((res, rej) => {
    rej('失败了')
}).catch(error => {
    console.log(error) // '失败了'
})
```

#### Promise.prototype.then

#### Promise.prototype.catch

#### Promise.prototype.finally

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。



`finally`本质上是`then`方法的特例。

```javascript
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。

### promise.all()

参数是一个数组，返回值 promise 实例

数组里面的全部 promise 都是 resolve() 才能执行 then ，否则，执行 catch

```js


function water() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        })
    })
}

function cut() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        })
    })
}

Promise.all([water(), cut()]).then(res= > {
    console.log(res)
}).catch(error => {
    console.log(error);
})
```

```js
Promise.all([axios.get('/banner'), axios.get('/list')]).then(res => {
    res[0] // 轮播图数据
    res[1] // 列表数据
})
```

### Promise.race()

语法同 promise.all() 相同



### Promise.resolve()

```js
const p1 = new Promise((resolve, reject) => {
    resolve(1)
})

const p2 = Promise.resolve(2);
```



### Promise.reject()

```js
const p3 = Promise.reject(3);

p3.catch(reason => {console.log(reason)}) // 3
```



### 任务优先级

同步立刻执行任务
微任务队列  then,改变状态时才会产生微任务
宏任务队列  延时器，定时器


### 宏任务提升原来是误解
```js
let promise = new Promise(resolve => {
    setTimeout(() => {
        console.log('setTimeout');
        resolve();
    }, 1000);
    console.log(1);
}).then(value => console.log('then'));

console.log(2)
```

### 微任务的值如果是一个promise

```js
let p1 = new Promise((resolve, reject) => {
            reject('拒绝')
        })

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(p1);
    }, 1000);
    console.log(1);
}).then(
    value => console.log(value),
    error => console.log(error)
);

// 先报错，然后不报错，可以给p1加上then方法就报错了
```

### then的基本语法

#### 没有状态改变一直向后处理
```js
new Promise((resolve, reject) => {
        reject('涨价了，买不起')
    })
    .then()
    .then(
        value => console.log(value),
        error => console.log(error)
    )
    .then(null, error => console.log(error));
```

#### promise.then也是一个promise

<!-- pending状态 -->
```js
let p1 = new Promise((resolve, reject) => {
            reject('拒绝')
})

let p2 = p1.then(
    value => console.log(value),
    error => console.log(error)
)

console.log(p1);
console.log(p2);
```

```js
let p1 = new Promise((resolve, reject) => {
    reject('拒绝')
})

let p2 = p1.then(
    value => console.log(value),
    error => console.log(error)
) //默认状态下，then返回的是成功，可以在then里面自行return 一个promise

setTimeout(() => {
    console.log(p1);  // Promise {<rejected>: "拒绝"}
    console.log(p2);  // Promise {<resolved>: undefined}  默认状态下，then返回的是成功 
});
```

```js
// then默认返回成功
let p1 = new Promise((resolve, reject) => {
    reject('拒绝')
})

let p2 = p1.then(
    value => console.log(value),
    error => 'houdunren'
).then(value => console.log(value))  
console.log(p2);  // Promise {<pending>}  因为then还没有走，所以是pending状态

// 如果创建一个延时器，打印，就是Promise {<resolved>: undefined}
```

#### 返回值如果不是标准的promise 


### 异步加载图片

```js
function loadImg(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => { //如果加载成功
            resolve(image); //把图片作为参数传过来，
        }

        image.onerror = reject; //如果加载失败

        document.body.appendChild(image);
    })
}

loadImg('img/a.jpg').then(image => {
    image.style.border = '1px solid #abc';
})
```

### promise 定时器

```js
function timeout(delay = 1000) {
    return new Promise(resolve => setTimeout(resolve, delay))
}
timeout(2000).then(() => {
    console.log('hou');
    return timeout(1000)
}).then(value => {
    console.log(123)
})
```

### 构建扁平化的setInterval
```js
function interval(delay = 1000, callback) {
    return new Promise(resolve => {
        let id = setInterval(() => {
            // console.log(1)
            callback(id, resolve);
        }, delay);
    })
}

interval(100, (id, resolve) => {
    console.log(12);
    // 回调函数里面写要执行的代码
    // 比如修改宽度
    // 因为回调函数在定时器里面一直执行，可以一直加加
    // 如果满足某些条件，清除定时器
    if (width == 100) {
        clearInterval(id);
        resolve(div);
    }
}).then(div => {
    return interval(100, (id, resolve) => {
        console.log(12);
        if (width == 100) {
            clearInterval(id);
            resolve(div);
        }

    })
}).then(div => {
    div.style.color = 'red';
})
```

### promise 队列
每个then返回一个新的promise，并且状态必须发生改变

#### 使用map
```js
function queue(num) {
    let promise = Promise.resolve();
    num.map(v => {
        promise = promise.then(_ => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(v);
                    resolve();
                }, 1000);
            })
        })
    })
}
num = [1, 3, 4, 8, 9]
```

#### 使用reduce
```js
function queue(num) {
    let promise = Promise.resolve();
    num.reduce((promise, n) => {
        return promise.then(_ => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(v);
                    resolve();
                }, 1000);
            })
        })
    }, Promise.resolve())
}
num = [1, 3, 4, 8, 9]
```



### Promise 的封装

```js
calss MyPromise{
    constructor(callback) {
        this.status = 'pending';
        this.val = '';  // 成功的信息
        this.error = ''; // 失败的信息
        // 定义两个函数
        const resolve = (val) => {
            if(this.status === 'pending') {
                this.status = 'resolved';
                this.val = val
            }
            
        }
        
        const reject = (error) => {
            if(this.status === 'pending') {
                this.status = 'rejected';
                this.error = error
            }
            
        }
        
        callback(resolve, reject)
    }
    
    then(onResolveFun, onRejectFun) {
        if(this.status === 'resolved') {
            onResolveFun(this.val)
        } else {
            onRejectFun(this.error)
        }
        
    }
}

let p1 = new MyPeomise((resolve, reject) => {
    reject('失败的信息')
})
```







## async

### async 函数执行 会返回一个promise

### await类似then

```js
async function fun() {
    let name = await new Promise(resolve => {
        setTimeout(() => {
            // 因为await相当于then，如果promise里面没有状态改变，then无法执行，所以打印name没有效果
        }, 1000);
    })
    console.log(name);
}

fun();

async function fun() {
    let name = await new Promise(resolve => {
        setTimeout(() => {
            resolve(123);  // 状态发生改变
        }, 1000);
    })
    console.log(name);  //123
}

fun();
```

### await必须写在async里面
```js
async function sleep(delay = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}

async function show() {
    for (const user of ['123', '456']) {
        await sleep();
        console.log(user);
    }
}

show();
```





## event loop  事件循环

> + js执行机制
>   + 解释性，单线程
> + js 任务
>   + 同步任务
>   + 异步任务
>     + 宏任务 ：setTimeout setInterval
>     + 微任务 ：.then catch finally

#### 规则

遇到同步任务直接执行

遇到宏任务不执行，把它推进宏任务队列

遇到微任务不执行，把它推进微任务队列

等待同步任务全部执行完毕，去执行微任务队列，再等微任务队列执行完毕后，再去宏任务队列里执行相应的宏任务



# js异步编程的方法



+ 回调函数
+ 事件监听
+ Promise
+ Generator
+ async/await



## 同步编程和异步编程的区别

### 同步

同步就是在执行某段代码的时候，在该代码没有得到返回结果之前，其他代码暂时是无法执行的，但是一旦执行完拿到返回值之后，就可以执行其他代码了



### 异步

就是当某一代码执行异步过程调用发出后，这段代码不会立刻得到返回结果。而是在异步调用发出之后，一般通过回调函数处理这个调用之后拿到的结果

异步调用发生之后，不会阻塞后面代码的执行



## js编程中为什么需要异步？

js是单线程的

如果js都是同步代码执行可能会造成阻塞，比如请求数据，数据非常多

使用异步就不会造成阻塞，因为异步不需要等待异步地执行的返回结果，可以继续执行该异步任务之后的代码逻辑



### 回调函数

异步回调如果层级很少，可读性和代码的维护性暂时还是可以接收，一旦层级变多就会陷入回调地域



### Genetator

Generator 最大的特点就是可以交出函数的执行权

Generator 函数可以看出是异步任务的容器需要暂停的地方，都用 yield 语法来标注

Generator 返回迭代器



### async/await

async 是 Generator 函数的语法糖

async / await 的优点是代码清晰

可以处理回调地域的问题

可读性接近同步代码，更容易阅读



| js异步编程方式 | 简单总结                                                  |
| -------------- | --------------------------------------------------------- |
| 回调函数       | 早些年js异步编程采用的方式                                |
| Promise        | es6新增异步编程方式，解决回调地域问题                     |
| Generator      | 和yield配合使用，返回的是迭代器                           |
| async/await    | 二者配合使用，async返回的是promise对象，await控制执行顺序 |



## 如何理解Promise

语法上说，promise是一个对象，从它可以获取异步操作的消息

简单来说，它就是一个容器，里面保存着某个未来才会结束的事件的结果

### promise如何解决回调地域

promise利用三大技术手段来解决回调地域：回调函数延迟绑定、返回值穿透、错误冒泡



```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json')
}).then(data => {
    return readFilePromise('3.json')
}).then(data => {
    return readFilePromise('4.json')
}).catch(err => {
    // 前面产生的错误一直被传递，被catch接收到
})
```



### promise 的静态方法

#### Promise.all(iterable)

参数是一个可迭代对象，比如说数组

这个方法对于汇总多个promise的结果很有用

在es6中可以将多个promise.all异步请求并行操作

`Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，就会先调用下面讲到的`Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。

1. 当所有结果成功返回时按照请求顺序返回成功
2. 当其中有一个方法失败时，进入失败方法



##### 代码示例

```js
// 获取轮播数据列表
function getBannerList() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('轮播数据')
        }, 3000)
    })
}

// 获取店铺列表
function getStoreList() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('店铺数据')
        }, 500)
    })
}

// 获取分类列表
function getCategoryList() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('分类数据')
        }, 700)
    })
}

function initLoad() {
    Promise.all([getBannerList(), getStoreList(), getCategoryList()]).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

initLoad()
```



#### Promise.allSettled

Promise.allSettled 的语法及参数跟 Promise.all 类似

参数：接收一个 Promise 数组，返回一个新的 Promise

当Promise.allSettled 全部处理完成后，我们可以拿到每个Promise 的状态，而不管其是否处理成功



##### 代码示例

```js
const resolved = Promise.resolve(2);

const rejected = Promise.reject(-1);

const addSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
    console.log(results);
})

// 打印结果
// [
// {status: 'fulfilled', value: 2},
// {status: 'rejected', reason: -1}
// ]
```



#### Promise.any(iterable)

参数 iterable 可迭代的对象，例如Array

 Promise.any方法返回一个Promise，只要参数Promise实例有一个变成fullfilled状态，最后any返回的实例就会变成fullfilled状态，如果所有参数Promise实例都变成rejected状态，包装实例就变成了rejected状态



##### 代码示例

`````js
const resolved = Promise.resolve(2);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.any([resolved, rejected]);

allSettledPromise.then(function(results) {
    console.log(results); // 打印：2
})
`````



#### Promise.race(iterable)

参数：iterable 可迭代对象，例如Array

Promise.race 方法返回一个Promise，只要参数的Promise之中，有一个实例率先改变，则race方法的返回状态就跟着改变

`Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，就会先调用下面讲到的`Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。

##### 代码实例

对于图片懒加载特别适合用rece方法来解决

将图片请求和超时判断放到一起，用 race 来实现图片的超时判断。

```js
// 请求某个图片资源
function requestImg() {
    var p = new Promise(function(resolve, reject) => {
    	var img = new Image();
    	img.onload = function(){resolve(img)};
    	img.src = 'http://www.baidu.com/img/flexible/logo/pc/result.png';
    })
    return p;
}

// 延时函数，用于给请求计时
function timeout() {
    var p = new Promise(function(resolve, reject){
        setTimeout(function() {reject('图片请求超时');}, 5000);
    })
    return p;
}

Promise.race([requestImg(), timeout()])
.then(function(results) {
    console.log(results);
})
.catch(function(reason) {
    console.log(reason)
})
```



| Promise静态方法 |                           简单总结                           |
| :-------------: | :----------------------------------------------------------: |
|       all       | 参数所有返回结果为成功才返回，只要有一个失败方法，就进入失败 |
|   allSettled    |       参数不论返回结果是否成功，都返回每个参数执行状态       |
|       any       |         参数中只要有一个成功，就返回该成功的执行结果         |
|      race       |        顾名思义，返回最先返回执行成功的参数的执行结果        |



## Generator、Async/await

### Generator

Generator(生成器) 是一个带*号的函数

可以配合yield关键字来暂停或者执行函数

ES6 没有规定，`function`关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

```javascript
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在`function`关键字后面。



#### 代码实例

```js
function* gen() {
    console.log('enter');
    let a = yield 1;
    let b = yield(function() {return 2});
    return 3;
}

var g = gen(); //调用gen(),程序会阻塞住，不会执行任何语句，打印的enter也不会执行
console.log(typeof g); // 返回'object'，这里不是'function'
console.log(g.next()); // 程序继续执行，直到遇到yield关键字是执行暂停，也就是第一个yield会执行，返回一个对象{done: false, value: 1}
console.log(g.next()); // {done: false, value: f()}
console.log(g.next()); // {done: true, value: 3}
console.log(g.next()); // {done: true, value: undefined}
```

![image-20210313205500424](C:\Users\Lmljhlb\AppData\Roaming\Typora\typora-user-images\image-20210313205500424.png)



yield 也是ES6的新关键字，配合Generator 执行以及暂停

yield关键字最后返回一个迭代器对象

该对象有 value(代表返回值) 和 done(代表是否完成) 属性



##### 多个Generator配合yield的使用

通过调用next() 方法按进度执行

```js
function* gen1() {
    yield 1;
    yield* gen2();
    yield 4;
}

function* gen2() {
    yield 2;
    yield 3;
}

var g = gen1();
```



### thunk 函数

用判断数据类型来举例

```js
let isString = (obj) => {
    return Object.prototype.toString.call(obj) === '[object String]';
}

let isFunction = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Function]';
}

let isArray = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
```



将上述代码做一个封装

```js
let isType = (type) => {
    return (obj) => {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}

let isString = isType('String');
let isArray = isType('Array');

isString('123'); // true
isArray([1, 3, 4]); // true
```



thunk 函数的基本思路都是接收一定的参数，会生产出定制化的函数，最后使用定制化的函数去完成想要实现的功能



#### Generator 与 thunk 结合

以文件操作的代码为例

```js
const readFildThunk = (filename) => {
    return (callback) => {
        fs.readFild(filename, callback);
    }
}

const gen = function* () {
    const data1 = yield readFileThunk('1.txt');
    console.log(data1.toString());
    const data2 = yield readFileThunk('2.txt');
    console.log(data2.toString());
}

let g = gen();
g.next().value((err, datal) => {
    g.next(data1).value(err, data2) => {
        g.next(data2);
    }
})
```

对上述代码进行优化

```js
function run(gen) {
    const next = (err, data) => {
        let res = gen.next(data);
        if(res.done) return;
        res.value(next)
    }
    
    next();
}

run(g);
```



#### Generator 和 Promise 结合

```js
const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    }).then(res => res);
}

let g = gen();

// 这一部分和上面thunk的方式一样
function run(gen) {
    const next = (err, data) => {
        let res = gen.next(data);
        if(res.done) return ;
        res.value.then(next);
    }
    next();
}
run(g);
```



### co函数库

用于处理generator函数的自动执行

```js
const co = require('co');
let g = gen();
co(g).then(res => {
    console.log(res);
})
```



#### co函数自动执行generator函数的原理

+ 因为Generator函数自身就是一个异步操作的容器，





# 普通函数和箭头函数的区别

+ 最明显的区别，箭头函数可以没有function关键字定义，可以省略function

+ 箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象

  + 在普通函数中，this的指向是可变的，但是在箭头函数中，它是固定的

  + 箭头函数绑定了父级作用域的上下文。箭头函数中的this指向函数定义时所在的对象，箭头函数的this指向固定化，不是因为箭头函数内部有绑定this的机制，是因为箭头函数根本没有自己的this。导致内部的this就是外层代码块的this。正是因为它没有this，所以就不能被当做构造函数

    script 标签相当于一个代码块，this指向window，所以打印出来的是window对象

    ```html
    <script>
        const fun = () => {
            console.log(this); // window对象
        }
        fun()
    </script>
    ```

    ```html
    <script>
        const fun = () => {
            console.log(this); // window对象
        }
        fun.call({id: 123}) // 箭头函数就没有this，也没有改变this指向一说
    </script>
    ```

    ```html
    <script>
        function fun() {
            return function (){
                return () => {
                    console.log(this);
                }
            }
        }
    
        let fn = fun.call({id:3});
    
        fn.call({id:3})(); // 打印出来{id: 3}
        fn()(); // 打印出来window对象
    <script>
    ```

    

+ 不可以当做构造函数，也就是说，不可以使用new 命令，否则会抛出一个错误

+ 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest[rest] 参数代替

+ 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

+ 因为箭头函数没有自己的this，所以当然不能用call bind apply这些方法改变this指向



# import 和 export

es6和node的导出和导入

## es6

1.export default

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

如：

```
import Vue from 'vue'
```

vue里面的第三方模块都是用了这个

使用import 不带{ }如上，一定要用export default 导出，不能用export导出；

显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。

export defalut 只能用import boy from '模块路径'，不能带{}

所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

输出一个叫做`default`的变量，对外借口就为default

2. export

export 导出的一定是类对象的像是

```
export var name = "liuyang"
或
var boy = 'liuyang'
export {boy}
或
var boy = 'liuyang'
var gril = 'guo'
export {boy, girl}
```



这时在导入时也一定要import {boy} from '模块路径'

export本质是暴露出对外的接口，它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

3. import

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

如：

```
import  {boy} from '模块路径'
```

大括号里面的变量名，必须与被导入模块对外接口的名称相同，

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js`后缀可以省略。

如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。



## node

**Node** 

1.exports

如：

```
var boy = 'liuyang'
exports.boy = boy
```

 

exports.'接口名' = 对象

导入时，用var ex = require('模块路径')，加载模块就可以用ex.boy调用接口

当需要导入一个模块的多个方法时可以用

```
var {boy, girl} = require('模块路径')
```

 

2.module.exports

用于直接导出对象可以直接用

```
//-------test.js------
var boy = 'liuyang'
module.exports = boy

------------main.js-------
var b = require('./test')
console.log(b)
//------结果liuayang----
```



# 模块规范

在node.md中
