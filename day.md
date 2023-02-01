### 7.24
img标签上的title属性和alt属性的区别是什么？
- alt：当图片不显示是用文字代表
- title：为该属性提供信息

### 7.25
```js
// 假设d是范围内的“空对象”
var d = {};
// 使用下面代码完成了什么？
['zebra', 'horse'].forEach(function(k) {
    d[k] = undefined;
})
```
上面显示的代码片段在对象d上设置了两个属性。
理想情况下，对具有未设置键的JavaScript对象执行的查找评估为未定义。但是运行这段代码会将这些属性标记为对象“自己的属性”。
这是确保对象具有一组给定属性的有用策略。将该对象传递给Object.keys将返回一个包含这些设置键的数组（即使它们的值未定义）。

### 7.26
用一个对象的数据来表示一个矩形的位置和大小
```js
{
    x: 100,
    y: 100,
    width: 150,
    height: 250
}
```
它表示一个宽为150，高为250的矩形在页面上的（100,100）的位置。
提问：请你完成一个函数isOverlap可以接受两个矩形作为参数，判断这两个矩形在页面上是否重叠。例如：
```js
const rect1 = {
    x: 100,
    y: 100,
    widht: 100,
    height: 100
}
const rect2 = {
    x: 150,
    y: 150,
    widht: 100,                                                                                                                    
    height: 100
} 
isOverlap(rect1, rect2) //---> true
```

```js
const isOverlap = (rect1, rect2) => {
    const l1 = {x: rect1.x, y: rect2.y};
    const r1 = {x: rect1.x + rect1.width, y: rect1.y + rect1.height}
    const l2 = {x: rect2.x, y: rect2.y};
    const r2 = {x: rect2 + rect2.width, y: rect2.y + rect2.height}
    if(l1.x > r2.x || l2.x > r1.x || l1.y > r2.y || l2.y > r1.y) {
        return false;
    }
    return true
}
```

### 7.27
什么是NaN？它的类型是什么？如何可靠地测试一个值是否等于NaN？
- NaN属性表示“不是数字”的值。这个特殊值是由于一个操作数是非数字的（例如'abc'/4）或者因为操作的结果是非数字儿无法执行的。
- 虽然这看起来很简单，但NaN有一些令人惊讶的特征，如果人们没有意识到这些特征，就会导致bug。
- 一方面，虽然NaN的意思是“不是数字”，但他的类型是，数字；
- console.log(typeof NaN === 'number');  --->返回true
- 此外，NaN相比任何事情，甚至本身，是false；
- console.log(NaN === NaN); --->返回false；
- 测试数字是否等于NaN的半可靠方法是使用内置函数isNaN(),但即使使用isNaN()也不是一个好的解决方案。
- 一个更好的解决方案要么是使用value!==值，如果该值等于NaN，那么只会生成true。另外，ES6提供了一个新的Number.isNaN()函数，它与旧的全局isNaN()函数不同，也更加可靠。


### 7.28
CSS里的visibility属性有个collapse属性值？
在不同的浏览器下以后有什么区别？
- 当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。
- 1. chrome中，使用collapse值和使用hidden没有区别。
- 2. firefox， opera和IE，使用collapse值和使用display:none没有区别。

### 7.29
$(this)和this关键字在jQuary中有何不同？
- $(this)返回一个jQuary对象，你可以对他调用多个jQuary方法，比如用text()获取文本，用val()获取值等。
- 而this代表当前元素，它是JavaScript关键词中的一个，表示上下文中的当前DOM元素。你不能对他调用jQuary方法，直到他被$()函数包裹，例如$(this)。

### 7.30
TCP与UDP的区别？
- TCP（Transmission Control Protocol）传输控制协议，是一种面向连接的、可靠地、基于字节流的传输层通信协议。
- UDP（User Datagram Protocol）用户数据报协议。UDP为应用程序提供了一种无需建立连接就可以发送封装IP数据包的方法。
- Internet的传输层有两个主要协议，互为补充。无需连接的是UPD，他除了给应用程序发送数据包功能并允许他们在所需的层次上架构自己的结构之外，几乎没有做什么特别的事情。面向连接的是TCP，该协议几乎做了所有的事件

1. TCP面向连接（如打电话要先拨号建立连接）；UDP是无连接，即发送数据之前不需要建立连接
2. TCP提供可靠地服务。也就是说，通过TCP连接传送的数据，无差别，不丢失，不重复，且按序到达；UDP尽最大努力交付，即不保证可靠交付
3. TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流；UDP是面向报文的UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
4. 每一条TCP连接只能是点到点的；UDP支持一对一，一对多，多对一和多对多的交互信息
5. TCP首部开销20字节；UDP的首部开销小，只有8个字节
6. TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道

