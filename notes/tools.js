//李春葆《数据结构教程》

/**
 * <div class="box">
 * 		<div class="box_1"></div>
 * 		<div calss="box_2"></div>	
 * </div>
 * 这段代码中，box_1和box_2平行排列均分且没有边距，有几种实现方法
 */

//小知识
// document.wrtie();调用的是toString方法
var num = 123;
document.write(num); //相当于docunemnt.write(num.toString())

//js有时有微小的精度差
// 0.14 * 100


// 把a和b的值调换
var a = 123,
    b = 234;

// (1)	a = a + b;
// b = a - b;
// a = a - b;
// (2)	var c = a + b;
// a = c - a;
// b = c - a;
// (3)	var c = a;
// a = b;
// b = c;

// 运算符
var a = 1;
var b = a++ + 1;

document.write(b); //--> 2
// 等var执行完了，才会 ++；

var a = 1;
var b = ++a + 1;
document.write(b); //--> 3

var a = 1;
var b = a-- + --a;

document.write(b); //--> 0

var a = 0;
a %= 5;
document.write(a); //--> 0

var a = (10 * 3 - 4 / 2 + 1) % 2; //--> 1
var b = 3;
b %= a + 3; //--> 3
document.write(a++); //-->1
document.write(--b); //-->2

// 计算2的n次幂，n可输入，n为自然数
var n = parseInt(window.prompt("input"));
var num = 1;
for (; n--;) {
    num *= 2;
}
document.write(num);
// 计算n的阶乘，n可输入
var n = parseInt(window.prompt("input"));
var i = 1;
if (n == 0) {
    document.write(i);
} else {
    for (var i = 1; n > 0; n--) {
        i *= n;
    }
    document.write(i);
}

var mul = 1;
for (var i = 1; i <= n; i++) {
    mul *= i;
}
document.write(mul);
// 著名的斐波那契数列，输出第n项
// 1、1、2、3、5、8、13、21、34、55、89、144
// 当前位等于头两位的和,第一位和第二位已知
var n = parseInt(window.prompt("input"));
var a = 1;
var b = 1;
var c;
if (n == 1 || n == 2) {
    document.write('1');
} else {
    for (; n > 2; n--) {
        c = a + b;
        a = b;
        b = c;
    }
    document.write(c);
}

//a b c 三个数里面的最大值
if (a > b) {
    if (a > c) {
        document.write(a);
    } else {
        document.write(c);
    }
} else {
    if (b > c) {
        document.write(b);
    } else {
        document.write(c);
    }
}


// 编写一程序，输入一个三位数的正整数，输出时，反向输出。输入456，输出654。
var n = parseInt(window.prompt("input"));
var a = n % 100; //得到一个两位数
var b = (n - a) / 100; //得到第一位数
var c = a % 10; //得到第三位数	
var d = (a - c); //得到第二位数
var e = c * 100 + d + b;
document.write(e);

//告知你所选定的小动物的叫声
function scream(animal) {
    switch (animal) {
        case "dog":
            document.write('wang!');
            return; //用return比用break高级，return也是中止函数
        case "cat":
            docuement.write('miao!');
            return;
        case "fish":
            document.write('bubble');
            return;
    }
}

//return中止函数
function stop(a, b) {
    console.log(a);
    return; //函数会在这一行中止，下一行无法访问
    console.log(b);
}
stop(1, 3);

//任意一组数求和
function sum() {
    //arguments [1, 2, 3, 4, 6, 7]
    var result;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    console.log(result);
}
sum();

//自己定义一个Number()
function myNumber(target) {
    return +target; //隐式调用，主要用于理解一元正负
}
var num = myNumber("123");
console.log(typeof(num) + '' + num);

//定义一组数字，输入函数，逆转并输出汉字形式
//window.prompt的返回值是字符串形式。num = "123",字符串有length这个方法,str.charAt(),也是从0开始索引，拿出每一位
function reverse() {
    var num = window.prompt('input');
    var str = "";
    for (var i = num.length - 1; i >= 0; i--) {
        str += transfer(num[i]);
    };
    document.write(str);
}

function transfer(target) {
    switch (traget) {
        case "1":
            return "一";
        case "2":
            return "二";
        case "3":
            return "三";
        case "4":
            return "四";
        case "5":
            return "五";
        case "6":
            return "六";
        case "7":
            return "七";
        case "8":
            return "八";
        case "9":
            return "九";
    }
}

