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

ES5 只有两种声明变量的方法：var命令和function命令。
ES6 声明变量的六种方法: ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。

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

## 之前用var声明变量引起的问题

1. 允许重复的变量声明：导致数据被覆盖

    ```js
    var a = 1;
    function print() {
        console.log(a);
    }
    // 假设这里有一千行代码
    var a = 2;
    print();
    ```

2. 变量提升

+ 怪异的数据访问

    ```js
    if (Math.random() < 0.5) {
        var a = "abc";
        console.log(a);
    } else {
        console.log(a);
    }
    console.log(a);
    ```

+ 闭包问题

    ```js
    var div = document.getElementById("divButtons")

    for (var i = 1; i <= 10; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = "按钮" + i;
        div.appendChild(btn);
        btn.onclick = function () {
            console.log(i); //输出11
        }
    }

    // 循环结束后，i：11
    ```

3. 全局变量挂载到全局对象：全局对象成员污染问题

    ```js
    var abc = "123";
    console.log(window.abc);

    var console = "abc"; // 直接就把 window 的 console 覆盖了

    console.log(console) // 直接报错，console.log 不能用了

    ```

## 块级作用域
+ 代码执行时遇到花括号，会创建一个块级作用域，花括号结束，销毁块级作用域
  ```js
    let a = 123; // 全局作用于定义a
    {
        let a = 546; // 块级作用域定义a
        console.log(a); // 546
    }
    console.log(a) // 123
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
+ let实际上是为JavaScript新增了块级作用域
+ let关键字可以将变量绑定到所在的任意作用域中（通常是{ .. }内部）
+ 块级作用域的出现使得获得广泛应用的匿名立即执行函数表达式（匿名IIFE）不再必要了
+ 有作用域链
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

# let命令

+ for循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。在循环中，用let声明的循环变量，会特殊处理，每次进入循环体，都会开启一个新的作用域，并且将循环变量绑定到该作用域（每次循环，使用的是一个全新的循环变量）。在循环中使用let声明的循环变量，在循环结束后会销毁
    ```js
    for(let i = 0; i < 5; i ++) {
        let i = 'abc';
        console.log(i); // abc 使用的是当前作用域中的i
    }
    ```
    上述代码正确运行，输出了3次'abc'。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域

    ```js
    // Uncaught ReferenceError: Cannot access 'i' before initialization
    for(let i = 0; i < 5; i ++) {
        console.log(i); // 使用的是当前作用域中的i
        let i = 'abc';
    }
    ```

+ let 声明的变量不会挂载到全局对象上
+ 不存在变量提升
    ```js
    console.log(a);
    let a = 123;

    // Uncaught ReferenceError: Cannot access 'a' before initialization 不能在初始化之前使用a
    ```
    这里有个小细节，报错信息并不是**a没有被定义，而是不能在初始化之前使用**。在底层实现上，let 和 const 声明的变量也会有提升，但是提升后会将其放到**暂时性死区**，如果访问的变量位于暂时性死区，则会报错：“Cannot access 'a' before initialization”。当代码运行到该变量的声明语句时，会将其从暂时性死区中移除。
+ 暂时性死区（temporal dead zone，简称 TDZ）
  + ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
  + 有些‘死区’比较隐蔽，不容易被发现

    ```js
    var tem = 123;
    if(true) {
        console.log(tem);  // Uncaught ReferenceError: Cannot access 'tem' before initialization 不能在初始化之前使用a
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

    ```js
    function bar(x = y, y = 2) {  //报错内容和上述一样
        return [x, y];
    }
    bar();
    ```

+ 用 typeof就会报错
    ```js
    typeof a; //报错
    let a = 123;
    ```

+ 在同一个作用域内不能重复声明
    ```js
    let a = 123;
    let a = 456;  //Uncaught SyntaxError: Identifier 'a' has already been declared
    ```

+ 不能在函数内部重复声明参数
    ```js
    function fun(arg) {
        let arg; //Uncaught SyntaxError: Identifier 'arg' has already been declared
    }
    fun();
    ```

# const命令

+ 声明常量
    - 改变常量的值会报错 TypeError: Assignment to constant variable
+ 只声明不赋值，会报错
    ```js
    const foo;
    //SyntaxError: Missing initializer in const declaration
    ```
+ const和let完全相同，仅在于用const声明的变量，必须在声明时赋值，而且不可以重新赋值。
+ 不可重复声明
+ 对于原始值来说，保证值是固定的，对于引用值来说，指针是固定的（总是指向一个固定的地址）。常量不可变，是指声明的常量的内存空间不可变，并不保证内存空间中的地址指向的其他空间不可变。
+ 将对象冻结
    ```js
    const foo = Object.freeze({});

    //常规模式下，下面一行不起作用
    //严格模式下，该行会报错
    foo.prop = 123;
    ```

+ 除了将对象本身冻结，对象的属性也应该冻结。
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
+ 在for循环中，循环变量不可以使用常量，for in 循环可以
    ```js
    var obj = {
        name:"kevin",
        age:1
    }

    for (const prop in obj) {
        console.log(prop)
    }
    ```
+ 常量的命名
  + 特殊的常量：该常量从字面意义上，一定是不可变的，比如圆周率、月地距地或其他一些绝不可能变化的配置。通常，**该常量的名称全部使用大写，多个单词之间用下划线分割**
  + 普通的常量：使用和之前一样的命名即可

实际上，在开发中，应该尽量使用const来声明变量，以保证变量的值不会随意篡改，原因如下：

1. 根据经验，开发中的很多变量，都是不会更改，也不应该更改的。
2. 后续的很多框架或者是第三方JS库，都要求数据不可变，使用常量可以一定程度上保证这一点。

# 函数 -> es6对函数的支持

## 参数默认值

在书写形参时，直接给形参赋值，附的值即为默认值

这样一来，当调用函数时，如果没有给对应的参数赋值（给它的值是undefined），则会自动使用默认值。

### 参数默认值对arguments的影响

在严格模式下，arguments和形参是脱离的，也就是说arguments的值和形参不统一

只要给函数加上参数默认值，该函数会自动变为严格模式下的规则：arguments和形参脱离

所以有默认值的时候，arguments和形参不要混用

+ 有默认值
    ```js
    function test(a, b = 1) {
        console.log("arugments", arugments); // [1, 2]
        console.log("a:", a, "b:", b); // a: 1 b: 2
        a = 3;
        console.log("arugments", arguments[0], arguments[1]); // [1, 2]
        console.log("a:", a, "b:", b); // a: 3 b: 2
    }

    test(1, 2);
    ```

+ 没有默认值
    ```js
    function test(a, b) {
        console.log("arugments", arugments); // [1, 2]
        console.log("a:", a, "b:", b); // a: 1 b: 2
        a = 3;
        console.log("arugments", arguments[0], arguments[1]); // [3, 2]
        console.log("a:", a, "b:", b); // a: 3 b: 2
    }

    test(1, 2);
    ```


### 留意暂时性死区

形参和ES6中的let或const声明一样，具有作用域，并且根据参数的声明顺序，存在暂时性死区。

```js
function test(a = b, b) {
    console.log(a, b);
}

test(undefined, 2); // Uncaught ReferenceError: Cannot access 'b' before initialization
```

```js
function test(a, b = a) {
    console.log(a, b);
}

test(undefined, 2); // undefined 2

test(2); // 2, 2
```

## 剩余参数

arguments的缺陷：
1. 如果和形参配合使用，容易导致混乱
2. 从语义上，使用arguments获取参数，由于形参缺失，无法从函数定义上理解函数的真实意图


ES6的剩余参数专门用于收集末尾的所有参数，将其放置到一个形参数组中。

```js
function sum(...rest){
    console.log(rest);
}

sum(1, 2, 3, 4); // [1, 2, 3, 4];
sum(); // []
```

**细节：**

1. 一个函数，仅能出现一个剩余参数
2. 一个函数，如果有剩余参数，剩余参数必须是最后一个参数

    ```js
    function sum(a, b, ...rest){
        console.log(rest); 
    }

    sum(1, 2, 3, 4); // [3, 4];
    sum(1, 2); // []
    sum(); // []
    ```

## 明确函数的双重用途

ES6提供了一个特殊的API，可以使用该API在函数内部，判断该函数是否使用了new来调用

```js
new.target 
//该表达式的值，得到的是：如果没有使用new来调用函数，则返回undefined
//如果使用new调用函数，则得到的是new关键字后面的函数本身
```

```js
function Person(firstName, lastName) {
    //判断是否是使用new的方式来调用的函数

    // //过去的判断方式 只能通过this指向来判断
    // if (!(this instanceof Person)) {
    //     throw new Error("该函数没有使用new来调用")
    // }

    console.log(new.target);

    // 直接语法上判断有没有使用new
    if (new.target === undefined) {
        throw new Error("该函数没有使用new来调用")
    }

    // 如果不用 new 的话，this 指向遵循普通函数this指向规则
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
}

const p1 = new Person("袁", "进");
console.log(p1); // Person

const p2 = Person("袁", "进");
console.log(p2); // undefined

const p3 = Person.call(p1, "袁", "进");
console.log(p3); // undefined
```

## 箭头函数

### 回顾：普通函数this指向

1. 通过对象调用函数，this指向对象 -> 谁调用的这个函数，函数里面的this就指向谁
2. 直接调用函数，this指向全局对象 -> 相当于是全局调用
3. 如果通过new调用函数，this指向新创建的对象
4. 如果通过apply、call、bind调用函数，this指向指定的数据
5. 如果是DOM事件函数，this指向事件源

关于this指向

```js
const obj = {
    count: 0,
    start: function () {
        console.log(this); // obj
        setTimeout(function () {
            console.log(this); // window setTimeout 里面的回调函数相当于 js 引擎内部调用
        }, 1000);
    },
};
obj.start();
```

```js
const obj = {
    count: 0,
    start: function () {
        console.log(this); // window
        setTimeout(function () {
            console.log(this); // window
        }, 1000);
    },
    print: () => {
        console.log(this); // window
    }
};

const start1 = obj.start;
const print1 = obj.print;

start1();
print1();

```

```js
const obj = {
    count: 0,
    start: function () {
        console.log(this); // obj
        setTimeout(() => {
            console.log(this); // obj
        }, 1000);
    },
};

obj.start();
```

```js
const obj = {
    count: 0,
    start: () => {
        console.log(this); // window
        setTimeout(() => {
            console.log(this); // window
        }, 1000);
    },
};

obj.start();
```

```js
const obj = {
    count: 0,
    regEvent: function () {
        console.log(this); // obj
        window.onclick = () => {
            console.log(this); // obj
        };
    },
};

obj.start();
```

```js
const obj = {
    count: 0,
    regEvent: () => {
        console.log(this); // window
        window.onclick = () => {
            console.log(this); // window
        };
    },
};

obj.regEvent();
```

```js
function abc() {
    console.log(this); // obj1
    const obj = {
        count: 0,
        regEvent: () => {
            console.log(this); // obj1
            window.onclick = () => {
                console.log(this); // obj1
            };
        },
    };

    obj.regEvent();
}

const obj1 = {
    abc,
};

obj1.abc();
```

### 应用场景

1. 临时性使用的函数，并不会可以调用它，比如：
   1. 事件处理函数
   2. 异步处理函数
   3. 其他临时性的函数
2. 为了绑定外层this的函数
3. 在不影响其他代码的情况下，保持代码的简洁，最常见的，数组方法中的回调函数

### 普通函数和箭头函数的区别

+ 最明显的区别，箭头函数可以没有function关键字定义，可以省略function
+ 箭头函数中，不存在this、arguments、new.target，如果使用了，则使用的是函数外层的对应的this、arguments、new.target

    ```js
    const obj = {
        method: function () {
            const func = () => {
                console.log(this); // obj
                console.log(arguments); // [234]
            };
            func();
        },
    };
    obj.method(234);
    ```
+ 箭头函数没有原型
+ 不可以当做构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误
+ 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest[rest] 参数代替
+ 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
+ 因为箭头函数没有自己的this，所以当然不能用call bind apply这些方法改变this指向
+ 箭头函数是函数表达式，理论上，任何使用函数表达式的场景，都可以使用箭头函数。普通函数有函数声明，也有函数表达式
+ 箭头函数体内的 this 对象，就是函数定义时所在的对象，而不是使用时所在的对象
  + 在普通函数中，this 的指向是可变的，但是在箭头函数中，它是固定的
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
    </script>
    ```

# 对象

## 新增的对象字面量语法

1. 成员速写
   
   如果对象字面量初始化时，成员的名称来自于一个变量，并且和变量的名称相同，则可以进行简写

    ```js
    function createUser(loginId, loginPwd, nickName) {
        const sayHello = function () {
            console.log("loginId", this.loginId, "nickname", this.nickName)
        }
        return {
            loginId,
            loginPwd,
            nickName,
            sayHello,
            id: Math.random()
        }
    }
    const u = createUser("abc", "123", "aaa");
    u.sayHello();
    ```

2. 方法速写
   对象字面初始化时，方法可以省略冒号和function关键字
    ```js
    const user = {
        name: "姬成",
        age: 100,
        sayHello(){
            console.log(this.name, this.age)
        }
    }
    user.sayHello();
    ```

3. 计算属性名
   
   有的时候，初始化对象时，某些属性名可能来自于某个表达式的值，在ES6，可以使用中括号来表示该属性名是通过计算得到的。

    ```js
    const prop1 = "name2";
    const prop2 = "age2";
    const prop3 = "sayHello2";

    const user = {
        [prop1]: "姬成",
        [prop2]: 100,
        [prop3](){
            console.log(this[prop1], this[prop2])
        }
    }

    user[prop3]();

    console.log(user)
    ```

## Object的新增API

+ Object.is
   
    用于判断两个数据是否相等，基本上跟严格相等（===）是一致的，除了以下两点：NaN和NaN相等 +0和-0不相等
  
    ```js
    console.log(NaN === NaN); // false
    console.log(+0 === -0); // true

    console.log(Object.is(NaN, NaN)); // ture
    console.log(Object.is(+0, -0)); // false
    ```

+ Object.assign

    用于混合对象, 是浅拷贝

    ```js
    const obj1 = {
        a: 123,
        b: 456,
        c: "abc"
    }

    const obj2 = {
        a: 789,
        d: "kkk"
    }

    // 将obj2的数据，覆盖到obj1，并且会对obj1产生改动，然后返回obj1
    // 一般的处理方式，是把第一个参数，写成一个空的对象, 或者用对象扩展运算符
    // const obj = Object.assign({}, obj1, obj2);
    const obj = Object.assign(obj1, obj2);

    console.log(obj === obj1); // ture;
    ```

+ Object.getOwnPropertyNames 的枚举顺序

    Object.getOwnPropertyNames方法之前就存在，只不过，官方没有明确要求，对属性的顺序如何排序，如何排序，完全由浏览器厂商决定。
    枚举的是对象的属性，不是对象原型链上的属性

    ES6规定了该方法返回的数组的排序方式如下：

    - 先排数字，并按照升序排序
    - 再排其他，按照书写顺序排序

    ```js
    const obj = {
        d: 1,
        b: 2,
        a: 3,
        0: 6,
        5: 2,
        4: 1,
    };
    const props = Object.getOwnPropertyNames(obj);
    console.log(props); // ['0', '4', '5', 'd', 'b', 'a']
    ```

+ Object.setPrototypeOf

    该函数用于设置某个对象的隐式原型

    ```js
    const obj1 = {
        a: 1
    }

    const obj2 = {
        b: 2
    }

    // 把 参数2 设置为 参数1 的隐式原型
    // 相当于 obj1.__proto__ = obj2
    Object.setPrototypeOf(obj1, obj2)

    console.log(obj1, obj1.__proto__);
    ```

## 面向对象简介

面向对象：一种编程思想，跟具体的语言无关

【大象装冰箱】
- 面向过程：思考的切入点是功能的步骤
    ```js
    //1. 冰箱门打开
    function openFrige(){}
    openFrige();

    //2. 大象装进去
    function elephantIn(){}

    elephantIn();

    //3. 冰箱门关上
    function closeFrige(){}

    closeFrige();
    ```

- 面向对象：思考的切入点是对象的划分
  
  在代码层面可能不是很简洁，但是功能上，更加容易组合和拆分，利于书写大型项目
  
  思考的切入点，不是第一步做什么，第二步做什么，而是程序里面有哪些对象(哪些名词)
    ```js
    // 比如有一头大象，声明一个大象的构造函数
    function Elephant() {}
    var ele = new Elephant();

    // 有一个冰箱，声明一个冰箱的构造函数
    function Frige() {}
    var frig = new Frige();
    // 在构造函数的原型上声明一些方法
    Frige.prototype.openDoor = function () {}
    Frige.prototype.closeDoor = function () {}
    Frige.prototype.join = function(something){}
    Frige.prototype.wholeJoin = function(something) {
        this.openDoor();
        this.useSomething(something);
        this.closeDoor();
    }

    // 1. 冰箱门打开
    frig.openDoor();
    // 2. 大象装进去
    frig.join(ele);
    // 3. 冰箱门关上
    frig.closeDoor();

    // 融合一下
    frig.wholeJoin(ele);
    ```

## 类：构造函数的语法糖

### 传统的构造函数的问题

1. 属性和原型方法定义分离，降低了可读性
2. 原型成员可以被枚举
3. 默认情况下，构造函数仍然可以被当作普通函数使用
   
    ```js
    //面向对象中，将下面对一个对象的所有成员的定义，统称为类

    //构造函数  构造器
    function Animal(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    //定义实例方法（原型方法）
    Animal.prototype.print = function () {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }

    const a = new Animal("狗", "旺财", 3, "男");
    a.print();

    // 原型成员可以被枚举
    // for in 循环只遍历可枚举属性，包括原型链上的可枚举属性
    // https://segmentfault.com/a/1190000022348279
    for (const prop in a) {
        console.log(prop) // type name age sex print
    }
    ```

### 类的特点

1. 类声明不会被提升，与 let 和 const 一样，存在暂时性死区
2. 类中的所有代码均在严格模式下执行（自动加的严格模式）
3. 类的所有方法都是不可枚举的
4. 类的所有方法都无法被当作构造函数使用
5. 类的构造器必须使用 new 来调用
6. 不会被绑定在window上

### 类的其他书写方式

+ 可计算的成员名

    ```js
    const printName = "print";

    class Animal {
        constructor(type, name, age, sex) {
            this.type = type;
            this.name = name;
            this.age = age;
            this.sex = sex;
        }

        [printName]() {
            console.log(`【种类】：${this.type}`);
            console.log(`【名字】：${this.name}`);
            console.log(`【年龄】：${this.age}`);
            console.log(`【性别】：${this.sex}`);
        }
    }

    const a = new Animal("狗", "旺财", 3, "男");
    a[printName]();
    ```

+ getter和setter

    Object.defineProperty 可定义某个对象成员属性的读取和设置
    使用getter和setter控制的属性，不在原型上, 在实例上，是实例的一个不可枚举属性

    ```js
    const printName = "print";

    class Animal {
        constructor(type, name, age, sex) {
            this.type = type;
            this.name = name;
            // 相当于是 set age(age) 执行
            this.age = age;
            this.sex = sex;
        }

        // 创建一个age属性，并给它加上getter，读取该属性时，会运行该函数
        // 通过这种方法创建的属性是不可以枚举属性，_age 是可枚举的
        // 如果只有get，没有set的话会报错 Uncaught TypeError: Cannot set property age of #<Animal> which has only a getter
        get age() {
            return this._age + "岁";
        }

        // 创建一个age属性，并给它加上setter，给该属性赋值时，会运行该函数
        // 通过这种方法创建的属性是不可以枚举属性，_age 是可枚举的
        // 只能有一个参数
        set age(age) {
            if (typeof age !== "number") {
                throw new TypeError("age property must be a number");
            }
            if (age < 0) {
                age = 0;
            } else if (age > 1000) {
                age = 1000;
            }
            this._age = age;
        }

        [printName]() {
            console.log(`【种类】：${this.type}`);
            console.log(`【名字】：${this.name}`);
            console.log(`【年龄】：${this.age}`);
            console.log(`【性别】：${this.sex}`);
        }
    }

    var a = new Animal("狗", "旺财", 3, "男");
    ```

+ 静态成员

    静态成员是构造函数本身的成员，也就是构造函数的属性，因为函数也是一个对象，只能通过构造函数本身访问，不能通过实例访问

    类（class）通过 static 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能。

    ```js
    class Chess {
        constructor(name) {
            this.name = name;
        }

        static width = 50;

        static height = 50;

        // 静态属性调用同一个类中的其他静态属性，可使用 this 关键字。
        static method() {
            console.log(this.width);
        }
    }

    console.log(Chess.width)
    console.log(Chess.height)

    Chess.method();

    ```

+ 字段初始化器（ES7）

    > 注意：
    > + 使用static的字段初始化器，添加的是静态成员
    > + 没有使用static的字段初始化器，添加的属性位于实例对象上
    > + 箭头函数在字段初始化器位置上，添加的属性位于实例对象上

    ```js
    class Test {
        // static key = value
        static a = 1;

        // 直接使用 key = value 的方式 就是 字段初始化器
        b = 2;
        c = 3;

        constructor() {
            // this.d = 2 + 3
            // d 就是 5
            this.d = this.b + this.c;
        }
    }

    const t = new Test();
    console.log(t)

    ```

    ```js
    class Test {
        constructor() {
            // 相当于 this.print = () => {}, 所以 print 方法会绑定在实例对象上 会占用额外的内存空间
            this.a = 123;
        }

        print = () => {
            console.log(this.a);
        };
        print2() {
            console.log(this.a);
        }
        print3() {
            console.log(this.a);
        }
        print4 = () => {
            console.log(this.a);
        }
    }

    const t1 = new Test();
    const p1 = t1.print;
    const p2 = t1.print2; // const 声明，p2 不会绑定在window上面
    var p3 = t1.print3;
    var p4 = t1.print4;
    t1.print(); // 123
    t1.print2(); // 123
    p1(); // 123
    p2(); // 报错 Cannot read properties of undefined (reading 'a') this 指向undefiend 但是我不知道为什么this会是undefined
    p3(); // 报错 Cannot read properties of undefined (reading 'a') this 指向undefiend 但是我不知道为什么this会是undefined
    p4(); // 123
    const t2 = new Test();
    console.log(t1.print === t2.print); // false
    console.log(t1.print2 === t2.print2) // ture
    ```


+ 类表达式

    ```js
    const A = class { //匿名类，类表达式
        a = 1;
        b = 2;
    }

    const a = new A();
    console.log(a)
    ```

+ [扩展]装饰器（ES7）(Decorator)

    对装饰器的实验性支持是一个可能在未来版本中改变的功能。
    装饰器的本质是一个函数，有三个参数

    ```js
    class Test {

        // 装饰器名称是自己定义
        // 语法 @装饰器名称
        @Obsolete
        print() {
            console.log("print方法")
        }
    }

    function Obsolete(target, methodName, descriptor) {
        // function Test
        // print
        // { value: function print(){}, ... }
        console.log(target, methodName, descriptor);
        const oldFunc = descriptor.value
        descriptor.value = function (...args) {
            console.warn(`${methodName}方法已过时`);
            oldFunc.apply(this, args);
        }
    }
    ```

### 类的继承

过去的继承

```js
function Animal(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Animal.prototype.print = function () {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
}

function Dog(name, age, sex) {
    //借用父类的构造函数
    Animal.call(this, "犬类", name, age, sex);
}

Object.setPrototypeOf(Dog.prototype, Animal.prototype);

const d = new Dog("旺财", 3, "公");
d.print();
console.log(d);
```

如果两个类A和B，如果可以描述为：B 是 A，则，A和B形成继承关系

如果B是A，则：

1. B继承自A
2. A派生B
3. B是A的子类
4. A是B的父类

如果A是B的父类，则B会自动拥有A中的所有实例成员。

关键字：

- extends：继承，用于类的定义
- super
  - 直接当作函数调用，表示父类构造函数
  - 如果当作对象使用，则表示父类的原型


> 注意：
> + ES6要求，如果子类写了constructor，则必须在constructor的第一行通过super手动调用父类的构造函数，如果不调用会报错（Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor at new Dog）。
> + 如果子类不写constructor，则会有默认的构造器，该构造器需要的参数和父类一致，并且自动调用父类构造器
> 
>   ```js 
>   class Animal {
>       constructor(type, name, age, sex) {}
>   }
>   class Dog extends Animal {
>       // 如果不写constructor，会自动调用，需要的参数格式和父类一致
>       // constructor(type, name, age, sex) {
>       //     super(type, name, age, sex)
>       // }
>   }
>   ```

```js
class Animal {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    print() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }

    jiao(){
        throw new Error("动物怎么叫的？");
    }
}

class Dog extends Animal {
    constructor(name, age, sex) {
        // super 直接当作函数调用
        super("犬类", name, age, sex);
        // 子类特有的属性
        this.loves = "吃骨头";
    }

    print(){
        //super当作对象用 调用父类原型上的print
        super.print();
        //自己特有的代码
        console.log(`【爱好】：${this.loves}`);
    }


    //同名方法，会覆盖父类
    jiao(){
        console.log("旺旺！");
    }
}

const d = new Dog("旺财", 3, "公");
d.print();
console.log(d)
d.jiao();
```


【冷知识】

- 用JS制作抽象类
  - 抽象类：一般是父类，不能通过该类创建对象
- 正常情况下，this的指向，this始终指向具体的类的对象

```js
class Animal {
    constructor(type, name, age, sex) {
        console.log(new.target)
        console.log(this);
        if (new.target === Animal) {
            throw new TypeError("你不能直接创建Animal的对象，应该通过子类创建")
        }
    }
}

class Dog extends Animal {
    constructor(name, age, sex) {
        super("犬类", name, age, sex);
        // 子类特有的属性
        this.loves = "吃骨头";
    }
}

//下面的代码逻辑有误
const a = new Animal("狗", "旺财", 3, "公"); // Animal 的 constructor 中，new.target 是 Animal 这个类的函数体。 Animal中的this 指向 a
const dog1 = new Dog("旺财", 3, "公"); // new Dog 的时候在 Animal 的 constructor 中，new.target 是 Dog 这个类的函数体。 Animal 中的 this 指向 dog1
```

# 解构

ES6允许按照一定的模式，从数组和对象中，对变量进行赋值，这被称为解构（Destructuring）
使用ES6的一种语法规则，将一个对象或数组的某个属性提取到某个变量中

解构赋值允许指定默认值，变量的值全等于===undefined时，默认值生效，默认值可以是其他变量，但是该变量必须已经声明

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

```js
// 嵌套数组

let [a, [b], d] = [1, [2, 3], 4];
// a  1
// b  2
// d  4
```

```js
let [a, b, c] = [1, 2, 3];

let [x, , y] = [1, 2, 3];
// x -> 1   y -> 3

let [head, ...tail] = [1, 2, 3, 4];
// head  1
// tail  [2, 3, 4]
```

```js
// 解构不成功，变量的值就等于undefined

let [foo] = [];
let [bar, foo] = [1];

// 以上两种情况，foo的值都为undefined,而且，如果两种情况同时声明会报错
```

```js
// 不完全解构

let [x, y] = [1, 2, 3];
// x 1
// y 2
```

```js
// 不完全解构

let [a, [b], d] = [1, [2, 3], 4];
// a 1
// b 2
// d 4
```

```js
// 如果等号右边不是数组，或者说不是可遍历的结构，那么将会报错

let [num] = 1;
let [bool] = false;
let [nan] = NaN;
let [unde] = undefined;
let [kong] = null;
let [obj] = {};

// 前五个不具备Iterator接口，最后一个表达式本身不具备Iterator接口
```

```js
// set结构，也可以用数组的解构赋值

let [x, y, z] = new Set(['a', 'b', 'c']); //返回一个对象
// x  'a'
```

```js
// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
let arr = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr;
// first  1
// last   3
```

```js
// 变量交换
let a = 1, b = 2;
[a, b] = [b, a];
```

## 对象的解构赋值
变量必须与属性同名，才能取到正确的值

```js
const obj = {
    name: "cheng",
    age: 18,
};
console.log(...obj); // Spread syntax requires ...iterable[Symbol.iterator] to be a function
```

```js
const user = {
  name: "kevin",
  age: 11,
  sex: "男",
  address: {
    province: "四川",
    city: "成都",
  },
};
// 先定义4个变量：name、age、gender、address
// 再从对象user中读取同名属性赋值（其中gender读取的是sex属性）
let { name: objName, age, sex: gender = 123, address: { province } } = user;

console.log(objName, age, gender, province); // 如果没有给sex赋值，gender的值就是123
console.log(address); // Uncaught RefrerenceError: address is not defined
```

```js
// 函数参数的结构

function print({ name, age, sex, address: {
    province,
    city
} }) {
    console.log(`姓名：${name}`)
    console.log(`年龄：${age}`)
    console.log(`性别：${sex}`)
    console.log(`身份：${province}`)
    console.log(`城市：${city}`)
}

const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
print(user)

// 默认值

function ajax({
    method = "get",
    url = "/"
} = {}) {
    console.log(method, url)
}

ajax()

function move({x, y} = {x: 0, y: 0}) {
    return [x, y];
}
```

# 数组的扩展

```js
// 扩展运算符

let arr = [1, 3, 4];
console.log(...arr);
// 1, 3, 4
```

```js
function cal(a, b, c, d) {
    return a + b * c - d;
}
//curry：柯里化，用户固定某个函数的前面的参数，得到一个新的函数，新的函数调用时，接收剩余的参数

function curry(func, ...args) {
    return function(...subArgs) {
        const allArgs = [...args, ...subArgs];
        if (allArgs.length >= func.length) {
            //参数够了
            return func(...allArgs);
        } else {
            //参数不够，继续固定
            return curry(func, ...allArgs);
        }
    }
}

const newCal = curry(cal, 1, 2)

console.log(newCal(3, 4)) // 1+2*3-4
console.log(newCal(4, 5)) // 1+2*4-5
console.log(newCal(5, 6)) // 1+2*5-6
console.log(newCal(6, 7)) // 1+2*6-7

const newCal2 = newCal(8)

console.log(newCal2(9)); // 1+2*8-9
```

```js
// 复制数组

var arr1 = [1, 4, 8];
var arr2 = [...arr1];
console.log(arr2);
```

```js
// 合并数组

let arr1 = [1, 2, 3];
let arr2 = ['a', 'b', 'c'];
let newArr = [...arr1, ...arr2];
```

```js
// 与解构赋值一起使用
// 扩展运算符必须是最后一个元素

let [x, y, ...z] = [1, 2, 4, 8, 9, 0];
console.log(x, y, z);
// 1, 2, [4, 8, 9, 0];
```

```js
// 把伪数组转换成真正的数组

let obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}

console.log(Array.from(obj));
let obj = {
    length: 3,
}

console.log(Array.from(obj)); 
// [undefined, undefined, undefined]

```

# Symbol

## 普通符号

符号是ES6新增的一个数据类型，它通过使用函数 ```Symbol(符号描述)``` 来创建

```js
//创建一个符号

const syb1 = Symbol();
const syb2 = Symbol("abc");

console.log(syb1, typeof syb1); // Symbol() 'symbol'
console.log(syb2, typeof syb2); // Symbol(abc) 'symbol'
```

符号设计的初衷，是为了给对象设置私有属性

私有属性：只能在对象内部使用，外面无法使用

符号具有以下特点：
- 没有字面量
- 使用 typeof 得到的类型是 symbol
- **每次调用 Symbol 函数得到的符号永远不相等，无论符号描述是否相同**
  ```js
  const syb1 = Symbol();
  const syb2 = Symbol();

  console.log(syb1 === syb2); // false;
  ```
- 符号可以作为对象的属性名存在，这种属性称之为符号属性
  - 之前说对象的属性名，一定是字符串，现在也可以是符号类型
    ```js
    const syb1 = Symbol();

    const obj = {
        a: 1,
        b: 2,
        [syb1]: 3,
    };

    console.log(obj, obj.syb1, obj[syb1]);
    ```
  - 开发者可以通过精心的设计，让这些属性无法通过常规方式被外界访问
  - 符号属性是不能枚举的，因此在 for-in 循环中无法读取到符号属性，Object.keys 方法也无法读取到符号属性
  - Object.getOwnPropertyNames 尽管可以得到所有无法枚举的属性，但是仍然无法读取到符号属性
  - ES6 新增 Object.getOwnPropertySymbols 方法，可以读取符号
    ```js
    const syb1 = Symbol();

    const obj = {
        a: 1,
        b: 2,
        [syb1]: 3,
    };

    const sybList = Object.getOwnPropertySymbols(obj);

    console.log(sybList[0] === syb1); // true
    ```
- 符号无法被隐式转换，因此不能被用于数学运算、字符串拼接或其他隐式转换的场景，但符号可以显式的转换为字符串，通过 String 构造函数进行转换即可，console.log 之所以可以输出符号，是它在内部进行了显式转换
  - 隐式转换就是 ```+ '1'```, '1' 被隐式转换成数字1

## 共享符号

根据某个符号名称（符号描述）能够得到同一个符号

```js
//获取共享符号
Symbol.for("符号名/符号描述")  

const syb1 = Symbol.for('123');
const syb2 = Symbol.for('123');
console.log(syb1 === syb2);
```

## 知名（公共、具名）符号

知名符号是一些具有特殊含义的共享符号，通过 Symbol 的静态属性得到

ES6 延续了 ES5 的思想：减少魔法，暴露内部实现！

因此，ES6 用知名符号暴露了某些场景的内部实现

1. Symbol.hasInstance

    该符号用于定义构造函数的静态成员，它将影响 instanceof 的判定

    ```js
    obj instanceof A

    //等效于

    A[Symbol.hasInstance](obj) // Function.prototype[Symbol.hasInstance]
    ```

    ```js
    function A() {}

    Object.defineProperty(A, Symbol.hasInstance, {
        value: function () {
            return false;
        },
    });

    const obj = new A();
    console.log(obj instanceof A); // false
    console.log(A[Symbol.hasInstance](obj)); // false
    ```

2. [扩展] Symbol.isConcatSpreadable

    该知名符号会影响数组的 concat 方法

    ```js
    const arr = [3];

    const arr2 = arr.concat(56, [3, 4, 5]);

    console.log(arr2); // [3, 56, 3, 4, 5]
    ```

    ```js
    const arr = [3];

    const arr2 = [4, 5, 6];

    arr2[Symbol.isConcatSpreadable] = false;

    console.log(arr.concat(arr2)); // [3, [4, 5, 6]]
    ```

    ```js
    const arr = [3];

    const obj = {
        0: 4,
        1: 5,
        length: 2,
        [Symbol.isConcatSpreadable]: true,
    }

    console.log(arr.concat(obj)); // [3, 4, 5]
    ```

3. [扩展] Symbol.toPrimitive

    该知名符号会影响类型转换的结果

    ```js
    const obj = {
        a: 1,
        b: 2,
    }

    console.log(obj + 123); // [object Object]123

    const obj2 = {
        a: 1,
        b: 2,
        [Symbol.toPrimitive]: function () {
            return 2;
        },
    };

    console.log(obj2 + 123); // 125
    ```

    ```js
    class Temperature {
        constructor(degree) {
            this.degree = degree;
        }

        [Symbol.toPrimitive](type) {
            if (type === "default") {
                return this.degree + "摄氏度";
            } else if (type === "number") {
                return this.degree;
            } else if (type === "string") {
                return this.degree + "℃";
            }
        }
    }

    const t = new Temperature(30);

    console.log(t + "!"); // 30摄氏度
    console.log(t / 2); // 15
    console.log(String(t)); // 30℃
    ```

4. [扩展] Symbol.toStringTag

    该知名符号会影响 Object.prototype.toString 的返回值

    ```js
    class Person {

        [Symbol.toStringTag] = "Person"
    }

    const p = new Person();

    const arr = [32424, 45654, 32]

    console.log(Object.prototype.toString.apply(p));
    console.log(Object.prototype.toString.apply(arr))
    ```

5. 其他知名符号

# Fetch Api

**XMLHttpRequest的问题**

1. 所有的功能全部集中在同一个对象上，容易书写出混乱不易维护的代码
2. 采用传统的事件驱动模式，无法适配新的 Promise Api

**Fetch Api 的特点**

1. 并非取代 AJAX，而是对 AJAX 传统 API 的改进
2. 精细的功能分割：头部信息、请求信息、响应信息等均分布到不同的对象，更利于处理各种复杂的 AJAX 场景
3. 使用 Promise Api，更利于异步代码的书写
4. Fetch Api 并非 ES6 的内容，属于 HTML5 新增的 Web Api
5. 需要掌握网络通信的知识

## 基本使用

> 请求测试地址：http://study.yuanjin.tech/api/local

使用 `fetch` 函数即可立即向服务器发送网络请求

### 参数

该函数有两个参数：

1. 必填，字符串，请求地址
2. 选填，对象，请求配置

**请求配置对象**

- method：字符串，请求方法，默认值 GET
- headers：对象，请求头信息
- body: 请求体的内容，必须匹配请求头中的 Content-Type
- mode：字符串，请求模式
  - cors：默认值，配置为该值，会在请求头中加入 origin 和 referer
  - no-cors：配置为该值，不会在请求头中加入 origin 和 referer，跨域的时候可能会出现问题
  - same-origin：指示请求必须在同一个域中发生，如果请求其他域，则会报错
- credentials: 如何携带凭据（cookie）
  - omit：默认值，不携带 cookie
  - same-origin：请求同源地址时携带 cookie
  - include：请求任何地址都携带 cookie
- cache：配置缓存模式
  - default: 表示 fetch 请求之前将检查下 http 的缓存.
  - no-store: 表示 fetch 请求将完全忽略 http 缓存的存在. 这意味着请求之前将不再检查下 http 的缓存, 拿到响应后, 它也不会更新 http 缓存.
  - no-cache: 如果存在缓存, 那么 fetch 将发送一个条件查询 request 和一个正常的 request, 拿到响应后, 它会更新 http 缓存.
  - reload: 表示 fetch 请求之前将忽略 http 缓存的存在, 但是请求拿到响应后, 它将主动更新 http 缓存.
  - force-cache: 表示 fetch 请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 除非没有任何缓存, 那么它将发送一个正常的 request.
  - only-if-cached: 表示 fetch 请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 如果没有缓存, 它将抛出网络错误(该设置只在 mode 为”same-origin”时有效).

### 返回值

fetch 函数返回一个 Promise 对象

- 当收到服务器的返回结果后，Promise 进入 resolved 状态，状态数据为 Response 对象
- 当网络发生错误（或其他导致无法完成交互的错误）时，Promise 进入 rejected 状态，状态数据为错误信息

**Response 对象**

- ok：boolean，当响应消息码在 200~299 之间时为 true，其他为 false
- status：number，响应的状态码
- text()：用于处理文本格式的 Ajax 响应。它从响应中获取文本流，将其读完，然后返回一个被解决为 string 对象的 Promise。
- blob()：用于处理二进制文件格式（比如图片或者电子表格）的 Ajax 响应。它读取文件的原始数据，一旦读取完整个文件，就返回一个被解决为 blob 对象的 Promise。
- json()：用于处理 JSON 格式的 Ajax 的响应。它将 JSON 数据流转换为一个被解决为 JavaScript 对象的 promise。
- redirect()：可以用于重定向到另一个 URL。它会创建一个新的 Promise，以解决来自重定向的 URL 的响应。

```js
async function getProvinces() {
    const url = "http://study.yuanjin.tech/api/local";
    const data = await fetch(url, {
        method: "get",
    });
    console.log(data); // response 对象
    const res = await data.json();
    console.log(res);
}

document.querySelector("button").onclick = function () {
    getProvinces();
};
```

### Request 对象

除了使用基本的fetch方法，还可以通过创建一个Request对象来完成请求（实际上，fetch的内部会帮你创建一个Request对象）

```js

// 在 fetch 函数内部，会根据接收到的两个参数创建request对象
fetch(url, config);

// 通过request对象完成请求：new Request(url地址, 配置)
fetch(new Request(url地址, 配置));
```

```js
async function getProvinces() {
    const url = "http://study.yuanjin.tech/api/local";
    const data = await fetch(new Request(url));
    const res = await data.text();
}
```

注意点：

尽量保证每次请求都是一个新的Request对象

### response 对象

有一个Response构造函数

```js
// 模拟服务器的响应结果

async function getResponse() {
    const resp = new Response(
        `[
            {"id":1, "name":"北京"},
            {"id":2, "name":"天津"}
        ]`,
        {
            ok: true,
            status: 200,
        }
    );
    const result = await resp.json();
    console.log(result);
}
getResponse();

```

### Headers 对象

在Request和Response对象内部，会将传递的请求头对象，转换为Headers

```js
const data = await fetch(
    new Request(url, {
        headers: {
            a: 1,
        },
    })
);

// 也可以直接创建一个heasers对象
const headers = new Headers({
    a: 1,
})
console.log(headers.has('a'));

const data2 = await fetch(
    new Request(url, {
        headers,
    })
);
```

Headers对象中的方法：

- has(key)：检查请求头中是否存在指定的key值
- get(key): 得到请求头中对应的key值
- set(key, value)：修改对应的键值对
- append(key, value)：添加对应的键值对
- keys(): 得到所有的请求头键的集合
- values(): 得到所有的请求头中的值的集合
- entries(): 得到所有请求头中的键值对的集合

# 文件上传

流程：

1. 客户端将文件数据发送给服务器
2. 服务器保存上传的文件数据到服务器端
3. 服务器响应给客户端一个文件访问地址

> 测试地址：http://study.yuanjin.tech/api/upload
> 键的名称（表单域名称）：imagefile

请求方法：POST
请求的表单格式：multipart/form-data
请求体中必须包含一个键值对，键的名称是服务器要求的名称，值是文件数据

> HTML5 中，JS 仍然无法随意的获取文件数据，但是可以获取到 input 元素中，被用户选中的文件数据
> 可以利用 HTML5 提供的 FormData 构造函数来创建请求体

```js
function upload() {
    const ipt = document.getElementById("avatar");
    const formData = new FormData(); // 构建请求体
    formData.append("imagefile", ipt.files[0]);
    console.log(formData);
    console.log(ipt.files);

    fetch("http://study.yuanjin.tech/api/upload", {
        method: "post",
        body: formData, // 把body的值设置为formData，会动把请求头的 content-type 值 设置为 multipart/form-data
    }).then((res) => {
        console.log(res);
    });
}
```

# set 集合

> 一直以来，JS只能使用数组和对象来保存多个数据，缺乏像其他语言那样拥有丰富的集合类型。因此，ES6新增了两种集合类型（set 和 map），用于在不同的场景中发挥作用。
>

可以用set对数组和字符串进行去重

**set用于存放不重复的数据**

1. 如何创建set集合

```js
new Set(); //创建一个没有任何内容的set集合

new Set(iterable); //创建一个具有初始内容的set集合，内容来自于可迭代对象每一次迭代的结果

```

2. 如何对set集合进行后续操作

- add(数据): 添加一个数据到set集合末尾，如果数据已存在，则不进行任何操作
  - set使用Object.is的方式判断两个数据是否相同，但是，针对+0和-0，set认为是相等
- has(数据): 判断set中是否存在对应的数据
- delete(数据)：删除匹配的数据，返回是否删除成功
- clear()：清空整个set集合
- size: 获取set集合中的元素数量，只读属性，无法重新赋值

3. 如何与数组进行相互转换

```js
const s = new Set([x,x,x,x,x]);
// set本身也是一个可迭代对象，每次迭代的结果就是每一项的值
const arr = [...s];
```

4. 如何遍历

1). 使用for-of循环
2). 使用set中的实例方法forEach

注意：set集合中不存在下标，因此forEach中的回调的第二个参数和第一个参数是一致的，均表示set中的每一项

## 常见应用

```js
// 两个数组的并集、交集、差集 （不能出现重复项），得到的结果是一个新数组
const arr1 = [33, 22, 55, 33, 11, 33, 5];
const arr2 = [22, 55, 77, 88, 88, 99, 99];

//并集
// const result = [...new Set(arr1.concat(arr2))];
console.log("并集", [...new Set([...arr1, ...arr2])]);

const cross = [...new Set(arr1)].filter(item => arr2.indexOf(item) >= 0);
//交集
console.log("交集", cross)

//差集
// console.log("差集", [...new Set([...arr1, ...arr2])].filter(item => arr1.indexOf(item) >= 0 && arr2.indexOf(item) < 0 || arr2.indexOf(item) >= 0 && arr1.indexOf(item) < 0))
console.log("差集", [...new Set([...arr1, ...arr2])].filter(item => cross.indexOf(item) < 0))
```

```js
class MySet {
    constructor(iterator = []) {
        //验证是否是可迭代的对象
        if (typeof iterator[Symbol.iterator] !== "function") {
            throw new TypeError(`你提供的${iterator}不是一个可迭代的对象`)
        }
        this._datas = [];
        for (const item of iterator) {
            this.add(item);
        }
    }

    get size() {
        return this._datas.length;
    }

    add(data) {
        if (!this.has(data)) {
            this._datas.push(data);
        }
    }

    has(data) {
        for (const item of this._datas) {
            if (this.isEqual(data, item)) {
                return true;
            }
        }
        return false;
    }

    delete(data) {
        for (let i = 0; i < this._datas.length; i++) {
            const element = this._datas[i];
            if (this.isEqual(element, data)) {
                //删除
                this._datas.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this._datas.length = 0;
    }

    *[Symbol.iterator]() {
        for (const item of this._datas) {
            yield item;
        }
    }

    forEach(callback) {
        for (const item of this._datas) {
            callback(item, item, this);
        }
    }

    /**
     * 判断两个数据是否相等
     * @param {*} data1 
     * @param {*} data2 
     */
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            return true;
        }
        return Object.is(data1, data2);
    }
}
```

# map集合

键值对（key value pair）数据集合的特点：键不可重复

map集合专门用于存储多个键值对数据。

在map出现之前，我们使用的是对象的方式来存储键值对，键是属性名，值是属性值。

使用对象存储有以下问题：

1. 键名只能是字符串或符号
2. 获取数据的数量不方便
3. 键名容易跟原型上的名称冲突


1. 如何创建map

```js
new Map(); //创建一个空的map
new Map(iterable); //创建一个具有初始内容的map，初始内容来自于可迭代对象每一次迭代的结果，但是，它要求每一次迭代的结果必须是一个长度为2的数组，数组第一项表示键，数组的第二项表示值
```

2. 如何进行后续操作

- size：只读属性，获取当前map中键的数量
- set(键, 值)：设置一个键值对，键和值可以是任何类型
  - 如果键不存在，则添加一项
  - 如果键已存在，则修改它的值
  - 比较键的方式和set相同
- get(键): 根据一个键得到对应的值
- has(键)：判断某个键是否存在
- delete(键)：删除指定的键
- clear(): 清空map


3. 和数组互相转换

和set一样

4. 遍历

- for-of，每次迭代得到的是一个长度为2的数组
- forEach，通过回调函数遍历
  - 参数1：每一项的值
  - 参数2：每一项的键
  - 参数3：map本身

```js
class MyMap {
    constructor(iterable = []) {
        //验证是否是可迭代的对象
        if (typeof iterable[Symbol.iterator] !== "function") {
            throw new TypeError(`你提供的${iterable}不是一个可迭代的对象`)
        }
        this._datas = [];
        for (const item of iterable) {
            // item 也得是一个可迭代对象
            if (typeof item[Symbol.iterator] !== "function") {
                throw new TypeError(`你提供的${item}不是一个可迭代的对象`);
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value);
        }

    }

    set(key, value) {
        const obj = this._getObj(key);
        if (obj) {
            //修改
            obj.value = value;
        }
        else {
            this._datas.push({
                key,
                value
            })
        }
    }

    get(key) {
        const item = this._getObj(key);
        if (item) {
            return item.value;
        }
        return undefined;
    }

    get size() {
        return this._datas.length;
    }

    delete(key) {
        for (let i = 0; i < this._datas.length; i++) {
            const element = this._datas[i];
            if (this.isEqual(element.key, key)) {
                this._datas.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this._datas.length = 0;
    }

    /**
     * 根据key值从内部数组中，找到对应的数组项
     * @param {*} key 
     */
    _getObj(key) {
        for (const item of this._datas) {
            if (this.isEqual(item.key, key)) {
                return item;
            }
        }
    }

    has(key) {
        return this._getObj(key) !== undefined;
    }

    /**
     * 判断两个数据是否相等
     * @param {*} data1 
     * @param {*} data2 
     */
    isEqual(data1, data2) {
        if (data1 === 0 && data2 === 0) {
            return true;
        }
        return Object.is(data1, data2);
    }

    *[Symbol.iterator]() {
        for (const item of this._datas) {
            yield [item.key, item.value];
        }
    }

    forEach(callback) {
        for (const item of this._datas) {
            callback(item.value, item.key, this);
        }
    }
}
```

# WeakSet 和 WeakMap

## WeakSet

使用该集合，可以实现和set一样的功能，不同的是：

1. **它内部存储的对象地址不会影响垃圾回收**
2. 只能添加对象
3. 不能遍历（不是可迭代的对象）、没有size属性、没有forEach方法

```js
let obj = {
    name: "yj",
    age: 18
};
let obj2 = obj;
const set = new WeakSet();
set.add(obj);

obj = null;
obj2 = null;
console.log(set)
```

## WeakMap

类似于map的集合，不同的是：

1. **它的键存储的地址不会影响垃圾回收**
2. 它的键只能是对象
3. 不能遍历（不是可迭代的对象）、没有size属性、没有forEach方法

```js
let obj = {
    name: 'a',
    age: 18,
}

const map = new WeakMap();
map.set(obj, 234);
obj = null;
console.log(map);
```

```js
const wmap = new WeakMap();
let lis = document.querySelectorAll("li");
for (const li of lis) {
    wmap.set(li, {
        id: li.innerHTML,
        name: `姓名${li.innerHTML}`
    });
}
lis[0].remove();
lis = null;

console.log(wmap);
```

# 属性描述符

Property Descriptor 属性描述符  是一个普通对象，用于描述一个属性的相关信息

通过```Object.getOwnPropertyDescriptor(对象, 属性名)```可以得到一个对象的某个属性的属性描述符

- value：属性值
- configurable：该属性的描述符中的信息是否可以修改, true 表示不能修改
- enumerable：该属性是否可以被枚举, false 是不能被枚举
- writable：该属性是否可以被重新赋值

> value writable 和 get set 不同共存，如果同时配置的话，会报错

> ```Object.getOwnPropertyDescriptors(对象)```可以得到某个对象的所有属性描述符

如果需要为某个对象添加属性时 或 修改属性时， 配置其属性描述符，可以使用下面的代码:

```js
Object.defineProperty(对象, 属性名, 描述符);
Object.defineProperties(对象, 多个属性的描述符)
```

```js
const obj = {
    a: 1,
    b: 2,
};
Object.defineProperty(obj, "a", {
    value: 3,
    configurable: false,
    enumerable: false,
    writable: false
})
Object.defineProperties(obj, {
    a: {
        value: 3,
        configurable: false,
        enumerable: false,
        writable: false,
    },
    b: {
        value: 10,
        configurable: false,
        enumerable: false,
        writable: false,
    }
});
obj.a = 10; // 如果把configurable设置成ture，就会报这个错：Uncaught TypeError: Cannot redefine property: a at Function.defineProperties
console.log(obj);

console.log(obj)
for (const prop in obj) {
    console.log(prop);
}

const props = Object.keys(obj)
console.log(props)

const values = Object.values(obj);
console.log(values);

const desc = Object.getOwnPropertyDescriptor(obj, "a")

console.log(desc);
```


## 存取器属性

属性描述符中，如果配置了 get 和 set 中的任何一个，则该属性，不再是一个普通属性，而变成了存取器属性。

get 和 set配置均为函数，如果一个属性是存取器属性，则读取该属性时，会运行get方法，将get方法得到的返回值作为属性值；如果给该属性赋值，则会运行set方法。

存取器属性最大的意义，在于可以控制属性的读取和赋值。

```js
const obj = {
  b: 2,
};
Object.defineProperty(obj, "a", {
  get() {
    console.log("运行了属性a的get函数");
    // 如果直接 return obj.a 会导致无限递归
    return obj._a;
  },
  set(val) {
    console.log("运行了属性a的set函数", val);
    // 如果直接 obj.a = val 会导致无线递归
    obj._a = val;
  },
});
obj.a = 20 + 10; // 相当于运行 set(20 + 10)
console.log(obj.a); // 相当于运行 get 方法，如果get没有返回值，会得到undefined

obj.a = obj.a + 1; // 相当于 set(obj.a + 1)   set(get() + 1)
console.log(obj.a);
```

将对象的属性和元素的内容进行关联，顺带添加一些读取规则

```html
<body>
    <p>
        <span>姓名：</span>
        <span id="name"></span>
    </p>
    <p>
        <span>年龄：</span>
        <span id="age"></span>
    </p>
    <script>
        const spanName = document.getElementById("name")
        const spanAge = document.getElementById("age")

        const user = {}

        Object.defineProperties(user, {
            name: {
                get() {
                    return spanName.innerText;
                },
                set(val) {
                    spanName.innerText = val;
                }
            },
            age: {
                get() {
                    return +spanAge.innerText;
                },
                set(val) {
                    if (typeof val !== "number") {
                        throw new TypeError("年龄必须是一个数字")
                    }
                    if (val < 0) {
                        val = 0;
                    } else if (val > 200) {
                        val = 200;
                    }
                    spanAge.innerText = val;
                }
            }
        })
    </>
</body>
```

# Reflect

Reflect是一个内置的JS对象，它提供了一系列方法，可以让开发者通过调用这些方法，访问一些JS底层功能

由于它类似于其他语言的**反射**，因此取名为Reflect


> 使用Reflect可以实现诸如 属性的赋值与取值、调用普通函数、调用构造函数、判断属性是否存在与对象中  等等功能

> 这些功能不是已经存在了吗？为什么还需要用Reflect实现一次？
> 
> 有一个重要的理念，在ES5就被提出：减少魔法、让代码更加纯粹
> 
> 这种理念很大程度上是受到函数式编程的影响
> 
> ES6进一步贯彻了这种理念，它认为，对属性内存的控制、原型链的修改、函数的调用等等，这些都属于底层实现，属于一种魔法，因此，需要将它们提取出来，形成一个正常的API，并高度聚合到某个对象中，于是，就造就了Reflect对象
> 
> 因此，你可以看到Reflect对象中有很多的API都可以使用过去的某种语法或其他API实现。

**Reflect提供的API**

- Reflect.set(target, propertyKey, value): 设置对象target的属性propertyKey的值为value，等同于给对象的属性赋值
    ```js
    Reflect.set(obj, "a", 10);
    ```
- Reflect.get(target, propertyKey): 读取对象target的属性propertyKey，等同于读取对象的属性值
    ```js
    console.log(Reflect.get(obj, "a"))
    ```
- Reflect.apply(target, thisArgument, argumentsList)：调用一个指定的函数，并绑定this和参数列表。等同于函数调用
    ```js
    function method(a, b){
        console.log("method", a, b);
    }

    // method(3, 4);

    Reflect.apply(method, null, [3, 4])
     ```
- Reflect.deleteProperty(target, propertyKey)：删除一个对象的属性
    ```js
    const obj = {
        a: 1,
        b: 2
    }

    // delete obj.a;

    Reflect.deleteProperty(obj, "a");
    ```
- Reflect.defineProperty(target, propertyKey, attributes)：类似于Object.defineProperty，不同的是如果配置出现问题，返回false而不是报错
- Reflect.construct(target, argumentsList)：用构造函数的方式创建一个对象
    ```js
    // 因为 Reflect 认为 new 也是魔法
    function Test(a, b) {
        this.a = a;
        this.b = b;
    }

    // const t = new Test(1, 3);
    const t = Reflect.construct(Test, [1, 3]);
    console.log(t)
    ```
- Reflect.has(target, propertyKey): 判断一个对象是否拥有一个属性
    ```js
    const obj = {
        a: 1,
        b: 2,
    };

    // console.log("a" in obj);
    console.log(Reflect.has(obj, "a")); 
    ```
- 其他API：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

# Proxy 代理

没听明白其实，总感觉用处不大
代理：提供了修改底层实现的方式

```js

//代理一个目标对象
//target：目标对象
//handler：是一个普通对象，其中可以重写底层实现
//返回一个代理对象
new Proxy(target, handler)
```

```js
const obj = {
    a: 1,
    b: 2
}

const proxy = new Proxy(obj, {
    set(target, propertyKey, value) {
        // console.log(target, propertyKey, value);
        // target[propertyKey] = value;
        Reflect.set(target, propertyKey, value);
    },
    get(target, propertyKey) {
        if (Reflect.has(target, propertyKey)) {
            return Reflect.get(target, propertyKey);
        } else {
            return -1;
        }
    },
    has(target, propertyKey) {
        return false;
    }
});
// console.log(proxy);
// proxy.a = 10;
// console.log(proxy.a);

console.log(proxy.d);
console.log("a" in proxy);
```

proxy构造函数
也没听明白

```js
class User {

}

function ConstructorProxy(Class, ...propNames) {
    return new Proxy(Class, {
        construct(target, argumentsList) {
            const obj = Reflect.construct(target, argumentsList)
            propNames.forEach((name, i) => {
                obj[name] = argumentsList[i];
            })
            return obj;
        }
    })
}

const UserProxy = ConstructorProxy(User, "firstName", "lastName", "age")

const obj = new UserProxy("袁", "进", 18);
console.log(obj)

class Monster {

}

const MonsterProxy = ConstructorProxy(Monster, "attack", "defence", "hp", "rate", "name")

const m = new MonsterProxy(10, 20, 100, 30, "怪物")
console.log(m);
```

可验证的函数参数

```js
function sum(a, b) {
    return a + b;
}

function validatorFunction(func, ...types) {
    const proxy = new Proxy(func, {
        apply(target, thisArgument, argumentsList) {
            types.forEach((t, i) => {
                const arg = argumentsList[i]
                if (typeof arg !== t) {
                    throw new TypeError(`第${i+1}个参数${argumentsList[i]}不满足类型${t}`);
                }
            })
            return Reflect.apply(target, thisArgument, argumentsList);
        }
    })
    return proxy;
}

const sumProxy = validatorFunction(sum, "number", "number")
console.log(sumProxy(1, 2))
```



# 观察者模式

有一个对象，是观察者，它用于观察另外一个对象的属性值变化，当属性值变化后会收到一个通知，可能会做一些事。

用 defineProperty 实现观察者模式
有个弊端：会用到两个对象, 造成内存空间的浪费，而且如果target有新增属性，是监测不到的。
```js
//创建一个观察者
function observer(target) {
    const div = document.getElementById("container");
    const ob = {};
    const props = Object.keys(target);
    for (const prop of props) {
        Object.defineProperty(ob, prop, {
            get() {
                return target[prop];
            },
            set(val) {
                target[prop] = val;
                render();
            },
            // 默认是存取器属性不能被遍历，所以要加 enumerable: true
            enumerable: true,
        });
    }
    render();

    function render() {
        let html = "";
        for (const prop of Object.keys(ob)) {
            html += `
                    <p><span>${prop}：</span><span>${ob[prop]}</span></p>
                `;
        }
        div.innerHTML = html;
    }

    return ob;
}
const target = {
    a: 1,
    b: 2,
};
const obj = observer(target);
```

用proxy实现观察者模式

```html
<script>
    //创建一个观察者
    function observer(target) {
        const div = document.getElementById("container");
        // 代理本身不占内存空间
        const proxy = new Proxy(target, {
            set(target, prop, value) {
                Reflect.set(target, prop, value);
                // 设置值的时候，重新渲染页面
                render();
            },
            get(target, prop){
                return Reflect.get(target, prop);
            }
        })
        render();

        function render() {
            let html = "";
            for (const prop of Object.keys(target)) {
                html += `
                    <p><span>${prop}：</span><span>${target[prop]}</span></p>
                `;
            }
            div.innerHTML = html;
        }

        return proxy;
    }
    const target = {
        a: 1,
        b: 2
    }
    const obj = observer(target)
</script>
```