### 7.31
```js
let a = a; //在运行的时候出现什么问题，为什么？
```
分两个阶段：
1. 在预编译阶段，将let声明的变量放到暂存性死区TDZ中，TDZ=[a]。
2. 在let声明语句结束之后，这里的结束指的是，当let a = a执行完事后，会把a从TDZ中拿走。但是let a = a执行的时候，右侧赋值的a还在TDZ中，所以报错。也就是未声明就使用错误。
所以，在使用let声明变量的时候，切记一定要先声明后使用。

### 8.2
以下代码将输出到控制台中：
```js
console.log((function fn(n){return ((n > 1) ? n * f(n - 1) : n)})(10))
```

### 8.3
常见的HTTP状态码你了解多少？描述一下一下状态码

HTTP状态码是用以表示网页服务器HTTP响应状态的3位数字代码
- （1）200，请求成功，一切正常，数据成功返回
- （2）301，永久性重定向，是指所请求的文档在别的地方；文档新的URL会在定位响应头信息中给出。浏览器会自动连接到新的URL。
- （3）302，临时重定向，该状态码表示请求的资源已被分配了新的URL,希望用户（本次）能使用新的URL访问。
- （4）303，该状态码表示由于请求对应的资源存在着另一个URL，应使用GET方法定向获取请求的资源。
- （5）403，Foribidden服务器端理解本次请求，但是拒绝执行任务，没有权限访问。
- （6）404，NOT，found请求的资源，网页无法找到，不存在。url错误。
- （7）503，服务器端无法响应，服务器由于在维护或已经超载儿无法访问。


### 8.4
下面的代码输出到控制台会打印出什么，为什么？
```js
var myObject = {
    foo: 'bar',
    func: function() {
        var self = this;
        console.log('outer func: this.foo = ' + this.foo);
        console.log('outer func: self.foo = ' + self.foo);
        (function() {
        console.log('outer func: this.foo = ' + this.foo);
        console.log('outer func: self.foo = ' + self.foo);
        }());
    }   
};
myObject.func();
```

```js
'bar', 'bar', undefined, 'bar'

// 在外部函数中，this和self都引用myObject，因此都可以正确引用和访问foo。
// 但在外部函数中，这不再指向myObject。因此，this.foo在内部函数中是未定义的，而对局部变量self的引用仍在范围内并且可以在那里访问。
```

### 8.5
如果数组列表太大，以下递归代码将导致堆栈溢出。
你如何解决这个问题，仍然保留递归模式？
- 堆栈溢出： 事实上，堆和栈是不同的数据结构概念，堆栈溢出也可细化为堆溢出和栈溢出两种。栈有两个特性：只能从栈的顶端存取数据；数据的存取符合后进先出的原则。
- 堆栈溢出是说堆区和栈区的溢出，二者同属于缓冲区溢出。从上面关于堆区和栈区的解释可以看出，一旦程序确定，堆栈内存空间的大小就是固定的，当数据已经把堆栈的空间占满时，再往里面存放数据就会超出容量，发生上溢；当堆栈中的已经没有数据时，再取数据就无法取到了，发生下溢。需要注意的是，栈分为顺序栈和链栈，链栈不会发生溢出，顺序栈会发生溢出。
- 堆栈尺寸设置过小、递归调用过深、函数调用层次过深等程序设计不当之处都可能导致堆栈溢出。
```js
var list = readHugeList();
var nextListItem = function() {
    var item = list.pop();
    if(item) {
        //process the list item...
        nextListItem();
    }
}
```

通过修改NextListItem函数可以避免潜在的堆栈溢出，如下所示：
```js
var list = readHugeList();
var nextListItem = function() {
    var item = list.pop();
    if(item) {
        //process the list item...
        setTimeout(nextListItem, 0);
    }
}
```
堆栈溢出被消除，因为事件循环处理递归，而不是调用堆栈。当nextListItem运行时，如果item不为null，则将超时函数(nextListItem)推送到事件队列，并且函数退出，从而使调用堆栈清零。
当事件队列运行超时事件时，将处理下一个项目，并设置一个计时器以再次调用nextListItem。因此，该方法从头到尾不经过直接递归调用吉克处理，因此调用栈堆保持清晰，无论迭代次数如何。