//n的阶乘
function factorial(n) {
    if (n == 1 || n == 0) {
        return 1;
    }
    return n * factorial(n - 1); //return就是return出公式 n! = n * (n - 1)!
}

//写一个函数，实现斐波那契数列
function fb(n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    return fb(n - 1) + fb(n - 2);
}

//隐式类型转换
var str = false + 1;
console.log(str);
var demo = false == 1;
console.log(demo);

//&&运算符前面是一个表达式，后面是一个表达式，后面的true undefined一起看
if (typeof(a) && -true + (+undefined) + "") {
    console.log('你觉得能打印不？')
}

!!" " + !!"" - !!false || console.log('你觉得能打印不？');

//不知道分为哪类
// (window.foo || window.foo = "bar"); //报错 优先级的问题，|| 的优先级会比 = 高。就报错
(window.foo || (window.foo = "bar")); //()的优先级高。先赋值。。foo是一个作者自己定义的一个变量名，window.foo初始值是undefined
console.log(window.foo);

/**
 * 全局的预编译创建GO对象 Global Object --> GO对象 --> 就是window
 * 函数的预编译发生在函数执行的前一刻
 * 1.创建AO对象 --> Activation Object (执行期上下文)
 * 2.找形参和变量声明，将形参名和变量作为AO的属性名，值为undefined(这一过程，就是变量声明提升的过程)
 * 3.将实参值和形参统一
 * 4.在函数体里面找函数声明，将函数名作为AO对象的属性名，属性值为函数体
 * 注：当变量名、形参名、函数名相同时，按照以上的执行顺序，直接覆盖。属性值也是直接覆盖。
 * 所以，预编译过程结束以后，属性值只有三种情况，先是undefined，然后是实参，最后是函数体。 
 */

//预编译练习题
function fn(a) {
    console.log(a); //function a() {}
    var a = 123;
    console.log(a); //123
    function a() {}
    console.log(a); //123
    var b = function() {}
    console.log(b); //function () {}
    function d() {}
}
fn(1);

//预编译练习题
function test() {
    console.log(b); //undefined
    if (a) {
        var b = 100;
    }
    console.log(b); //undefined
    c = 234;
    console.log(c); //234
}
var a;
test();
a = 10;
console.log(c); //243

//预编译练习题
console.log(test); //function test() { 有内容的test }
function test(test) {
    console.log(test); //function test() {}
    var test = 234;
    console.log(test); // 234
    function test() {}
}
test(1);
var test = 123;

//预编译练习题
global = 100;

function fn() {
    console.log(global);
    global = 200;
    console.log(global);
    var global = 300;
}
fn();
var global;

// 预编译练习题
function demo(e) {
    function e() {}
    arguments[0] = 2;
    document.write(e);
    if (a) {
        var b = 123;

        function c() {}
    }
    var c;
    a = 10;
    var a;
    document.write(b);
    f = 123;
    document.write(c);
    document.write(a);
}
var a;
demo(1);
document.write(a);
document.write(f);

//预编译练习题
var a = 123;

function a() {}
console.log(a);

//预编译练习题
var x = 1,
    y = z = 0;

function add(n) {
    return n = n + 1;
}
y = add(x);

function add(n) {
    return n = n + 3;
}
z = add(x);
console.log(x, y, z); // x = 1 y = 4 z = 4

//  ao = {
// 	n : 1,
//  }
//  go = {
// 	 x : undefined,
// 	 y : undefined,
// 	 z : undefined,
// 	 add : function add(n) { return n = n + 3;}
//  }

//作用域练习题
function getInfor(member, year) {
    member.name = 'css';
    year = '1998';
}
var person = {
    name: 'html',
};
var birthYear = '1997';
getInfor(person, birthYear);
console.log(person, birthYear);

//作用域练习题
function a() {
    function b() {
        var bbb = 234;
        document.write(aaa);
    }
    var aaa = 123;
    return b;
}
var glob = 100;
var dome = a();
demo();

//作用域练习题
var num = 100;

function test() {
    console.log(num);
}
num = 200;
test(); // --> 200

//作用域练习题
var user = '渡一教育';

function first() {
    console.log(user);
}

function second() {
    var user = 'engineer';
    first();
}

second();

/**
 * 闭包的作用：
 * 1. 实现公有变量
 * 2. 可以做缓存（存储结构）
 * 3. 可以实现封装，属性私有化
 * 4. 模块化开发，防止污染全局变量,独立的一个功能不应该依赖于自己之外的变量
 */
//由闭包实现累加  不依赖于外部变量，可以反复执行的函数累加器
function a() {
    var num = 0;

    function b() {
        num++;
        console.log(num);
    }
    return b;
}
var demo = a();
demo();
demo();

//闭包用作缓存
function eater() {
    var food = "";
    var obj = {
        push: function(myFood) {
            food = myFood;
        },
        eat: function() {
            console.log("I am eating" + food);
            food = "";
        }
    }
    return obj;
}
var eater1 = eater(); //接收obj
eater1.push("banana");
eater1.eat;

//闭包用作缓存
function test() {
    var num = 100;

    function a() {
        num++;
        console.log(num);
    }

    function b() {
        num--;
        console.log(num);
    }
    return [a, b];
}
var myArr = test();
myArr[0]();
myArr[1]();

//实现封装，属性私有化
var obj = {};

function a() {
    var aa = 123;

    function b() {
        console.log(aa);
    }
    obj.fun = b; //利用属性调出b函数
}
a();

// 命名空间，模块化开发防止污染全局变量
// 利用闭包与立即执行函数  将自己定义的变量不会污染全局变量
var init = (function() {
    var name = 'abc';

    function callName() {
        console.log(name);
    }
    return function() {
        callName();
    }
}())

init();

var initDeng = (function() {
    var name = 123;

    function callName() {
        console.log(name)
    }
    return function() {
        callName();
    }
}())

initDeng();

// 虽然说这两个立即执行函数拥有用一个变量名，
// 但是执行的时候出来的变量值却是属于各自的，并没有冲突。可以用闭包和立即执行函数决绝命名空间的问题

//闭包(同时返回 两个同级关系的函数，指向同一个test的AO)
function test() {
    var num = 100;

    function a() {
        num++;
        console.log(num);
    }

    function b() {
        num--;
        console.log(num);
    }
    return [a, b];
}
var myArr = test();
myArr[0](); //101  不依赖于全局变量实现累加
myArr[1](); //100  不依赖于全局变量实现累减

// call 和 apply
function foo() {
    bar.apply(null, arguments);
}

function bar() {
    console.log(arguments);
}
foo(1, 2, 3, 4, 5);
// 判断最后打印出来的是不是arguments

/**
 * 立即执行函数 --> 针对初始化功能的函数
 * 函数被定义，未执行的时候，会占用空间，因为会有自己的作用域链，包含GO和自己父级的AO;
 * 可是有的函数只会被执行一次，但是他的作用域链会一直占用内存。
 * 立即执行函数，没有声明，被执行一次过后即释放，适合做初始化工作。执行过后返回一个值。
 * 开发人员只需要那个值，函数就没用了。
 */
//立即执行函数
//这道题其实和立即执行函数没关系。是函数的定义方式。函数声明被括号括起来，就成函数表达式了，函数表达式会忽略函数名。
var x = 1;
if (function f() {}) {
    x += typeof f;
}
console.log(x);

//闭包练习题 使用原生js，addEventListener,给每个li绑定一个click事件，输出他们的顺序
function test() {
    var liCollection = document.getElementsByTagName('li');
    for (var i = 0; i < liCollection.length; i++) {
        (function(j) {
            liCollection[j].onclick = function() {
                console.log(j);
            }
        }(i))
    }
}
test();

// 闭包练习题
function Person(name, age, sex) {
    var a = 0;
    this.name = name;
    this.age = age;
    this.sex = sex;

    function sss() {
        a++;
        document.write(a);
    }
    this.say = sss;
}
var oPerson = new Person();
oPerson.say(); //-->1
oPerson.say(); //-->2
var oPerson1 = new Person(); //-->重新new一个Person,function重新执行，重新var a = 0;
oPerson1.say(); //-->1

// 闭包
function fun(n, o) {
    console.log(o);
    return {
        fun: function(m) {
            return fun(m, n);
        }
    }
}
var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);
c.fun(2);
c.fun(3);

// undefined 0 0 0 
// undefined   0  1   2
// 1 1