### 8.6
去掉图片下方的像素缝隙：
1. 给img元素添加vertival-align:bottom;
2. 给img父级添加行高：line-height:1ex;
3. 给img类型改变成块级元素：display:block;

### 8.7
下面代码的执行结果是什么？
```js
function addTolist(item, list) {
    return list.push(item);
}
var result = addTolist('apple', ['banana']);
console.log(result);

// 2
```

### 8.9
使用html+css实现的一个布局方式，border-width：5px，格子大小是50px*50px。hover时边框变成红色，需要考虑语义化。
```html
<!-- 通过outline，以及margin-left，margin-top，父级宽高170，用margin-right，和margin-bottom是完全不同的效果 -->
```

### 8.10
```js
// 下列js代码打印出什么
var value = !function(a, b){
    return !!a && !!b
}(1, 2);
console.log(value); // false;
```

### 8.11
给定一个整数数组nums和一个目标值target，请你在该数组中找出'和为目标值'的那两个整数，并返回他们的数组下标
可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍
```js
var arr = [2, 7, 11, 15];

function fn(arr, target) {
    var newArr = [];
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 1; j < arr.length; j++) {
            if (arr[i] + arr[j] == target) {
                newArr[0] = i;
                newArr[1] = j;
                return newArr;
            }
        }
    }
}
console.log(fn(arr, 9));


function fn(arr, target) {
    for (var i = 0; i < arr.length - 1; i++) {
        var half1 = nums[i];
        var half2 = target - half1;
        for (var j = 1 + i; j < arr.length; j++) {
            if (nums[i] + nums[j] == target) {                
                return [i, j];
            }
        }
    }
    return [];
}
console.log(fn(arr, 9));

function fn(arr, target) {
    var count = [];
    for(var i = 0; i < arr.length; i ++) {
        var half1 = nums[i];
        var half2 = target - nums[i];
        if(count[half2] !== undefined) {
            return [i, count[half2]];
        }
        count[half1] = i;
    }
    return [];
}
```


### 8.12
content.length为多少？
```html
<div>
    <div class='content' id='content'></div>
    <div class='content'></div>
    <div class='content'></div>
</div>
<script>
    var content = document.getElementByClassName('content');  //动态的，实时的
    var c = document.getElementById('content');
    c.className = 'bar';
    console.log(content.length);    //--> 2 

    var content = document.querySelectorAll('.content');  //如果这种方式获取就是非实时的，访问长度就是3
</script>
```

### 8.13
阅读下列代码，问foo.count的值为？
```js
function foo() {
    this.count ++;
}
foo.count = 0;
for(var i = 0; i < 10; i ++) {
    if(i % 5) {
        foo();  //函数里面的this指向window
    }
}

console.log(foo.conut);   //--> 0
console.log(window.count); //--> NaN
```

### 8.14
下列函数的执行结果;
```js
function Bar(cb) {
    if(typeof cb !== 'function') {
        return;
    }
    for(var i = 1; i < 4; i ++) {
        console.log(cb(i, i - 1))
    }
}
Bar(parseInt);

parseInt(1, 0); //-->1
parseInt(2, 1); //-->NaN
parseInt(3, 2); //-->NaN

```

### 8.15
下面代码的执行结果是什么？
```js
function getInfo(member, year) {
    member.name = 'css';
    year = '1998';
}

var person = {
    name: 'html'
};
var birthYear = '1997';
getInfo(person, birthYear);
console.log(person, birthYear);

// {name:'css'}, '1997'
```

### 8.16
下面代码的执行结果是什么？
```js
function Car() {
    this.name = 'Lamborghini';
    return {
        name: 'Maserati'
    }
};
var myCar = new Car();
console.log(myCar.name);  //-->Maserati
```

### 8.17
下面代码会输出什么结果？
```js
var a = 1;
var obj = {
    a:2,
    method: {
        a: 3,
        A: function() {
            return this.a;
        }
    }
};
var m = obj.method.A;
console.log(m());  // -->1
```


### 8.18
同8.07；

### 8.24

下列代码输出的结果是什么？
```js
console.log(123..toString(2)); -->'123'
```
第一个点充当小数点

### 8.25
下列代码输出的结果是什么？
```js
var num = 3;
console.log(num.toString(2)); -->11
console.log(num.toFixed(2)); -->3.00
```