//写一个方法，求一个字符串的字节长度
function batesLength(target) {
    var count,
        len;
    count = len = target.length;
    //因为.length 每写一次，就调用一个方法，去取一次。所以直接把它保存出来，下一行代码，就不需要再重新调取，可以拿变量直接用了
    for (var i = 0; i < len; i++) {
        if (target.charCodeAt(i) > 255) {
            count++;
        }
    }
    console.log(count);
}
batesLength("wo左肩有你youjian微笑");

// ","运算符; 返回后面表达式运算结果,不知道括号里面有三个的话生效不，可以试试
var f = (
    function f() {
        return "1";
    },
    function g() {
        return 2;
    }
)();
console.log(typeof f);
// 这道题如果没有逗号的话，不符合语法含义，立即执行函数的括号里面只能有一个函数
// 如果
// var num = 1, 2;
// 会报错

var num = (1, 2);
// ()有特殊的语法含义,能把里面的东西转化成表达式

// 写isNaN方法
function myIsNaN(num) {
    var ret = Number(num);
    ret += "";
    if (ret == "NaN") {
        return true;
    } else {
        return false;
    }
}

// 分析下面的JavaScript代码段:
function Employee(name, code) {
    this.name = "twangli";
    this.code = "A00I";
}
var newemp = new Employee(" zhangming", ' A002');
document.write("雇员姓名:" + newemp.name + "<br>");
document.write("雇员代号:" + newemp.code + "<br>");
// 输出的结果是().(选择一项)
// A.雇员姓名:wangli 雇员代码:A001
// B.雇员姓名: zhangming雇员代码: A002
// C.雇员姓名: null,雇员代码: null
// D.代码有错误，无输出结果


//(原始值没有属性和方法)不知道归为哪一类的练习题
var str = "abc";
str += 1;
var test = typeof(str);
if (test.length == 6) {
    test.sign = "typeof 的返回值可能为string";
}
document.write(test.sign); //--> undefined

/**
 * 对于函数来说，有一条作用域链，对于对象来说，有一条原型链，查找变量，或者查找属性的时候，都是一级一级往上查找
 */
//原型属性的增删改查
Person.prototype.lastName = "Deng";

function Person(name) {
    this.name = name;
}
var person = new Person("xiaoming")
    //增，只能调用.prototype增加，不能通过构造函数构造出的对象增加
    //如果想给原型增加age属性，只能通过  Person.prototype.age = 12;   不能写person.age = 12;
    //因为person也是一个对象，直接写person.age = 12;  相当于给他自己添加了属性
    //所以想在原型上修改任何东西，都只能通过原型自己。构造函数构造出的对象只能查看

//.contructor 

//__proto__  指向原型，原型链
//只要是对象就有这个属性，同constructor一样是系统自带的
//构造函数构造出的对象是  构造函数隐式的返回的this
//这个this里面的__proto__ 指向Person.prototype , Person.prototype 里面的 __proto__ 有一个constructor 属性和一个 __proto__ 属性
Person.prototype.lastName = "Deng";

function Person(name) {
    this.name = name;
}
var person = new Person("xiaoming")
    //所以person里面有一个__proto__ 指向Person.prototype。
    //如果
var obj = {
        lastName: "Lei"
    }
    //然后，改变person里面__proto__的属性值
person.__proto__ = obj;
// 再调用 person.lastName  就会返回  "Lei"

//原型练习
Person.prototype.lastName = "Deng";

function Person(name) {
    this.name = name;
}
var person = new Person("xiaoming");
console.log(person.lastName); //--> "Deng" 
Person.prototype.lastName = "Lei";
console.log(person.lastName); //--> "Lei"

//升级
Person.prototype.lastName = "Deng";

function Person(name) {
    this.name = name;
}
var person = new Person("xiaoming");
Person.prototype = {
    name: 'Lei'
}
console.log(person.lastName); //--> "Deng"

//升级
Person.prototype.lastName = "Deng";

function Person(name) {
    this.name = name;
}
Person.prototype = {
    name: 'Lei'
}
var person = new Person("xiaoming");
console.log(person.lastName); //--> "Lei"

//原型链的圣杯模式推导过程
Father.prototype.name = 'deng';

function Father() {
    this.lastName = 'laodeng';
}
var father = new Father();
Son.prototype = father;

function Son() {}
var son = new Son();
//这种情况会导致过多的继承属性
Son.prototype = Father.prototype; //只继承原型链上的属性
//由此得出
function inherit(Target, Origin) {
    target.prototype = Origin.prototype;
}
inherit(Son, Father);
//这样Son修改自己的原型上的属性，导致Father的原型上的属性也会随之改变，因为拿的同一个地址
//所以就有了圣杯模式
function inherit(Target, Origin) {
    function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    //Son.constructor --> 在Son的原型上找 new F(),一个空对象，--> F.__proto__ --> Father.prototype.consturctor --> function Father(){}
    //所以要将son的构造函数归位
    Target.prototype.uber = Origin.prototype;
    //人为添加一个属性，方便以后查看Target真正继承的原型是哪个构造函数的原型
}
//闭包模块化开发，属性私有化
var inherit = (function() {
    var F = function() {};
    return function(Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F(); //this{__proto__:F.prototype;}
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}());


//链式调用(模仿jQuery)
var deng = {
    smoke: function() {
        console.log("Oh, cool!!!!");
        return this;
    },
    drink: function() {
        console.log("Yeah, I am flying!!!");
        return this;
    },
    perm: function() {
        console.log("hehe,真香。");
        return this;
    }
}
deng.smoke().drink().perm();


//访问属性的方法
var obj = {
        name: 'lei',
        age: 23,
        gender: 'female',
    }
    // obj.name; 写的顺手
    // obj['name'];字符串形式的,运行快，使用灵活，字符串可以拼接，灵活运用变量
    //内部原理: obj.name 会隐式调用 obj['name']


// 对象的枚举 for in 循环

var arr = [1, 3, 4, 5, 6, 7, 8, 9]
    // 遍历 枚举 enumeration
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// for in循环 可以实现对象的遍历，通过对象的个数实现循环的圈数里的
var obj = {
    a: 123,
    b: 234,
    c: 345
}
var key;
for (key in obj) {
    obj.key++;
}
// 或者
for (var prop in obj) {
    obj.prop++;
}

// 以上内容都不对   当访问obj.prop时，相当于访问obj['prop']，
// 这时候，prop所代表的就不是一个变量而是obj的属性了，而obj没有这个属性，
// 所以，如果console.log(obj.prop),控制台显示的不是属性值，而是undefined


// 解决方法
var obj = {
    name: 'lei',
    age: 23,
    gender: 'female',
}

for (var prop in obj) {
    // 可以知道是字符串类型的
    console.log(prop + "" + typeof(prop));
    // 这样就可以把prop这个变量的值写进去
    console.log(obj[prop]);
}


// hasOwnProperty	判断属性是不是自己的


// A instanceof B
// 判断A对象的原型链上，有没有， B的原型
// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
// A instanceof B   就是A对象的原型链上，能不能检测到B构造函数的原型
// instanceof   有两个参数，前面这个参数是一个对象，后面这个参数是一个构造函数



// 克隆
var person = {
    name: 'xiaozhang',
    age: 34,
    roomMates: {
        theRightSide: 'kindness',
        theLeftSide: 'brave',
        thrUpSide: 'wordless',
    },
    classMates: [48, 'manyboys', 'manygirls']
}
var son = {};





function deepClone(origin, target) {
    var targer = targer || {},
        toStr = Object.prototype.toString,
        arrStr = '[object Array]';

    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {

            if (origin[prop] !== 'null' && typeof(origin[prop]) == 'object') {
                target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {};
                deepClone(origin[prop], target[prop])

            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}
deepClone(person, son);


// this指向
// 函数预编译过程中，this指向window
// 全局作用域里this指向window，
// call、apply可以改变函数运行时this的指向
// 谁调用这个方法，这个方法里面的this指向谁

// 请写出代码的输出结果

var name = "222";
var a = {
    name: "111",
    say: function() {
        console.info(this.name);
    }
}
var fun = a.say;
fun();
222
a.say();
111

var b = {
    name: "333",
    say: function(fun) {
        fun();
        222
    }
}
b.say(a.say);
111
b.say = a.say;
b.say();
333

// argument.callee









function loadScript(url, callBack) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "complete" || script.readystate == "loaded") {
                callBack()
            }
        }
    } else {
        script.onload = function() {
            callbBack();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

loadScript("demo.js", function() {
    test();
});

//计算执行一个程序所用的时间   不过真正验证效率有比这个更好的方法
var firstTime = new Date().getTime();
for (var i = 0; i < 1000000; i++) {

}
var lastTime = new Date().getTime();
console.log(lastTime - firstTime);


//返回对应的数据类型
function type(target) {
    var ret = typeof(target);
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Boolean": "boolean - object",
        "[object NUmber]": "number - object",
        "[object String]": "string - object"
    }
    if (terget === null) {
        return "null";
    } else if (ret == "object") {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return ret;
    }
}

//写在原型链上的数组去重
Array.prototype.unique = function(target) {

}



var arr = [1, 2, 3, 4, 5, 6, 7, 7, 8, 12, 34, 4, 5, 34, 5, 6, 7, ];

function fn(arr, num) {
    var newArr = [];
    var count = 0;
    var i = 0;
    for (var a = 0; i < arr.length; a++) {
        newArr[a] = [];
        for (; i < arr.length;) {
            newArr[a].push(arr[i]);
            count++;
            i++;
            if (count == num) {
                count = 0;
                break;
            }
        }
    }

    return newArr;
}


/**
 * 传输数据的格式是对象的格式，本来没什么区别，特定规定的json的格式是属性名必须加双引号，平常的对象是加不加都行
 * JSON是静态类，类似于Math,系统自带的
 */


/**
 * 笔试可能会考：操作系统 计算机网络 数据结构 数据库
 * 
 * 事件
 * 1. onclick()  是on+事件类型，事件类型有好多种
 * 		div.onclick = function () {}
 * 		div.onclick = function () {}
 * 		会覆盖
 * 
 * 2. addEventListener(事件类型，处理函数，false)  IE9以下不兼容，说明是W3C标准的 
 * 		有三个参数：
 * 			1. 事件类型（"click", "mousedown", ...）之类的
 * 			2. 处理函数使用方法可能和onclick一样
 * 			3. false以后再说
 * 		优点：可以给一个对象的一个事件绑定多个处理函数，比较的函数的引用，如果同一个引用绑定两次，只会执行一次，如果函数体一样，但是引用不一样，就会执行两次
 * 			div.addEventListener('click', function() {console.log('a')}, false);
 * 			div.sddEventListener('click', function() {console.log('b')}, false);
 * 			按照先后顺序执行， 先打印a再打印b
 * 
 * 3. attachEvent('on' + 事件类型, 处理函数)
 * 		哈哈哈，IE独有
 * 		而且，程序里面的this指向window
 *
 * 		上面的两种方法，里面的this指向和通常情况一样，谁调用的指向谁
 */
//(重点，尤其是this) 封装一个事件函数，用来兼容不同的浏览器,给一个dom对象，添加事件处理函数 
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            handle.call(this);
        })
    } else {
        elem['on' + type] = handle;
    }
}