### 8.26
下列代码输出的结果是什么？
```js
class Person() {
    constructor(name) {
        this.name = name;
    }
    //附着在实例上面
    sayHello1 = () => {
        console.log(this.name);
    }
    //附着在原型上面
    sayHello2() {
        console.log(this.name);
    }
}

const p = new Person('邓哥');
p.sayHello1();   -->'邓哥'
Person.prototype.sayHello1();  -->'报错'
Person.prototype.sayHello1.call(p); -->'报错'
p.sayHello2();   -->'邓哥'
Person.prototype.sayHello2();  -->undefined
Person.prototype.sayHello2.call(p); -->'邓哥'

```

class 声明创建一个基于原型继承的具有给定名称的新类。
你也可以使用类表达式定义类。但是不同于类表达式，类声明不允许再次声明已经存在的类，否则将会抛出一个类型错误。

### 8.27
下面的代码运行后，变量set中保存了什么？
```js
var set = new Set();
var a = [];
set.add(a);  {[1]}
a.push(1);
set.add(a) ; //无效
a = [1];
set.add(a);   {[1],[1]}
a.pop();
set.add(a);    {[1], []}
set.add([]);   {[1], [], [], [1]}
set.add([1]);
```
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
因为 Set 中的值总是唯一的，所以需要判断两个值是否相等。
另外，NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（NaN被认为是相同的，尽管 NaN !== NaN）。

Set.prototype.add(value)
在Set对象尾部添加一个元素。返回该Set对象。

### 8.28
```js
var a = 1;
var b = 2;
```

```js
a = a + b;
b = a - b;
a = a - b;
```

### 8.29
下面代码输出什么内容
```js
function Point(x, y) {
    this.x = x;
    this.y = y;
    this.moveTo = function(x, y) {
        this.x = x;
        this.y = y;
        console.log(this.x + ',' + this.y);
    }
}

var p1 = new Point(0, 0);
var p2 = {x: 0, y: 0};
p1.moveTo(1, 1);  //-->(1, 1)
p1.moveTo.apply(p2, [10, 10]); -->(10, 10);
```


### 8.30
下面这段代码输出什么?
```js
var globalVar = 'xyz';
(function outerFunc(outerArg) {
    var outerVar = 'a';
    (function innerFunc(innerArg) {
        var innerVar = 'b';
        console.log(
            'outerArg = ' + outerArg + '\n' + 
            'innerArg = ' + innerArg + '\n' +
            'outerVar = ' + outerVar + '\n' +
            'innerVar = ' + innerVar + '\n' +
            'globalVar = ' + globalvAr
        );
    })(456);
})(123);

/*
    outerArg = 123
    innerArg = 456
    outerVar = a
    innerVar = b
    globalVar = xyz
*/
```


### 8.31
下面代码打印什么？
```js
console.log(1 + undefined);   //--> NaN
console.log(1 + null);  //--> 1
console.log(null + undefined);   //--> NaN
console.log(true + false); //--> 1
console.log(3 + '6'); // --> '36'
console.log(2 + []);  // --> 2
console.log(2 + {a: 12}); // --> '2[object Object]'
console.log([] + {});  // --> '[object Object]'
console.log({} + []);  // --> '[object Object]'
console.log(3 + {});  // --> '3[object Object]'
console.log({} + 3);  // --> '[object Object]3'
```


### 9.1
new 关键字到底做了什么？
1. var this = {};
2. 通过this调用属性或者方法将会被赋值
3. this.__proto__ 连接到  构造函数.prototype  构造函数的原型
4. 隐式返回this

### 9.2
以下代码的输出时什么？
如何改正正确输出0 1 2 3 4？
```js
for(var i = 0; i < 5; i ++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000);
}

//方式1
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, j * 1000);
    })(i)
}

//方式2
for(let i = 0; i < 5; i ++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000);
}
```


### 9.3
```js
var a = {},
    b = {key: 'b'},
    c = {key: 'c'};
a[b] = 123; //a['object Object'] = 123
a[c] = 456; //a['object Object'] = 456
console.log(a[b]);
```

### 9.4
```js
console.log(false == '0'); //true
console.log(false === '0'); //false
```


### 9.5
```js
console.log("0||1=" + (0 || 1)); //1
console.log("1||2=" + (1 || 2)); //1
console.log("0&&1=" + (0 && 1)); //0
console.log("1&&2=" + (1 && 2)); //2
```

### 9.6
```js
var length = 10;
function fn() {
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function(fn) {
        fn();   // 10
        arguments[0](); // 2
    }
}
obj.method(fn, 1);
```

### 9.7
实现参数对调
```js
function swap(a, b) {
    // 请写一段代码，让a和b的值能够交换
    // 注意：不允许使用其他变量
}
```

```js
// 方案一
function swap(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
}

// 方案二
function swap(a, b) {
    [a, b] = [b, a]
}
```