/**
 * 解除事件处理程序
 * 1. ele.onclick = false  /  null; 
 * 		ul.childNodes[0].onclick = function () {
            console.log("a");
            this.onclick = null;
        }
 * 2. ele.removeEventListener(type, fn, false)
		div.addEventListener('click', function () {}, false)
		div.removeEventListener('click', function () {}, false)
		不好使
		这种时候，要写命名函数，或者函数声明
		function test() {
			console.log('a');
		}
		div.addEventListener('click', test, false)
		div.removeEventListener('click', test, false)
 * 3. ele.detachEvent('on' + type, fn)
 * 注：若绑定匿名函数，则无法解除
 */


/**
 * 事件处理函数的运行函数
 * 图片在qq里
 */

/**
 * 事件处理模型，基本上有俩，一个是冒泡，一个是捕获 
 * 
 * 事件冒泡：结构上（非视觉上）嵌套关系的元素，会存在事件冒泡功能，
 * 			即同一事件，自子元素冒泡向父元素（自底向上）
 * 			结构上，一级一级向上传递
 * 			如果结构上没联系，但是视觉上嵌套，也是不会冒泡的的
 *          由最具体的元素，到最不具体的元素，依次触发的过程
 * 事件捕获：结构上（非视觉上）嵌套关系的元素，会存在事件捕获功能，
 * 			即同一事件，自父元素捕获至子元素（事件源元素）（自顶向下）
 * 			IE没有捕获事件
 *          由最不具体的元素，到最具体的元素，依次触发的过程
 * 触发顺序，先捕获，后冒泡
 * focus, blur, change, submit, reset, select等事件不冒泡
 * 
 * 一个对象的一个事件类型，只能遵循一种事件处理模型，也就是，要么冒泡，要么捕获，不能既冒泡又捕获
 * 把addEventListener 第三个参数的false变成true，它的事件处理模型，立刻就会变成捕获  事件1（下）25分钟
 * 
 * 如果给一个对象的一个事件类型，同时绑定两个函数，一个函数冒泡，一个函数捕获，  应该是先捕获，后冒泡
 * 
 * 还有一种捕获，不是事件处理模型，而是真实的事件处理过程，用于解决鼠标移动问题。
 * div.setCapture();
 * ie的一种方法，会捕获页面上发生的所有的事件，捕获到自己的身上来。
 * 这样的话，绑定鼠标拖拽，不需要用document，直接用ele就行
 * 对应的有一个div.releaseCapture(),用来释放
 */