### 9.8
```js
var arr = [];
arr[0] = 'a';
arr[1] = 'b';
arr.foo = 'c';
console.log(arr.length);  // --> 2
arr.length += arr.foo.length;  
console.log(arr.length);  // --> 3
```





### 9.9  教师节
关于0的除法运算问题
```js
var h5course = false;
var result = h5course / 0;
if(result) {
    console.log(result * 2 + '2' + 4);
} else {
    console.log(!result * 2 + '2' + 4);
}
```

### 9.10
下面js代码输出的结果
```html
<div class="content"></div>
<div class="content"></div>
<div class="content"></div>
<script>
    var divs = document.getElementsByClassName('content');
    divs[1].className = 'wrapper';
    console.log(divs.length);  // --> 2
</script>
```

### 9.11
点击li会打印出什么？
不写了，闭包的问题

### 9.12
下面的代码会打印出什么？
```js
var func = function course() {
    console.log(typeof course);  //--> 'function'
}

func();
console.log(typeof course); // --> 'undefined'
```

### 9.13
arguments的数据类型是什么？

数据类型是对象，typeof的返回值是'object',因为输出结果和数组类似，也被我们称为类数组


### 9.17  ///听视频
如何阻止点击a链接是的跳转？
```js
var tagA = document.getElementByTagName('a')[0];
tagA.onclick = function (e) {
    e.preventDefault();
    e.returnValue = false;
    return false;
}
```

### 9.18
引用值类型与原始值类型的区别？
原始值不可变
原始值：栈内存
引用值可以变
引用值：堆内存
引用值可以在内部修改属性，这个时候改的属性在堆内存中
原始值只能被重新赋值

原始值：数字，字符串，布尔值，undefined，null
引用值：对象，数组，函数
### 9.19
如何隐藏一个元素不让其显示？
- display:none;  不会在页面中渲染
- visibility:hidden;  在原来的位置，进行占位
- opacity:0;  设置透明度

### 9.20
三元条件语句的使用方法是什么？
判断表达式1 ? 表达式2 : 表达式3

### 9.21
eval()的作用以及特点
- eval函数中的参数为字符串，该方法能够让字符串中的JavaScript代码运行

### 9.22
json 和 jsonp 的区别
- 根本不是一类东西，没有可比性
- json：一种数据结构 {"name": "sssss"}
- jsonp: 一种网络请求方式，主要用来做跨域处理


### 9.23
```js
// 下面代码是否会报错，如果不报错输出结果是什么？
var a = [1, 2, 3];
a[10] = 99;
a[99] = 100;
console.log(a[6]); 
// 不报错，输出undefined
```


### 9.24

```js
console.log(typeof undefined == typeof NULL);  //  --->true

/*
typeof null   --> 'object'
typeof NULL   --> 'undefined'

NULL is not defined
*/

```

### mock传参

```js
export const addAddress = (target: AddressProps) => {
    return (dispatch: any) => {
        axios.get('/api/addaddress', {data: {target}}).then(res => {
            dispatch({type: 'initAddress', address: res.data})
        })
    }
}
```

```js
const Mock = require('mockjs');
Mock.mock('/api/addaddress', 'get', (req: any) => {
    let {target} = JSON.parse(req.body);
    console.log(target);
    addressList.list.push(target);
    return addressList.list;
})

Mock.mock('/api/address', require('./data.json'))
```



### 模糊搜索

```js
var txt = document.querySelector('.txt');
var btn = document.querySelector('.btn');
var list = document.querySelector('.list');

var data = {
    '1808A' : {
        '男': ['鲁班', '李白', '项羽'],
        '女': ['安琪拉', '甄姬']
    }
}

var arr = ['鲁班', '李白', '项羽', '安琪拉', '甄姬', '虞姬', '黄忠', '曹操', '赵云'];
function render(data) {
    list.innerHTML = data.map(item => {
        return 	`<li>${item}</li>`;
    }).join('');
}

render(arr);

btn.addEventListener('click', (e) => {
    var resultArr = arr.filter((item) => {return item.includes(txt.value)});
    return resultArr;
})


// 选择type的模糊搜索
let filterData = state.list.filter((item:listType) => {
    for (let k in item) {
        if(String(item[k]).includes(action.value)) return true
    }
})

// 可以做一个防止报错，判断item[type]是不是字符串类型的，前面的type，也可以传一个对象，用来判断多个类型
function fn(type, value) {
    let result = arr.filter(item) => {
        return item[type].includes(value)
    }
}

```