//获取计算后的最终样式 ，兼容写法
function getStyle(ele, attr) {
    return window.getComputedStyle(ele, null)[attr] || ele.currentStyle[attr];
}

getStyle(box, 'width');

function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currentStyle[prop];
    }
}

/**
 * 第二个参数，为啥是null
 * 把一个元素的伪元素的css属性值拿出来，赋值到另一个里面
 * window.getComputedStyle(div, "after").width;
 * after是div的伪元素
 * 
 * 通过js动态的改变元素的类名，来修改元素的样式
 * 而且通过类名改样式，效率更高，好维护
 */

//得到滚动条滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.documentElement.scrollLeft + document.body.scrollLeft,
            y: document.documentElement.scrollTop + document.body.scrollTop
        }
    }
}


//获得可视区窗口的大小
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerHeight,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}

//阅读器基础原理

var start = doucment.getElementsById('stop'); //开始自动翻页的按钮
var stop = document.getElementById('stop'); //结束自动翻页的按钮
var speedUp = document.getElementById('up'); //加速按钮
var speedCut = document.getElementById('cut'); //减速按钮
var timer = null;
var key = true;
var num = 10;
start.onclick = function() {
    if (key) {
        timer = setInterval(function() {
            window.scrollBy(0, num);
        }, 100)
        key = false;
    }
}
stop.onclick = function() {
    clearInterval(timer);
    key = true;
}

speedUp.onclick = function() {
    num++;
}
speedCut.onclick = function() {
    num--;
}

/**
 * 区分左右键
 * mouseup mousedown
 * e的button属性，左键是0， 滚动轮是1， 右键是2
 * e.button = 0/1/2;
 */

//给一个字符串用科学计数法表示
var str = '100,000,000';
var num = str.length % 3;
var reg = /\B(\d{3})/g;
var newStr = str.substr(0, num) + str.substr(num).replace(reg, function($, $1) {
    return ',' + $1;
})
console.log(newStr);

var str = '100000000';
var reg = /(?=(\B)(\d{3})+$)/g;
console.log(str.replace(reg, ','));


var obj = {
    a: {
        c: {
            w: 2,
            r: {
                q: 5
            }
        }
    },
    b: {
        h: 4,
        i: {
            p: {
                q: 4
            }
        }
    }
};

function fun(obj, name, value) {
    var arr = [];
    var newArr = [];
    var getPath = function(obj, name, value) {
        for (var attr in obj) {
            arr.push(attr);
            if (typeof obj[attr] == 'object') {
                getPath(obj[attr], name, value);
            } else {
                if (attr == name && obj[attr] == value) {
                    newArr = [].concat(arr);
                    console.log(attr, name, obj[attr], value)
                }
            }
            arr.pop();
        }
    }
    console.log(arr);
    getPath(obj, name, value);
    return newArr;
}
var arr = fun(obj, 'q', 5);
console.log(arr);


// 对于全局变量来说，全局变量的生存周期是永久的，除非我们主动销毁这个全局变量
// 而对于在函数内用var关键字声明的局部变量来说，当退出函数时，这些局部变量失去了他们的价值，他们都会随着函数调用的结束而被销毁
var func = function() {
    var a = 1;
    alert(a);
}

func(); // 函数执行完以后，局部变量a将被销毁


// 判断数据类型
/**
 * 1. indtanceof
 * 2. typeof
 * 3. Object.prototype.toString.call()[object Xxx]
 */

// 数据类型转换


