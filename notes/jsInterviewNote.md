# *let、var、const* 的区别



## 经典真题



- *let const var* 的区别？什么是块级作用域？如何用？



## 声明变量关键字汇总



在 *JavaScript* 中，一共存在 *3* 种声明变量的方式：

- *var*
- *let*
- *const*

之所以有 *3* 种方式，这是由于历史原因造成的。最初声明变量的关键字就是 *var*，但是为了解决作用域的问题，所以后面新增了 *let* 和 *const* 的方式。



### 作用域



首先我们来了解一下作用域。

*ES5* 中的作用域有：全局作用域、函数作用域，*ES6* 中新增了块级作用域。块作用域由 { } 包括，*if*  语句和  *for*  语句里面的 { } 也属于块作用域。

关于作用域的更多内容，可以参阅《作用域和作用域链》章节。



### *var* 关键字



1. 没有块级作用域的概念

```js
//Global Scope
{
  var a = 10;
}
console.log(a);  //10
```

上面代码中，在 *Global Scope*（全局作用域）中，且在 *Block Scope*（块级作用域） { } 中，*a* 输出结果为 *10*，由此可以看出 *var* 声明的变量不存在 *Block Scope* 的概念



2. 有全局作用域、函数作用域的概念

```js
//Global Scope
var a = 10;
function checkscope(){
    //Local Scope
    var b = 20;
    console.log(a);  //10
    console.log(b);  //20
}
checkscope();
console.log(b);  //ReferenceError: b is not defined
```

上面代码中，在 *Global Scope* 中用 *var* 声明了 *a*，在 *checkscope* 函数中的 *Local Scope*（本地作用域、函数作用域）中打印出了 *10*，但是在 *Global Scope* 中打印的变量 *b* 报错了。



3. 不初始化值默认为 *undefined*

```js
//Global Scope
var a;
console.log(a);  //undefined
```

上面代码中，在 *Global Scope* 中用 *var* 声明了 *a*，但没有初始化值，它的值默认为 *undefined*，这里是 *undefined* 是 *undefined* 类型，而不是字符串。



4. 存在变量提升

```js
//Global Scope
console.log(a);  //undefined
var a = 10;

checkscope();
function checkscope(){
    //Local Scope
    console.log(a);  //undefined
    var a;
}
```

上面代码中，先打印了 *a*，然后用 *var* 声明变量 *a*。变量提升是因为 *js* 需要经历编译和执行阶段。而 *js* 在编译阶段的时候，会搜集所有的变量声明并且提前声明变量。

可以将这个过程形象地想象成所有的声明（变量）都会被“移动”到各自作用域的最顶端，这个过程被称为提升。

至于 *checkscope* 函数中的变量 *a* 为什么输出 *undefined*，可以参阅《作用域和作用域链》章节。



5. 全局作用域用 *var* 声明的变量会挂载到 *window* 对象下

```js
//Global Scope
var a = 10;
console.log(a);  //10
console.log(window.a);  //10
console.log(this.a);  //10
```

上面代码中，打印出了 *3* 个 *10*，访问 *a* 和 *window.a* 或是 *this.a* 都是等价的。

举个例子：比如我要访问 *location* 对象，使用 *location* 可以访问，使用 *window.location* 也可以访问，只不过 *window* 对象可以省略不写，就像 *new Array( )* 和 *new window.Array( )* 是等价的。



6. 同一作用域中允许重复声明

```js
//Global Scope
var a = 10;
var a = 20;
console.log(a);  //20

checkscope();
function checkscope(){
    //Local Scope
    var b = 10;
    var b = 20;
    console.log(b);  //20
}
```

上面代码中，在 *Global Scope* 中声明了 *2* 次 *a*，以最后一次声明有效，打印为 *20*。同理，在 *Local Scope* 也是一样的。



### *let* 关键字



1. 有块级作用域的概念

```js
{
   //Block Scope
   let a = 10;
}
console.log(a);  //ReferenceError: a is not defined
```

上面代码中，打印 *a* 报错，说明存在 *Block Scope* 的概念。



2. 不存在变量提升

```js
{
  //Block Scope
  console.log(a);  //ReferenceError: Cannot access 'a' before initialization
  let a = 10;
}
```

上面代码中，打印 *a* 报错：无法在初始化之前访问。说明不存在变量提升。



3. 暂时性死区

```js
{
  //Block Scope
  console.log(a);  //ReferenceError: Cannot access 'a' before initialization
  let a = 20;
}

if (true) {
  //TDZ开始
  console.log(a);  //ReferenceError: Cannot access 'a' before initialization

  let a; //TDZ结束
  console.log(a);  //undefined

  a = 123;
  console.log(a);  //123
}
```

上面代码中，使用 *let* 声明的变量 *a*，导致绑定这个块级作用域，所以在 *let* 声明变量前，打印的变量 *a* 报错。

这是因为使用 *let/const* 所声明的变量会存在暂时性死区。

什么叫做暂时性死区域呢？

*ES6* 标准中对 *let/const* 声明中的解释 [第13章](https://link.segmentfault.com/?enc=K6pZVwgVNQb0IBQ9LTOuJg%3D%3D.p07UoPCGl5RslJ9ZnW9Nr36NFqs2pU%2FnSfWZUPIH3S1TUXzWdj22pH0lUMFVGVUwJkDpSHrYe8uKlYek%2FK4HBDYkJhc%2Fe2xiWo5V6teR%2BXY%3D)，有如下一段文字：

> *The variables are created when their containing Lexical Environment is instantiated but may not be accessed inany way until the variable’s LexicalBinding is evaluated.*



翻译成人话就是：

> 当程序的控制流程在新的作用域（*module、function* 或 *block* 作用域）进行实例化时，在此作用域中用 *let/const* 声明的变量会先在作用域中被创建出来，但因此时还未进行词法绑定，所以是不能被访问的，如果访问就会抛出错误。因此，在这运行流程进入作用域创建变量，到变量可以被访问之间的这一段时间，就称之为暂时死区。



再简单理解就是：

>*ES6* 规定，*let/const* 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
>总之，在代码块内，使用 *let/const* 命令声明变量之前，该变量都是不可用的。
>这在语法上，称为 **“暂时性死区”**（ *temporal dead zone*，简称 ***TDZ***）。



其实上面不存在变量提升的例子中，其实也是暂时性死区，因为它有暂时性死区的概念，所以它压根就不存在变量提升了。



4. 同一块作用域中不允许重复声明

```js
{
  //Block Scope
  let A;
  var A;  //SyntaxError: Identifier 'A' has already been declared
}
{
  //Block Scope
  var A;
  let A;  //SyntaxError: Identifier 'A' has already been declared
}
{
  //Block Scope
  let A;
  let A;  //SyntaxError: Identifier 'A' has already been declared
}
```



### *const* 关键字



1. 必须立即初始化，不能留到以后赋值

```js
// Block Scope 
const a; // SyntaxError: Missing initializer in const declaration } 
```

上面代码中，用 *const* 声明的变量 *a* 没有进行初始化，所以报错。



2. 常量的值不能改变

```js
//Block Scope 
{
  const a = 10; 
	a = 20; // TypeError: Assignment to constant variable
}
```

上面代码中，用 *const* 声明了变量 *a* 且初始化为 *10*，然后试图修改 *a* 的值，报错。 

*const* 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。



### 特点总结



- *var* 关键字

1. 没有块级作用域的概念
2. 有全局作用域、函数作用域的概念
3. 不初始化值默认为 *undefined*
4. 存在变量提升
5. 全局作用域用 *var* 声明的变量会挂载到 *window* 对象下
6. 同一作用域中允许重复声明



- *let* 关键字

1. 有块级作用域的概念
2. 不存在变量提升
3. 暂时性死区
5. 同一块作用域中不允许重复声明



- *const* 关键字

1. 与 *let* 特性一样，仅有 *2* 个差别
2. 区别 1：必须立即初始化，不能留到以后赋值
3. 区别 2：常量的值不能改变



## 真题解答



- *let const var* 的区别？什么是块级作用域？如何用？

>参考答案：
>
>1. *var* 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问，有变量提升。
>2. *let* 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明。
>3. *const* 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改，无变量提升，不可以重复声明。
>
>最初在 *JS* 中作用域有：全局作用域、函数作用域。没有块作用域的概念。
>
>*ES6* 中新增了块级作用域。块作用域由 { } 包括，*if* 语句和 *for* 语句里面的 { } 也属于块作用域。
>
>在以前没有块作用域的时候，在 *if* 或者 *for* 循环中声明的变量会泄露成全局变量，其次就是 { } 中的内层变量可能会覆盖外层变量。块级作用域的出现解决了这些问题。



-*EOF*- 

# 值和引用



## 经典真题



- *JS* 的基本数据类型有哪些？基本数据类型和引用数据类型的区别



## 值和引用相关内容



在 *JavaScript* 中，数据类型整体上来讲可以分为两大类：**基本类型**和**引用数据类型**

基本数据类型，一共有 *6* 种：

```text
string，symbol，number，boolean，undefined，null
```

其中 *symbol* 类型是在 *ES6* 里面新添加的基本数据类型。

引用数据类型，就只有 *1* 种：

```js
object
```

基本数据类型的值又被称之为原始值或简单值，而引用数据类型的值又被称之为复杂值或引用值。



那么两者之间具体有什么区别呢？我们一点一点来看：



#### 1. 简单值（原始值）

**简单值是表示 *JavaScript* 中可用的数据或信息的最底层形式或最简单形式。**简单类型的值被称为简单值，是因为它们是**不可细化**的。

也就是说，数字是数字，字符串是字符串，布尔值是 *true* 或 *false*，*null* 和 *undefined* 就是 *null* 和 *undefined*。这些值本身很简单，不能够再进行拆分。

由于简单值的数据大小是固定的，所以**简单值的数据是存储于内存中的栈区里面的。**



要简单理解栈的存取方式，我们可以通过类比乒乓球盒子来分析。如下图：

![img](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-30-025405.png)



下面是具体的代码示例：

```js
var str = "Hello World";
var num = 10;
var bol = true;
var myNull = null;
var undef = undefined;
console.log(typeof str); // string
console.log(typeof num); // number
console.log(typeof bol); // boolean
console.log(typeof myNull); // object
console.log(typeof undef); // undefined
```

这里面 *null* 比较特殊，打印出来是 *object*，这是由于历史原因所遗留下来的问题。

是来源于 *JavaScript* 从第一个版本开始时的一个 *bug*，并且这个 *bug* 无法被修复。因为修复会破坏现有的代码。

具体原因是因为不同的对象在底层都表现为二进制，在 *JavaScript* 中二进制前三位都为 *0* 的话会被判断为 *object* 类型，*null* 的二进制全部为 *0*，自然前三位也是 *0*，所以执行 *typeof* 值会返回 *object*。



例外，当我们打印 *null == undefined* 的时候，返回的是 *true*，这也是面试时经常会被问到的一个问题。

这两个值都表示“无”的意思。

通常情况下， 当我们试图访问某个不存在的或者没有赋值的变量时，就会得到一个 *undefined* 值。*Javascript* 会自动将声明是没有进行初始化的变量设为 *undifined*。

而 *null* 值表示空，*null* 不能通过 *Javascript* 来自动赋值，也就是说必须要我们自己手动来给某个变量赋值为 *null*。

那么为什么 *JavaScript* 要设置两个表示"无"的值呢？

这其实也是因为历史原因。

*1995* 年 *JavaScript* 诞生时，最初像 *Java* 一样，只设置了 *null* 作为表示"无"的值。根据 *C* 语言的传统，*null* 被设计成可以自动转为 *0*。

但是，*JavaScript* 的设计者，觉得这样做还不够，主要有以下两个原因。

1. *null* 像在 *Java* 里一样，被当成一个对象。但是，*JavaScript* 的数据类型分成原始类型（*primitive*）和复合类型（*complex*）两大类，作者觉得表示“无”的值最好不是对象。
2. *JavaScript* 的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。作者觉得，如果 *null* 自动转为 *0*，很不容易发现错误。

因此，作者又设计了一个 *undefined*。**这里注意：先有 *null* 后有 *undefined* 出来，*undefined* 是为了填补之前的坑。**

*JavaScript* 的最初版本是这样区分的：



*null* 是一个表示“无”的对象（空对象指针），转为数值时为 *0*；

典型用法是：

- 作为函数的参数，表示该函数的参数不是对象。

- 作为对象原型链的终点。



*undefined* 是一个表示"无"的原始值，转为数值时为 *NaN*。

典型用法是：

- 变量被声明了，但没有赋值时，就等于 *undefined*。 
- 调用函数时，应该提供的参数没有提供，该参数等于 *undefined*。
- 对象没有赋值的属性，该属性的值为 *undefined*。
- 函数没有返回值时，默认返回 *undefined*。



#### 2. 复杂值（引用值）

在 *JavaScript* 中，对象就是一个复杂值。因为对象可以向下拆分，拆分成多个简单值或者复杂值。

**复杂值在内存中的大小是未知的，因为复杂值可以包含任何值，而不是一个特定的已知值，所以复杂值的数据都是存储于堆区里面。**

如下图所示：

![img](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-30-025509.png)

下面是具体的代码示例：

```js
// 简单值
var a1 = 0;
var a2 = "this is str";
var a3 = null

// 复杂值
var c = [1, 2, 3];
var d = {m: 20};
```



#### 3. 访问方式

**按值访问**

简单值是作为不可细化的值进行存储和使用的，引用它们会转移其值。

```js
var str = "Hello";
var str2 = str;
str = null;
console.log(str,str2); // null "Hello"
```

**引用访问**

复杂值是通过引用进行存储和操作的，而不是实际的值。创建一个包含复杂对象的变量时，其值是内存中的一个引用地址。引用一个复杂对象时，使用它的名称（即变量或对象属性）通过内存中的引用地址获取该对象值。

```js
var obj = {};
var obj2 = obj;
obj.name = "zhangsan";
console.log(obj.name); // zhangsan
console.log(obj2.name); // zhangsan
```



#### 4. 比较方式

简单值采用值比较，而复杂值采用引用比较。复杂值只有在引用相同的对象（即有相同的地址）时才相等。即使是包含相同对象的两个变量也彼此不相等，因为它们并不指向同一个对象。

示例 1:

```js
var a = 10;
var b = 10;
var c = new Number(10);
var d = c;
console.log(a === b); // true
console.log(a === c); // false
console.log(a === c); // false
console.log(a == c); // true
d = 10;
console.log(d == c); // true
console.log(d === c); // false
```

示例 2:

```js
var obj = {name : 'zhangsan'};
var obj2 = {name : 'zhangsan'};
console.log(obj == obj2); // false
console.log(obj === obj2); // false
var obj3 = {name : 'zhangsan'};
var obj4 = obj3;
console.log(obj3 == obj4); // true
console.log(obj3 === obj4); // ture
```



#### 5. 动态属性

对于复杂值，可以为其添加属性和方法，也可以改变和删除其属性和方法。但简单值不可以：

```js
var str = 'test';
str.abc = true;
console.log(str.abc); // undefined
var obj = {};
obj.abc = true;
console.log(obj.abc); // true
```



复杂值支持动态对象属性，因为我们可以定义对象，然后创建引用，再更新对象，并且所有指向该对象的变量都会获得更新。

一个新变量指向现有的复杂对象，并没有复制该对象。这就是复杂值有时被称为引用值的原因。复杂值可以根据需求有任意多个引用，即使对象改变，它们也总是指向同一个对象

```js
var obj = {name : 'zhangsan'};
var obj2 = obj;
var obj3 = obj2;
obj.name = 'abc';
console.log(obj.name, obj2.name, obj3.name);
// abc abc abc
```



#### 6. 变量赋值

最后说一下关于变量的赋值，其实是可以分为直接赋值和引用赋值的。直接赋值，就是指将简单值赋值给变量，而引用赋值是指将一个复杂值的引用赋值给变量，这个引用指向堆区实际存在的数据。

**直接赋值**

```js
var a = 3;
var b = a;
b = 5;
console.log(a); // 3
```

**引用赋值**

```js
var a = {value : 1};
var b = a;
b.value = 10;
console.log(a.value); // 10
```



## 真题解答



- *JS* 的基本数据类型有哪些？基本数据类型和引用数据类型的区别

> 参考答案：
>
> 在 *JavaScript* 中，数据类型整体上来讲可以分为两大类：**基本类型**和**引用数据类型**
>
> 基本数据类型，一共有 *6* 种：
>
> ```text
> string，symbol，number，boolean，undefined，null
> ```
>
> 其中 *symbol* 类型是在 *ES6* 里面新添加的基本数据类型。
>
> 引用数据类型，就只有 *1* 种：
>
> ```js
> object
> ```
>
> 基本数据类型的值又被称之为原始值或简单值，而引用数据类型的值又被称之为复杂值或引用值。
>
> 两者的区别在于：
>
> **原始值是表示 *JavaScript* 中可用的数据或信息的最底层形式或最简单形式。**简单类型的值被称为原始值，是因为它们是**不可细化**的。
>
> 也就是说，数字是数字，字符是字符，布尔值是 *true* 或 *false*，*null* 和 *undefined* 就是 *null* 和 *undefined*。这些值本身很简单，不能够再进行拆分。由于原始值的数据大小是固定的，所以**原始值的数据是存储于内存中的栈区里面的。**
>
> 在 *JavaScript* 中，对象就是一个引用值。因为对象可以向下拆分，拆分成多个简单值或者复杂值。**引用值在内存中的大小是未知的，因为引用值可以包含任何值，而不是一个特定的已知值，所以引用值的数据都是存储于堆区里面。**
>
> 最后总结一下两者的区别：
>
> 1. 访问方式
>    - 原始值：访问到的是值
>    - 引用值：访问到的是引用地址
> 2. 比较方式
>    - 原始值：比较的是值
>    - 引用值：比较的是地址
>
> 3. 动态属性
>    - 原始值：无法添加动态属性
>    - 引用值：可以添加动态属性
> 4. 变量赋值
>    - 原始值：赋值的是值
>    - 引用值：赋值的是地址



-*EOF*-

# 包装类型



## 经典真题



- 是否了解 *JavaScript* 中的包装类型？



## 包装类型



在 *ES* 中，数据的分类分为**基本数据类型**和**引用类型**。



按照最新 *ES* 标准定义，基本数据类型（*primitive value*）包括 *undefined、null、boolean、number、symbol、string*。

引用类型包括 *Object、Array、Date、RegExp* 等。

基本数据类型和引用类型这两个类型其中一个很明显的区别是，引用类型有自己内置的方法，也可以自定义其他方法用来操作数据，而基本数据类型不能像引用类型那样有自己的内置方法对数据进行更多的操作。



但基本数据类型真的就不能使用方法吗？对于部分基本类型来说确实是这样的。

但是有 *3* 个是 *ES* 提供了对应的特殊引用类型（包装类型）*Boolean、Number、String*。

基本包装类型，和其他引用类型一样，拥有内置的方法可以对数据进行额外操作。如下：

```js
var str = 'hello'; // string 基本类型
var s2 = str.charAt(0);
console.log(s2); // h
```

上面的 *string* 是一个基本类型，但是它却能调用 *charAt( )* 的方法。

其主要是因为在执行第二行代码时，后台会自动进行下面的步骤：

1. 自动创建 *String* 类型的一个实例（和基本类型的值不同，这个实例就是一个基本包装类型的对象）
2. 调用实例（对象）上指定的方法
3. 销毁这个实例

用代码的方式解释就是如下：

```js
//我们平常写程序的过程：
var str = 'hello'; // string 基本类型
var s2 = str.charAt(0); // 在执行到这一句的时候 后台会自动完成以下动作 ：
(
    var _str = new String('hello'); // 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
    var s2 = _str.charAt(0); // 2 然后这个对象就可以调用包装对象下的方法，并且返回结给 s2.
    _str = null;  //    3 之后这个临时创建的对象就被销毁了， str =null; 
)
console.log(s2); // h 
console.log(str); // hello
```



基本类型的值虽然没有方法可以调用，但是后台临时创建的包装对象上有内置方法可以让我们调用方法，因此这样我们就可以对字符串、数值、布尔值这三种基本数据类型的数据进行更多操作。

而什么时候后台会自动创建一个对应的基本包装类型的对象，取决于当前执行的代码是否是为了获取他的值。

每当读取一个基本类型的值，也就是当我们需要从内存中获取到他的值时（这个访问过程称为读取模式），这时后台就会自动创建一个基本包装类型的对象。例如：

```javascript
var test = 'hhh'
console.log(test) // 读取模式，后台自动创建基本包装类型对象
var test2 = test // 赋值给变量 test2，也需要读取 test 的值，同上
```

基本包装类型的对象和引用类型的对象最大的一个区别是，对象的生存期不同，导致的一个结果就是，基本包装类型无法自定义自己的方法。

对于引用类型的数据，在执行流离开当前作用域之前都会保存在内存中，而对于自动创建的基本包装类型的对象，只存在于一行代码的执行瞬间，执行完毕就会立即被销毁。
如下：

```javascript
var str = 'test'
str.test = 'hhh'
console.log(str.test) //undefined
```

上面第二行代码给自动创建的 *String* 实例对象添加了 *test* 属性，虽然此刻代码执行时他是生效的，但是在这行代码执行完毕后该 *String* 实例就会立刻被销毁，*String* 实例的 *test* 属性也就不存在了。

当执行第三行代码时，由于是读取模式，又重新创建了新的 *String* 实例，而这个新创建的 *String* 实例没有 *test* 属性，结果也就是 *undefined*。



用代码的方式解释就是如下：

```js
var str = 'hello';
str.number = 10; //假设我们想给字符串添加一个属性 number ，后台会有如下步骤
(
    var _str = new String('hello'); // 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
    _str.number = 10; // 2 通过这个对象调用包装对象下的方法 但结果并没有被任何东西保存
    _str =null; // 3 这个对象又被销毁
)
console.log(str.number); // undefined  当执行到这一句的时候，因为基本类型本来没有属性，后台又会重新重复上面的步骤
(
   var str = new String('hello');// 1 找到基本包装对象，然后又新开辟一个内存，创建一个值为 hello 对象
   str.number = undefined;// 2 因为包装对象下面没有 number 这个属性，所以又会重新添加，因为没有值，所以值是未定义;然后弹出结果
   str =null; // 3 这个对象又被销毁
)
```



那么我们怎么才能给基本类型添加方法或者属性呢？

答案是在基本包装对象的原型下面添加，每个对象都有原型。

```js
//给字符串添加方法  要写到对应的包装对象的原型下才行
var str = 'hello';
String.prototype.last= fuction(){ 
    return this.charAt(this.length);
}; 
str.last(); // 5 执行到这一句，后台依然会偷偷的干这些事
(
    var _str = new String('hello');// 找到基本包装对象，new一个和字符串值相同的对象，
    _str.last();  // 通过这个对象找到了包装对象下的方法并调用 
    _str =null; //  这个对象被销毁
)
```



## 真题解答



- 是否了解 *JavaScript* 中的包装类型？

> 参考答案：
>
> 包装对象，就是当基本类型以对象的方式去使用时，*JavaScript* 会转换成对应的包装类型，相当于 *new* 一个对象，内容和基本类型的内容一样，然后当操作完成再去访问的时候，这个临时对象会被销毁，然后再访问时候就是 *undefined*。
>
> *number、string、boolean* 都有对应的包装类型。
>
> 因为有了基本包装类型，所以 *JavaScript*  中的基本类型值可以被当作对象来访问。
>
> 基本类型特征：
>
> 1. 每个包装类型都映射到同名的基本类型
> 2. 在读取模式下访问基本类型值时，就会创建对应的基本包装类型的一个对象，从而方便了数据操作
> 3. 操作基本类型值的语句一经执行完毕，就会立即销毁新创建的包装对象



-*EOF*-

# 数据类型的转换



## 经典真题



- *JavaScript* 中如何进行数据类型的转换？



## 数据类型转换介绍



*JavaScript* 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值。

```js
var x = y ? 1 : 'a';
```

上面代码中，变量`x`到底是数值还是字符串，取决于另一个变量`y`的值。`y`为`true`时，`x`是一个数值；`y`为`false`时，`x`是一个字符串。这意味着，`x`的类型没法在编译阶段就知道，必须等到运行时才能知道。

虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。比如，减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值。

```javascript
'4' - '3' // 1
```

上面代码中，虽然是两个字符串相减，但是依然得到数值 `1`，原因就在于 *JavaScript* 将运算子自动转为了数值。



所以接下来我们就来看一下 *JavaScript* 中如何进行数据类型转换。



## 强制转换（显式转换）



强制转换主要指使用`Number()`、`String()`和`Boolean()`三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。



#### *Number( )*



使用`Number`函数，可以将任意类型的值转化成数值。

下面分成两种情况讨论，一种是参数是原始类型的值，另一种是参数是对象。



**（1）原始类型值**

原始类型值的转换规则如下。

```js
// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0
```

`Number`函数将字符串转为数值，要比`parseInt`函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为`NaN`。

```js
parseInt('42 cats') // 42
Number('42 cats') // NaN
```

上面代码中，`parseInt`逐个解析字符，而`Number`函数整体转换字符串的类型。

另外，`parseInt`和`Number`函数都会自动过滤一个字符串前导和后缀的空格。

```js
parseInt('\t\v\r12.34\n') // 12
Number('\t\v\r12.34\n') // 12.34
```



**（2）对象**

简单的规则是，`Number`方法的参数是对象时，将返回`NaN`，除非是包含单个数值的数组。

```js
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

之所以会这样，是因为`Number`背后的转换规则比较复杂。

第一步，调用对象自身的`valueOf`方法。如果返回原始类型的值，则直接对该值使用`Number`函数，不再进行后续步骤。

第二步，如果`valueOf`方法返回的还是对象，则改为调用对象自身的`toString`方法。如果`toString`方法返回原始类型的值，则对该值使用`Number`函数，不再进行后续步骤。

第三步，如果`toString`方法返回的是对象，就报错。

请看下面的例子。

```js
var obj = {x: 1};
Number(obj) // NaN

// 等同于
if (typeof obj.valueOf() === 'object') {
  Number(obj.toString());
} else {
  Number(obj.valueOf());
}
```

上面代码中，`Number`函数将`obj`对象转为数值。背后发生了一连串的操作，首先调用`obj.valueOf`方法, 结果返回对象本身；于是，继续调用`obj.toString`方法，这时返回字符串`[object Object]`，对这个字符串使用`Number`函数，得到`NaN`。

默认情况下，对象的`valueOf`方法返回对象本身，所以一般总是会调用`toString`方法，而`toString`方法返回对象的类型字符串（比如`[object Object]`）。所以，会有下面的结果。

```js
Number({}) // NaN
```

如果`toString`方法返回的不是原始类型的值，结果就会报错。

```js
var obj = {
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  }
};

Number(obj)
// TypeError: Cannot convert object to primitive value
```

上面代码的`valueOf`和`toString`方法，返回的都是对象，所以转成数值时会报错。

从上例还可以看到，`valueOf`和`toString`方法，都是可以自定义的。

```js
Number({
  valueOf: function () {
    return 2;
  }
})
// 2

Number({
  toString: function () {
    return 3;
  }
})
// 3

Number({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  }
})
// 2
```

上面代码对三个对象使用`Number`函数。第一个对象返回`valueOf`方法的值，第二个对象返回`toString`方法的值，第三个对象表示`valueOf`方法先于`toString`方法执行。



#### *String( )*



`String`函数可以将任意类型的值转化成字符串，转换规则如下。



**（1）原始类型值**

- **数值**：转为相应的字符串。
- **字符串**：转换后还是原来的值。
- **布尔值**：`true`转为字符串`"true"`，`false`转为字符串`"false"`。
- **undefined**：转为字符串`"undefined"`。
- **null**：转为字符串`"null"`。

```js
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
```



**（2）对象**

`String`方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

```js
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

`String`方法背后的转换规则，与`Number`方法基本相同，只是互换了`valueOf`方法和`toString`方法的执行顺序。

1. 先调用对象自身的`toString`方法。如果返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
2. 如果`toString`方法返回的是对象，再调用原对象的`valueOf`方法。如果`valueOf`方法返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
3. 如果`valueOf`方法返回的是对象，就报错。

下面是一个例子。

```js
String({a: 1})
// "[object Object]"

// 等同于
String({a: 1}.toString())
// "[object Object]"
```

上面代码先调用对象的`toString`方法，发现返回的是字符串`[object Object]`，就不再调用`valueOf`方法了。

如果`toString`法和`valueOf`方法，返回的都是对象，就会报错。

```js
var obj = {
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  }
};

String(obj)
// TypeError: Cannot convert object to primitive value
```

下面是通过自定义`toString`方法，改变返回值的例子。

```js
String({
  toString: function () {
    return 3;
  }
})
// "3"

String({
  valueOf: function () {
    return 2;
  }
})
// "[object Object]"

String({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  }
})
// "3"
```

上面代码对三个对象使用`String`函数。第一个对象返回`toString`方法的值（数值3），第二个对象返回的还是`toString`方法的值（`[object Object]`），第三个对象表示`toString`方法先于`valueOf`方法执行。



#### *Boolean( )*



`Boolean()`函数可以将任意类型的值转为布尔值。

它的转换规则相对简单：除了以下五个值的转换结果为`false`，其他的值全部为`true`。

- `undefined`
- `null`
- `0`（包含`-0`和`+0`）
- `NaN`
- `''`（空字符串）

```js
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false
```

当然，`true`和`false`这两个布尔值不会发生变化。

```js
Boolean(true) // true
Boolean(false) // false
```

注意，所有对象（包括空对象）的转换结果都是`true`，甚至连`false`对应的布尔对象`new Boolean(false)`也是`true`（详见《原始类型值的包装对象》一章）。

```js
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

所有对象的布尔值都是`true`，这是因为 JavaScript 语言设计的时候，出于性能的考虑，如果对象需要计算才能得到布尔值，对于`obj1 && obj2`这样的场景，可能会需要较多的计算。为了保证性能，就统一规定，对象的布尔值为`true`。



## 自动转换（隐式转换）



下面介绍自动转换，它是以强制转换为基础的。

遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见。

第一种情况，不同类型的数据互相运算。

```javascript
123 + 'abc' // "123abc"
```

第二种情况，对非布尔值类型的数据求布尔值。

```javascript
if ('abc') {
  console.log('hello')
}  // "hello"
```

第三种情况，对非数值类型的值使用一元运算符（即`+`和`-`）。

```javascript
+ {foo: 'bar'} // NaN
- [1, 2, 3] // NaN
```

自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。比如，某个位置预期为字符串，就调用`String()`函数进行转换。如果该位置既可以是字符串，也可能是数值，那么默认转为数值。

由于自动转换具有不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方，全部使用`Boolean()`、`Number()`和`String()`函数进行显式转换。



#### 自动转换为布尔值



JavaScript 遇到预期为布尔值的地方（比如`if`语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用`Boolean()`函数。

因此除了以下五个值，其他都是自动转为`true`。

- `undefined`
- `null`
- `+0`或`-0`
- `NaN`
- `''`（空字符串）

下面这个例子中，条件部分的每个值都相当于`false`，使用否定运算符后，就变成了`true`。

```javascript
if ( !undefined
  && !null
  && !0
  && !NaN
  && !''
) {
  console.log('true');
} // true
```

下面两种写法，有时也用于将一个表达式转为布尔值。它们内部调用的也是`Boolean()`函数。

```javascript
// 写法一
expression ? true : false

// 写法二
!! expression
```



#### 自动转换为字符串



JavaScript 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串。

字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。

```javascript
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

这种自动转换很容易出错。

```javascript
var obj = {
  width: '100'
};

obj.width + 20 // "10020"
```

上面代码中，开发者可能期望返回`120`，但是由于自动转换，实际上返回了一个字符`10020`。



#### 自动转换为数值



JavaScript 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用`Number()`函数。

除了加法运算符（`+`）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。

```javascript
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
```

上面代码中，运算符两侧的运算子，都被转成了数值。

> 注意：`null`转为数值时为`0`，而`undefined`转为数值时为`NaN`。

一元运算符也会把运算子转成数值。

```javascript
+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0
```



## 真题解答



- *JavaScript* 中如何进行数据类型的转换？

> 参考答案：
>
> 类型转换可以分为两种，**隐性转换**和**显性转换**。
>
> **1. 隐性转换**
>
> 当不同数据类型之间进行相互运算，或者当对非布尔类型的数据求布尔值的时候，会发生隐性转换。
>
> 预期为数字的时候：算术运算的时候，我们的结果和运算的数都是数字，数据会转换为数字来进行计算。
>
> | 类型      | 转换前    | 转换后 |
> | --------- | --------- | ------ |
> | number    | 4         | 4      |
> | string    | "1"       | 1      |
> | string    | "abc"     | NaN    |
> | string    | ""        | 0      |
> | boolean   | true      | 1      |
> | boolean   | false     | 0      |
> | undefined | undefined | NaN    |
> | null      | null      | 0      |
>
> 预期为字符串的时候：如果有一个操作数为字符串时，使用`+`符号做相加运算时，会自动转换为字符串。
> 	
> 预期为布尔的时候：前面在介绍布尔类型时所提到的 9 个值会转为 false，其余转为 true
>
> **2. 显性转换**
>
> 所谓显性转换，就是只程序员强制将一种类型转换为另外一种类型。显性转换往往会使用到一些转换方法。常见的转换方法如下：
>
> - 转换为数值类型：`Number()`，`parseInt()`，`parseFloat()`
>
> - 转换为布尔类型：`Boolean()`
>
> - 转换为字符串类型：`toString()`，`String()`
>
> 当然，除了使用上面的转换方法，我们也可以通过一些快捷方式来进行数据类型的显性转换，如下：
>
> - 转换字符串：直接和一个空字符串拼接，例如：`a = "" + 数据`
>
> - 转换布尔：!!数据类型，例如：`!!"Hello"`
>
> - 转换数值：数据*1 或 /1，例如：`"Hello * 1"`



-*EOF*-

# 运算符



## 经典真题



- 下面代码中，*a* 在什么情况下会执行输出语句打印 *1* ？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```



## 1. 算术运算符



*JavaScript* 共提供 *10* 个算术运算符，用来完成基本的算术运算。

- **加法运算符**：`x + y`
- **减法运算符**： `x - y`
- **乘法运算符**： `x * y`
- **除法运算符**：`x / y`
- **指数运算符**：`x ** y`
- **余数运算符**：`x % y`
- **自增运算符**：`++x` 或者 `x++`
- **自减运算符**：`--x` 或者 `x--`
- **数值运算符**： `+x`
- **负数值运算符**：`-x`

减法、乘法、除法运算法比较单纯，就是执行相应的数学运算。

下面介绍其他几个算术运算符，重点是加法运算符。



#### 加法运算符

**（1）基本规则**

加法运算符（`+`）是最常见的运算符，用来求两个数值的和。

```js
1 + 1 // 2
```

JavaScript 允许非数值的相加。

```js
true + true // 2
1 + true // 2
```

上面代码中，第一行是两个布尔值相加，第二行是数值与布尔值相加。这两种情况，布尔值都会自动转成数值，然后再相加。

比较特殊的是，如果是两个字符串相加，这时加法运算符会变成连接运算符，返回一个新的字符串，将两个原字符串连接在一起。

```js
'a' + 'bc' // "abc"
```

如果一个运算子是字符串，另一个运算子是非字符串，这时非字符串会转成字符串，再连接在一起。

```js
1 + 'a' // "1a"
false + 'a' // "falsea"
```

加法运算符是在运行时决定，到底是执行相加，还是执行连接。也就是说，运算子的不同，导致了不同的语法行为，这种现象称为“重载”（overload）。由于加法运算符存在重载，可能执行两种运算，使用的时候必须很小心。

```js
'3' + 4 + 5 // "345"
3 + 4 + '5' // "75"
```

上面代码中，由于从左到右的运算次序，字符串的位置不同会导致不同的结果。

除了加法运算符，其他算术运算符（比如减法、除法和乘法）都不会发生重载。它们的规则是：所有运算子一律转为数值，再进行相应的数学运算。

```js
1 - '2' // -1
1 * '2' // 2
1 / '2' // 0.5
```

上面代码中，减法、除法和乘法运算符，都是将字符串自动转为数值，然后再运算。



**（2）对象相加**

如果运算子是对象，必须先转成原始类型的值，然后再相加。

```javascript
var obj = { p: 1 };
obj + 2 // "[object Object]2"
```

上面代码中，对象`obj`转成原始类型的值是`[object Object]`，再加`2`就得到了上面的结果。

对象转成原始类型的值，规则如下。

首先，自动调用对象的`valueOf`方法。

```javascript
var obj = { p: 1 };
obj.valueOf() // { p: 1 }
```

一般来说，对象的`valueOf`方法总是返回对象自身，这时再自动调用对象的`toString`方法，将其转为字符串。

```javascript
var obj = { p: 1 };
obj.valueOf().toString() // "[object Object]"
```

对象的`toString`方法默认返回`[object Object]`，所以就得到了最前面那个例子的结果。

知道了这个规则以后，就可以自己定义`valueOf`方法或`toString`方法，得到想要的结果。

```javascript
var obj = {
  valueOf: function () {
    return 1;
  }
};

obj + 2 // 3
```

上面代码中，我们定义`obj`对象的`valueOf`方法返回`1`，于是`obj + 2`就得到了`3`。这个例子中，由于`valueOf`方法直接返回一个原始类型的值，所以不再调用`toString`方法。

下面是自定义`toString`方法的例子。

```javascript
var obj = {
  toString: function () {
    return 'hello';
  }
};

obj + 2 // "hello2"
```

上面代码中，对象`obj`的`toString`方法返回字符串`hello`。前面说过，只要有一个运算子是字符串，加法运算符就变成连接运算符，返回连接后的字符串。

这里有一个特例，如果运算子是一个`Date`对象的实例，那么会优先执行`toString`方法。

```javascript
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };

obj + 2 // "hello2"
```

上面代码中，对象`obj`是一个`Date`对象的实例，并且自定义了`valueOf`方法和`toString`方法，结果`toString`方法优先执行。



#### 余数运算符

余数运算符（`%`）返回前一个运算子被后一个运算子除，所得的余数。

```javascript
12 % 5 // 2
```

需要注意的是，运算结果的正负号由第一个运算子的正负号决定。

```javascript
-1 % 2 // -1
1 % -2 // 1
```

所以，为了得到负数的正确余数值，可以先使用绝对值函数。

```javascript
// 错误的写法
function isOdd(n) {
  return n % 2 === 1;
}
isOdd(-5) // false
isOdd(-4) // false

// 正确的写法
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}
isOdd(-5) // true
isOdd(-4) // false
```

余数运算符还可以用于浮点数的运算。但是，由于浮点数不是精确的值，无法得到完全准确的结果。

```javascript
6.5 % 2.1
// 0.19999999999999973
```



#### 自增和自减运算符

自增和自减运算符，是一元运算符，只需要一个运算子。它们的作用是将运算子首先转为数值，然后加上1或者减去1。它们会修改原始变量。

```javascript
var x = 1;
++x // 2
x // 2

--x // 1
x // 1
```

上面代码的变量`x`自增后，返回`2`，再进行自减，返回`1`。这两种情况都会使得，原始变量`x`的值发生改变。

运算之后，变量的值发生变化，这种效应叫做运算的副作用（side effect）。自增和自减运算符是仅有的两个具有副作用的运算符，其他运算符都不会改变变量的值。

自增和自减运算符有一个需要注意的地方，就是放在变量之后，会先返回变量操作前的值，再进行自增/自减操作；放在变量之前，会先进行自增/自减操作，再返回变量操作后的值。

```javascript
var x = 1;
var y = 1;

x++ // 1
++y // 2
```

上面代码中，`x`是先返回当前值，然后自增，所以得到`1`；`y`是先自增，然后返回新的值，所以得到`2`。



#### 数值运算符，负数值运算符

数值运算符（`+`）同样使用加号，但它是一元运算符（只需要一个操作数），而加法运算符是二元运算符（需要两个操作数）。

数值运算符的作用在于可以将任何值转为数值（与`Number`函数的作用相同）。

```javascript
+true // 1
+[] // 0
+{} // NaN
```

上面代码表示，非数值经过数值运算符以后，都变成了数值（最后一行`NaN`也是数值）。具体的类型转换规则，参见《数据类型转换》一章。

负数值运算符（`-`），也同样具有将一个值转为数值的功能，只不过得到的值正负相反。连用两个负数值运算符，等同于数值运算符。

```javascript
var x = 1;
-x // -1
-(-x) // 1
```

上面代码最后一行的圆括号不可少，否则会变成自减运算符。

数值运算符号和负数值运算符，都会返回一个新的值，而不会改变原始变量的值。



#### 指数运算符

指数运算符（`**`）完成指数运算，前一个运算子是底数，后一个运算子是指数。

```javascript
2 ** 4 // 16
```

注意，指数运算符是右结合，而不是左结合。即多个指数运算符连用时，先进行最右边的计算。

```javascript
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

上面代码中，由于指数运算符是右结合，所以先计算第二个指数运算符，而不是第一个。



#### 赋值运算符

赋值运算符（Assignment Operators）用于给变量赋值。

最常见的赋值运算符，当然就是等号（`=`）。

```javascript
// 将 1 赋值给变量 x
var x = 1;

// 将变量 y 的值赋值给变量 x
var x = y;
```

赋值运算符还可以与其他运算符结合，形成变体。下面是与算术运算符的结合。

```javascript
// 等同于 x = x + y
x += y

// 等同于 x = x - y
x -= y

// 等同于 x = x * y
x *= y

// 等同于 x = x / y
x /= y

// 等同于 x = x % y
x %= y

// 等同于 x = x ** y
x **= y
```

下面是与位运算符的结合（关于位运算符，请见后文的介绍）。

```javascript
// 等同于 x = x >> y
x >>= y

// 等同于 x = x << y
x <<= y

// 等同于 x = x >>> y
x >>>= y

// 等同于 x = x & y
x &= y

// 等同于 x = x | y
x |= y

// 等同于 x = x ^ y
x ^= y
```

这些复合的赋值运算符，都是先进行指定运算，然后将得到值返回给左边的变量。



## 2. 比较运算符



比较运算符用于比较两个值的大小，然后返回一个布尔值，表示是否满足指定的条件。

```
2 > 1 // true
```

上面代码比较`2`是否大于`1`，返回`true`。

> 注意，比较运算符可以比较各种类型的值，不仅仅是数值。

JavaScript 一共提供了8个比较运算符。

- `>` 大于运算符
- `<` 小于运算符
- `<=` 小于或等于运算符
- `>=` 大于或等于运算符
- `==` 相等运算符
- `===` 严格相等运算符
- `!=` 不相等运算符
- `!==` 严格不相等运算符

这八个比较运算符分成两类：相等比较和非相等比较。两者的规则是不一样的，对于非相等的比较，算法是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小。



#### 非相等运算符：字符串的比较

字符串按照字典顺序进行比较。

```
'cat' > 'dog' // false
'cat' > 'catalog' // false
```

JavaScript 引擎内部首先比较首字符的 Unicode 码点。如果相等，再比较第二个字符的 Unicode 码点，以此类推。

```
'cat' > 'Cat' // true'
```

上面代码中，小写的`c`的 Unicode 码点（`99`）大于大写的`C`的 Unicode 码点（`67`），所以返回`true`。

由于所有字符都有 Unicode 码点，因此汉字也可以比较。

```
'大' > '小' // false
```

上面代码中，“大”的 Unicode 码点是22823，“小”是23567，因此返回`false`。



#### 非相等运算符：非字符串的比较

如果两个运算子之中，至少有一个不是字符串，需要分成以下两种情况。

**（1）原始类型值**

如果两个运算子都是原始类型的值，则是先转成数值再比较。

```javascript
5 > '4' // true
// 等同于 5 > Number('4')
// 即 5 > 4

true > false // true
// 等同于 Number(true) > Number(false)
// 即 1 > 0

2 > true // true
// 等同于 2 > Number(true)
// 即 2 > 1
```

上面代码中，字符串和布尔值都会先转成数值，再进行比较。

这里需要注意与`NaN`的比较。任何值（包括`NaN`本身）与`NaN`使用非相等运算符进行比较，返回的都是`false`。

```javascript
1 > NaN // false
1 <= NaN // false
'1' > NaN // false
'1' <= NaN // false
NaN > NaN // false
NaN <= NaN // false
```



**（2）对象**

如果运算子是对象，会转为原始类型的值，再进行比较。

对象转换成原始类型的值，算法是先调用`valueOf`方法；如果返回的还是对象，再接着调用`toString`方法，详细解释参见《数据类型的转换》一章。

```javascript
var x = [2];
x > '11' // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () { return '1' };
x > '11' // false
// 等同于 [2].valueOf() > '11'
// 即 '1' > '11'
```

两个对象之间的比较也是如此。

```javascript
[2] > [1] // true
// 等同于 [2].valueOf().toString() > [1].valueOf().toString()
// 即 '2' > '1'

[2] > [11] // true
// 等同于 [2].valueOf().toString() > [11].valueOf().toString()
// 即 '2' > '11'

{ x: 2 } >= { x: 1 } // true
// 等同于 { x: 2 }.valueOf().toString() >= { x: 1 }.valueOf().toString()
// 即 '[object Object]' >= '[object Object]'
```



#### 严格相等运算符

*JavaScript* 提供两种相等运算符：`==`和`===`。

简单说，它们的区别是相等运算符（`==`）比较两个值是否相等，严格相等运算符（`===`）比较它们是否为“同一个值”。如果两个值不是同一类型，严格相等运算符（`===`）直接返回`false`，而相等运算符（`==`）会将它们转换成同一个类型，再用严格相等运算符进行比较。



**（1）不同类型的值**

如果两个值的类型不同，直接返回`false`。

```js
1 === "1" // false
true === "true" // false
```

上面代码比较数值的`1`与字符串的“1”、布尔值的`true`与字符串`"true"`，因为类型不同，结果都是`false`。



**（2）同一类的原始类型值**

同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回`true`，值不同就返回`false`。

```js
1 === 0x1 // true
```

上面代码比较十进制的`1`与十六进制的`1`，因为类型和值都相同，返回`true`。

需要注意的是，`NaN`与任何值都不相等（包括自身）。另外，正`0`等于负`0`。

```js
NaN === NaN  // false
+0 === -0 // true
```



**（3）复合类型值**

两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址。

```js
{} === {} // false
[] === [] // false
(function () {} === function () {}) // false
```

上面代码分别比较两个空对象、两个空数组、两个空函数，结果都是不相等。原因是对于复合类型的值，严格相等运算比较的是，它们是否引用同一个内存地址，而运算符两边的空对象、空数组、空函数的值，都存放在不同的内存地址，结果当然是`false`。

如果两个变量引用同一个对象，则它们相等。

```js
var v1 = {};
var v2 = v1;
v1 === v2 // true
```

注意，对于两个对象的比较，严格相等运算符比较的是地址，而大于或小于运算符比较的是值。

```js
var obj1 = {};
var obj2 = {};

obj1 > obj2 // false
obj1 < obj2 // false
obj1 === obj2 // false
```

上面的三个比较，前两个比较的是值，最后一个比较的是地址，所以都返回`false`。



**（4）undefined 和 null**

`undefined`和`null`与自身严格相等。

```js
undefined === undefined // true
null === null // true
```

由于变量声明后默认值是`undefined`，因此两个只声明未赋值的变量是相等的。

```js
var v1;
var v2;
v1 === v2 // true
```



#### 严格不相等运算符

严格相等运算符有一个对应的“严格不相等运算符”（`!==`），它的算法就是先求严格相等运算符的结果，然后返回相反值。

```js
1 !== '1' // true
// 等同于
!(1 === '1')
```

上面代码中，感叹号`!`是求出后面表达式的相反值。



#### 相等运算符

相等运算符用来比较相同类型的数据时，与严格相等运算符完全一样。

```js
1 == 1.0
// 等同于
1 === 1.0
```

比较不同类型的数据时，相等运算符会先将数据进行类型转换，然后再用严格相等运算符比较。下面分成几种情况，讨论不同类型的值互相比较的规则。



**（1）原始类型值**

原始类型的值会转换成数值再进行比较。

```js
1 == true // true
// 等同于 1 === Number(true)

0 == false // true
// 等同于 0 === Number(false)

2 == true // false
// 等同于 2 === Number(true)

2 == false // false
// 等同于 2 === Number(false)

'true' == true // false
// 等同于 Number('true') === Number(true)
// 等同于 NaN === 1

'' == 0 // true
// 等同于 Number('') === 0
// 等同于 0 === 0

'' == false  // true
// 等同于 Number('') === Number(false)
// 等同于 0 === 0

'1' == true  // true
// 等同于 Number('1') === Number(true)
// 等同于 1 === 1

'\n  123  \t' == 123 // true
// 因为字符串转为数字时，省略前置和后置的空格
```

上面代码将字符串和布尔值都转为数值，然后再进行比较。



**（2）对象与原始类型值比较**

对象（这里指广义的对象，包括数组和函数）与原始类型的值比较时，对象转换成原始类型的值，再进行比较。

具体来说，先调用对象的`valueOf()`方法，如果得到原始类型的值，就按照上一小节的规则，互相比较；如果得到的还是对象，则再调用`toString()`方法，得到字符串形式，再进行比较。

下面是数组与原始类型值比较的例子。

```
// 数组与数值的比较
[1] == 1 // true

// 数组与字符串的比较
[1] == '1' // true
[1, 2] == '1,2' // true

// 对象与布尔值的比较
[1] == true // true
[2] == true // false
```

上面例子中，JavaScript 引擎会先对数组`[1]`调用数组的`valueOf()`方法，由于返回的还是一个数组，所以会接着调用数组的`toString()`方法，得到字符串形式，再按照上一小节的规则进行比较。

下面是一个更直接的例子。

```js
const obj = {
  valueOf: function () {
    console.log('执行 valueOf()');
    return obj;
  },
  toString: function () {
    console.log('执行 toString()');
    return 'foo';
  }
};

obj == 'foo'
// 执行 valueOf()
// 执行 toString()
// true
```

上面例子中，`obj`是一个自定义了`valueOf()`和`toString()`方法的对象。这个对象与字符串`'foo'`进行比较时，会依次调用`valueOf()`和`toString()`方法，最后返回`'foo'`，所以比较结果是`true`。



**（3）undefined 和 null**

`undefined`和`null`只有与自身比较，或者互相比较时，才会返回`true`；与其他类型的值比较时，结果都为`false`。

```js
undefined == undefined // true
null == null // true
undefined == null // true

false == null // false
false == undefined // false

0 == null // false
0 == undefined // false
```



**（4）相等运算符的缺点**

相等运算符隐藏的类型转换，会带来一些违反直觉的结果。

```js
0 == ''             // true
0 == '0'            // true

2 == true           // false
2 == false          // false

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

上面这些表达式都不同于直觉，很容易出错。因此建议不要使用相等运算符（`==`），最好只使用严格相等运算符（`===`）。



#### 不相等运算符

相等运算符有一个对应的“不相等运算符”（`!=`），它的算法就是先求相等运算符的结果，然后返回相反值。

```js
1 != '1' // false

// 等同于
!(1 == '1')
```



## 3. 布尔运算符（逻辑运算符）



布尔运算符用于将表达式转为布尔值，一共包含四个运算符。



- 取反运算符：`!`
- 且（并）运算符：`&&`
- 或运算符：`||`
- 三元运算符：`?:`



#### 取反运算符（!）

取反运算符是一个感叹号，用于将布尔值变为相反值，即`true`变成`false`，`false`变成`true`。

```js
!true // false
!false // true
```

对于非布尔值，取反运算符会将其转为布尔值。可以这样记忆，以下六个值取反后为`true`，其他值都为`false`。

- `undefined`
- `null`
- `false`
- `0`
- `NaN`
- 空字符串（`''`）

```js
!undefined // true
!null // true
!0 // true
!NaN // true
!"" // true

!54 // false
!'hello' // false
![] // false
!{} // false
```

上面代码中，不管什么类型的值，经过取反运算后，都变成了布尔值。

如果对一个值连续做两次取反运算，等于将其转为对应的布尔值，与`Boolean`函数的作用相同。这是一种常用的类型转换的写法。

```js
!!x
// 等同于
Boolean(x)
```

上面代码中，不管`x`是什么类型的值，经过两次取反运算后，变成了与`Boolean`函数结果相同的布尔值。所以，两次取反就是将一个值转为布尔值的简便写法。



#### 且运算符（&&）

且运算符（`&&`）往往用于多个表达式的求值。

它的运算规则是：如果第一个运算子的布尔值为`true`，则返回第二个运算子的值（注意是值，不是布尔值）；如果第一个运算子的布尔值为`false`，则直接返回第一个运算子的值，且不再对第二个运算子求值。

```js
't' && '' // ""
't' && 'f' // "f"
't' && (1 + 2) // 3
'' && 'f' // ""
'' && '' // ""

var x = 1;
(1 - 1) && ( x += 1) // 0
x // 1
```

上面代码的最后一个例子，由于且运算符的第一个运算子的布尔值为`false`，则直接返回它的值`0`，而不再对第二个运算子求值，所以变量`x`的值没变。

这种跳过第二个运算子的机制，被称为“短路”。有些程序员喜欢用它取代`if`结构，比如下面是一段`if`结构的代码，就可以用且运算符改写。

```js
if (i) {
  doSomething();
}

// 等价于

i && doSomething();
```

上面代码的两种写法是等价的，但是后一种不容易看出目的，也不容易除错，建议谨慎使用。

且运算符可以多个连用，这时返回第一个布尔值为`false`的表达式的值。如果所有表达式的布尔值都为`true`，则返回最后一个表达式的值。

```js
true && 'foo' && '' && 4 && 'foo' && true
// ''

1 && 2 && 3
// 3
```

上面代码中，例一里面，第一个布尔值为`false`的表达式为第三个表达式，所以得到一个空字符串。例二里面，所有表达式的布尔值都是`true`，所以返回最后一个表达式的值`3`。



#### 或运算符（||）

或运算符（`||`）也用于多个表达式的求值。它的运算规则是：如果第一个运算子的布尔值为`true`，则返回第一个运算子的值，且不再对第二个运算子求值；如果第一个运算子的布尔值为`false`，则返回第二个运算子的值。

```js
't' || '' // "t"
't' || 'f' // "t"
'' || 'f' // "f"
'' || '' // ""
```

短路规则对这个运算符也适用。

```js
var x = 1;
true || (x = 2) // true
x // 1
```

上面代码中，或运算符的第一个运算子为`true`，所以直接返回`true`，不再运行第二个运算子。所以，`x`的值没有改变。这种只通过第一个表达式的值，控制是否运行第二个表达式的机制，就称为“短路”（short-cut）。

或运算符可以多个连用，这时返回第一个布尔值为`true`的表达式的值。如果所有表达式都为`false`，则返回最后一个表达式的值。

```js
false || 0 || '' || 4 || 'foo' || true
// 4

false || 0 || ''
// ''
```

上面代码中，例一里面，第一个布尔值为`true`的表达式是第四个表达式，所以得到数值4。例二里面，所有表达式的布尔值都为`false`，所以返回最后一个表达式的值。

或运算符常用于为一个变量设置默认值。

```js
function saveText(text) {
  text = text || '';
  // ...
}

// 或者写成
saveText(this.text || '')
```

上面代码表示，如果函数调用时，没有提供参数，则该参数默认设置为空字符串。



#### 三元条件运算符（?:）

三元条件运算符由问号（?）和冒号（:）组成，分隔三个表达式。它是 JavaScript 语言唯一一个需要三个运算子的运算符。如果第一个表达式的布尔值为`true`，则返回第二个表达式的值，否则返回第三个表达式的值。

```js
't' ? 'hello' : 'world' // "hello"
0 ? 'hello' : 'world' // "world"
```

上面代码的`t`和`0`的布尔值分别为`true`和`false`，所以分别返回第二个和第三个表达式的值。

通常来说，三元条件表达式与`if...else`语句具有同样表达效果，前者可以表达的，后者也能表达。但是两者具有一个重大差别，`if...else`是语句，没有返回值；三元条件表达式是表达式，具有返回值。所以，在需要返回值的场合，只能使用三元条件表达式，而不能使用`if..else`。

```js
console.log(true ? 'T' : 'F');
```

上面代码中，`console.log`方法的参数必须是一个表达式，这时就只能使用三元条件表达式。如果要用`if...else`语句，就必须改变整个代码写法了。



## 4. 位运算符



按位运算符是将操作数换算成 *32* 位的二进制整数，然后按每一位来进行运算。例如：

*5* 的 *32* 位为：

```
00000000000000000000000000000101
```

*100* 的 *32* 位为：

```
00000000000000000000000001100100
```

*15* 的 *32* 位为： 

```
00000000000000000000000000001111
```



#### 按位非

按位非运算符`~`会把数字转为32位二进制整数，然后反转每一位。所有的 1 变为 0，所有的 0 变为 1

例如：

5 的 32 位为：

```
00000000000000000000000000000101
```

~5 的 32 位为：

```
11111111111111111111111111111010  
```

转换出来就为  -6

按位非，实质上是对操作数求负，然后减去1。



#### 按位与

按位或运算符`&`会把两个数字转为 32 位二进制整数，并对两个数的每一位执行按位与运算。按位与的规则如下表：

| 第一个数字 | 第二个数字 | 结果 |
| ---------- | ---------- | ---- |
| 1          | 1          | 1    |
| 1          | 0          | 0    |
| 0          | 1          | 0    |
| 0          | 0          | 0    |

具体示例：

```js
console.log(12 & 10); // 8
```

12 的 32 位二进制表示为：1100
10 的 32 位二进制表示为：1010

按位与的结果为：1000



#### 按位或

按位或运算符`|`会把两个数字转为 32 位二进制整数，并对两个数的每一位执行按位或运算。按位或的规则如下表：

| 第一个数字 | 第二个数字 | 结果 |
| ---------- | ---------- | ---- |
| 1          | 1          | 1    |
| 1          | 0          | 1    |
| 0          | 1          | 1    |
| 0          | 0          | 0    |

具体示例：

```js
console.log(12 | 10); // 14
```

12 的 32 位二进制表示为：1100
10 的 32 位二进制表示为：1010

按位或的结果为：1110



#### 按位异或

按位或运算符`^`会把两个数字转为 32 位二进制整数，并对两个数的每一位执行按位异或运算。运算规则为两位不同返回 1，两位相同返回 0，如下表：

| 第一个数字 | 第二个数字 | 结果 |
| ---------- | ---------- | ---- |
| 1          | 1          | 0    |
| 1          | 0          | 1    |
| 0          | 1          | 1    |
| 0          | 0          | 0    |

具体示例：

```js
console.log(12 ^ 10); // 6
```

12 的 32 位二进制表示为：1100
10 的 32 位二进制表示为：1010

按位异或的结果为：0110

按位异或如果是非整数值，如果两个操作数中只有一个为真，就返回 1，如果两个操作数都是真，或者都是假，就返回 0，示例如下：

```js
console.log(true ^ "Hello"); // 1
console.log(false ^ "Hello"); // 0
console.log(true ^ true); // 0
console.log("Hello" ^ "Hello"); // 0
console.log(false ^ false); // 0
console.log(true ^ false); // 1
```

注意这里的 Hello 被转换为了 NaN



#### 按位移位

按位移位运算符`<<`和`>>`会将所有位向左或者向右移动指定的数量，实际上就是高效率地将数字乘以或者除以 2 的指定数的次方。

`<<`：乘以 2 的指定数次方

```js
console.log(2<<2); // 8
```

2 乘以 2 的 2 次方

00000010 转换为 00001000

`>>`：除以 2 的指定数次方

```js
console.log(16>>1); // 8
```

16 除以 2 的 1 次方

00010000转换为00001000



## 5. 其他运算符



#### *void* 运算符

*void* 运算符的作用是执行一个表达式，然后不返回任何值，或者说返回 *undefined*。

```js
void 0 // undefined
void(0) // undefined
```

上面是 *void* 运算符的两种写法，都正确。建议采用后一种形式，即总是使用圆括号。

因为 *void* 运算符的优先性很高，如果不使用括号，容易造成错误的结果。

比如，*“void 4 + 7”* 实际上等同于 *“(void 4) + 7”*。

下面是 *void* 运算符的一个例子。

```js
var x = 3;
void (x = 5) //undefined
x // 5
```

这个运算符的主要用途是浏览器的书签工具（*Bookmarklet*），以及在超级链接中插入代码防止网页跳转。

请看下面的代码。

```js
<script>
function f() {
  console.log('Hello World');
}
</script>
<a href="http://example.com" onclick="f(); return false;">点击</a>
```

上面代码中，点击链接后，会先执行 *onclick* 的代码，由于 *onclick* 返回 *false*，所以浏览器不会跳转到 *example.com*。

*void* 运算符可以取代上面的写法。

```js
<a href="javascript: void(f())">文字</a>
```

下面是一个更实际的例子，用户点击链接提交表单，但是不产生页面跳转。

```js
<a href="javascript: void(document.form.submit())">
  提交
</a>
```



#### 逗号运算符

逗号运算符用于对两个表达式求值，并返回后一个表达式的值。

```js
'a', 'b' // "b"

var x = 0;
var y = (x++, 10);
x // 1
y // 10
```

上面代码中，逗号运算符返回后一个表达式的值。

逗号运算符的一个用途是，在返回一个值之前，进行一些辅助操作。

```javascript
var value = (console.log('Hi!'), true);
// Hi!

value // true
```

上面代码中，先执行逗号之前的操作，然后返回逗号后面的值。



## 6. 运算顺序



#### 优先级

*JavaScript* 各种运算符的优先级别（*Operator Precedence*）是不一样的。优先级高的运算符先执行，优先级低的运算符后执行。

```js
4 + 5 * 6 // 34
```

上面的代码中，乘法运算符（ * ）的优先性高于加法运算符（ + ），所以先执行乘法，再执行加法，相当于下面这样。

```js
4 + (5 * 6) // 34
```

如果多个运算符混写在一起，常常会导致令人困惑的代码。

```js
var x = 1;
var arr = [];

var y = arr.length <= 0 || arr[0] === undefined ? x : arr[0];
```

上面代码中，变量 *y* 的值就很难看出来，因为这个表达式涉及 *5* 个运算符，到底谁的优先级最高，实在不容易记住。

根据语言规格，这五个运算符的优先级从高到低依次为：小于等于（ <= )、严格相等（ === ）、或（ || ）、三元（ ?: ）、等号（ = ）。因此上面的表达式，实际的运算顺序如下。

```js
var y = ((arr.length <= 0) || (arr[0] === undefined)) ? x : arr[0];
```

记住所有运算符的优先级，是非常难的，也是没有必要的。



#### 圆括号的作用

圆括号可以用来提高运算的优先级，因为它的优先级是最高的，即圆括号中的表达式会第一个运算。

```js
(4 + 5) * 6 // 54
```

上面代码中，由于使用了圆括号，加法会先于乘法执行。

运算符的优先级别十分繁杂，且都是硬性规定，因此建议总是使用圆括号，保证运算顺序清晰可读，这对代码的维护和除错至关重要。

顺便说一下，圆括号不是运算符，而是一种语法结构。它一共有两种用法：一种是把表达式放在圆括号之中，提升运算的优先级；另一种是跟在函数的后面，作用是调用函数。

注意，因为圆括号不是运算符，所以不具有求值作用，只改变运算的优先级。

```js
var x = 1;
(x) = 2;
```

上面代码的第二行，如果圆括号具有求值作用，那么就会变成 *1 = 2*，这是会报错了。但是，上面的代码可以运行，这验证了圆括号只改变优先级，不会求值。

这也意味着，如果整个表达式都放在圆括号之中，那么不会有任何效果。

```js
(expression)
// 等同于
expression
```

函数放在圆括号中，会返回函数本身。如果圆括号紧跟在函数的后面，就表示调用函数。

```js
function f() {
  return 1;
}

(f) // function f(){return 1;}
f() // 1
```

上面代码中，函数放在圆括号之中会返回函数本身，圆括号跟在函数后面则是调用函数。

圆括号之中，只能放置表达式，如果将语句放在圆括号之中，就会报错。

```javascript
(var a = 1)
// SyntaxError: Unexpected token var
```



#### 左结合和右结合

对于优先级别相同的运算符，同时出现的时候，就会有计算顺序的问题。

```javascript
a OP b OP c
```

上面代码中，*OP* 表示运算符。它可以有两种解释方式。

```javascript
// 方式一
(a OP b) OP c

// 方式二
a OP (b OP c)
```

上面的两种方式，得到的计算结果往往是不一样的。

方式一是将左侧两个运算数结合在一起，采用这种解释方式的运算符，称为“左结合”（*left-to-right associativity*）运算符；

方式二是将右侧两个运算数结合在一起，这样的运算符称为“右结合”运算符（*right-to-left associativity*）。

*JavaScript* 语言的大多数运算符是“左结合”，请看下面加法运算符的例子。

```javascript
x + y + z

// 引擎解释如下
(x + y) + z
```

上面代码中，*x* 与 *y* 结合在一起，它们的预算结果再与 *z* 进行运算。

少数运算符是“右结合”，其中最主要的是赋值运算符（ = ）和三元条件运算符（ ?: ）。

```javascript
w = x = y = z;
q = a ? b : c ? d : e ? f : g;
```

上面代码的解释方式如下。

```javascript
w = (x = (y = z));
q = a ? b : (c ? d : (e ? f : g));
```

上面的两行代码，都是右侧的运算数结合在一起。

另外，指数运算符（\**）也是右结合。

```javascript
2 ** 3 ** 2
// 相当于 2 ** (3 ** 2)
// 512
```



## 真题解答



- 下面代码中，*a* 在什么情况下会执行输出语句打印 *1* ？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

> 参考答案：
>
> 方法一：利用 *toString( )* 方法
>
> ```js
> var a = {
>     i: 1,
>     toString() {
>         return a.i++;
>     }
> }
> if (a == 1 && a == 2 && a == 3) {
>     console.log('1');
> }
> ```
>
> 方法二：利用 *valueOf( )* 方法
>
> ```js
> var a = {
>     i: 1,
>     valueOf() {
>         return a.i++
>     }
> }
> if (a == 1 && a == 2 && a == 3) {
>     console.log('1');
> }
> ```



-*EOF*-

# 原型和原型链



## 经典真题



- 说一说你对 *JavaScript* 中原型与原型链的理解？（美团 *2019*年）
- 对一个构造函数实例化后，它的原型链指向什么？



## 原型与原型链介绍



在 *Brendan Eich* 设计 *JavaScript* 时，借鉴了 *Self* 和 *Smalltalk* 这两门基于原型的语言。



之所以选择基于原型的对象系统，是因为 *Brendan Eich* 一开始就没有打算在 *JavaScript* 中加入类的概念，因为 *JavaScript* 的设计初衷就是为非专业的开发人员（例如网页设计者）提供一个方便的工具。由于大部分网页设计者都没有任何的编程背景，所以在设计 *JavaScript* 时也是尽可能使其简单、易学。



这因为如此，*JavaScript* 中的原型以及原型链成为了这门语言最大的一个特点，在面试的时候，面试官也经常会围绕原型和原型链展开提问。



*JavaScript* 是一门基于原型的语言，**对象的产生是通过原型对象而来的**。



*ES5* 中提供了 *Object.create* 方法，可以用来克隆对象。



示例如下：

```js
const person = {
    arms: 2,
    legs: 2,
    walk() {
        console.log('walking');
    }
}
const zhangsan = Object.create(person);
console.log(zhangsan.arms); // 2
console.log(zhangsan.legs); // 2
zhangsan.walk(); // walking
console.log(zhangsan.__proto__ === person); // true
```



在上面的示例中，我们通过 *Object.create* 方法来对 *person* 对象进行克隆，克隆出来了一个名为 *zhangsan* 的对象，所以 *person* 对象就是 *zhangsan* 这个对象的原型对象。



*person* 对象上面的属性和方法，*zhangsan* 这个对象上面都有。



通过 \__*proto*__ 属性，我们可以访问到一个对象的原型对象。



从上面的代码可以看出，当我们打印`zhangsan.__proto__ === person`，返回的是 *true* ，因为对于 *zhangsan* 这个对象而言，它的原型对象就是 *person* 这个对象。



我们在使用 *Object.create* 方法来克隆对象的时候，还可以传入第 *2* 个参数，第 *2* 个参数是一个 *JSON* 对象，该对象可以书写新对象的**新属性**以及**属性特性**。



通过这种方式，基于对象创建的新对象，可以继承祖辈对象的属性和方法，这其实就是一个继承的关系，来看一个示例：



```js
const person = {
    arms: 2,
    legs: 2,
    walk() {
        console.log('walking');
    }
}
const zhangsan = Object.create(person, {
    name: {
        value: "zhangsan",
    },
    age: {
        value: 18,
    },
    born: {
        value: "chengdu"
    }
});
const zhangxiaosan = Object.create(zhangsan, {
    name: {
        value: "zhangxiaosan"
    },
    age: {
        value: 1
    }
})
console.log(zhangxiaosan.name); // zhangxiaosan
console.log(zhangxiaosan.age); // 1
console.log(zhangxiaosan.born); // chengdu
console.log(zhangxiaosan.arms); // 2
console.log(zhangxiaosan.legs); // 2
zhangxiaosan.walk(); // walking
console.log(zhangsan.isPrototypeOf(zhangxiaosan)); // true
console.log(person.isPrototypeOf(zhangxiaosan)); // true
```



该例中，*zhangsan* 这个对象是从 *person* 这个对象克隆而来的，而 *zhangxiaosan* 这个对象又是从 *zhangsan* 这个对象克隆而来，以此**形成了一条原型链**。无论是 *person* 对象，还是 *zhangsan* 对象上面的属性和方法，*zhangxiaosan* 这个对象都能继承到。



来看下面的图：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-08-10-050603.png" alt="image-20210810130602385" style="zoom:50%;" />



这就是 *JavaScript* 中最原始的创建对象的方式，一个对象是通过克隆另外一个对象所得到的。就像克隆羊多莉一样，通过克隆可以创造一个一模一样的对象，被克隆的对象是新对象的原型对象。



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-08-10-051614.png" alt="image-20210810131613519" style="zoom: 33%;" />



但是，随着 *JavaScript* 语言的发展，这样创建对象的方式还是太过于麻烦了。开发者还是期望 *JavaScript* 能够像 *Java、C#* 等标准面向对象语言一样，通过类来批量的生成对象。于是出现了通过构造函数来模拟类的形式。



来看下面的例子：



```js
function Computer(name, price) {
    // 属性写在类里面 
    this.name = name;
    this.price = price;
}
// 方法挂在原型对象上面
Computer.prototype.showSth = function () {
    console.log(`这是一台${this.name}电脑`);
}

const apple = new Computer("苹果", 12000);
console.log(apple.name); // 苹果
console.log(apple.price); // 12000
apple.showSth(); // 这是一台苹果电脑

const huawei = new Computer("华为", 7000);
console.log(huawei.name); // 华为
console.log(huawei.price); // 7000
huawei.showSth(); // 这是一台华为电脑
```



在上面的例子中，我们书写了一个 *Computer* 的函数，我们称之为构造函数，为了区分普通函数和构造函数，一般构造函数的函数名**首字母会大写**。



区别于普通函数的直接调用，构造函数一般通过配合 *new* 关键字一起使用，每当我们 *new* 一次，就会生成一个新的对象，而在构造函数中的 *this* 就指向这个新生成的对象。



在上面的例子中，我们 *new* 了两次，所以生成了两个对象，我们把这两个对象分别存储到 *apple* 和 *huawei* 这两个变量里面。



有一个非常有意思的现象，就是我们在书写 *Computer* 构造函数的实例方法的时候，并没有将这个方法书写在构造函数里面，而是写在了 *Computer.prototype* 上面，那么这个 *Computer.prototype* 是啥呢？



这个  *Computer.prototype*  实际上就是 *Computer* 实例对象的原型对象。要搞清楚这个，看下面的图：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-27-063331.png" alt="image-20211027143330933" style="zoom:50%;" />



这是最重要的一个三角关系，也是我往往要求学生记下来的三角关系。



通过上图，我们可以得出以下的结论：



- *JavaScript* 中每个对象都有一个原型对象。可以通过 \__*proto*__ 属性来访问到对象的原型对象。
- 构造函数的 *prototype* 属性指向一个对象，这个对象是该构造函数实例化出来的对象的原型对象。
- 原型对象的 *constructor* 属性也指向其构造函数。
- 实例对象的 *constructor* 属性是从它的原型对象上面访问到。



实践才是检验真理的唯一标准。接下来我们在代码中来验证一下：



```js
function Computer(name, price) {
    // 属性写在类里面 
    this.name = name;
    this.price = price;
}
// 方法挂在原型对象上面
Computer.prototype.showSth = function () {
    console.log(`这是一台${this.name}电脑`);
}

const apple = new Computer("苹果", 12000);

console.log(apple.__proto__ === Computer.prototype); // true
console.log(apple.__proto__.constructor === Computer); // true
```



在上面的代码中，*apple* 是从 *Computer* 这个构造函数中实例化出来的对象，我们通过  \__*proto*__  来访问到 *apple* 的原型对象，而这个原型对象和 *Computer.prototype* 是等价的。另外， 我们也发现 *apple* 和它原型对象的 *constructor* 属性都指向 *Computer* 这个构造函数。



接下来我们还可以来验证内置的构造函数是不是也是这样的关系，如下：

```js
function Computer(name, price) {
    // 属性写在类里面 
    this.name = name;
    this.price = price;
}
// 方法挂在原型对象上面
Computer.prototype.showSth = function () {
    console.log(`这是一台${this.name}电脑`);
}

const apple = new Computer("苹果", 12000);

console.log(apple.__proto__ === Computer.prototype); // true
console.log(apple.__proto__.constructor === Computer); // true

// 数组的三角关系
var arr = [];
console.log(arr.__proto__ === Array.prototype); // true

// 其实所有的构造函数的原型对象都相同
console.log(Computer.__proto__ === Array.__proto__); // true
console.log(Computer.__proto__ === Date.__proto__); // true
console.log(Computer.__proto__ === Number.__proto__);  // true
console.log(Computer.__proto__ === Function.__proto__);  // true
console.log(Computer.__proto__ === Object.__proto__);  // true
console.log(Computer.__proto__); // {}
```

通过上面的代码，我们发现所有的构造函数，无论是自定义的还是内置的，它们的原型对象都是同一个对象。



如果你能够把上面的三角关系理清楚，恭喜你，你已经把整个原型和原型链的知识掌握一大部分。



如果你还想继续往下深究，那么上面的图可以扩展成这样：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-27-064429.png" alt="image-20211027144428458" style="zoom:50%;" />



在 *JavaScript* 中，每一个对象，都有一个原型对象。而原型对象上面也有一个自己的原型对象，一层一层向上找，最终会到达 *null*。



我们可以在上面代码的基础上，继续进行验证，如下：



```js
function Computer(name, price) {
    // 属性写在类里面 
    this.name = name;
    this.price = price;
}
// 方法挂在原型对象上面
Computer.prototype.showSth = function () {
    console.log(`这是一台${this.name}电脑`);
}

var apple = new Computer("苹果", 12000);

console.log(apple.__proto__.__proto__); // [Object: null prototype] {}
console.log(apple.__proto__.__proto__.__proto__); // null
console.log(apple.__proto__.__proto__ === Object.prototype); // true
```



可以看到，在上面的代码中，我们顺着原型链一层一层往上找，最终到达了 *null*。

但是目前来看我们这个图还是不完整，既然构造函数的原型对象也是对象，那么必然该对象也有自己的原型，所以完整的图其实如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-27-072845.png" alt="image-20211027152845110" style="zoom:50%;" />

下面可以简单验证一下，如下：

```js
// 自定义构造函数函数
function Computer() {}

console.log(Computer.__proto__.__proto__.__proto__); // null
console.log(Computer.__proto__.constructor.__proto__ === Computer.__proto__); // true
console.log(Computer.__proto__.__proto__.constructor.__proto__ === Computer.__proto__); // true

```



## 真题解答



- 说一说你对 *JavaScript* 中原型与原型链的理解？（美团 *2019*年）

> 参考答案：
>
> - 每个对象都有一个 \__*proto*__  属性，该属性指向自己的原型对象
> - 每个构造函数都有一个 *prototype* 属性，该属性指向实例对象的原型对象
> - 原型对象里的 *constructor* 指向构造函数本身
>
> 如下图：
>
> <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-27-063331.png" alt="image-20211027143330933" style="zoom:50%;" />
>
> 每个对象都有自己的原型对象，而原型对象本身，也有自己的原型对象，从而形成了一条原型链条。
>
> 当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。



- 对一个构造函数实例化后，它的原型链指向什么？

> 参考答案：
>
> 指向该构造函数实例化出来对象的原型对象。
>
> 对于构造函数来讲，可以通过 *prototype* 访问到该对象。
>
> 对于实例对象来讲，可以通过隐式属性 \__*proto*__ 来访问到。



-*EOF*-

# 执行栈和执行上下文



## 经典真题



- 谈谈你对 *JavaScript* 执行上下文栈理解 



## 执行上下文



执行上下文，英文全称为 *Execution Context*，一句话概括就是“代码（全局代码、函数代码）执行前进行的准备工作”，也称之为“执行上下文环境”。

运行 *JavaScript* 代码时，当代码执行进入一个环境时，就会为该环境创建一个执行上下文，它会在你运行代码前做一些准备工作，如确定作用域，创建局部变量对象等。

具体做了什么我们后面再说，先来看下 *JavaScript* 执行环境有哪些？



***JavaScript* 中执行环境**

1. 全局环境
2. 函数环境
3. *eval* 函数环境 （已不推荐使用）

那么与之对应的执行上下文类型同样有 *3* 种：

1. 全局执行上下文
2. 函数执行上下文
3. *eval* 函数执行上下文



*JavaScript* 运行时首先会进入全局环境，对应会生成全局上下文。程序代码中基本都会存在函数，那么**调用函数**，就会进入函数执行环境，对应就会生成该函数的执行上下文。

由于代码中会声明多个函数，对应的函数执行上下文也会存在多个。在 *JavaScript* 中，通过栈的存取方式来管理执行上下文，我们可称其为执行栈，或函数调用栈（*Call Stack*）。



## 栈数据结构



先来简单复习一下栈这种数据结构。

要简单理解栈的存取方式，我们可以通过类比乒乓球盒子来分析。如下图：

![img](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-060310.png)

栈遵循**“先进后出，后进先出”**的规则，或称 ***LIFO*** （”*Last In First Out*“）规则。

如图所示，我们只能从栈顶取出或放入乒乓球，最先放进盒子的总是最后才能取出。

栈中**“放入/取出”**，也可称为**“入栈/出栈”**。

总结栈数据结构的特点：

1. 后进先出，先进后出
2. 出口在顶部，且仅有一个



**执行栈（函数调用栈）**

理解完栈的存取方式，我们接着分析 *JavaScript* 中如何通过栈来管理多个执行上下文。

程序执行进入一个执行环境时，它的执行上下文就会被创建，并被推入执行栈中（入栈）；程序执行完成时，它的执行上下文就会被销毁，并从栈顶被推出（出栈），控制权交由下一个执行上下文。

因为 *JavaScript* 在执行代码时最先进入全局环境，所以**处于栈底的永远是全局环境的执行上下文**。而处于**栈顶的是当前正在执行函数的执行上下文**。

当函数调用完成后，它就会从栈顶被推出，理想的情况下，闭包会阻止该操作，闭包可以参阅《闭包》章节。

而全局环境只有一个，对应的全局执行上下文也只有一个，只有当页面被关闭之后它才会从执行栈中被推出，否则一直存在于栈底。



下面我们来看一段具体的代码示例：

```js
function foo () { 
    function bar () {        
      return 'I am bar';
    }
    return bar();
}
foo();
```

对应图解如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-060848.png" alt="image-20211002140848188" style="zoom: 33%;" />



**执行上下文的数量限制（堆栈溢出）**

执行上下文可存在多个，虽然没有明确的数量限制，但如果超出栈分配的空间，会造成堆栈溢出。常见于递归调用，没有终止条件造成死循环的场景。

```js
// 递归调用自身
function foo() {
    foo();
}
foo();
// 报错： Uncaught RangeError: Maximum call stack size exceeded
```



## 执行上下文生命周期



前面我们有说到，运行 *JavaScript* 代码时，当代码执行进入一个环境时，就会为该环境创建一个执行上下文，它会在你运行代码前做一些准备工作。接下来我们就来看一下具体会做哪些准备工作。

具体要做的事，和执行上下文的生命周期有关。

执行上下文的生命周期有两个阶段：

1. 创建阶段（**进入**执行上下文）：函数被调用时，进入函数环境，为其创建一个执行上下文，此时进入创建阶段。
2. 执行阶段（代码**执行**）：执行函数中代码时，此时执行上下文进入执行阶段。



**创建阶段**

创建阶段要做的事情主要如下：

1. 创建变量对象（*VO：variable object*）
   
   - 确定函数的形参（**并赋值**）
   
   - 函数环境会初始化创建 *Arguments*对象（**并赋值**）
   - 确定普通字面量形式的函数声明（**并赋值**）
   - 变量声明，函数表达式声明（**未赋值**）
   
2. 确定 *this* 指向（***this* 由调用者确定**）

3. 确定作用域（**词法环境决定，哪里声明定义，就在哪里确定**）



这里有必要说一下变量对象。

当处于执行上下文的建立阶段时，我们可以将整个上下文环境看作是一个对象。该对象拥有 *3* 个属性，如下：

```js
executionContextObj = {
    variableObject : {}, // 变量对象，里面包含 Arguments 对象，形式参数，函数和局部变量
    scopeChain : {},// 作用域链，包含内部上下文所有变量对象的列表
    this : {}// 上下文中 this 的指向对象
}
```

可以看到，这里执行上下文抽象成为了一个对象，拥有 *3* 个属性，分别是**变量对象**，**作用域链**以及 ***this* 指向**，这里我们重点来看一下变量对象里面所拥有的东西。

在函数的建立阶段，首先会建立 *Arguments* 对象。然后确定形式参数，检查当前上下文中的函数声明，每找到一个函数声明，就在 *variableObject* 下面用函数名建立一个属性，属性值就指向该函数在内存中的地址的一个引用。

如果上述函数名已经存在于 *variableObject*（简称 *VO*） 下面，那么对应的属性值会被新的引用给覆盖。

最后，是确定当前上下文中的局部变量，如果遇到和函数名同名的变量，则会忽略该变量。



**执行阶段**

1. 变量对象赋值 
   - 变量赋值
   - 函数表达式赋值
2. 调用函数
3. 顺序执行其它代码



两个阶段要做的事情介绍完毕，接下来我们来通过代码来演示一下这两个阶段做的每一件事以及变量对象是如何变化的。

```js
const foo = function(i){
    var a = "Hello";
    var b = function privateB(){};
    function c(){}
}
foo(10);
```

首先在建立阶段的变量对象如下：

```js
fooExecutionContext = {
    variavleObject : {
        arguments : {0 : 10,length : 1}, // 确定 Arguments 对象
        i : 10, // 确定形式参数
        c : pointer to function c(), // 确定函数引用
        a : undefined, // 局部变量 初始值为 undefined
        b : undefined  // 局部变量 初始值为 undefined
    },
    scopeChain : {},
    this : {}
}
```

由此可见，在建立阶段，除了 *Arguments*，函数的声明，以及形式参数被赋予了具体的属性值外，其它的变量属性默认的都是 *undefined*。并且普通形式声明的函数的提升是在变量的上面的。

一旦上述建立阶段结束，引擎就会进入代码执行阶段，这个阶段完成后，上述执行上下文对象如下，变量会被赋上具体的值。

```js
fooExecutionContext = {
    variavleObject : {
        arguments : {0 : 10,length : 1},
        i : 10,
        c : pointer to function c(),
        a : "Hello",// a 变量被赋值为 Hello
        b : pointer to function privateB() // b 变量被赋值为 privateB() 函数
    },
    scopeChain : {},
    this : {}
}
```

我们看到，只有在代码执行阶段，局部变量才会被赋予具体的值。在建立阶段局部变量的值都是 *undefined*。

这其实也就解释了变量提升的原理。



接下来我们再通过一段代码来加深对函数这两个阶段的过程的理解，代码如下：

```js
(function () {
    console.log(typeof foo);
    console.log(typeof bar);
    var foo = "Hello";
    var bar = function () {
        return "World";
    }

    function foo() {
        return "good";
    }
    console.log(foo, typeof foo);
})()
```

这里，我们定义了一个 *IIFE*，该函数在建立阶段的变量对象如下：

```js
fooExecutionContext = {
    variavleObject : {
        arguments : {length : 0},
        foo : pointer to function foo(),
        bar : undefined
    },
    scopeChain : {},
    this : {}
}
```

首先确定 *Arguments* 对象，接下来是形式参数，由于本例中不存在形式参数，所以接下来开始确定函数的引用，找到 *foo* 函数后，创建 *foo* 标识符来指向这个 *foo* 函数，之后同名的 *foo* 变量不会再被创建，会直接被忽略。

然后创建 *bar* 变量，不过初始值为 *undefined*。

建立阶段完成之后，接下来进入代码执行阶段，开始一句一句的执行代码，结果如下：

```js
(function () {
    console.log(typeof foo); // function
    console.log(typeof bar); // undefined
    var foo = "Hello"; // foo 被重新赋值 变成了一个字符串
    var bar = function () {
        return "World";
    }

    function foo() {
        return "good";
    }
    console.log(foo, typeof foo); //Hello string
})()
```



## 真题解答



- 谈谈你对 *JavaScript* 执行上下文栈理解 

> 参考答案：
>
> **什么是执行上下文？**
>
> 简而言之，执行上下文是评估和执行 *JavaScript* 代码的环境的抽象概念。每当 *Javascript* 代码在运行的时候，它都是在执行上下文中运行。
>
> **执行上下文的类型**
>
> *JavaScript* 中有三种执行上下文类型。
>
> - **全局执行上下文：**这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事，创建一个全局的 *window* 对象（浏览器的情况下），并且设置 *this* 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。
> - **函数执行上下文：**每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。
> - ***Eval* 函数执行上下文：**执行在 *eval* 函数内部的代码也会有它属于自己的执行上下文。
>
> **调用栈**
>
> 调用栈是解析器（如浏览器中的的 *JavaScript* 解析器）的一种机制，可以在脚本调用多个函数时，跟踪每个函数在完成执行时应该返回控制的点。（如什么函数正在执行，什么函数被这个函数调用，下一个调用的函数是谁）
>
> - 当脚本要调用一个函数时，解析器把该函数添加到栈中并且执行这个函数。
> - 任何被这个函数调用的函数会进一步添加到调用栈中，并且运行到它们被上个程序调用的位置。
> - 当函数运行结束后，解释器将它从堆栈中取出，并在主代码列表中继续执行代码。
> - 如果栈占用的空间比分配给它的空间还大，那么则会导致“栈溢出”错误。



-*EOF*-

# 作用域和作用域链



## 经典真题



- 谈谈你对作用域和作用域链的理解？



## 作用域（*Scope*）



### 什么是作用域



作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。

换句话说，作用域决定了代码区块中变量和其他资源的可见性。

可能这两句话并不好理解，我们先来看个例子：

```js
function outFun2() {
    var inVariable = "内层变量2";
}
outFun2();
console.log(inVariable); // Uncaught ReferenceError: inVariable is not defined
```

从上面的例子可以体会到作用域的概念，变量 *inVariable* 在全局作用域没有声明，所以在全局作用域下取值会报错。

我们可以这样理解：**作用域就是一个独立的地盘，让变量不会外泄、暴露出去**。也就是说**作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**

***ES6* 之前 *JavaScript* 没有块级作用域，只有全局作用域和函数作用域**。

*ES6* 的到来，为我们提供了“块级作用域”，可通过新增命令 *let* 和 *const* 来体现。



### 全局作用域和函数作用域



**（1）全局作用域**

在代码中任何地方都能访问到的对象拥有全局作用域，一般来说以下几种情形拥有全局作用域：

- 最外层函数和在最外层函数外面定义的变量拥有全局作用域

```js
var outVariable = "我是最外层变量"; //最外层变量
function outFun() { //最外层函数
    var inVariable = "内层变量";
    function innerFun() { //内层函数
        console.log(inVariable);
    }
    innerFun();
}
console.log(outVariable); // 我是最外层变量
outFun(); // 内层变量
console.log(inVariable); // inVariable is not defined
innerFun(); // innerFun is not defined
```



- 所有未定义直接赋值的变量自动声明为拥有全局作用域

```js
function outFun2() {
    variable = "未定义直接赋值的变量";
    var inVariable2 = "内层变量2";
}
outFun2();//要先执行这个函数，否则根本不知道里面是啥
console.log(variable); //未定义直接赋值的变量
console.log(inVariable2); //inVariable2 is not defined
```



- 所有 *window* 对象的属性拥有全局作用域

一般情况下，*window* 对象的内置属性都拥有全局作用域，例如 *window.name、window.location、window.top* 等等。



全局作用域有个弊端：如果我们写了很多行 *JS* 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样就会污染全局命名空间， 容易引起命名冲突。

```js
// 张三写的代码中
var data = {a: 100}

// 李四写的代码中
var data = {x: true}
```

这就是为何  *jQuery、Zepto* 等库的源码，所有的代码都会放在 *(function(){....})( )* 中。

因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 *JS* 脚本造成影响。这是函数作用域的一个体现。



**（2）函数作用域**

函数作用域，是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

```js
function doSomething(){
    var stuName="zhangsan";
    function innerSay(){
        console.log(stuName);
    }
    innerSay();
}
console.log(stuName); // 脚本错误
innerSay(); // 脚本错误
```

**作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行**。

我们看个例子，用泡泡来比喻作用域可能好理解一点：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-01-151740.png" alt="image-20211001231740498" style="zoom:50%;" />

最后输出的结果为 *2、4、12*

- 泡泡 *1* 是全局作用域，有标识符 *foo*；
- 泡泡 *2* 是作用域 *foo*，有标识符 *a、bar、b*；
- 泡泡 *3* 是作用域 *bar*，仅有标识符 *c*。

值得注意的是：**块语句（大括号“｛  ｝”中间的语句），如  *if*  和 *switch* 条件语句或  *for*  和  *while*  循环语句，不像函数，它们不会创建一个新的作用域**。在块语句中定义的变量将保留在它们已经存在的作用域中。

```js
if (true) {
    // 'if' 条件语句块不会创建一个新的作用域
    var name = 'Hammad'; // name 依然在全局作用域中
}
console.log(name); // logs 'Hammad'
```

*JS* 的初学者经常需要花点时间才能习惯变量提升，而如果不理解这种特有行为，就可能导致 *bug* 。

正因为如此， *ES6* 引入了块级作用域，让变量的生命周期更加可控。



### 块级作用域



块级作用域可通过新增命令 *let* 和 *const* 声明，所声明的变量在指定块的作用域外无法被访问。

块级作用域在如下情况被创建：

1. 在一个函数内部
2. 在一个代码块（由一对花括号包裹）内部

*let* 声明的语法与 *var* 的语法一致。你基本上可以用 *let* 来代替 *var* 进行变量声明，但会将变量的作用域限制在当前代码块中。块级作用域有以下几个特点：



- 声明变量不会提升到代码块顶部

*let、const* 声明并不会被提升到当前代码块的顶部，因此你需要手动将 *let、const* 声明放置到顶部，以便让变量在整个代码块内部可用。

```js
function getValue(condition) {
    if (condition) {
        let value = "blue";
        return value;
    } else {
        // value 在此处不可用
        return null;
    }
    // value 在此处不可用
}
```



- 禁止重复声明

如果一个标识符已经在代码块内部被定义，那么在此代码块内使用同一个标识符进行 *let* 声明就会导致抛出错误。例如：

```js
var count = 30;
let count = 40; // Uncaught SyntaxError: Identifier 'count' has already been declared
```

在本例中， *count* 变量被声明了两次：一次使用 *var* ，另一次使用 *let*。

因为 *let* 不能在同一作用域内重复声明一个已有标识符，此处的 *let* 声明就会抛出错误。但如果在嵌套的作用域内使用 *let* 声明一个同名的新变量，则不会抛出错误。

```js
var count = 30;
// 不会抛出错误
if (condition) {
    let count = 40;
    // 其他代码
}
```



- 循环中的绑定块作用域的妙用

开发者可能最希望实现 *for* 循环的块级作用域了，因为可以把声明的计数器变量限制在循环内。

例如，以下代码在 *JS* 经常见到：

```html
<button>测试1</button>
<button>测试2</button>
<button>测试3</button>
```

```js
var btns = document.getElementsByTagName('button')
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    console.log('第' + (i + 1) + '个')
  }
}
```

我们要实现这样的一个需求: 点击某个按钮, 提示"点击的是第 *n* 个按钮"。

此处我们先不考虑事件代理，万万没想到，点击任意一个按钮，后台都是弹出“第四个”。

这是因为 *i* 是全局变量，执行到点击事件时，此时 *i* 的值为 *3*。

那该如何修改，最简单的是用 *let* 声明 *i*

```js
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    console.log('第' + (i + 1) + '个')
  }
}
```



## 作用域链



### 什么是自由变量



首先认识一下什么叫做**自由变量** 。

如下代码中，*console.log(a)* 要得到 *a* 变量，但是在当前的作用域中没有定义 *a*（可对比一下 *b*）。当前作用域没有定义的变量，这成为自由变量 。

自由变量的值如何得到 ？

需要向父级作用域寻找（注意：这种说法并不严谨，下文会重点解释）。

```js
var a = 100
function fn() {
    var b = 200
    console.log(a) // 这里的 a 在这里就是一个自由变量
    console.log(b)
}
fn()
```



### 什么是作用域链



如果父级也没呢？

再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链 。

```js
var a = 100
function f1() {
    var b = 200
    function f2() {
        var c = 300
        console.log(a) // 100 自由变量，顺作用域链向父作用域找
        console.log(b) // 200 自由变量，顺作用域链向父作用域找
        console.log(c) // 300 本作用域的变量
    }
    f2()
}
f1()
```



### 关于自由变量的取值



关于自由变量的值，上文提到要到父作用域中取，其实有时候这种解释会产生歧义。

```js
var x = 10
function fn() {
    console.log(x)
}
function show(f) {
    var x = 20;
    (function () {
        f() // 10，而不是 20
    })()
}
show(fn)
```

在 *fn* 函数中，取自由变量 *x* 的值时，要到哪个作用域中取 ？

要到创建 *fn* 函数的那个作用域中取，**无论 *fn* 函数将在哪里调用**。

所以，不要在用以上说法了。相比而言，用这句话描述会更加贴切：**要到创建这个函数的那个域”。作用域中取值，这里强调的是“创建”，而不是“调用”**，切记切记，其实这就是所谓的"静态作用域"。

再来看一个例子：

```js
const food = "rice";
const eat = function () {
    console.log(`eat ${food}`);
};
(function () {
    const food = "noodle";
    eat(); // eat rice
})();
```

在本示例中，最终打印的结果为 *eat rice*。因为对于 *eat( )* 函数来说，创建该函数时它的父级上下文为全局上下文，所以 *food* 的值为 *rice*。

如果我们将代码稍作修改，改成如下：

```js
const food = "rice";
(function () {
    const food = "noodle";
    const eat = function () {
        console.log(`eat ${food}`);
    };
    eat(); // eat noodle
})();
```

这个时候，打印出来的值就为 *eat noodle*。因为对于 *eat( )* 函数来讲，创建它的时候父级上下文为 *IIFE*，所以 *food* 的值为 *noodle*。



## 作用域与执行上下文



许多开发人员经常混淆作用域和执行上下文的概念，误认为它们是相同的概念，但事实并非如此。

我们知道 *JavaScript* 属于解释型语言，*JavaScript* 的执行分为：解释和执行两个阶段，这两个阶段所做的事并不一样。



**解释阶段**

- 词法分析
- 语法分析
- 作用域规则确定



**执行阶段**

- 创建执行上下文
- 执行函数代码
- 垃圾回收



*JavaScript* 解释阶段便会确定作用域规则，因此作用域在函数定义时就已经确定了，而不是在函数调用时确定，但是执行上下文是函数执行之前创建的。

执行上下文最明显的就是 *this* 的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。

作用域和执行上下文之间最大的区别是：

**执行上下文在运行时确定，随时可能改变，作用域在定义时就确定，并且不会改变**。



## 真题解答



- 谈谈你对作用域和作用域链的理解？

> 参考答案：
>
> **什么是作业域 ？**
>
> *ES5* 中只存在两种作用域：全局作用域和函数作用域。
>
> 在 *JavaScript* 中，我们将作用域定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套子作用域中根据标识符名称进行变量（变量名或者函数名）查找。*ES6* 新增了块级作用域。
>
> **什么是作用域链 ？**
>
> 当访问一个变量时，编译器在执行这段代码时，会首先从当前的作用域中查找是否有这个标识符，如果没有找到，就会去父作用域查找，如果父作用域还没找到继续向上查找，直到全局作用域为止。
>
> 而作用域链，就是有当前作用域与上层作用域的一系列变量对象组成，它保证了当前执行的作用域对符合访问权限的变量和函数的有序访问。
>
> 作用域链有一个非常重要的特性，**那就是作用域中的值是在函数创建的时候，就已经被存储了，是静态的**。
>
> 所谓静态，就是说作用域中的值一旦被确定了，永远不会变。**函数可以永远不被调用，但是作用域中的值在函数创建的时候就已经被写入了，**并且存储在函数作用域链对象里面。



-*EOF*-

# *this* 指向



## 经典真题



- *this* 的指向哪几种 ？



## *this* 指向总结



*this* 关键字是一个非常重要的语法点。毫不夸张地说，不理解它的含义，大部分开发任务都无法完成。

*this* 可以用在构造函数之中，表示实例对象。除此之外，*this* 还可以用在别的场合。**但不管是什么场合，*this* 都有一个共同点：它总是返回一个对象**。



关于 *this* 的指向，有一种广为流传的说法就是“谁调用它，*this* 就指向谁”。

这样的说法没有太大的问题，但是并不是太全面。总结起来，*this* 的指向规律有如下几条：



- 在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的 *this* 会被绑定到 *undefined* 上，在非严格模式下则会被绑定到全局对象 *window/global* 上。

  

- 一般使用 *new* 方法调用构造函数时，构造函数内的 *this* 会被绑定到新创建的对象上。

  

- 一般通过 *call/apply/bind* 方法显式调用函数时，函数体内的 *this* 会被绑定到指定参数的对象上。

  

- 一般通过上下文对象调用函数时，函数体内的 *this* 会被绑定到该对象上。

  

- 在箭头函数中，*this* 的指向是由外层（函数或全局）作用域来决定的。



当然，真实环境多种多样，下面我们就来根据实战例题逐一梳理。



### 全局环境中的 *this*

例题 *1*：

```js
function f1() {
    console.log(this);
}

function f2() {
    'use strict'
    console.log(this);
}

f1(); // window or global
f2(); // undefined
```

这种情况相对简单、直接，函数在浏览器全局环境下被简单调用，在非严格模式下 *this* 指向 *window*，在通过 *use strict* 指明严格模式的情况下指向 *undefined*。

虽然上面的题目比较基础，但是需要注意上面题目的变种，例如

例题 *2*：

```js
const foo = {
    bar : 10,
    fn : function(){
        console.log(this); // window or global
        console.log(this.bar); // undefined
    }
}
var fn1 = foo.fn;
fn1();
```

这里的 *this* 仍然指向 *window*。虽然 *fn* 函数在 *foo* 对象中作为该对象的一个方法，但是在赋值给 *fn1* 之后，*fn1* 仍然是在 *window* 的全局环境下执行的。因此上面的代码仍然会输出 *window* 和 *undefined*。

还是上面这道题目，如果改成如下的形式

例题 *3*：

```js
const foo = {
    bar : 10,
    fn : function(){
        console.log(this); // { bar: 10, fn: [Function: fn] }
        console.log(this.bar); // 10
    }
}
foo.fn();
```

这时，*this* 指向的是最后调用它的对象，在 *foo.fn( )* 语句中，this 指向的是 *foo* 对象。



### 上下文对象调用中的 *this*



例题 *4*：

```js
const student = {
    name: 'zhangsan',
    fn: function () {
        return this;
    }
}
console.log(student.fn() === student); // true
```

在上面的代码中，*this* 指向当前的对象 *student*，所以最终会返回 *true*。

当存在更复杂的调用关系时，如以下代码中的嵌套关系，*this* 将指向最后调用它的对象，例如



例题 *5*：

```js
const student = {
    name: 'zhangsan',
    son: {
        name: 'zhangxiaosan',
        fn: function () {
            return this.name
        }
    }
}
console.log(student.son.fn()); // zhangxiaosan
```

在上面的代码中，*this* 会指向最后调用它的对象，因此输出的是 *zhangxiaosan*。

至此，*this* 的上下文对象调用已经介绍得比较清楚了。我们再来看一道比较高阶的题目

例题 *6*：

```js
const o1 = {
    text: 'o1',
    fn: function () {
        return this.text;
    }
}

const o2 = {
    text: 'o2',
    fn: function () {
        return o1.fn();
    }
}

const o3 = {
    text: 'o3',
    fn: function () {
        var fn = o1.fn;
        return fn();
    }
}

console.log(o1.fn()); // o1
console.log(o2.fn()); // o1
console.log(o3.fn()); // undefined
```

答案是 *o1、o1、undefined*。

这里主要讲一下为什么第三个是 *undefined*。这里将 *o1.fn* 赋值给了 *fn*，所以 *fn* 等价于 *function () { return this.text; }*，然后该函数在调用的时候，是直接 *fn( )* 的形式调用的，并不是以对象的形式，相当于还是全局调用，指向 *window*，所以打印出 *undefined*。



### *this* 指向绑定事件的元素



*DOM* 元素绑定事件时，事件处理函数里面的 *this* 指向绑定了事件的元素。

这个地方一定要注意它和 *target* 的区别，*target* 是指向触发事件的元素。

示例如下：

```html
<ul id="color-list">
  <li>red</li>
  <li>yellow</li>
  <li>blue</li>
  <li>green</li>
  <li>black</li>
  <li>white</li>
</ul>
```

```js
// this 是绑定事件的元素
// target 是触发事件的元素 和 srcElememnt 等价
let colorList = document.getElementById("color-list");
colorList.addEventListener("click", function (event) {
  console.log('this:', this);
  console.log('target:', event.target);
  console.log('srcElement:', event.srcElement);
})
```

当我点击如下位置时打印出来的信息如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-28-033304.png" alt="image-20210928113303839" style="zoom:50%;" />



有些时候我们会遇到一些困扰，比如在 *div* 节点的事件函数内部，有一个局部的 *callback* 方法，该方法被作为普通函数调用时，*callback* 内部的 *this* 是指向全局对象 *window* 的

例如：

```html
<div id="div1">我是一个div</div>
```

```js
window.id = 'window';
document.getElementById('div1').onclick = function(){
  console.log(this.id); // div1
  const callback = function(){
    console.log(this.id); // 因为是普通函数调用，所以 this 指向 window
  }
  callback();
}
```

此时有一种简单的解决方案，可以用一个变量保存 *div* 节点的引用，如下：

```js
window.id = 'window';
document.getElementById('div1').onclick = function(){
  console.log(this.id); // div1
  const that = this; // 保存当前 this 的指向
  const callback = function(){
    console.log(that.id); // div1
  }
  callback();
}
```



### 改变 *this* 指向



#### 1. *call、apply、bind* 方法修改 *this* 指向



由于 *JavaScript*  中 *this* 的指向受函数运行环境的影响，指向经常改变，使得开发变得困难和模糊，所以在封装 *sdk* 或者写一些复杂函数的时候经常会用到 *this* 指向绑定，以避免出现不必要的问题。

*call、apply、bind* 基本都能实现这一功能，起到确定 *this* 指向的作用



***Function.prototype.call( )***



*call* 方法可以指定 *this* 的指向（即函数执行时所在的的作用域），然后再指定的作用域中，执行函数。



```js
var obj = {};
var f = function(){
	return this;
};
console.log(f() === window);  // this 指向 window
console.log(f.call(obj) === obj) // 改变this 指向 obj
```

上面代码中，全局环境运行函数 *f* 时，*this* 指向全局环境（浏览器为 *window* 对象）；

*call* 方法可以改变 *this* 的指向，指定 *this* 指向对象 *obj*，然后在对象 *obj* 的作用域中运行函数 *f*。



*call* 方法的参数，应该是对象 *obj*，如果参数为空或 *null、undefind*，则默认传参全局对象。

```js
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

上面代码中，*a* 函数中的 *this* 关键字，如果指向全局对象，返回结果为 *123*。

如果使用 *call* 方法将 *this* 关键字指向 *obj* 对象，返回结果为 *456*。可以看到，如果 *call* 方法没有参数，或者参数为 *null* 或 *undefined*，则等同于指向全局对象。



如果 *call* 传参不是以上类型，则转化成对应的包装对象，然后传入方法。

例如，*5* 转成 *Number* 实例，绑定 *f* 内部 *this*

```js
var f = function () {
  return this;
};

f.call(5); // Number {[[PrimitiveValue]]: 5}
```

*call* 可以接受多个参数，第一个参数是 *this* 指向的对象，之后的是函数回调所需的参数。

```js
function add(a, b) {
  return a + b;
}

add.call(this, 1, 2) // 3
```

*call* 方法的一个应用是调用对象的原生方法。

```js
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

上面代码中 *hasOwnProperty* 是 *obj* 继承来的方法，用来判断对象是否包含自身特点（非继承）属性，但是 *hasOwnProperty* 并不是保留字，如果被对象覆盖，会造成结果错误。

*call* 方法可以解决这个问题，它将 *hasOwnProperty* 方法的原始定义放到 *obj* 对象上执行，这样无论 *obj* 上有没有同名方法，都不会影响结果。



***Function.prototype.apply( )***



*apply* 和 *call* 作用类似，也是改变 *this* 指向，然后调用该函数，唯一区别是 *apply* 接收数组作为函数执行时的参数。语法如下：

```js
func.apply(thisValue, [arg1, arg2, ...])
```

*apply* 方法的第一个参数也是 *this* 所要指向的那个对象，如果设为 *null* 或 *undefined*，则等同于指定全局对象。

第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。

原函数的参数，在 *call* 方法中必须一个个添加，但是在 *apply* 方法中，必须以数组形式添加。

```js
function f(x, y){
  console.log(x + y);
}

f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2
```

利用这一特性，可以实现很多小功能。比如，输出数组的最大值：

```js
var a = [24,30,2,33,1]
Math.max.apply(null,a)  //33
```

还可以将数组中的空值，转化成 *undefined*。

通过 *apply* 方法，利用 *Array* 构造函数将数组的空元素变成 *undefined*。

```js
var a = ['a',,'b'];
Array.apply(null,a) //['a',undefind,'b']
```

空元素与 *undefined* 的差别在于，数组的 *forEach* 方法会跳过空元素，但是不会跳过 *undefined*。因此，遍历内部元素的时候，会得到不同的结果。

```js
var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b
```

配合数组对象的 *slice* 方法，可以将一个类似数组的对象（比如 *arguments* 对象）转为真正的数组。

```js
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
```

上面代码的 *apply* 方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。

从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有 *length* 属性，以及相对应的数字键。



***Function.prototype.bind( )***



*bind* 用于将函数体内的 *this* 绑定到某个对象，然后返回一个新函数

```js
var d = new Date();
d.getTime() // 1481869925657

var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.
```

报错是因为 *d.getTime* 赋值给 *print* 后，*getTime* 内部的 *this* 指向方式变化，已经不再指向 *date* 对象实例了。

解决方法：

```js
var print = d.getTime.bind(d);
print() // 1481869925657
```

*bind* 接收的参数就是所要绑定的对象

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```

绑定到其他对象

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101
```

*bind* 还可以接收更多的参数，将这些参数绑定到原函数的参数

```js
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);
newAdd(5) // 20
```

上面代码中，*bind* 方法除了绑定 *this* 对象，还将 *add* 函数的第一个参数 *x* 绑定成 *5*，然后返回一个新函数 *newAdd*，这个函数只要再接受一个参数 *y* 就能运行了。



如果 *bind* 方法的第一个参数是 *null* 或 *undefined*，等于将 *this* 绑定到全局对象，函数运行时 *this* 指向顶层对象（浏览器为 *window*）。

```js
function add(x, y) {
  return x + y;
}

var plus5 = add.bind(null, 5);
plus5(10) // 15
```

上面代码中，函数 *add* 内部并没有 *this*，使用 *bind* 方法的主要目的是绑定参数 *x*，以后每次运行新函数 *plus5*，就只需要提供另一个参数 *y* 就够了。

而且因为 *add* 内部没有 *this*，所以 *bind* 的第一个参数是 *null*，不过这里如果是其他对象，也没有影响。



*bind* 方法有一些使用注意点。

（1）每一次返回一个新函数

*bind* 方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样。

```
element.addEventListener('click', o.m.bind(o));
```

上面代码中，*click* 事件绑定 *bind* 方法生成的一个匿名函数。这样会导致无法取消绑定，所以，下面的代码是无效的。

```js
element.removeEventListener('click', o.m.bind(o));
```

正确的方法是写成下面这样：

```js
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...
element.removeEventListener('click', listener);
```

（2）结合回调函数使用

回调函数是 *JavaScript* 最常用的模式之一，但是一个常见的错误是，将包含 *this* 的方法直接当作回调函数。解决方法就是使用 *bind* 方法，将 *counter.inc* 绑定 *counter*。

```js
var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};

function callIt(callback) {
  callback();
}

callIt(counter.inc.bind(counter));
counter.count // 1
```

上面代码中，*callIt* 方法会调用回调函数。这时如果直接把 *counter.inc* 传入，调用时 *counter.inc* 内部的 *this* 就会指向全局对象。使用 *bind* 方法将 *counter.inc* 绑定 *counter* 以后，就不会有这个问题，*this* 总是指向 *counter*。

还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数。这些函数内部的 *this* 指向，很可能也会出错。

```js
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  }
};

obj.print()
// 没有任何输出
```

上面代码中，*obj.print* 内部 *this.times* 的 *this* 是指向 *obj* 的，这个没有问题。

但是，*forEach* 方法的回调函数内部的 *this.name* 却是指向全局对象，导致没有办法取到值。稍微改动一下，就可以看得更清楚。

```js
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this === window);
  });
};

obj.print()
// true
// true
// true
```

解决这个问题，也是通过 *bind* 方法绑定 *this*。

```js
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this.name);
  }.bind(this));
};

obj.print()
// 张三
// 张三
// 张三
```

（3）结合 *call* 方法使用

利用 *bind* 方法，可以改写一些 *JavaScript* 原生方法的使用形式，以数组的 *slice* 方法为例。

```js
[1, 2, 3].slice(0, 1) // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1) // [1]
```

上面的代码中，数组的 *slice* 方法从 *[1, 2, 3]* 里面，按照指定位置和长度切分出另一个数组。这样做的本质是在 *[1, 2, 3]* 上面调用 *Array.prototype.slice* 方法，因此可以用 *call* 方法表达这个过程，得到同样的结果。

*call* 方法实质上是调用 *Function.prototype.call* 方法，因此上面的表达式可以用 *bind* 方法改写。

```js
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1) // [1]
```

上面代码的含义就是，将 *Array.prototype.slice* 变成 *Function.prototype.call* 方法所在的对象，调用时就变成了 *Array.prototype.slice.call*。类似的写法还可以用于其他数组方法。

```js
var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]
```

如果再进一步，将 *Function.prototype.call* 方法绑定到 *Function.prototype.bind* 对象，就意味着 *bind* 的调用形式也可以被改写。

```js
function f() {
  console.log(this.v);
}

var o = { v: 123 };
var bind = Function.prototype.call.bind(Function.prototype.bind);
bind(f, o)() // 123
```

上面代码的含义就是，将 *Function.prototype.bind* 方法绑定在 *Function.prototype.call* 上面，所以 *bind* 方法就可以直接使用，不需要在函数实例上使用。



#### 2. 箭头函数的 *this* 指向



当我们的 *this* 是以函数的形式调用时，*this* 指向的是全局对象。

不过对于箭头函数来讲，却比较特殊。箭头函数的 *this* 指向始终为外层的作用域。

先来看一个普通函数作为对象的一个方法被调用时，*this* 的指向，如下：

```js
const obj = {
    x : 10,
    test : function(){
        console.log(this); // 指向 obj 对象
        console.log(this.x); // 10
    }
}
obj.test();
// { x: 10, test: [Function: test] }
// 10
```

可以看到，普通函数作为对象的一个方法被调用时，*this* 指向当前对象。

在上面的例子中，就是 *obj* 这个对象，*this.x* 的值为 *10*。



接下来是箭头函数以对象的方式被调用的时候的 *this* 的指向，如下：

```js
var x = 20;
const obj = {
    x: 10,
    test: () => {
        console.log(this); // {}
        console.log(this.x); // undefined
    }
}
obj.test();
// {}
// undefined
```

这里的结果和上面不一样，*this* 打印出来为 { }，而 *this.x* 的值为 *undefined*。

为什么呢？

实际上刚才我们有讲过，箭头函数的 *this* 指向与普通函数不一样，它的 *this* 指向始终是指向的外层作用域。所以这里的 *this* 实际上是指向的全局对象。

如果证明呢？

方法很简单，将这段代码放入浏览器运行，在浏览器中用 *var* 所声明的变量会成为全局对象 *window* 的一个属性，如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-28-052059.png" alt="image-20210928132058878" style="zoom:50%;" />



接下来我们再来看一个例子，来证明箭头函数的 *this* 指向始终是指向的外层作用域。

```js
var name = "JavaScript";
const obj = {
    name: "PHP",
    test: function () {
        const i = function () {
            console.log(this.name);
            // i 是以函数的形式被调用的，所以 this 指向全局
            // 在浏览器环境中打印出 JavaScript，node 里面为 undeifned
        }
        i();
    }
}
obj.test(); // JavaScript
```

接下来我们将 i 函数修改为箭头函数，如下：

```js
var name = "JavaScript";
const obj = {
    name : "PHP",
    test : function(){
        const i = ()=>{
            console.log(this.name);
            // 由于 i 为一个箭头函数，所以 this 是指向外层的
            // 所以 this.name 将会打印出 PHP
        }
        i();
    }
}
obj.test();// PHP
```

最后需要说一点的就是，箭头函数不能作为构造函数，如下：

```js
const Test = (name, age) => {
    this.name = name;
    this.age = age;
};
const test = new Test("xiejie", 18);
// TypeError: Test is not a constructor
```



## 真题解答



- *this* 的指向哪几种 ？

> 参考答案：
>
> 总结起来，*this* 的指向规律有如下几条：
>
> - 在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的 *this* 会被绑定到 *undefined* 上，在非严格模式下则会被绑定到全局对象 *window/global* 上。
> - 一般使用 *new* 方法调用构造函数时，构造函数内的 *this* 会被绑定到新创建的对象上。
> - 一般通过 *call/apply/bind* 方法显式调用函数时，函数体内的 *this* 会被绑定到指定参数的对象上。
> - 一般通过上下文对象调用函数时，函数体内的 *this* 会被绑定到该对象上。
> - 在箭头函数中，*this* 的指向是由外层（函数或全局）作用域来决定的。



-*EOF*-

# 垃圾回收与内存泄漏



## 经典真题



- 请介绍一下 *JavaScript* 中的垃圾回收站机制



## 什么是内存泄露



程序的运行需要内存。只要程序提出要求，操作系统或者运行时（*runtime*）就必须供给内存。

对于持续运行的服务进程（*daemon*），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。

也就是说，不再用到的内存，如果没有及时释放，就叫做内存泄漏（*memory leak*）。



## *JavaScript* 中的垃圾回收



浏览器的 *Javascript* 具有自动垃圾回收机制（*GC*：*Garbage Collecation*），也就是说，执行环境会负责管理代码执行过程中使用的内存。其原理是：**垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存**。

但是这个过程不是实时的，因为其开销比较大并且 *GC* 时停止响应其他操作，所以垃圾回收器会按照固定的时间间隔周期性的执行。

不再使用的变量也就是生命周期结束的变量，当然只可能是局部变量，全局变量的生命周期直至浏览器卸载页面才会结束。局部变量只在函数的执行过程中存在，而在这个过程中会为局部变量在栈或堆上分配相应的空间，以存储它们的值，然后在函数中使用这些变量，直至函数结束，而闭包中由于内部函数的原因，外部函数并不能算是结束。



下面是一段示例代码：

```js
function fn1() {
    var obj = {name: 'zhangsan', age: 10};
}
function fn2() {
    var obj = {name:'zhangsan', age: 10};
    return obj;
}

var a = fn1();
var b = fn2();
```

在上面的代码中，我们首先声明了两个函数，分别叫做 *fn1* 和 *fn2*。

当 *fn1* 被调用时，进入 *fn1* 的环境，会开辟一块内存存放对象 *{name: 'zhangsan', age: 10}*。而当调用结束后，出了 *fn1* 的环境，那么该块内存会被  *JavaScript* 引擎中的垃圾回收器自动释放；

在 *fn2* 被调用的过程中，返回的对象被全局变量 *b* 所指向，所以该块内存并不会被释放。

这里问题就出现了：到底哪个变量是没有用的？

所以垃圾收集器必须跟踪到底哪个变量没用，对于不再有用的变量打上标记，以备将来收回其内存。

用于标记的无用变量的策略可能因实现而有所区别，通常情况下有两种实现方式：**标记清除**和**引用计数**。

引用计数不太常用，标记清除较为常用。



## 标记清除



*JavaScript* 中最常用的垃圾回收方式就是标记清除。

当变量进入环境时，例如，在函数中声明一个变量，就将这个变量标记为“进入环境”。

从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。

而当变量离开环境时，则将其标记为“离开环境”。

```js
function test(){
  var a = 10 ; // 被标记 ，进入环境 
  var b = 20 ; // 被标记 ，进入环境
}
test(); // 执行完毕 之后 a、b 又被标离开环境，被回收。
```

垃圾回收器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。

然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记（闭包）。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。

最后，垃圾回收器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。

到目前为止，*IE9+、Firefox、Opera、Chrome、Safari* 的 *JS* 实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。



## 引用计数



引用计数的含义是跟踪记录每个值被引用的次数。

当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是 *1*。如果同一个值又被赋给另一个变量，则该值的引用次数加 *1*。

相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 *1*。当这个值的引用次数变成 *0* 时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。

这样，当垃圾回收器下次再运行时，它就会释放那些引用次数为 *0* 的值所占用的内存。

```js
function test() {
    var a = {};	// a 指向对象的引用次数为 1
    var b = a;	// a 指向对象的引用次数加 1，为 2
    var c = a;	// a 指向对象的引用次数再加 1，为 3
    var b = {};	// a 指向对象的引用次数减 1，为 2
}
```

*Netscape Navigator3* 是最早使用引用计数策略的浏览器，但很快它就遇到一个严重的问题：**循环引用**。

循环引用指的是对象 *A* 中包含一个指向对象B的指针，而对象 *B* 中也包含一个指向对象 *A* 的引用。

```js
function fn() {
    var a = {};
    var b = {};
    a.pro = b;
    b.pro = a;
}
fn();
```

以上代码 *a* 和 *b* 的引用次数都是 *2*，*fn* 执行完毕后，两个对象都已经离开环境，在标记清除方式下是没有问题的，但是在引用计数策略下，因为 *a* 和 *b* 的引用次数不为 *0*，所以不会被垃圾回收器回收内存，如果 *fn* 函数被大量调用，就会造成内存泄露。在 *IE7* 与 *IE8* 上，内存直线上升。



## 真题解答



- 请介绍一下 *JavaScript* 中的垃圾回收站机制

> 参考答案：
>
> *JavaScript* 具有自动垃圾回收机制。垃圾收集器会按照固定的时间间隔周期性的执行。
>
> *JavaScript* 常见的垃圾回收方式：**标记清除**、**引用计数**方式。
>
> 1、标记清除方式：
>
> - 工作原理：当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存。
>
> - 工作流程：
>
>  - 垃圾回收器，在运行的时候会给存储在内存中的所有变量都加上标记；
>
>  - 去掉环境中的变量以及被环境中的变量引用的变量的标记；
>
>  - 被加上标记的会被视为准备删除的变量；
>
>  - 垃圾回收器完成内存清理工作，销毁那些带标记的值并回收他们所占用的内存空间。
>
> 2、引用计数方式：
>
> - 工作原理：跟踪记录每个值被引用的次数。
>
> - 工作流程：
>
>  - 声明了一个变量并将一个引用类型的值赋值给这个变量，这个引用类型值的引用次数就是 *1*；
>
>  - 同一个值又被赋值给另一个变量，这个引用类型值的引用次数加 *1*；
>
>  - 当包含这个引用类型值的变量又被赋值成另一个值了，那么这个引用类型值的引用次数减 *1*；
>
>  - 当引用次数变成 *0* 时，说明没办法访问这个值了；
>
>  - 当垃圾收集器下一次运行时，它就会释放引用次数是 *0* 的值所占的内存。



-*EOF*-

# 闭包



## 经典真题



- 闭包是什么？闭包的应用场景有哪些？怎么销毁闭包？



## 什么是闭包

闭包，是 *JavaScript* 中一个非常重要的知识点，也是我们前端面试中较高几率被问到的知识点之一。

打开《*JavaScript* 高级程序设计》和《 *JavaScript* 权威指南》，会发现里面针对闭包的解释各执一词，在网络上搜索关于闭包的内容，也发现众说纷纭，这就导致了这个知识点本身显得有点神秘，甚至还有一点玄幻。



那么这个知识点真的有那么深奥么？

非也！其实要理解 *JavaScript* 中的闭包，非常容易，但是在此之前你需要先知道以下两个知识点：

- *JavaScript* 中的作用域和作用域链
- *JavaScript* 中的垃圾回收



这里我们来简单回顾一下这两个知识点：

**1. *JavaScript* 中的作用域和作用域链**

- 作用域就是一个独立的地盘，让变量不会外泄、暴露出去，不同作用域下同名变量不会有冲突。
- 作用域在定义时就确定，并且不会改变。
- 如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。



**2. *JavaScript* 中的垃圾回收**

- *Javascript* 执行环境会负责管理代码执行过程中使用的内存，其中就涉及到一个垃圾回收机制
- 垃圾收集器会定期（周期性）找出那些不再继续使用的变量，只要该变量不再使用了，就会被垃圾收集器回收，然后释放其内存。如果该变量还在使用，那么就不会被回收。



*OK*，有了这 *2* 个知识点的铺垫后，接下来我们再来看什么是闭包。

> 闭包不是一个具体的技术，而是一种现象，是指在定义函数时，周围环境中的信息可以在函数中使用。换句话说，执行函数时，只要在函数中使用了外部的数据，就创建了闭包。
>
> 而作用域链，正是实现闭包的手段。



什么？只要在函数中使用了外部的数据，就创建了闭包？

真的是这样么？下面我们可以证明一下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-27-065017.png" alt="image-20211227145016552" style="zoom:50%;" />

在上面的代码中，我们在函数 *a* 中定义了一个变量 *i*，然后打印这个 *i* 变量。对于 *a* 这个函数来讲，自己的函数作用域中存在 *i* 这个变量，所以我们在调试时可以看到 *Local* 中存在变量 *i*。



下面我们将上面的代码稍作修改，如下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-27-065522.png" alt="image-20211227145521272" style="zoom:50%;" />

在上面的代码中，我们将声明 *i* 这个变量的动作放到了 *a* 函数外面，也就是说 *a* 函数在自己的作用域已经找不到这个 *i* 变量了，它会怎么办？

学习了作用域链的你肯定知道，它会顺着作用域链一层一层往外找。然而上面在介绍闭包时说过，如果出现了这种情况，也就是函数使用了外部的数据的情况，就会创建闭包。

仔细观察调试区域，我们会发现此时的 *i* 就放在 *Closure* 里面的，从而证实了我们前面的说法。



所以你看，闭包其实也没有那么难理解，当你觉得一个词对你来说特别难的时候，你还可以使用拆词法，这也是我比较推荐的屡试不爽的一种方法。



“闭”可以理解为“封闭，闭环”，“包”可以理解为“一个类似于包裹的空间”，因此闭包实际上可以看作是一个封闭的空间，那么这个空间用来干啥呢？实际上就是用来存储变量的。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-27-083947.png" alt="image-20211227163947135" style="zoom:50%;" />

那么是一个函数下所有的变量声明都会被放入到闭包这个封闭的空间里面么？

倒也不是，放不放入到闭包中，要看其他地方有没有对这个变量进行引用，例如：

![image-20211227164333723](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-27-084334.png)

在上面的代码中，函数 c 中一个变量都没有创建，却要打印 *i、j、k* 和 *x*，这些变量分别存在于 *a、b* 函数以及全局作用域中，因此创建了 *3* 个闭包，全局闭包里面存储了 *i* 的值，闭包 *a* 中存储了变量 *j* 和 *k* 的值，闭包 *b* 中存储了变量 *x* 的值。

但是你仔细观察，你就会发现函数 *b* 中的 *y* 变量并没有被放在闭包中，所以要不要放入闭包取决于该变量有没有被引用。



当然，此时的你可能会有这样的一个新问题，那么多闭包，那岂不是占用内存空间么？

实际上，如果是自动形成的闭包，是会被销毁掉的。例如：

![image-20211227174043786](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-12-27-094043.png)

在上面的代码中，我们在第 *16* 行尝试打印输出变量 *k*，显然这个时候是会报错的，在第 *16* 行打一个断点调试就可以清楚的看到，此时已经没有任何闭包存在，垃圾回收器会自动回收没有引用的变量，不会有任何内存占用的情况。



当然，这里我指的是自动产生闭包的情况，关于闭包，有时我们需要根据需求手动的来制造一个闭包。

来看下面的例子：

```js
function eat(){
    var food = "鸡翅";
    console.log(food);
}
eat(); // 鸡翅
console.log(food); // 报错
```

在上面的例子中，我们声明了一个名为 *eat* 的函数，并对它进行调用。

*JavaScript* 引擎会创建一个 *eat* 函数的执行上下文，其中声明 *food* 变量并赋值。

当该方法执行完后，上下文被销毁，*food* 变量也会跟着消失。这是因为 *food* 变量属于 *eat* 函数的局部变量，它作用于 *eat* 函数中，会随着 *eat* 的执行上下文创建而创建，销毁而销毁。所以当我们再次打印 *food* 变量时，就会报错，告诉我们该变量不存在。



但是我们将此代码稍作修改：

```js
function eat(){
    var food = '鸡翅';
    return function(){
        console.log(food);
    }
}
var look = eat();
look(); // 鸡翅
look(); // 鸡翅
```

在这个例子中，*eat* 函数返回一个函数，并在这个内部函数中访问 *food* 这个局部变量。调用 *eat* 函数并将结果赋给 *look* 变量，这个 *look* 指向了 *eat* 函数中的内部函数，然后调用它，最终输出 *food* 的值。

为什么能访问到 *food*，原因很简单，上面我们说过，垃圾回收器只会回收没有被引用到的变量，但是一旦一个变量还被引用着的，垃圾回收器就不会回收此变量。在上面的示例中，照理说 *eat* 调用完毕 *food* 就应该被销毁掉，但是我们向外部返回了 *eat* 内部的匿名函数，而这个匿名函数有引用了 *food*，所以垃圾回收器是不会对其进行回收的，这也是为什么在外面调用这个匿名函数时，仍然能够打印出 *food* 变量的值。



至此，闭包的一个优点或者特点也就体现出来了，那就是：

- 通过闭包可以让外部环境访问到函数内部的局部变量。
- 通过闭包可以让局部变量持续保存下来，不随着它的上下文环境一起销毁。



通过此特性，我们可以解决一个全局变量污染的问题。早期在 *JavaScript* 还无法进行模块化的时候，在多人协作时，如果定义过多的全局变量 有可能造成全局变量命名冲突，使用闭包来解决功能对变量的调用将变量写到一个独立的空间里面，从而能够一定程度上解决全局变量污染的问题。

例如：

```js
var name = "GlobalName";
// 全局变量
var init = (function () {
    var name = "initName";
    function callName() {
        console.log(name);
        // 打印 name
    }
    return function () {
        callName();
        // 形成接口
    }
}());
init(); // initName
var initSuper = (function () {
    var name = "initSuperName";
    function callName() {
        console.log(name);
        // 打印 name
    }
    return function () {
        callName();
        // 形成接口
    }
}());
initSuper(); // initSuperName
```



好了，在此小节的最后，我们来对闭包做一个小小的总结：



- 闭包是一个封闭的空间，里面存储了在其他地方会引用到的该作用域的值，在 *JavaScript* 中是通过作用域链来实现的闭包。



- 只要在函数中使用了外部的数据，就创建了闭包，这种情况下所创建的闭包，我们在编码时是不需要去关心的。



- 我们还可以通过一些手段手动创建闭包，从而让外部环境访问到函数内部的局部变量，让局部变量持续保存下来，不随着它的上下文环境一起销毁。



## 闭包经典问题

聊完了闭包，接下来我们来看一个闭包的经典问题。

```js
for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```

在上面的代码中，我们预期的结果是过 *1* 秒后分别输出 *i* 变量的值为 *1，2，3*。但是，执行的结果是：*4，4，4*。

实际上，问题就出在闭包身上。你看，循环中的 *setTimeout* 访问了它的外部变量 *i*，形成闭包。

而 *i* 变量只有 *1* 个，所以循环 *3* 次的 *setTimeout* 中都访问的是同一个变量。循环到第 *4* 次，*i* 变量增加到 *4*，不满足循环条件，循环结束，代码执行完后上下文结束。但是，那 *3* 个 *setTimeout* 等 *1* 秒钟后才执行，由于闭包的原因，所以它们仍然能访问到变量 *i*，不过此时 *i* 变量值已经是 *4* 了。

要解决这个问题，我们可以让 *setTimeout* 中的匿名函数不再访问外部变量，而是访问自己内部的变量，如下：

```js
for (var i = 1; i <= 3; i++) {
    (function (index) {
        setTimeout(function () {
            console.log(index);
        }, 1000);
    })(i)
}
```

这样 *setTimeout* 中就可以不用访问 *for* 循环声明的变量 *i* 了。而是采用调用函数传参的方式把变量 *i* 的值传给了 *setTimeout*，这样它们就不再创建闭包，因为在我自己的作用域里面能够找到 *i* 这个变量。

当然，解决这个问题还有个更简单的方法，就是使用 *ES6* 中的 *let* 关键字。

它声明的变量有块作用域，如果将它放在循环中，那么每次循环都会有一个新的变量 *i*，这样即使有闭包也没问题，因为每个闭包保存的都是不同的 *i* 变量，那么刚才的问题也就迎刃而解。

```js
for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```



## 真题解答



- 闭包是什么？闭包的应用场景有哪些？怎么销毁闭包？

>闭包是一个封闭的空间，里面存储了在其他地方会引用到的该作用域的值，在 *JavaScript* 中是通过作用域链来实现的闭包。
>
>只要在函数中使用了外部的数据，就创建了闭包，这种情况下所创建的闭包，我们在编码时是不需要去关心的。
>
>我们还可以通过一些手段手动创建闭包，从而让外部环境访问到函数内部的局部变量，让局部变量持续保存下来，不随着它的上下文环境一起销毁。
>
>使用闭包可以解决一个全局变量污染的问题。
>
>如果是自动产生的闭包，我们无需操心闭包的销毁，而如果是手动创建的闭包，可以把被引用的变量设置为 *null*，即手动清除变量，这样下次 *JavaScript* 垃圾回收器在进行垃圾回收时，发现此变量已经没有任何引用了，就会把设为 *null* 的量给回收了。



------



-*EOF*-

# *DOM* 事件的注册和移除



## 经典真题



- 总结一下 *DOM* 中如何注册事件和移除事件



## *DOM* 注册事件



使用 *JavaScript* 为 *DOM* 元素注册事件的方式有多种。但是并不是一开始就设计了多种方式，而是随着技术的发展，发展前一种方式有所缺陷，所以设计了新的 *DOM* 元素注册事件的方式。



这里我们就一起来总结一下 *DOM* 中注册事件的方式有哪些。



### *HTML* 元素中注册事件



*HTML* 元素中注册的事件，又被称之为行内事件监听器。这是在浏览器中处理事件最原始的方法。

具体的示例如下：

```html
<button onclick="test('张三')">点击我</button>
```

```js
function test(name) {
  console.log(`我知道你已经点击了，${name}`);
}
```

在上面的代码中，我们为 *button* 元素添加了 *onclick* 属性，然后绑定了一个名为 *test* 的事件处理器。

在 *JavaScript* 中只需要书写对应的 *test* 事件处理函数即可。

但是有一点需要注意，就是这种方法已经过时了，原因如下：

- *JavaScript* 代码与 *HTML* 标记混杂在一起，破坏了结构和行为分离的理念。
- 每个元素只能为每种事件类型绑定一个事件处理器。
- 事件处理器的代码隐藏于标记中，很难找到事件是在哪里声明的。

但是如果是做简单的事件测试，那么这种写法还是非常方便快捷的。



### *DOM0* 级方式注册事件



这种方式是首先取到要为其绑定事件的元素节点对象，然后给这些节点对象的事件处理属性赋值一个函数。

这样就可以达到 *JavaScript* 代码和 *HTML* 代码相分离的目的。

具体的示例如下：

```html
<button id="test">点击我</button>
```

```js
var test = document.getElementById("test");
test.onclick = function(){
  console.log("this is a test");
}
```

这种方式虽然相比 *HTML* 元素中注册事件有所改进，但是它也有一个缺点，那就是它依然存在每个元素只能绑定一个函数的局限性。

下面我们尝试使用这种方式为同一个元素节点绑定 *2* 个事件，如下：

```js
var test = document.getElementById("test");
test.onclick = function(){
  console.log("this is a test");
}
test.onclick = function(){
  console.log("this is a test,too");
}
```

当我们为该 *DOM* 元素绑定 *2* 个相同类型的事件时，后面的事件处理函数就会把前面的事件处理函数给覆盖掉。



### *DOM2* 级方式注册事件



*DOM2* 级再次对事件的绑定方式进行了改进。

*DOM2* 级通过 *addEventListener* 方法来为一个 *DOM* 元素添加多个事件处理函数。

该方法接收 *3* 个参数：事件名、事件处理函数、布尔值。

如果这个布尔值为 *true*，则在捕获阶段处理事件，如果为 *false*，则在冒泡阶段处理事件。若最后的布尔值不填写，则和 *false* 效果一样，也就是说默认为 *false*，在冒泡阶段进行事件的处理。



接下来我们来看下面的示例：这里我们为 *button* 元素绑定了 *2* 个事件处理程序，并且 *2* 个事件处理程序都是通过点击来触发。

```js
var test = document.getElementById("test");
test.addEventListener("click", function () {
  console.log("this is a test");
}, false);
test.addEventListener("click", function () {
  console.log("this is a test,too");
}, false);
```

在上面的代码中，我们通过 *addEventListener* 为按钮绑定了 *2* 个点击的事件处理程序，*2* 个事件处理程序都会执行。

另外需要注意的是，在 *IE* 中和 *addEventListener* 方法与之对应的是 *attachEvent* 方法。



## *DOM* 移除事件



通过 *DOM0* 级来添加的事件，删除的方法很简单，只需要将 *DOM* 元素的事件处理属性赋值为 *null* 即可。

例如：

```js
var test = document.getElementById("test");
test.onclick = function(){
  console.log("this is a test");
  test.onclick = null;
}
```

在上面的代码中，我们通过 *DOM0* 级的方式为 *button* 按钮绑定了点击事件，但是在事件处理函数中又移除了该事件。所以该事件只会生效一次。



如果是通过 *DOM2* 级来添加的事件，我们可以使用 *removeEventLister* 方法来进行事件的删除。

需要注意的是，如果要通过该方法移除**某一类事件类型的一个事件**的话，在通过 *addEventListener* 来绑定事件时的写法就要稍作改变。

先单独将绑定函数写好，然后 *addEventListener* 进行绑定时第 *2* 个参数传入要绑定的函数名即可。

示例如下：

```js
var test = document.getElementById("test");
//DOM 2级添加事件
function fn1() {
  console.log("this is a test");
  test.removeEventListener("click", fn1); // 只删除第一个点击事件
}
function fn2() {
  console.log("this is a test,too");
}
test.addEventListener("click", fn1, false);
test.addEventListener("click", fn2, false);
```

在上面的代码中，我们为 *button* 元素绑定了两个 *click* 事件，之后在第一个事件处理函数中，对 *fn1* 事件处理函数进行了移除。所以第一次点击时，*fn1* 和 *fn2* 都会起作用，之后因为 *fn1* 被移除，所以只会 *fn2* 有作用。



## 真题解答



- 总结一下 *DOM* 中如何注册事件和移除事件

> 参考答案：
>
> 注册事件的方式常见的有 *3* 种方式：
>
> - *HTML* 元素中注册的事件：这种方式又被称之为行内事件监听器。这是在浏览器中处理事件最原始的方法。
>
> - *DOM0* 级方式注册事件：这种方式是首先取到要为其绑定事件的元素节点对象，然后给这些节点对象的事件处理属性赋值一个函数。
>
> - *DOM2* 级方式注册事件：*DOM2* 级通过 *addEventListener* 方法来为一个 *DOM* 元素添加多个事件处理函数。
>
>   该方法接收 *3* 个参数：事件名、事件处理函数、布尔值。
>
>   如果这个布尔值为 *true*，则在捕获阶段处理事件，如果为 *false*，则在冒泡阶段处理事件。若最后的布尔值不填写，则和 *false* 效果一样，也就是说默认为 *false*，在冒泡阶段进行事件的处理。
>
> 关于移除注册的事件，如果是 *DOM0* 级方式注册的事件，直接将值设置为 *null* 即可。如果是 *DOM2* 级注册的事件，可以使用 *removeEventListener* 方法来移除事件。



-*EOF*-


# *DOM* 事件的传播机制



## 经典真题



- 谈一谈事件委托以及冒泡原理



## 事件与事件流



事件最早是在 *IE3* 和 *NetscapeNavigator2* 中出现的，当时是作为分担服务器运算负担的一种手段。

要实现和网页的互动，就需要通过 *JavaScript* 里面的事件来实现。

每次用户与一个网页进行交互，例如点击链接，按下一个按键或者移动鼠标时，就会触发一个事件。我们的程序可以检测这些事件，然后对此作出响应。从而形成一种交互。

这样可以使我们的页面变得更加的有意思，而不仅仅像以前一样只能进行浏览。



在早期拨号上网的年代，如果所有的功能都放在服务器端进行处理的话，效率是非常低的。

所以 *JavaScript* 最初被设计出来就是用来解决这些问题的。通过允许一些功能在客户端处理，以节省到服务器的往返时间。

*JavaScript* 中采用一个叫做事件监听器的东西来监听事件是否发生。这个事件监听器类似于一个通知，当事件发生时，事件监听器会让我们知道，然后程序就可以做出相应的响应。

通过这种方式，就可以避免让程序不断地去检查事件是否发生，让程序在等待事件发生的同时，可以继续做其他的任务。



### 事件流



当浏览器发展到第 *4* 代时（*IE4* 及 *Netscape4*），浏览器开发团队遇到了一个很有意思的问题：页面的哪一部分会拥有某个特定的事件？

想象在一张纸上的一组同心圆。如果把手指放在圆心上，那么手指指向的不是一个圆，而是纸上的所有圆。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-094941.png" alt="image-20211002174941387" style="zoom: 33%;" />

好在两家公司的浏览器开发团队在看待浏览器事件方面还是一致的。

如果单击了某个按钮，他们都认为单击事件不仅仅发生在按钮上，甚至也单击了整个页面。

但有意思的是，*IE* 和 *Netscape* 开发团队居然提出了差不多是完全相反的事件流的概念。

*IE* 的事件流是事件冒泡流，而 *Netscape* 的事件流是事件捕获流。



### 事件冒泡流



*IE* 的事件流叫做事件冒泡（*event bubbling*），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

以下列 *HTML* 结构为例，来说明事件冒泡。如下：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        <div></div>
    </body>
</html>
```

如果单击了页面中的 *div* 元素，那么这个 *click* 事件沿 *DOM* 树向上传播，在每一级节点上都会发生，按照如下顺序进行传播：

1. *div*
2. *body*
3. *html*
4. *document*

所有现代浏览器都支持事件冒泡，但在具体实现在还是有一些差别。

*IE9、Firefox、Chrome、Safari* 将事件一直冒泡到 *window* 对象。



我们可以通过下面的代码，来查看文档具体的冒泡顺序，示例如下：

```html
<div id="box" style="height:100px;width:300px;background-color:pink;"></div>
<button id="reset">还原</button>
```

```js
// IE8 以下浏览器返回 div body html document
// 其他浏览器返回 div body html document window
reset.onclick = function () {
  history.go();
}
box.onclick = function () {
  box.innerHTML += 'div\n';
}
document.body.onclick = function () {
  box.innerHTML += 'body\n';
}
document.documentElement.onclick = function () {
  box.innerHTML += 'html\n';
}
document.onclick = function () {
  box.innerHTML += 'document\n';
}
window.onclick = function () {
  box.innerHTML += 'window\n';
}
```

在上面的示例中，我们为 *div* 以及它的祖先元素绑定了点击事件，由于事件冒泡的存在，当我们点击 *div* 时，所有祖先元素的点击事件也会被触发。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-092307.png" alt="image-20211002172307085" style="zoom:50%;" />



### 事件捕获流



*Netscape Communicator* 团队提出的另一种事件流叫做事件捕获（*event captruing*）。

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

事件捕获的思想是在事件到达预定目标之前就捕获它。

以同样的 *HTML* 结构为例来说明事件捕获，如下：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        <div></div>    
    </body>
</html>
```

在事件捕获过程中，*document* 对象首先接收到 *click* 事件，然后事件沿 *DOM* 树依次向下，一直传播到事件的实际目标，即 *div* 元素：

1. *document*
2. *html*
3. *body*
4. *div*

*IE9、Firefox、Chrome、Safari* 等现代浏览器都支持事件捕获，但是也是从 *window* 对象开始捕获。

下面我们来演示一个事件捕获流的示例：

```html
<div id="box" style="height:100px;width:300px;background-color:pink;"></div>
<button id="reset">还原</button>
```

```js
// IE8 以下浏览器不支持
// 其他浏览器返回 window document html body div
reset.onclick = function () {
  history.go();
}
box.addEventListener('click', function () {
  box.innerHTML += 'div\n'
}, true)
document.body.addEventListener('click', function () {
  box.innerHTML += 'body\n';
}, true);
document.documentElement.addEventListener('click', function () {
  box.innerHTML += 'html\n';
}, true);
document.addEventListener('click', function () {
  box.innerHTML += 'document\n';
}, true);
window.addEventListener('click', function () {
  box.innerHTML += 'window\n';
}, true);
```

在上面的示例中，我们为 *div* 以及它所有的祖先元素绑定了点击事件，使用的 *addEventListener* 的方式来绑定的事件，并将第 *2* 个参数设置为了 *true* 表示使用事件捕获的方式来触发事件。

效果如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-093549.png" alt="image-20211002173549252" style="zoom:50%;" />



### 标准 *DOM* 事件流



*DOM* 标准采用的是**捕获 + 冒泡**的方式。

两种事件流都会触发 *DOM* 的所有对象，从 *document* 对象开始，也在 *document* 对象结束。

换句话说，起点和终点都是 *document* 对象（很多浏览器可以一直捕获 + 冒泡到 *window* 对象）

*DOM* 事件流示意图：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-094149.png" alt="image-20211002174148423" style="zoom:50%;" />

*DOM* 标准规定事件流包括三个阶段：**事件捕获阶段**、**处于目标阶段**和**事件冒泡阶段**。

- **事件捕获阶段：**实际目标 *div* 在捕获阶段不会触发事件。捕获阶段从 *window* 开始，然后到 *document、html*，最后到 *body* 意味着捕获阶段结束。



- **处于目标阶段：**事件在 *div* 上发生并处理，但是本次事件处理会被看成是冒泡阶段的一部分。



- **冒泡阶段：**事件又传播回文档。



## 事件委托



上面介绍了事件冒泡流，事件冒泡一个最大的好处就是可以实现事件委托。

事件委托，又被称之为事件代理。在 *JavaScript* 中，添加到页面上的事件处理程序数量将直接关系到页面整体的运行性能。导致这一问题的原因是多方面的。

首先，每个函数都是对象，都会占用内存。内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 *DOM* 访问次数，会延迟整个页面的交互就绪时间。

对事件处理程序过多问题的解决方案就是事件委托。

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

例如，*click* 事件会一直冒泡到 *document* 层次。也就是说，我们可以为整个页面指定一个 *onclick* 事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。

举一个具体的例子，例如现在我的列表项有如下内容：

```html
<ul id="color-list">
  <li>red</li>
  <li>yellow</li>
  <li>blue</li>
  <li>green</li>
  <li>black</li>
  <li>white</li>
</ul>
```

如果我们想把事件监听器绑定到所有的 *li* 元素上面，这样它们被单击的时候就弹出一些文字，为此我们需要给每一个元素来绑定一个事件监听器。

虽然上面的例子中好像问题也不大，但是想象一下如果这个列表有 *100* 个元素，那我们就需要添加 *100* 个事件监听器，这个工作量还是很恐怖的。

这个时候我们就可以利用事件代理来帮助我们解决这个问题。

将事件监听器绑定到父元素 *ul* 上，这样即可对所有的 *li* 元素添加事件，如下：

```js
var colorList = document.getElementById("color-list");
colorList.addEventListener("click",function(){
  alert("Hello");
})
```

现在我们单击列表中的任何一个 *li* 都会弹出东西，就好像这些 *li* 元素就是 *click* 事件的目标一样。

并且如果我们之后再为这个 *ul* 添加新的 *li* 元素的话，新的 *li* 元素也会自动添加上相同的事件。

但是，这个时候也存在一个问题，虽然我们使用事件代理避免了为每一个 *li* 元素添加相同的事件，但是如果用户没有点击 *li*，而是点击的 *ul*，同样也会触发事件。

这也很正常，因为我们事件就是绑定在 *ul* 上面的。

此时我们可以对点击的节点进行一个小小的判断，从而保证用户只在点击 *li* 的时候才触发事件，如下：

```js
var colorList = document.getElementById("color-list");
colorList.addEventListener("click", function (event) {
  if (event.target.nodeName === 'LI') {
    alert('点击 li');
  }
})
```



## 真题解答



- 谈一谈事件委托以及冒泡原理

> 参考答案：
>
> 事件委托，又被称之为事件代理。在 *JavaScript* 中，添加到页面上的事件处理程序数量将直接关系到页面整体的运行性能。导致这一问题的原因是多方面的。
>
> 首先，每个函数都是对象，都会占用内存。内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 *DOM* 访问次数，会延迟整个页面的交互就绪时间。
>
> 对事件处理程序过多问题的解决方案就是事件委托。
>
> 事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，*click* 事件会一直冒泡到 *document* 层次。也就是说，我们可以为整个页面指定一个 *onclick* 事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。
>
> 事件冒泡（*event bubbling*），是指事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。



-*EOF*-

# 阻止事件默认行为



## 经典真题



- 如何阻止默认事件？



## 什么是默认行为



所谓默认行为，一般是指 *HTML* 元素所自带的行为。例如点击一个 *a* 元素表示的是跳转：

```html
<a href="https://www.baidu.com">百度一下</a>
```

在上面的代码中，设置了 *a* 元素的 *href* 属性指向百度，当用户点击该 *a* 元素时，就会跳转至百度。



在例如：

```html
<form action=""></form>
```

上面的代码中我们书写了一个 *form* 元素，该元素有一个 *action* 属性，指的是表单内容要提交的地址。而当用户点击表单元素中嵌套的提交按钮时，就会进行一个默认的提交操作。



这些，就是 *HTML* 元素中的默认行为。



但是有些时候，我们是不需要这些默认行为的，例如，用户在填写了一个表单后，提交信息时我们采用 *ajax* 来异步发送到服务器，此时就不需要表单 *form* 元素默认的提交跳转这个行为了。



所以此时，我们就需要阻止默认行为。



## 阻止默认行为的方式汇总



下面我们来对阻止默认行为的方式进行一个总结。



**（1）*cancelable* 属性**

首先要介绍的是 *cancelable* 属性，该属性返回一个布尔值，表示事件是否可以取消。

该属性为只读属性。返回 *true* 时，表示可以取消。否则，表示不可取消。

```html
<a id="test" href="https://www.baidu.com">百度</a>
```

```js
var test = document.getElementById("test");
test.onclick = function (event) {
  test.innerHTML = event.cancelable; // true
}
```

在上面的代码中，我们为 *a* 元素绑定了一个点击事件，点击之后通过 *event* 对象的 *cancelable* 属性来查看该元素的默认行为是否能阻止。

最终返回的是 *true*，说明是能够阻止的。



**（2）*preventDefault* 方法**

*preventDefault* 方法是 *DOM* 中最常见，也是最标准的取消浏览器默认行为的方式，无返回值。

```js
var test = document.getElementById("test");
test.onclick = function(event){
  event.preventDefault();
}
```

在上面的代码中，我们仍然是通过 *event* 对象来调用的 *preventDefault* 方法，从而阻止了 *a* 元素的默认跳转行为。



**（3）*returnValue* 属性**

这种方式使用的人比较少，知道这种方式的人也比较少。

首先 *returnValue* 是一个 *event* 对象上面的属性。该属性可读可写，默认值是 *true*，将其设置为 *false* 就可以取消事件的默认行为，与 *preventDefault* 方法的作用相同。

该属性最早是在 *IE* 的事件对象中，实现了这种取消默认行为的方式，但是现在大多数浏览器都实现了该方式。

```js
var test = document.getElementById("test");
test.onclick = function(event){
  event.returnValue = false;
}
```



**（4）*return false***

*return false* 是一条语句，该语句写在事件处理函数中也可以阻止默认行为。

但是需要注意的是，如果该条语句写在 *jQuery* 代码中，能够同时阻止默认行为和阻止冒泡，但是在原生 *JavaScript* 中只能阻止默认行为。

```js
var test = document.getElementById("test");
test.onclick = function(){
  return false;
}
```



**（5）*defaultPrevented* 方法**

*defaultPrevented* 属性也是 *event* 对象上面的一个属性。该属性表示默认行为是否被阻止，返回 *true* 表示被阻止，返回 *false* 表示未被阻止。

```js
var test = document.getElementById("test");
test.onclick = function (event) {
  // 采用两种不同的方式来阻止浏览器默认行为，这是为了照顾其兼容性
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  // 将是否阻止默认行为的结果赋值给 <a> 标签的文本内容
  test.innerHTML = event.defaultPrevented;
}
```

在上面的代码中，我们点击 *a* 元素时，使用 *preventDefault* 方法阻止了浏览器默认行为。

之后访问 *event.defaultPrevented* 属性会得到 *true*，说明默认行为已经被阻止。



## 真题解答



- 如何阻止默认事件？

> 参考答案：
>
> ```js
> // 方法一：全支持
> event.preventDefault();
> // 方法二：该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
> event.returnValue = false;
> // 方法三：不建议滥用，jQuery 中可以同时阻止冒泡和默认事件
> return false;
> ```



-*EOF*-

# 递归



## 经典真题



- 使用递归完成 *1* 到 *100* 的累加



## 递归



*A recursive method is a method that calls itself.*

递归调用是一种特殊的调用形式，指的是方法自己调用自己的形式。



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-19-063739.png" alt="image-20211019143738665" style="zoom:50%;" />



下面是一个递归的示例：

```java
function neverEnd() {
    console.log("This is the method that never ends!");
    neverEnd();
}
```

*method* 会先输出 *This is the method that never ends!* 然后再调用自己，导致无限递归（*infinite recursion*）。当然这一般是我们需要避免的状况。



在进行递归操作的时候，我们需要满足以下几个条件：

- 递归调用必须有结束条件
- 每次调用的时候都需要根据需求改变传递的参数内容



下面是递归的一个示例，求某个数的阶乘。

```java
function factorial(x) {
    if (x === 1) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
}
console.log(factorial(5)); // 120
```



整个递归的计算过程如下：

```
===> factorial(5)
===> 5 * factorial(4)
===> 5 * (4 * factorial(3))
===> 5 * (4 * (3 * factorial(2)))
===> 5 * (4 * (3 * (2 * factorial(1))))
===> 5 * (4 * (3 * (2 * 1)))
===> 5 * (4 * (3 * 2))
===> 5 * (4 * 6)
===> 5 * 24
===> 120
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-19-063535.png" alt="image-20211019143535293" style="zoom:50%;" />



使用递归时需要注意如下事项：



- 递归函数的优点是定义简单，逻辑清晰。理论上，所有的递归函数都可以用循环的方式来实现。

  

- 使用递归时需要注意防止栈溢出。在计算机中，函数调用是通过栈（*stack*）这种数据结构实现的，每当一个函数调用，栈就会加一层，每当函数返回，栈就会减一层。由于栈的大小不是无限的，所以递归调用的次数过多，会导致栈溢出。



下面再来看几个递归的示例：



示例 *1*：使用递归来计算从 *x* 加到 *y* 的结果

```go
function calc(i, j) {
    if (i == j) {
        return i;
    }
    return calc(i, j - 1) + j;
}
console.log(calc(1, 100)); // 5050
```

示例 *2*：使用递归来计算斐波那契数列

```go
function calc(i) {
    if (i == 1) {
        return 1;
    } else if (i == 2) {
        return 2;
    } else {
        return calc(i - 1) + calc(i - 2);
    }
}
console.log(calc(7)); // 21
```



## 真题解答



- 使用递归完成 *1* 到 *100* 的累加

> 参考答案：
>
> ```js
> function calc(i, j) {
>     if (i == j) {
>         return i;
>     }
>     return calc(i, j - 1) + j;
> }
> console.log(calc(1, 100)); // 5050
> ```



-*EOF*-

# 属性描述符



## 经典真题



- *JavaScript* 中对象的属性描述符有哪些？分别有什么作用？



## 属性描述符详解



在 *JavaScript* 中，对象的属性可以分为两种：



- 数据属性：它的本质就是一个数据

- 存取器属性：它的本质是一个函数，但是可以将它当作普通属性来使用，当给该属性赋值时，会运行相应的 *setter* 函数，当获取该属性的值时，会运行相应的 *getter* 函数。除了存取器，还有一些其他的关键字，用以表示当前属性是否可写、是否有默认值、是否可枚举等，这些关键字就是属性描述符。



属性描述符是 *ECMAScript* 5 新增的语法，它其实就是一个内部对象，用来描述对象的属性的特性。



### 属性描述符的结构



在定义对象、定义属性时，我们曾经介绍过属性描述符，属性描述符实际上就是一个对象。

属性描述符一共有 *6* 个，可以选择使用。

- *value*：设置属性值，默认值为 *undefined*。
- *writable*：设置属性值是否可写，默认值为 *true*。
- *enumerable*：设置属性是否可枚举，即是否允许使用 *for/in* 语句或 *Object.keys( )* 函数遍历访问，默认为 *true*。
- *configurable*：设置是否可设置属性特性，默认为 *true*。如果为 *false*，将无法删除该属性，不能够修改属性值，也不能修改属性的属性描述符。
- *get*：取值函数，默认为 *undefined*。
- *set*：存值函数，默认为 *undefined*。



注意这几个属性不是都可以一起设置，具体如下图：

![image-20211021111647398](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-21-031647.png)



**示例 1**

下面示例演示了使用 *value* 读写属性值的基本用法。

```js
var obj = {};  //定义空对象
Object.defineProperty(obj, 'x', {value : 100});  //添加属性x，值为100
console.log(Object.getOwnPropertyDescriptor(obj, 'x').value);  //返回100
```



**示例 2**

下面示例演示了使用 *writable* 属性禁止修改属性 *x*。

```js
var obj = {};
Object.defineProperty(obj, 'x', {
    value : 1,  //设置属性默认值为1
    writable : false  //禁止修改属性值
});
obj.x = 2;  //修改属性x的值
console.log(obj.x);  // 1 说明修改失败
```

在正常模式下，如果 *writable* 为 *false*，重写属性值不会报错，但是操作失败，而在严格模式下则会抛出异常。



**示例 3**

*configurable* 可以禁止修改属性描述符，当其值为 *false* 时，*value、writable、enumerable* 和 *configurable* 禁止修改，同时禁止删除属性。

在下面示例中，当设置属性 *x* 禁止修改配置后，下面操作都是不允许的，其中 *obj.x=5;* 若操作失败，则后面 *4* 个操作方法都将抛出异常。

```js
var obj = Object.defineProperty({}, 'x', {
    configurable : false  // 禁止配置
});
obj.x = 5;  //试图修改其值
console.log(obj.x);  //修改失败，返回undefined
Object.defineProperty(obj, 'x', {value : 2});  //抛出异常
Object.defineProperty(obj, 'x', {writable: true});  //抛出异常
Object.defineProperty(obj, 'x', {enumerable: true});  //抛出异常
Object.defineProperty(obj, 'x', {configurable: true});  //抛出异常
```

当 *configurable* 为 *false* 时，如果把 *writable=true* 改为 *false* 是允许的。只要 *writable* 或 *configurable* 有一个为 *true*，则 *value* 也允许修改。



### *get* 和 *set* 函数



除了使用点语法或中括号语法访问属性的 *value* 外，还可以使用访问器，包括 *set* 和 *get* 两个函数。

其中，*set( )* 函数可以设置 *value* 属性值，而 *get( )* 函数可以读取 *value* 属性值。

借助访问器，可以为属性的 *value* 设计高级功能，如禁用部分特性、设计访问条件、利用内部变量或属性进行数据处理等。



**示例 1**

下面示例设计对象 *obj* 的 *x* 属性值必须为数字。为属性 *x* 定义了 *get* 和 *set* 特性，*obj.x* 取值时，就会调用 *get*；赋值时，就会调用 *set*。

```js
var obj = Object.create(Object.prototype, {
    _x : {  //数据属性
        value : 1,  //初始值
        writable : true
    },
    x : {  //访问器属性
        get : function () {  //getter
            return this._x;  //返回_x属性值
        },
        set : function (value) {  //setter
            if (typeof value != "number"){
              throw new Error('请输入数字');
            }
            this._x = value;  //赋值
        }
    }
});
console.log(obj.x);  //1
obj.x = "2";  //抛出异常
```



**示例 2**

*JavaScript* 也支持一种简写方法。针对示例 *1*，通过以下方式可以快速定义属性。

```js
var obj = {
    _x : 1,  // 定义 _x 属性
    get x() { return this._x },  //定义 x 属性的 getter
    set x(value) {  //定义 x 属性的 setter
        if (typeof value != "number"){
          throw new Error('请输入数字');
        }
        this._x = value;  // 赋值
    }
};
console.log(obj.x);  //1
obj.x = 2;
console.log(obj.x);  //2
```

取值函数 *get( )* 不能接收参数，存值函数 *set( )* 只能接收一个参数，用于设置属性的值。



### 操作属性描述符

属性描述符是一个内部对象，无法直接读写，可以通过下面几个函数进行操作。

- *Object.getOwnPropertyDescriptor( )*：可以读出指定对象私有属性的属性描述符。
- *Object.defineProperty( )*：通过定义属性描述符来定义或修改一个属性，然后返回修改后的描述符。
- *Object.defineProperties( )*：可以同时定义多个属性描述符。
- *Object.getOwnPropertyNames( )*：获取对象的所有私有属性。
- *Object.keys( )*：获取对象的所有本地可枚举的属性。
- *propertyIsEnumerable( )*：对象实例方法，直接调用，判断指定的属性是否可枚举。



**示例 1**

在下面示例中，定义 *obj* 的 *x* 属性允许配置特性，然后使用 *Object.getOwnPropertyDescriptor( )* 函数获取对象 *obj* 的 *x* 属性的属性描述符。修改属性描述符的 *set* 函数，重设检测条件，允许非数值型数字赋值。

```js
var obj = Object.create(Object.prototype, {
    _x: {  //数据属性
        value: 1,  //初始值
        writable: true
    },
    x: {  //访问器属性
        configurable: true,  //允许修改配置
        get: function () {  //getter
            return this._x;  //返回_x属性值
        },
        set: function (value) {
            if (typeof value != "number") {
                throw new Error('请输入数字');
            }
            this._x = value;  //赋值
        }
    }
});
var des = Object.getOwnPropertyDescriptor(obj, "x");  //获取属性x的属性描述符
des.set = function (value) {
    //修改属性x的属性描述符set函数
    //允许非数值型的数字，也可以进行赋值
    if (typeof value != "number" && isNaN(value * 1)) {
        throw new Error('请输入数字');
    }
    this._x = value;
}
obj = Object.defineProperty(obj, "x", des);
console.log(obj.x);  //1
obj.x = "2";  //把一个给数值型数字赋值给属性x
console.log(obj.x);  //2
```



**示例 2**

下面示例先定义一个扩展函数，使用它可以把一个对象包含的属性以及丰富的信息复制给另一个对象。

【实现代码】

```js
function extend (toObj, fromObj) {  //扩展对象
    for (var property in fromObj) {  //遍历对象属性
        if (!fromObj.hasOwnProperty(property)) continue;  //过滤掉继承属性
        Object.defineProperty(  //复制完整的属性信息
            toObj,  //目标对象
            property,  //私有属性
            Object.getOwnPropertyDescriptor(fromObj, property)  //获取属性描述符
        );
    }
    return toObj;  //返回目标对象
}
```

【应用代码】

```js
var obj = {};  //新建对象
obj.x = 1;  //定义对象属性
extend(obj, { get y() { return 2} })  //定义读取器对象
console.log(obj.y);  //2
```



### 控制对象状态



*JavaScript* 提供了 *3* 种方法，用来精确控制一个对象的读写状态，防止对象被改变。

- *Object.preventExtensions*：阻止为对象添加新的属性。
- *Object.seal*：阻止为对象添加新的属性，同时也无法删除旧属性。等价于属性描述符的 *configurable* 属性设为 *false*。注意，该方法不影响修改某个属性的值。
- *Object.freeze*：阻止为一个对象添加新属性、删除旧属性、修改属性值。


同时提供了 *3* 个对应的辅助检查函数，简单说明如下：

- *Object.isExtensible*：检查一个对象是否允许添加新的属性。
- *Object.isSealed*：检查一个对象是否使用了 *Object.seal* 方法。
- *Object.isFrozen*：检查一个对象是否使用了 *Object.freeze* 方法。



**示例**

下面代码分别使用 *Object.preventExtensions、Object.seal* 和 *Object.freeze* 函数控制对象的状态，然后再使用 *Object.isExtensible、Object.isSealed* 和 *Object.isFrozen* 函数检测对象的状态。

```js
var obj1 = {};
console.log(Object.isExtensible(obj1));  //true
Object.preventExtensions(obj1);
console.log(Object.isExtensible(obj1));  //false
var obj2 = {};
console.log(Object.isSealed(obj2));  //true
Object.seal(obj2);
console.log(Object.isSealed(obj2));  //false
var obj3 = {};
console.log(Object.isFrozen(obj3));  //true
Object.freeze(obj3);
console.log(Object.isFrozen(obj3));  //false
```



## 真题解答



- *JavaScript* 中对象的属性描述符有哪些？分别有什么作用？

> 参考答案：
>
> 属性描述符一共有 *6* 个，可以选择使用。
>
> - *value*：设置属性值，默认值为 *undefined*。
> - *writable*：设置属性值是否可写，默认值为 *true*。
> - *enumerable*：设置属性是否可枚举，即是否允许使用 *for/in* 语句或 *Object.keys( )* 函数遍历访问，默认为 *true*。
> - *configurable*：设置是否可设置属性特性，默认为 *true*。如果为 *false*，将无法删除该属性，不能够修改属性值，也不能修改属性的属性描述符。
> - *get*：取值函数，默认为 *undefined*。
> - *set*：存值函数，默认为 *undefined*。
>
> 使用属性描述符的时候，*get* 和 *set* 以及 *value* 和 *writable* 这两组是互斥的，设置了 *get* 和 *set* 就不能设置 *value* 和 *writable*，反之设置了 *value* 和 *writable* 也就不可以设置 *get* 和 *set*。



-*EOF*-


# *class* 和构造函数区别



## 经典真题



- 根据下面 *ES6* 构造函数的书写方式，要求写出 *ES5* 的

```js
class Example { 
  constructor(name) { 
    this.name = name;
  }
  init() { 
    const fun = () => { console.log(this.name) }
    fun(); 
  } 
}
const e = new Example('Hello');
e.init();
```



## 回顾 *class* 的写法



上面的这道面试题，典型的就是考察 *ES6* 中新增的 *class* 和以前构造函数上面的区别是什么，以及如果通过 *ES5* 去模拟的话，具体如何实现。



那么在此之前，我们就先来回顾一下 *ES6* 中的 *class* 写法。



代码如下：

```js
class Computer {
    // 构造器
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // 原型方法
    showSth() {
        console.log(`这是一台${this.name}电脑`);
    }
    // 静态方法
    static comStruct() {
        console.log("电脑由显示器，主机，键鼠组成");
    }
}
```



上面的代码非常的简单，我们定义了一个名为 *Computer* 的类，该类存在 *name、price* 这两个实例属性，一个 *showSth* 的原型方法以及一个 *comStruct* 的静态方法。



我们可以简单的实例化一个对象出来，例如：

```js
var apple = new Computer("苹果", 15000);
console.log(apple.name); // 苹果
console.log(apple.price); // 15000
apple.showSth(); // 这是一台苹果电脑
Computer.comStruct(); // 电脑由显示器，主机，键鼠组成
```

在上面的代码中，我们从 *Computer* 类中实例化出来了一个 *apple* 的实例对象，然后简单访问了该对象的属性和方法。



## 回顾构造函数的写法



那么，在 *ES6* 出现之前，我们是如何实现类似于其他语言中的“类”的呢？

没错，我们是通过的构造函数，然后将方法挂在原型上面。例如：

```js
function Computer(name, price){
    this.name = name;
    this.price = price;
}
Computer.prototype.showSth = function(){
    console.log(`这是一台${this.name}电脑`);
}
Computer.comStruct = function(){
    console.log("电脑由显示器，主机，键鼠组成");
}

var apple = new Computer("苹果", 15000);
console.log(apple.name); // 苹果
console.log(apple.price); // 15000
apple.showSth(); // 这是一台苹果电脑
Computer.comStruct(); // 电脑由显示器，主机，键鼠组成
```

上面的代码就是我们经常在 *ES5* 中所书写的代码，通过构造函数来模拟类，实例方法挂在原型上面，静态方法就挂在构造函数上。

仿佛 *ES6* 的 *class* 写法就是上面构造函数写法的一种语法糖，但是事实真的如此么？



## *class* 和构造函数区别上的细则



接下来我们来详细比较一下两种写法在细节上面的一些差异。

首先我们书写两个“类”，一个用 *ES5* 的构造函数书写，一个用 *ES6* 的类的写法来书写，如下：

```js
class Computer1 {
    // 构造器
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // 原型方法
    showSth() {
        console.log(`这是一台${this.name}电脑`);
    }
    // 静态方法
    static comStruct() {
        console.log("电脑由显示器，主机，键鼠组成");
    }
}

function Computer2(name, price){
    this.name = name;
    this.price = price;
}
Computer2.prototype.showSth = function(){
    console.log(`这是一台${this.name}电脑`);
}
Computer2.comStruct = function(){
    console.log("电脑由显示器，主机，键鼠组成");
}
```



我们知道，构造函数也是函数，既然是函数，那么就可以通过函数调用的形式来调用该函数，例如：

```js
var i = Computer2();
console.log(i); // undefined
```

运行上面的代码，代码不会报错，因为没有使用 *new* 的方式来调用，所以不会生成一个对象，返回值就为 *undefined*。



但是如果我们这样来调用 *ES6* 书写的类，会直接报错：

```js
Computer1();
// TypeError: Class constructor Computer1 cannot be invoked without 'new'
```

可以看到，*ES6* 所书写的 *class* ，虽然我们认为背后就是构造函数实现的，但是明显是做了特殊处理的，必须通过 *new* 关键字来调用。



接下来，我们来针对两种写法，各自实例化一个对象，代码如下：

```js
var apple = new Computer2("苹果", 15000);
for(var i in apple){
    console.log(i); 
}
console.log('-------');
var huawei = new Computer1("华为", 12000);
for(var i in huawei){
    console.log(i); 
}
```

在上面的代码中， *apple* 对象是 *ES5* 构造函数的形式创建的实例，*huawei* 是 *ES6* 类的形式创建的实例。有了这两个对象后，我们遍历这两个对象的键，结果如下：

```js
name
price
showSth
-------
name
price
```

可以看到，*ES6* 中的原型方法是不可被枚举的，说明 *ES6* 对此也是做了特殊处理的。



另外，*ES6* 的 *class* 中的所有代码均处于严格模式之下，这里我们也可以进行一个简单的验证。例如，对两种方式的 *showSth* 原型方法稍作修改，如下：

```js
class Computer1 {
    ...
    // 原型方法
    showSth(i,i) {
        console.log(`这是一台${this.name}电脑`);
    }
   	...
}
function Computer2(name, price){
   ...
}
Computer2.prototype.showSth = function(j,j){
    i = 10;
    console.log(`这是一台${this.name}电脑`);
}
...
```

在上面的代码中，我们为各自的 *showSth* 方法添加了重复的形式参数。我们知道，在严格模式中方法书写重复形参是不被允许的。

所以在运行代码时，*ES6* 的 *class* 声明方式会报错，错误信息如下：

```js
// SyntaxError: Duplicate parameter name not allowed in this context
```



还有就是，如果是 *ES6* 形式所声明的类，原型上的方法是不允许通过 *new* 来调用的。

这里我们也可以做一个简单的测试，如下：

```js
function Computer2(name, price){
    this.name = name;
    this.price = price;
}
Computer2.prototype.showSth = function(){
    i = 10;
    console.log(`这是一台${this.name}电脑`);
}
Computer2.comStruct = function(){
    console.log("电脑由显示器，主机，键鼠组成");
}

var apple = new Computer2("苹果", 15000);
var i = new apple.showSth(); // 这是一台undefined电脑
console.log(i); // {}
```

在上面的代码中，我们首先实例化了一个 *apple* 对象，在该对象的原型上面拥有一个 *showSth* 的实例方法，然后我们对其进行了 *new* 操作，可以看到返回了一个对象。



但是如果是 *ES6* 形式所声明的类，上面的做法将不被允许。示例如下：

```js
class Computer1 {
    // 构造器
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // 原型方法
    showSth() {
        console.log(`这是一台${this.name}电脑`);
    }
    // 静态方法
    static comStruct() {
        console.log("电脑由显示器，主机，键鼠组成");
    }
}
var huawei = new Computer1("华为", 12000);
var i = new huawei.showSth(); // TypeError: huawei.showSth is not a constructor
console.log(i);
```

在上面的代码中，我们企图对 *Computer1* 实例对象 *huawei* 的原型方法 *showSth* 进行 *new* 操作，可以看到，这里报出了 *TypeError*。



## *Babel* 中具体的实现



通过上面的各种例子，我们可以知道 *ES6* 中的 *class* 实现并不是我们单纯所想象的就是之前 *ES5* 写构造函数的写法，虽然本质上是构造函数，但是内部是做了各种处理的。



这里，我们就来使用 *Babel* 对下面的代码进行转义，转义之前的代码如下：

```js
class Computer {
    // 构造器
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // 原型方法
    showSth() {
        console.log(`这是一台${this.name}电脑`);
    }
    // 静态方法
    static comStruct() {
        console.log("电脑由显示器，主机，键鼠组成");
    }
}
```

转义后的代码如下：

```js
"use strict";
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Computer = /*#__PURE__*/function () {
    // 构造器
    function Computer(name, price) {
        _classCallCheck(this, Computer);

        this.name = name;
        this.price = price;
    } // 原型方法


    _createClass(Computer, [{
        key: "showSth",
        value: function showSth() {
            console.log("\u8FD9\u662F\u4E00\u53F0".concat(this.name, "\u7535\u8111"));
        } // 静态方法

    }], [{
        key: "comStruct",
        value: function comStruct() {
            console.log("电脑由显示器，主机，键鼠组成");
        }
    }]);

    return Computer;
}();
var apple = new Computer("苹果", 15000);
console.log(apple.name); // 苹果
console.log(apple.price); // 15000
apple.showSth(); // 这是一台苹果电脑
Computer.comStruct(); // 电脑由显示器，主机，键鼠组成
```

可以看到，果然没有我们想象的那么简单，接下来我们就来一点一点剖析转义的结果。

首先整体来讲分为下面几块：

```js
"use strict";
function _classCallCheck(instance, Constructor) { ... }

function _defineProperties(target, props) { ... }

function _createClass(Constructor, protoProps, staticProps) { ... }

var Computer = /*#__PURE__*/function () { ... }();
```

我们一块一块的来看。

```js
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
```

第一个方法叫做 *classCallCheck*，从名字上面我们也可以看出，这个方法是核对构造方法的调用形式的，接收两个参数，一个是实例对象，另一个是构造函数，通过 *instanceof* 来看参数 *instance* 是否是 *Constructor* 的实例，如果不是就抛出错误。



接下来是 *_defineProperties* 方法，我们对此方法稍作了修改，打印 *target* 和 *props* 的值

```js
function _defineProperties(target, props) {
    console.log("target:::",target);
    console.log("props:::",props);
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
```

结果如下：

```js
target::: {}
props::: [ { key: 'showSth', value: [Function: showSth] } ]
target::: [Function: Computer]
props::: [ { key: 'comStruct', value: [Function: comStruct] } ]
```

可以看出，该方法就是设置对象方法的属性描述符，包含是否可遍历呀，是否可写呀等信息，设置完成后将方法挂在 *target* 对象上面。



下一个是 *_createClass* 函数，我们仍然将三个参数打印出来

```js
function _createClass(Constructor, protoProps, staticProps) {
    console.log("Constructor::",Constructor);
    console.log("protoProps::",protoProps);
    console.log("staticProps::",staticProps);
    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor;
}
```

结果如下：

```js
Constructor:: [Function: Computer]
protoProps:: [ { key: 'showSth', value: [Function: showSth] } ]
staticProps:: [ { key: 'comStruct', value: [Function: comStruct] } ]
```

可以看出，接收的三个参数一次为构造函数、原型上的方法，静态方法。接下来在该方法里面所做的事情也就非常清晰了。



最后就是我们的构造函数了：

```js
var Computer = /*#__PURE__*/function () {
    // 构造器
    function Computer(name, price) {
        // 进行调用确认
        _classCallCheck(this, Computer);
				// 添加实例属性
        this.name = name;
        this.price = price;
    } // 原型方法

		// 将实例方法和静态方法添加到构造函数上面
    _createClass(Computer, [{
        key: "showSth",
        value: function showSth() {
            console.log("\u8FD9\u662F\u4E00\u53F0".concat(this.name, "\u7535\u8111"));
        } // 静态方法

    }], [{
        key: "comStruct",
        value: function comStruct() {
            console.log("电脑由显示器，主机，键鼠组成");
        }
    }]);

    return Computer;
}();
```

明白了 *_createClass* 方法的作用后，该方法的代码也就非常的清晰了。



## 真题解答



- 根据下面 *ES6* 构造函数的书写方式，要求写出 *ES5* 的

```js
class Example { 
  constructor(name) { 
    this.name = name;
  }
  init() { 
    const fun = () => { console.log(this.name) }
    fun(); 
  } 
}
const e = new Example('Hello');
e.init();
```

> 参考答案：
>
> ```js
> "use strict";
> 
> function _classCallCheck(instance, Constructor) {
>        if (!(instance instanceof Constructor)) {
>            throw new TypeError("Cannot call a class as a function");
>        }
> }
> 
> function _defineProperties(target, props) {
>        for (var i = 0; i < props.length; i++) {
>            var descriptor = props[i];
>            descriptor.enumerable = descriptor.enumerable || false;
>            descriptor.configurable = true;
>            if ("value" in descriptor)
>                descriptor.writable = true;
>            Object.defineProperty(target, descriptor.key, descriptor);
>        }
> }
> 
> function _createClass(Constructor, protoProps, staticProps) {
>        if (protoProps)
>            _defineProperties(Constructor.prototype, protoProps);
>        if (staticProps)
>            _defineProperties(Constructor, staticProps);
>        return Constructor;
> }
> 
> var Example = /*#__PURE__*/function () {
>       function Example(name) {
>            _classCallCheck(this, Example);
> 
>            this.name = name;
>       }
> 
>       _createClass(Example, [{
>            key: "init",
>            value: function init() {
>                var _this = this;
> 
>                var fun = function fun() {
>                    console.log(_this.name);
>                };
> 
>                fun();
>            }
>       }]);
> 
>       return Example;
> }();
> 
> var e = new Example('Hello');
> e.init();
> ```
>
> 这里可以解释出 *_classCallCheck、_defineProperties、_createClass* 这几个方法各自的作用是什么。



-*EOF*-

# 浮点数精度问题



## 经典真题



- 为什么 *console.log(0.2+0.1==0.3)*  得到的值为 *false* 



## 浮点数精度常见问题



在 *JavaScript* 中整数和浮点数都属于 *number* 数据类型，所有数字都是以 *64* 位浮点数形式储存，即便整数也是如此。 所以我们在打印 *1.00* 这样的浮点数的结果是 *1* 而非 *1.00* 。

在一些特殊的数值表示中，例如金额，这样看上去有点别扭，但是至少值是正确了。

然而要命的是，当浮点数做数学运算的时候，你经常会发现一些问题，举几个例子：

**场景一**：进行浮点值运算结果的判断

```js
// 加法 
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.7 + 0.1); // 0.7999999999999999
console.log(0.2 + 0.4); // 0.6000000000000001
console.log(2.22 + 0.1); // 2.3200000000000003
 
// 减法
console.log(1.5 - 1.2); // 0.30000000000000004
console.log(0.3 - 0.2); // 0.09999999999999998
 
// 乘法 
console.log(19.9 * 100); // 1989.9999999999998
console.log(19.9 * 10 * 10); // 1990
console.log(9.7 * 100); // 969.9999999999999
console.log(39.7 * 100); // 3970.0000000000005
 
// 除法 
console.log(0.3 / 0.1); // 2.9999999999999996
console.log(0.69 / 10); // 0.06899999999999999
```



**场景二**：将小数乘以 *10* 的 *n* 次方取整

比如将钱币的单位，从元转化成分，经常写出来的是 *parseInt(yuan\*100, 10)*

```js
console.log(parseInt(0.58 * 100, 10)); // 57
```



**场景三**：四舍五入保留 *n* 位小数

例如我们会写出  *(number).toFixed(2)*，但是看下面的例子：

```js
console.log((1.335).toFixed(2)); // 1.33
```

在上面的例子中，我们得出的结果是 *1.33*，而不是预期结果 *1.34*。



## 为什么会有这样的问题



似乎是不可思议。小学生都会算的题目，*JavaScript* 不会？

我们来看看其真正的原因，到底为什么会产生精度丢失的问题呢？



计算机底层只有 *0* 和 *1*， 所以所有的运算最后实际上都是二进制运算。

十进制整数利用辗转相除的方法可以准确地转换为二进制数，但浮点数呢？



<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fc493d0e2e84274b8445d8c5df405ae~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom:50%;" />



 *JavaScript* 里的数字是采用 *IEEE 754* 标准的 *64* 位双精度浮点数。

先看下面一张图：

![preview](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-29-060439.png)

该规范定义了浮点数的格式，对于 *64* 位的浮点数在内存中的表示，最高的 *1* 位是符号位，接着的 *11* 位是指数，剩下的 *52* 位为有效数字，具体如下：

- 符号位 *S*：第 *1* 位是正负数符号位（*sign*），*0* 代表正数，*1* 代表负数
- 指数位 *E*：中间的 *11* 位存储指数（*exponent*），用来表示次方数
- 尾数位 *M*：最后的 *52* 位是尾数（*mantissa*），储存小数部分，超出的部分自动进一舍零

也就是说，浮点数最终在运算的时候实际上是一个符合该标准的二进制数

符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。

*IEEE 754* 规定，有效数字第一位默认总是 *1*，不保存在 *64* 位浮点数之中。也就是说，有效数字总是 *1.xx…xx* 的形式，其中 *xx…xx* 的部分保存在 *64* 位浮点数之中，最长可能为 *52* 位。因此，*JavaScript* 提供的有效数字最长为 *53* 个二进制位（*64* 位浮点的后 *52* 位 + 有效数字第一位的 *1*）。

既然限定位数，必然有截断的可能。



我们可以看一个例子：

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

为了验证该例子，我们得先知道怎么将浮点数转换为二进制，整数我们可以用除 *2* 取余的方式，小数我们则可以用乘 *2* 取整的方式。



*0.1* 转换为二进制：

*0.1 \* 2*，值为 *0.2*，小数部分 *0.2*，整数部分 *0*

*0.2 \* 2*，值为 *0.4*，小数部分 *0.4*，整数部分 *0*

*0.4 \* 2*，值为0.8，小数部分0.8，整数部分0

*0.8 \* 2*，值为 *1.6*，小数部分 *0.6*，整数部分 *1*

*0.6 \* 2*，值为 *1.2*，小数部分 *0.2*，整数部分 *1*

*0.2 \* 2*，值为 *0.4*，小数部分 *0.4*，整数部分 *0*

从 *0.2* 开始循环



*0.2*  转换为二进制可以直接参考上述，肯定最后也是一个循环的情况



所以最终我们能得到两个循环的二进制数：

*0.1：0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1100 ...*

*0.2：0.0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 ...*

这两个的和的二进制就是：

*sum：0.0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 ...*

最终我们只能得到和的近似值（按照 *IEEE 754* 标准保留 *52* 位，按 *0* 舍 *1* 入来取值），然后转换为十进制数变成：

sum ≈ 0.30000000000000004



再例如：

```js
console.log((1.335).toFixed(2)); // 1.33
```

因为 *1.335* 其实是 *1.33499999999999996447286321199*，*toFixed* 虽然是四舍五入，但是是对 *1.33499999999999996447286321199* 进行四五入，所以得出 *1.33*。



在 *Javascript* 中，整数精度同样存在问题，先来看看问题：

```js
console.log(19571992547450991); // 19571992547450990
console.log(19571992547450991===19571992547450992); // true
```



同样的原因，在 *JavaScript* 中  *number* 类型统一按浮点数处理，整数是按最大 *54* 位来算，

- 最大( *2<sup>53</sup> - 1*，*Number.MAX_SAFE_INTEGER*、*9007199254740991*) 
- 最小( *-(2<sup>53</sup> - 1)*，*Number.MIN_SAFE_INTEGER*、*-9007199254740991*) 

所以只要超过这个范围，就会存在被舍去的精度问题。



当然这个问题并不只是在 *Javascript* 中才会出现，几乎所有的编程语言都采用了 *IEEE-754* 浮点数表示法，任何使用二进制浮点数的编程语言都会有这个问题。

只不过在很多其他语言中已经封装好了方法来避免精度的问题，而 *JavaScript* 是一门弱类型的语言，从设计思想上就没有对浮点数有个严格的数据类型，所以精度误差的问题就显得格外突出。



通常这种对精度要求高的计算都应该交给后端去计算和存储，因为后端有成熟的库来解决这种计算问题。

前端也有几个不错的类库：



***Math.js***

*Math.js* 是专门为 *JavaScript* 和 *Node.js* 提供的一个广泛的数学库。它具有灵活的表达式解析器，支持符号计算，配有大量内置函数和常量，并提供集成解决方案来处理不同的数据类型。

像数字，大数字（超出安全数的数字），复数，分数，单位和矩阵。 功能强大，易于使用。



***decimal.js***

为 *JavaScript* 提供十进制类型的任意精度数值。



***big.js***

不仅能够支持处理 *Long* 类型的数据，也能够准确的处理小数的运算。



## 真题解答



- 为什么 *console.log(0.2+0.1==0.3)*  得到的值为 *false* 

> 参考答案：
>
> 因为浮点数的计算存在 *round-off*  问题，也就是浮点数不能够进行精确的计算。并且：
>
> - 不仅 *JavaScript*，所有遵循 *IEEE 754* 规范的语言都是如此；
> - 在 *JavaScript* 中，所有的 *Number* 都是以 *64-bit* 的双精度浮点数存储的；
> - 双精度的浮点数在这 *64* 位上划分为 *3* 段，而这 *3* 段也就确定了一个浮点数的值，*64bit* 的划分是“*1-11-52*”的模式，具体来说：
>   - 就是 *1* 位最高位（最左边那一位）表示符号位，*0* 表示正，*1* 表示负；
>   - *11* 位表示指数部分；
>   - *52* 位表示尾数部分，也就是有效域部分



-*EOF*-

# 严格模式



## 经典真题



- *use strict* 是什么意思 ? 使用它区别是什么？



## 什么是严格模式



严格模式是从 *ES5* 开始新增的一种方式，是采用具有限制性 *JavaScript* 变体的一种方式，从而使代码隐式地脱离“马虎模式/稀松模式/懒散模式“（*sloppy*）模式。



设立"严格模式"的目的，主要有以下几个：



- 消除 *Javascript* 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 *Javascript* 做好铺垫。



“严格模式”体现了 *Javascript* 更合理、更安全、更严谨的发展方向，支持严格模式的浏览器有：*Internet Explorer 10 +、 Firefox 4+ Chrome 13+、 Safari 5.1+、 Opera 12+*。



在“严格模式下”，同样的代码，可能会有不一样的运行结果。一些在“正常模式”下可以运行的语句，在“严格模式”下将不能运行。



掌握这些内容，有助于更细致深入地理解 *Javascript*，让你变成一个更好的程序员。



## 开启严格模式



进入“严格模式”的标志，是下面这行语句：

```js
"use strict";
```

老版本的浏览器会把它当作一行普通字符串，加以忽略。



“严格模式”有两种调用方法，适用于不同的场合。



**针对整个脚本文件**

将 *“use strict”* 放在脚本文件的第一行，则整个脚本都将以“严格模式”运行。

如果这行语句不在第一行，则无效，整个脚本以“正常模式”运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意。

```js
"use strict";
console.log("这是严格模式。");
```

在上面的代码中，我们第一行书写了 *“use strict”*，所以整个代码会进入到严格模式执行。



```html
<script>
  "use strict";
  console.log("这是严格模式。");
</script>

<script>
  console.log("这是正常模式。");
</script>
```

上面的代码表示，一个网页中依次有两段 *Javascript* 代码。前一个 *script* 标签是严格模式，后一个不是。



**针对单个函数**

将 *“use strict”* 放在函数体的第一行，则整个函数以“严格模式”运行。

```js
function strict(){
  "use strict";
  return "这是严格模式。";
}

function notStrict() {
  return "这是正常模式。";
}
```



**脚本文件的变通写法**

因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中。

```js
(function (){
  "use strict";
  // some code here
})();
```



## 严格模式和普通模式区别



接下来，我们就来看一下严格模式下对 *Javascript* 的语法和行为，都做了哪些改变。



**没有使用 *var* 声明的变量不能使用**

在普通模式下，我们可以使用一个未声明的变量，此时该变量会成为一个全局变量。但是这种使用方式在严格模式下会报错。

```js
"use strict"
a=10; // ReferenceError: a is not defined
console.log(a)
function sum(){
	var a=10;
	console.log(a)
}
sum()
```



**删除变量和不存在的属性会报错**

在普通模式下，删除变量或者不允许删除的属性虽然也会失败，但是是“静默失败”，也就是说虽然失败了，但是不会给出任何提示。这样其实会产生很多隐藏问题，也给程序员的调错带来了难度。

在严格模式下则会保存，例如：

```js
"use strict"
var i = 10;
delete i; // SyntaxError: Delete of an unqualified identifier in strict mode.
console.log(i); // 10
```



**函数中相同的形参名会报错**

在普通模式下，函数中两个形参名相同也不会报错，只不过后面的形参所接收到的值会覆盖前面的同名形参。

```js
function a(b,b){
    console.log(b); // 2
}
a(1, 2)   
```

但是在严格模式下，相同的形参名会报错。

```js
"use strict"
// SyntaxError: Duplicate parameter name not allowed in this context
function a(b,b){
    console.log(b);
}
a(1, 2)   
```



**对象不能有重名的属性**

正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。

```js
"use strict";
var o = {
  p: 1,
  p: 2
}; // 语法错误
```



**禁止八进制表示法**

正常模式下，整数的第一位如果是 *0*，表示这是八进制数，比如 *010* 等于十进制的 *8*。

```js
var i = 010;
console.log(i); // 8
```

严格模式禁止这种表示法，整数第一位为 *0*，将报错。

```js
"use strict"
var i = 010; // SyntaxError: Octal literals are not allowed in strict mode.
console.log(i);
```



**函数内部 *this* 值为 *undefined***

在普通模式下，函数中的 *this* 在以函数的形式被调用时，指向全局对象。而在严格模式中，得到的值为 *undefined*。

```js
"use strict"
function a(){
    console.log(this); // undefined
}
a();
```



**创设 *eval* 作用域**

正常模式下，*Javascript* 语言有两种变量作用域（*scope*）：全局作用域和函数作用域。

严格模式创设了第三种作用域：*eval* 作用域。

正常模式下，*eval* 语句的作用域，取决于它处于全局作用域，还是处于函数作用域。

严格模式下，*eval* 语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于 *eval* 内部。

```js
"use strict";
var x = 2;
console.info(eval("var x = 5; x")); // 5
console.info(x); // 2
```



**保留字**

为了向将来 *Javascript* 的新版本过渡，严格模式新增了一些保留字：*implements, interface, let, package, private, protected, public, static, yield*。使用这些词作为变量名将会报错。

```js
"use strict";
var public = "hello world" // SyntaxError: Unexpected strict mode reserved word
console.log(public);
```



更多关于严格模式的内容，可以参阅 ：

*MDN*：*https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode*

《*Javascript* 严格模式详解 *By* 阮一峰》：*http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html*



## 真题解答



- *use strict* 是什么意思 ? 使用它区别是什么？

> 参考答案：
>
> *use strict* 代表开启严格模式，这种模式使得 *Javascript* 在更严格的条件下运行，实行更严格解析和错误处理。
>
> 开启“严格模式”的优点：
>
> - 消除 *Javascript* 语法的一些不合理、不严谨之处，减少一些怪异行为;
> - 消除代码运行的一些不安全之处，保证代码运行的安全；
> - 提高编译器效率，增加运行速度；
> - 为未来新版本的 *Javascript* 做好铺垫。
>
> 回答一些具体的严格模式下和普通模式之间的区别。



-*EOF*-


# 函数防抖和节流



## 经典真题



- 防抖，节流是什么，如何实现 （字节）



## 什么是函数防抖和节流



*JavaScript* 中的函数大多数情况下都是由用户主动调用触发的，除非是函数本身的实现不合理，否则一般不会遇到跟性能相关的问题。

但是在一些少数情况下，函数的触发不是由用户直接控制的。在这些场景下，函数有可能被非常频繁地调用，而造成大的性能问题。解决性能问题的处理办法就有**函数防抖**和**函数节流**。

下面是函数被频繁调用的常见的几个场景：



- *mousemove* 事件：如果要实现一个拖拽功能，需要一路监听 *mousemove* 事件，在回调中获取元素当前位置，然后重置 *DOM* 的位置来进行样式改变。如果不加以控制，每移动一定像素而触发的回调数量非常惊人，回调中又伴随着 DOM 操作，继而引发浏览器的重排与重绘，性能差的浏览器可能就会直接假死。



- *window.onresize* 事件：为 *window* 对象绑定了 *resize* 事件，当浏览器窗口大小被拖动而改变的时候，这个事件触发的频率非常之高。如果在 *window.onresize* 事件函数里有一些跟 *DOM* 节点相关的操作，而跟 *DOM* 节点相关的操作往往是非常消耗性能的，这时候浏览器可能就会吃不消而造成卡顿现象。



- 射击游戏的 *mousedown/keydown* 事件（单位时间只能发射一颗子弹）

  

- 搜索联想（*keyup* 事件）



- 监听滚动事件判断是否到页面底部自动加载更多（*scroll* 事件）



对于这些情况的解决方案就是函数防抖（*debounce*）或函数节流（*throttle*），**其核心就是限制某一个方法的频繁触发**。



## 函数防抖



我们首先来看函数防抖。**函数防抖，是指防止函数在极短的时间内反复调用，造成资源的浪费**。

考虑一下电梯关门的场景，现代的大部分电梯都可以通过红外，感知到是否有人进入，为了避免夹到人，同时为了等待后面的人，电梯关门的时间往往有这么一种规则：**始终保证电梯门在最后一个人进入后 *3* 秒后关闭。**如果有人进入后，还没有等到 *3* 秒又有人进来了，电梯门会以最后一次进入的时间为计时起点，重新等待3秒。

再考虑一个页面上的场景，页面上的某些事件触发频率非常高，比如滚动条滚动、窗口尺寸变化、鼠标移动等，如果我们需要注册这类事件，不得不考虑效率问题，又特别是事件处理中涉及到了大量的操作，比如：

```js
window.onresize = function(){
    // 大量的 DOM 操作
}
```

当窗口尺寸发生变化时，哪怕只变化了一点点，都有可能造成成百上千次对处理函数的调用，这对网页性能的影响是极其巨大的。

于是，我们可以考虑，每次窗口尺寸变化、滚动条滚动、鼠标移动时，不要立即执行相关操作，而是等一段时间，以窗口尺寸停止变化、滚动条不再滚动、鼠标不再移动为计时起点，一段时间后再去执行操作，就像电梯关门那样。

再考虑一个搜索的场景（例如百度），当我在一个文本框中输入文字（键盘按下事件）时，需要将文字发送到服务器，并从服务器得到搜索结果，这样的话，用户直接输入搜索文字就可以了，不用再去点搜索按钮，可以提升用户体验，类似于下面的效果：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-01-014859.gif" alt="5be978627ac99" style="zoom: 67%;" />



上面的效果，我没有点击搜索按钮，也没有按回车键，只是写了一些搜索的文字而已。

可是如何来实现上面的场景呢？

如果文本框的文字每次被改变（键盘按下事件），我都要把数据发送到服务器，得到搜索结果，这是非常恐怖的！

想想看，我搜索 *“google”* 这样的单词，至少需要按 *6* 次按键，就这一个词，我需要向服务器请求 *6* 次，并让服务器去搜索 *6* 次，但我只需要最后一次的结果就可以了。如果考虑用户按错的情况，发送请求的次数更加恐怖。这样就造成了大量的带宽被占用，浪费了很多资源。



如何避免这样的问题呢？



仔细观察，你会发现，真正的搜索行为，并不是每次按键都会触发的，只有当用户停止按键一段事件后才会触发。

于是，为了满足这种类型场景，我们可以开发一个通用的函数，这个函数要满足以下功能：

1. 调用该函数后，不立即做事，而是一段时间后去做事
2. 如果在等待时间内调用了该函数，重新计时



这样的功能，就叫做函数防抖，其实就是防止函数短时间内被调用多次。

要完成该函数，需要给予两个条件：

1. 告诉我一段时间后要做什么事（这里应该是一个回调函数，即函数作为参数）
2. 告诉我要等待多长时间（毫秒）



下面我们就来封装这么一个函数防抖的通用函数：

```js
/**
 * 函数防抖
 * @param {function} func 一段时间后，要调用的函数
 * @param {number} wait 等待的时间，单位毫秒
 */
function debounce(func, wait) {
    // 设置变量，记录 setTimeout 得到的 id
    var timerId = null;
    return function (...args) {
        if (timerId) {
            // 如果有值，说明目前正在等待中，清除它
            clearTimeout(timerId);
        }
        // 重新开始计时
        timerId = setTimeout(() => {
            func(...args);
        }, wait);
    }
}
```



下面来进行一个测试，测试如下：

```html
<input type="text" id="txt">
```

```js
var txt = document.getElementById("txt");
// 调用 debounce 函数来将事件处理函数变为一个防抖函数
var debounceHandle = debounce(function(event){
  console.log(event.target.value);
}, 500)
txt.onkeyup = (event)=>{
  debounceHandle(event);
}
```



效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-01-020722.gif" alt="2021-10-01 10.06.44" style="zoom:50%;" />



## 函数节流



函数节流的目的，也是为了防止一个函数短时间内被频繁的触发。

和函数防抖的原理不同，函数节流的核心思想是让连续的函数执行，变为固定时间段间断地执行。

这里做一个形象的的比喻：

前面我们所介绍的函数防抖，是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

而这里我们要介绍的函数节流，指一定时间内函数只执行一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。



关于节流的实现，有 *2* 种主流的实现方式，一种是**使用时间戳**，一种是**设置定时器**。



**（1）使用时间戳**

触发事件时，取出当前的时间戳，然后减去之前的时间戳（最一开始值设为 *0*），如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

下面是封装使用时间戳的函数节流的通用函数：

```js
/**
 * 
 * @param {要进行节流的函数} func 
 * @param {间隔时间} wait 
 * @returns 
 */
function throttle(func, wait) {
    var args; // 存储函数参数
    var previous = 0; // 一开始的默认时间
    return function () {
        var now = new Date(); // 获取最新的时间戳
        args = arguments; // 获取参数
        // 进行时间戳的判断，如果超出规定时间，则执行
        if (now - previous > wait) {
            func.apply(null, args);
            previous = now;
        }
    }
}
```

下面来实际使用测试一下：

```html
<input type="text" id="txt">
```

```js
var txt = document.getElementById("txt");
// 调用 throttle 函数来将事件处理函数变为一个节流函数
var throttleHandle = throttle(function (event) {
  console.log(event.target.value);
}, 1000)
txt.onkeyup = (event) => {
  throttleHandle(event);
}
```



效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-01-022740.gif" alt="2021-10-01 10.27.15" style="zoom:50%;" />



**（2）设置定时器**

第二种方式是设置定时器，触发事件时设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。

下面是封装使用定时器的函数节流的通用函数：

```js
/**
 * 
 * @param {要节流执行的函数} func 
 * @param {节流的时间间隔} wait 
 * @returns 
 */
function throttle(func, wait) {
    // timeout 存储计时器返回值
    // args 存储参数
    var timeout, args;
    return function () {
        args = arguments;
        // 如果 timeout 有值，说明上一次的执行间隔时间还没过
        if (!timeout) {
            // 进入此 if 说明时间间隔已经过了
            // 先执行一次要执行的函数
            func.apply(null, args)
            // 然后重新设置时间间隔
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
        }
    }
}
```



## 真题解答



- 防抖，节流是什么，如何实现 （字节）

> 参考答案：
>
> 我们在平时开发的时候，会有很多场景会频繁触发事件，比如说搜索框实时发请求，*onmousemove、resize、onscroll* 等，有些时候，我们并不能或者不想频繁触发事件，这时候就应该用到函数防抖和函数节流。
>
> 函数防抖(*debounce*)，指的是短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。
>
> 具体实现如下：
>
> ```js
> /**
>  * 函数防抖
>  * @param {function} func 一段时间后，要调用的函数
>  * @param {number} wait 等待的时间，单位毫秒
>  */
> function debounce(func, wait) {
>     // 设置变量，记录 setTimeout 得到的 id
>     var timerId = null;
>     return function (...args) {
>         if (timerId) {
>             // 如果有值，说明目前正在等待中，清除它
>             clearTimeout(timerId);
>         }
>         // 重新开始计时
>         timerId = setTimeout(() => {
>             func(...args);
>         }, wait);
>     }
> }
> ```
>
> 函数节流(*throttle*)，指连续触发事件但是在 *n* 秒中只执行一次函数。即 *2n* 秒内执行 *2* 次... 。
>
> 节流如字面意思，会稀释函数的执行频率。
>
> 下面是使用时间戳方式的具体实现：
>
> ```js
> /**
>  * 
>  * @param {要进行节流的函数} func 
>  * @param {间隔时间} wait 
>  * @returns 
>  */
> function throttle(func, wait) {
>     var args; // 存储函数参数
>     var previous = 0; // 一开始的默认时间
>     return function () {
>         var now = new Date(); // 获取最新的时间戳
>         args = arguments; // 获取参数
>         // 进行时间戳的判断，如果超出规定时间，则执行
>         if (now - previous > wait) {
>             func.apply(null, args);
>             previous = now;
>         }
>     }
> }
> ```



-*EOF*-


# *WeakSet* 和 *WeakMap*



## 经典真题



- 是否了解 *WeakMap、WeakSet*（美团 *19* 年）



## 从对象开始说起



首先我们从大家都熟悉的对象开始说起。

对于对象的使用，大家其实是非常熟悉的，所以我们这里仅简单的过一遍。

```js
const algorithm = { site: "leetcode" };
console.log(algorithm.site); // leetcode

for (const key in algorithm) {
  console.log(key, algorithm[key]);
}

// site leetcode
delete algorithm.site;
console.log(algorithm.site); // undefined
```

在上面的代码中，我们有一个 *algorithm* 对象，它的 *key* 和 *value* 是一个字符串类型的值，之后通过点（ . ）进行值的访问。

另外，*for-in* 循环也很适合在对象中循环。可以使用中括号（ [ ] ）访问其键对应的值。但是不能使用 *for-of* 循环，因为对象是不可迭代的。

对象的属性可以用 *delete* 关键字来删除。



好的，我们已经快速讨论了有关对象的一些事项：

- 如何添加属性
- 如何遍历对象
- 如何删除属性



关于对象的讨论暂时就到这儿。



## *Map*



*Map* 是 *JavaScript* 中新的集合对象，其功能类似于对象。但是，与常规对象相比，存在一些主要差异。

首先，让我们看一个创建 *Map* 对象的简单示例。



### 添加属性



首先，通过 *Map* 构造函数，我们可以创建一个 *Map* 实例对象出来，如下：

```js
const map = new Map();
// Map(0) {}
```

*Map* 有一种特殊的方法可在其中添加称为 *set* 的属性。它有两个参数：键是第一个参数，值是第二个参数。

```js
map.set('name', 'john');
// Map(1) {"name" => "john"}
```

但是，它不允许你在其中添加现有数据。如果 *Map* 对象中已经存在与新数据的键对应的值，则不会添加新数据。

```js
map.set('phone', 'iPhone');
// Map(2) {"name" => "john", "phone" => "iPhone"}
map.set('phone', 'iPhone');
// Map(2) {"name" => "john", "phone" => "iPhone"}
```

但是可以用其他值覆盖现有数据。

```js
map.set('phone', 'Galaxy');
// Map(2) {"name" => "john", "phone" => "Galaxy"}
```

二维数组和 *Map* 对象之间可以很方便的相互转换。例如：

```js
var arr = [
    [1, 2],
    [3, 4],
    [5, 6],
];

var map = new Map(arr);
console.log(map); //Map { 1 => 2, 3 => 4, 5 => 6 }
console.log(Array.from(map)); //[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
```



### 获取属性和长度



可以通过 *get* 方法或者 *Map* 对象某一条属性的值：

```js
const map = new Map();
map.set('name', 'john');
map.set('phone', 'iPhone');
console.log(map.get('phone')); // iPhone
```



可以通过 *has* 方法来查询是否具有某一条属性：

```js
const map = new Map();
map.set('name', 'john');
map.set('phone', 'iPhone');
console.log(map.has('phone')); // true
```



可以通过 *size* 属性获取 *Map* 对象的长度：

```js
const map = new Map();
map.set('name', 'john');
map.set('phone', 'iPhone');
console.log(map.size); // 2
```



### 遍历 *Map* 对象



*Map* 是一个可迭代的对象，这意味着可以使用 *for-of* 语句将其映射。

*Map* 以数组形式提供数据，要获取键或值则需要解构数组或以索引的方式来进行访问。

```js
for (const item of map) {
  console.dir(item);
}
// Array(2) ["name", "john"]
// Array(2) ["phone", "Galaxy"]
```



要仅获取键或值，还有一些方法可供使用。

```js
map.keys();
// MapIterator {"name", "phone"}
map.values();
// MapIterator {"john", "Galaxy"}
map.entries();
// MapIterator {"name" => "john", "phone" => "Galaxy"}
```



也可以使用 *forEach* 方法，例如：

```js
const map = new Map();
map.set('name', 'john');
map.set('phone', 'iPhone');
map.forEach(item=>{
    console.log(item);
})
// john
// iPhone
```



可以使用展开操作符(  ...  )来获取 *Map* 的全部数据，因为展开操作符还可以在幕后与可迭代对象一起工作。

```js
const simpleSpreadedMap = [...map];
// [Array(2), Array(2)]
```



### 删除属性



从 *Map* 对象中删除数据也很容易，你所需要做的就是调用 *delete*。

```js
map.delete('phone');
// true
map.delete('fake');
// false
```

*delete* 返回布尔值，该布尔值指示 *delete* 函数是否成功删除了数据。如果是，则返回 *true*，否则返回 *false*。



如果要清空整个 *Map* 对象，可以使用 *clear* 方法，如下：

```js
const map = new Map();
map.set('name', 'john');
map.set('phone', 'iPhone');
console.log(map); // Map(2) { 'name' => 'john', 'phone' => 'iPhone' }
map.clear();
console.log(map); // Map(0) {}
```



### *Map* 和 *Object* 的区别



关于 *Map* 和 *Object* 的区别，可以参阅下表：

![image-20210930183632548](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-30-103632.png)



## *WeakMap*



*WeakMap* 起源于 *Map*，因此它们彼此非常相似。但是，*WeakMap* 具有很大的不同。

*WeakMap* 的名字是怎么来的呢？

嗯，是因为它与它的引用链接所指向的数据对象的连接或关系没有 *Map* 的连接或关系那么强，所以它是弱的。

那么，这到底是什么意思呢？



**差异 *1*：*key* 必须是对象**

可以将任何值作为键传入 *Map* 对象，但 *WeakMap* 不同，它只接受一个对象作为键，否则，它将返回一个错误。

```js
const John = { name: 'John' };
const weakMap = new WeakMap();
weakMap.set(John, 'student');
// WeakMap {{...} => "student"}
weakMap.set('john', 'student');
// Uncaught TypeError: Invalid value used as weak map key
```



**差异 *2*：并非 *Map* 中的所有方法都支持**

*WeakMap* 可以使用的方法如下：

- *delete*
- *get*
- *has*
- *set*

还有一个最大的不同是 *WeakMap* 不支持迭代对象的方法。



**差异 *3*：当 *GC* 清理引用时，数据会被删除**

这是和 *Map* 相比最大的不同。

例如：

```js
let John = { major: "math" };

const map = new Map();
const weakMap = new WeakMap();

map.set(John, 'John');
weakMap.set(John, 'John');

John = null;
/* John 被垃圾收集 */
```

当 *John* 对象被垃圾回收时，*Map* 对象将保持引用链接，而 *WeakMap* 对象将丢失链接。

所以当你使用 *WeakMap* 时，你应该考虑这个特点。



## *Set*



*Set* 也非常类似于 *Map*，但是 *Set* 对于单个值更有用。



### 添加属性



使用 *add* 方法可以添加属性。

```js
const set = new Set();

set.add(1);
set.add('john');
set.add(BigInt(10));
// Set(4) {1, "john", 10n}
```

与 *Map* 一样，*Set* 也不允许添加相同的值。

```js
set.add(5);
// Set(1) {5}

set.add(5);
// Set(1) {5}
```

对于原始数据类型（*boolean、number、string、null、undefined*），如果储存相同值则只保存一个，对于引用类型,引用地址完全相同则只会存一个。

- *+0* 与 *-0* 在存储判断唯一性的时候是恒等的，所以不可以重复。
- *undefined* 和 *undefined* 是恒等的，所以不可以重复。
- *NaN* 与 *NaN* 是不恒等的，但是在 *Set* 中只能存一个不能重复。



### 遍历对象



由于 *Set* 是一个可迭代的对象，因此可以使用 *for-of* 或 *forEach* 语句。

```js
for (const val of set) {
  console.dir(val);
}
// 1
// 'John'
// 10n
// 5

set.forEach(val => console.dir(val));
// 1
// 'John'
// 10n
// 5
```



### 删除属性



这一部分和 *Map* 的删除完全一样。如果数据被成功删除，它返回 *true*，否则返回 *false*。

当然也可以使用 clear 方法清空 *Set* 集合。

```js
set.delete(5); 
// true
set.delete(function(){});
// false;

set.clear();
```

如果你不想将相同的值添加到数组表单中，则 *Set* 可能会非常有用。

```js
/* With Set */
const set = new Set();
set.add(1);
set.add(2);
set.add(2);
set.add(3);
set.add(3);
// Set {1, 2, 3}

// Converting to Array
const arr = [ ...set ];
// [1, 2, 3]

Object.prototype.toString.call(arr);
// [object Array]

/* Without Set */
const hasSameVal = val => ar.some(v === val);
const ar = [];

if (!hasSameVal(1)) ar.push(1);
if (!hasSameVal(2)) ar.push(2);
if (!hasSameVal(3)) ar.push(3);
```



### 应用场景



接下来来看一下 *Set* 常见的应用场景：

```js
//数组去重
...new Set([1,1,2,2,3])

//并集
var arr1 = [1, 2, 3]
var arr2 = [2, 3, 4]
var newArr = [...new Set([...arr1, ...arr2])]
//交集
var arr1 = [1, 2, 3]
var arr2 = [2, 3, 4]
var set1 = new Set(arr1)
var set2 = new Set(arr2)
var newArr = []
set1.forEach(item => {
    set2.has(item) ? newArr.push(item) : ''
})
console.log(newArr)
//差集
var arr1 = [1, 2, 3]
var arr2 = [2, 3, 4]
var set1 = new Set(arr1)
var set2 = new Set(arr2)
var newArr = []
set1.forEach(item => {
    set2.has(item) ? '' : newArr.push(item)
})
set2.forEach(item => {
    set1.has(item) ? '' : newArr.push(item)
})
console.log(newArr)
```



## *WeakSet*



*WeakSet* 和 *Set* 区别如下：

- *WeakSet* 只能储存对象引用，不能存放值，而 *Set* 对象都可以
- *WeakSet* 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 *WeakSet* 对该对象的引用，如果没有其他的变量或者属性引用这个对象值，则这个对象将会被垃圾回收掉。（不考虑该对象还存在与 *WeakSet* 中），所以 *WeakSet* 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到，被垃圾回收了。因此 *ES6* 规定，*WeakSet* 对象是无法被遍历的，也没有办法拿到它包含的所有元素。



*WeakSet* 能够使用的方法如下：

- *add(value)* 方法：在 *WeakSet* 中添加一个元素。如果添加的元素已存在，则不会进行操作。
- *delete(value)* 方法：删除元素 *value*
- *has(value)* 方法：判断 *WeakSet* 对象中是否包含 *value*
- *clear( )* 方法：清空所有元素



下面来看一下 *WeakSet* 的代码示例，与 *WeakMap* 一样，*WeakSet* 也将丢失对内部数据的访问链接（如果内部数据已被垃圾收集）。

```js
let John = { major: "math" };

const set = new Set();
const weakSet = new WeakSet();

set.add(John);
// Set {{...}}
weakSet.add(John);
// WeakSet {{...}}

John = null;
/* John 被垃圾收集 */
```

一旦对象 *John* 被垃圾回收，*WeakSet* 就无法访问其引用 *John* 的数据。而且 *WeakSet* 不支持 *for-of* 或 *forEach*，因为它不可迭代。



## 比较总结



- *Map*
  - 键名唯一不可重复
  - 类似于集合，键值对的集合，任何值都可以作为一个键或者一个值
  - 可以遍历，可以转换各种数据格式，方法 *get、set、has、delete*
- *WeakMap*
  - 只接受对象为键名，不接受其他类型的值作为键名，键值可以是任意
  - 键名是拖引用，键名所指向的对象，会被垃圾回收机制回收
  - 不能遍历，方法 *get、set、has、delete*

- *Set*
  - 成员唯一，无序且不会重复
  - 类似于数组集合，键值和键名是一致的（只有键值。没有键名）
  - 可以遍历，方法有 *add、delete、has*
- *WeakSet*
  - 只能存储对应引用，不能存放值
  - 成员都是弱引用，会被垃圾回收机制回收
  - 不能遍历，方法有 *add、delete、has*



## 真题解答



- 是否了解 *WeakMap、WeakSet*（美团 *19* 年）

> 参考答案：
>
> *WeakSet* 对象是一些对象值的集合, 并且其中的每个对象值都只能出现一次。在 *WeakSet* 的集合中是唯一的
>
> 它和 *Set* 对象的区别有两点:
>
> - 与 *Set* 相比，*WeakSet* 只能是**对象的集合**，而不能是任何类型的任意值。
> - *WeakSet* 持弱引用：集合中对象的引用为弱引用。 如果没有其他的对 *WeakSet* 中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着 *WeakSet* 中没有存储当前对象的列表。 正因为这样，*WeakSet* 是不可枚举的。
>
> *WeakMap* 对象也是键值对的集合。它的**键必须是对象类型**，值可以是任意类型。它的键被弱保持，也就是说，当其键所指对象没有其他地方引用的时候，它会被 *GC* 回收掉。*WeakMap* 提供的接口与 *Map* 相同。
>
> 与 *Map* 对象不同的是，*WeakMap* 的键是不可枚举的。不提供列出其键的方法。列表是否存在取决于垃圾回收器的状态，是不可预知的。



-*EOF*-

# 深浅拷贝



## 经典真题



- 深拷贝和浅拷贝的区别？如何实现 



## 深拷贝和浅拷贝概念



首先，我们需要明确深拷贝和浅拷贝的概念。



- **浅拷贝**：只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做浅拷贝(浅复制)。浅拷贝只复制指向某个对象的指针（引用地址），而不复制对象本身，新旧对象还是共享同一块内存。



- **深拷贝**：在堆中重新分配内存，并且把源对象所有属性都进行新建拷贝，以保证深拷贝的对象的引用图不包含任何原有对象或对象图上的任何对象，拷贝后的对象与原来的对象是完全隔离，互不影响。



## 浅拷贝方法



接下来我们来看一下对象有哪些浅拷贝方法。



**1. 直接赋值**

直接赋值是最常见的一种浅拷贝方式。例如：



```js
var stu = {
    name: 'xiejie',
    age: 18
}
// 直接赋值
var stu2 = stu;
stu2.name = "zhangsan";
console.log(stu); // { name: 'zhangsan', age: 18 }
console.log(stu2); // { name: 'zhangsan', age: 18 }
```



**2. *Object.assign* 方法**

我们先来看一下 *Object.assign* 方法的基本用法。

该方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。

如下：

```js
var stu = {
    name: 'xiejie'
}
var stu2 = Object.assign(stu, { age: 18 }, { gender: 'male' })
console.log(stu2); // { name: 'xiejie', age: 18, gender: 'male' }
```

在上面的代码中，我们有一个对象 *stu*，然后使用 *Object.assign* 方法将后面两个对象的属性值分配到 *stu* 目标对象上面。

最终得到 *{ name: 'xiejie', age: 18, gender: 'male' }* 这个对象。



通过这个方法，我们就可以实现一个对象的拷贝。例如：

```js
const stu = {
    name: 'xiejie',
    age: 18
}
const stu2 = Object.assign({}, stu)
stu2.name = 'zhangsan';
console.log(stu); // { name: 'xiejie', age: 18 }
console.log(stu2); // { name: 'zhangsan', age: 18 }
```

在上面的代码中，我们使用 *Object.assign* 方法来对 *stu* 方法进行拷贝，并且可以看到修改拷贝后对象的值，并没有影响原来的对象，这仿佛实现了一个深拷贝。



然而，*Object.assign* 方法事实上是一个浅拷贝。

当对象的属性值对应的是一个对象时，该方法拷贝的是对象的属性的引用，而不是对象本身。

例如：

```js
const stu = {
    name: 'xiejie',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100
    }
}
const stu2 = Object.assign({}, stu)
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'xiejie', age: 18, stuInfo: { No: 1, score: 90 } }
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```



**3. *ES6* 扩展运算符**

首先我们还是来回顾一下 *ES6* 扩展运算符的基本用法。

ES6 扩展运算符可以将数组表达式或者 *string* 在语法层面展开，还可以在构造字面量对象时，将对象表达式按 *key-value* 的方式展开。

例如：

```js
var arr = [1, 2, 3];
var arr2 = [3, 5, 8, 1, ...arr]; // 展开数组
console.log(arr2); // [3, 5, 8, 1, 1, 2, 3]

var stu = {
    name: 'xiejie',
    age: 18
}
var stu2 = { ...stu, score: 100 }; // 展开对象
console.log(stu2); // { name: 'xiejie', age: 18, score: 100 }
```



接下来我们来使用扩展运算符来实现对象的拷贝，如下：

```js
const stu = {
    name: 'xiejie',
    age: 18
}
const stu2 = {...stu}
stu2.name = 'zhangsan';
console.log(stu); // { name: 'xiejie', age: 18 }
console.log(stu2); // { name: 'zhangsan', age: 18 }
```



但是和 *Object.assign* 方法一样，如果对象中某个属性对应的值为引用类型，那么直接拷贝的是引用地址。如下：

```js
const stu = {
    name: 'xiejie',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100
    }
}
const stu2 = {...stu}
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'xiejie', age: 18, stuInfo: { No: 1, score: 90 } }
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```



**4. 数组的 *slice* 和 *concat* 方法**

在 *javascript* 中，数组也是一种对象，所以也会涉及到深浅拷贝的问题。

在 *Array* 中的 *slice* 和 *concat* 方法，不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。

例如：

```js
// concat 拷贝数组
var arr1 = [1, true, 'Hello'];
var arr2 = arr1.concat();
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 1, true, 'Hello' ]

arr2[0] = 2;
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 2, true, 'Hello' ]
```

```js
// slice 拷贝数组
var arr1 = [1, true, 'Hello'];
var arr2 = arr1.slice();
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 1, true, 'Hello' ]

arr2[0] = 2;
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 2, true, 'Hello' ]
```



但是，这两个方法仍然是浅拷贝。如果一旦涉及到数组里面的元素是引用类型，那么这两个方法是直接拷贝的引用地址。如下：

```js
// concat 拷贝数组
var arr1 = [1, true, 'Hello', { name: 'xiejie', age: 18 }];
var arr2 = arr1.concat();
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]
console.log(arr2); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]

arr2[0] = 2;
arr2[3].age = 19;
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 19 } ]
console.log(arr2); // [ 2, true, 'Hello', { name: 'xiejie', age: 19 } ]
```

```js
// concat 拷贝数组
var arr1 = [1, true, 'Hello', { name: 'xiejie', age: 18 }];
var arr2 = arr1.slice();
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]
console.log(arr2); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]

arr2[0] = 2;
arr2[3].age = 19;
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 19 } ]
console.log(arr2); // [ 2, true, 'Hello', { name: 'xiejie', age: 19 } ]
```



**5.  *jQuery* 中的 *$.extend***

在 *jQuery* 中，*$.extend(deep,target,object1,objectN)* 方法可以进行深浅拷贝。各参数说明如下：

- *deep*：如过设为 *true* 为深拷贝，默认是 *false* 浅拷贝
- *target*：要拷贝的目标对象
- *object1*：待拷贝到第一个对象的对象
- *objectN*：待拷贝到第N个对象的对象

来看一个具体的示例：

```js
<body>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        const obj = {
            name: 'wade',
            age: 37,
            friend: {
                name: 'james',
                age: 34
            }
        }
        const cloneObj = {};
        // deep 默认为 false 为浅拷贝
        $.extend(cloneObj, obj);
        obj.friend.name = 'rose';
        console.log(obj);
        console.log(cloneObj);
    </script>
</body>
```



效果：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-08-31-053219.png" alt="image-20210831133219541" style="zoom:50%;" />





## 深拷贝方法



说完了浅拷贝，接下来我们来看如何实现深拷贝。

总结一下，大致有如下的方式。



**1. *JSON.parse(JSON.stringify)***

这是一个广为流传的深拷贝方式，用 *JSON.stringify* 将对象转成 *JSON* 字符串，再用 *JSON.parse* 方法把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

示例如下：

```js
const stu = {
    name: 'xiejie',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100
    }
}
const stu2 = JSON.parse(JSON.stringify(stu));
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'xiejie', age: 18, stuInfo: { No: 1, score: 100 } }
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```



这种方式看似能够解决问题，但是这种方法也有一个缺点，那就是不能处理函数。

这是因为 *JSON.stringify* 方法是将一个 *javascript* 值（对象或者数组）转换为一个 *JSON* 字符串，而 *JSON* 字符串是不能够接受函数的。同样，正则对象也一样，在 *JSON.parse* 解析时会发生错误。

例如：

```js
const stu = {
    name: 'xiejie',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100,
        saySth: function () {
            console.log('我是一个学生');
        }
    }
}
const stu2 = JSON.parse(JSON.stringify(stu));
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'xiejie', age: 18, stuInfo: { No: 1, score: 100, saySth: [Function: saySth] }}
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```

可以看到，在原对象中有方法，拷贝之后，新对象中没有方法了。



**2. *$.extend(deep,target,object1,objectN)***

前面在介绍浅拷贝时提到了 *jQuery* 的这个方法，该方法既能实现浅拷贝，也能实现深拷贝。要实现深拷贝，只需要将第一个参数设置为 *true* 即可。例如：

```js
<body>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        const obj = {
            name: 'wade',
            age: 37,
            friend: {
                name: 'james',
                age: 34
            }
        }
        const cloneObj = {};
        // deep 设为 true 为深拷贝
        $.extend(true, cloneObj, obj);
        obj.friend.name = 'rose';
        console.log(obj);
        console.log(cloneObj);
    </script>
</body>
```

效果：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-08-31-054115.png" alt="image-20210831134114926" style="zoom:50%;" />





**3. 手写递归方法**

最终，还是只有靠我们自己手写递归方法来实现深拷贝。

示例如下：

```js
function deepClone(target) {
    var result;
    // 判断是否是对象类型
    if (typeof target === 'object') {
        // 判断是否是数组类型
        if (Array.isArray(target)) {
            result = []; // 如果是数组,创建一个空数组
            // 遍历数组的键
            for (var i in target) {
                // 递归调用
                result.push(deepClone(target[i]))
            }
        } else if (target === null) {
            // 再判断是否是 null
            // 如果是，直接等于 null
            result = null;
        } else if (target.constructor === RegExp) {
            // 判断是否是正则对象
            // 如果是,直接赋值拷贝
            result = target;
        } else if (target.constructor === Date) {
            // 判断是否是日期对象
            // 如果是,直接赋值拷贝
            result = target;
        } else {
            // 则是对象
            // 创建一个空对象
            result = {};
            // 遍历该对象的每一个键
            for (var i in target) {
                // 递归调用
                result[i] = deepClone(target[i]);
            }
        }
    } else {
        // 表示不是对象类型，则是简单数据类型  直接赋值
        result = target;
    }
    // 返回结果
    return result;
}
```

在上面的代码中，我们封装了一个名为 *deepClone* 的方法，在该方法中，通过递归调用的形式来深度拷贝一个对象。

下面是 *2* 段测试代码：

```js
// 测试1
const stu = {
    name: 'xiejie',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100,
        saySth: function () {
            console.log('我是一个学生');
        }
    }
}
const stu2 = deepClone(stu)
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'xiejie', age: 18, stuInfo: { No: 1, score: 100, saySth: [Function: saySth] }}
console.log(stu2); // { name: 'xiejie', age: 18, stuInfo: { No: 1, score: 90, saySth: [Function: saySth] }}
```

```js
// 测试2
var arr1 = [1, true, 'Hello', { name: 'xiejie', age: 18 }];
var arr2 = deepClone(arr1)
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]
console.log(arr2); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]

arr2[0] = 2;
arr2[3].age = 19;
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]
console.log(arr2); // [ 2, true, 'Hello', { name: 'xiejie', age: 19 } ]
```



## 真题解答



- 深拷贝和浅拷贝的区别？如何实现 

> 参考答案：
>
> - **浅拷贝**：只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做浅拷贝（浅复制）
>
>   浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
>
> - **深拷贝**：在堆中重新分配内存，并且把源对象所有属性都进行新建拷贝，以保证深拷贝的对象的引用图不包含任何原有对象或对象图上的任何对象，拷贝后的对象与原来的对象是完全隔离，互不影响。
>
> **浅拷贝方法**
>
> 1. 直接赋值
> 2. *Object.assign* 方法：可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。当拷贝的 *object* 只有一层的时候，是深拷贝，但是当拷贝的对象属性值又是一个引用时，换句话说有多层时，就是一个浅拷贝。
> 3. *ES6* 扩展运算符，当 *object* 只有一层的时候，也是深拷贝。有多层时是浅拷贝。
> 4. *Array.prototype.concat* 方法
> 5. *Array.prototype.slice* 方法
> 6. *jQuery* 中的 *$.extend*：在 *jQuery* 中，*$.extend(deep,target,object1,objectN)* 方法可以进行深浅拷贝。*deep* 如过设为 *true* 为深拷贝，默认是 *false* 浅拷贝。
>
> **深拷贝方法**
>
> 1. *$.extend(deep,target,object1,objectN)*，将 *deep* 设置为 *true*
> 2. *JSON.parse(JSON.stringify)*：用 *JSON.stringify* 将对象转成 *JSON* 字符串，再用 *JSON.parse* 方法把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。这种方法虽然可以实现数组或对象深拷贝，但不能处理函数。
> 3. 手写递归
>
> 示例代码如下：
>
> ```js
> function deepCopy(oldObj, newobj) {
>     for (var key in oldObj) {
>         var item = oldObj[key];
>         // 判断是否是对象
>         if (item instanceof Object) {
>             if (item instanceof Function) {
>                 newobj[key] = oldObj[key];
>             } else {
>                 newobj[key] = {};  //定义一个空的对象来接收拷贝的内容
>                 deepCopy(item, newobj[key]); //递归调用
>             }
> 
>             // 判断是否是数组
>         } else if (item instanceof Array) {
>             newobj[key] = [];  //定义一个空的数组来接收拷贝的内容
>             deepCopy(item, newobj[key]); //递归调用
>         } else {
>             newobj[key] = oldObj[key];
>         }
>     }
> }
> ```



-*EOF*-

# 函数柯里化



## 经典真题



- 什么是函数柯里化？



## 什么是函数柯里化



在计算机科学中，柯里化（英语：*Currying*），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

这个技术由克里斯托弗·斯特雷奇以逻辑学家哈斯凯尔·加里命名的，尽管它是 *Moses Schönfinkel* 和戈特洛布·弗雷格发明的。



在直觉上，柯里化声称如果你固定某些参数，你将得到接受余下参数的一个函数。

我们姑且叫它返回函数，在调用返回函数的时候，它将判断当前的参数和之前被柯里化函数固定的参数拼起来之后，是否达到了原本函数的参数个数。

如果是，则执行原本的函数，得到结果；如果没有达到，则要继续调用柯里化函数来固定目前的参数。



在理论计算机科学中，柯里化提供了在简单的理论模型中，比如：只接受一个单一参数的 *lambda* 演算中，研究带有多个参数的函数的方式。

函数柯里化的对偶是*Uncurrying*，一种使用匿名单参数函数来实现多参数函数的方法。



## 柯里化快速入门



接下来，我们来通过一个简单的示例，让大家快速体会函数柯里化。

假设我们有一个求取两个数之和的函数：

```js
function add(x, y) {
    return x + y;
}
console.log(add(1, 2)); // 3
console.log(add(5, 7)); // 12
```

在上面的示例中，我们有一个 *add* 函数，接收两个形参，返回两形参的和。

在调用的时候，我们每次也需要传递两个参数。



现在，我们对其进行柯里化，如下：

```js
function add(x) {
    return function (y) {
        return x + y;
    }
}
console.log(add(1)(2)); // 3
console.log(add(5)(7)); // 3
```

在上面的代码中，我们对 *add* 函数进行了柯里化改造，只接受一个参数，但是返回的也不是值了，而是返回一个函数，这个函数也接收一个参数，然后利用闭包的特性，可以访问到最开始传入的 *x* 的值，最终返回 *x* 和 *y* 的和。



所以，通过上面的这个示例，我们能够体会到前面所说的柯里化函数的特点：

一个柯里化的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。



## 函数柯里化实际应用



通过上面的例子，我们体验到了什么是柯里化函数。

但是问题来了，费这么大劲封装一层，到底有什么用处呢？

没有好处想让我们程序员多干事情是不可能滴，这辈子都不可能。



所以接下来我们就来看一下函数柯里化的一个实际应用。



**参数复用**

就是将相同的参数固定下来。

```js
// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
    return reg.test(txt)
}

// 即使是相同的正则表达式，也需要重新传递一次
console.log(check(/\d+/g, 'test1')); // true
console.log(check(/\d+/g, 'testtest')); // false
console.log(check(/[a-z]+/g, 'test')); // true

// Currying后
function curryingCheck(reg) {
    return function (txt) {
        return reg.test(txt)
    }
}

// 正则表达式通过闭包保存了起来
var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

console.log(hasNumber('test1')); // true
console.log(hasNumber('testtest'));  // false
console.log(hasLetter('21212')); // false
```

上面的示例是一个正则的校验，正常来说直接调用 *check* 函数就可以了，但是如果我有很多地方都要校验是否有数字，其实就是需要将第一个参数 *reg* 进行复用，这样别的地方就能够直接调用 *hasNumber、hasLetter* 等函数，让参数能够复用，调用起来也更方便。



**提前确认**

```js
/**
 * 
 * @param {要绑定事件的 DOM 元素} element 
 * @param {绑定什么事件} event 
 * @param {事件处理函数} handler 
 */
var on = function (element, event, handler) {
    if (document.addEventListener) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    } else {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    }
}

on(div, 'click', function(){})


var on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

on(div, 'click', function(){})

//换一种写法可能比较好理解一点，上面就是把 isSupport 这个参数给先确定下来了
var on = function (isSupport, element, event, handler) {
    isSupport = isSupport || document.addEventListener;
    if (isSupport) {
        return element.addEventListener(event, handler, false);
    } else {
        return element.attachEvent('on' + event, handler);
    }
}
on(true, div, 'click', function(){})
on(true, div, 'click', function(){})
on(true, div, 'click', function(){})
```

我们在做项目的过程中，封装一些 *DOM* 操作可以说再常见不过，上面第一种写法也是比较常见，但是我们看看第二种写法，它相对于第一种写法就是自执行然后返回一个新的函数，这样其实就是提前确定了会走哪一个方法，避免每次都进行判断。



## 封装通用柯里化函数



接下来我们来封装一个通用的柯里化函数。

```js
function curry() {
    var fn = arguments[0]; // 获取要执行的函数
    var args = [].slice.call(arguments, 1); // 获取传递的参数，构成一个参数数组
    // 如果传递的参数已经等于执行函数所需的参数数量
    if (args.length === fn.length) {
        return fn.apply(this, args)
    }
    // 参数不够向外界返回的函数
    function _curry(){
        // 推入之前判断
        // 将新接收到的参数推入到参数数组中
        args.push(...arguments);
        if(args.length === fn.length){
            return fn.apply(this, args)
        }
        return _curry;
    }
    return _curry;
}
```

对上面的代码进行测试：

```js
// 测试 1
function add(a, b, c) {
    return a + b + c;
}

console.log(curry(add)(1)(2)(3)); // 6
console.log(curry(add, 1)(2)(3)); // 6
console.log(curry(add, 1, 2, 3)); // 6
console.log(curry(add, 1)(3, 4)); // 8

var addCurrying = curry(add)(2);
console.log(addCurrying(7)(8)); // 17

// 测试 2
function check(reg, txt) {
    return reg.test(txt)
}
var hasNumber = curry(check)(/\d+/g);
console.log(hasNumber('test1'));// true
```



## 一道经典的柯里化面试题



实现一个 *add* 方法，使计算结果能够满足如下预期：

```js
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```



要完成上面的需求，我们就可以使用柯里化函数：

```js
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存 _args 并收集所有的参数值
    var _adder = function () {
        _args.push(...arguments);
        return _adder;
    };

    // 这个是最后输出的时候被调用的，return 后面如果是函数体，
    // 为了输出函数体字符串会自动调用 toString 方法
    // 利用 toString 隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }

    // 这个 return 是第一次调用的时候返回上面的函数体，
    // 这样后面所有的括号再执行的时候就是执行 _adder 函数体
    return _adder;
}
console.log(add(1)(2)(3).toString()); // 6
console.log(add(1, 2, 3)(4).toString()); // 10
console.log(add(1)(2)(3)(4)(5).toString()); // 15
console.log(add(2, 6)(1).toString()); // 9
```



## 真题详解



- 什么是函数柯里化？

> 参考答案：
>
> 柯里化（*currying*）又称部分求值。一个柯里化的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
>
> 举个例子，就是把原本：
>
> *function(arg1,arg2)* 变成 *function(arg1)(arg2)*
> *function(arg1,arg2,arg3)* 变成 *function(arg1)(arg2)(arg3)*
> *function(arg1,arg2,arg3,arg4)* 变成 *function(arg1)(arg2)(arg3)(arg4)*
>
> 总而言之，就是将：
>
> *function(arg1,arg2,…,argn)* 变成 *function(arg1)(arg2)…(argn)*



-*EOF*-


# *Node* 事件循环



## 经典真题



- 请简述一下 *Node.js* 中的事件循环，和浏览器环境的事件循环有何不同？



## *Node.js* 与浏览器的事件循环有何区别？



### 进程与线程



我们经常说 *JavaScript* 是一门单线程语言，指的是一个进程里只有一个主线程，那到底什么是线程？什么是进程？

首先需要把这个问题搞明白。

进程是 *CPU* 资源分配的最小单位，而线程是 *CPU* 调度的最小单位。举个例子，看下面的图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-032136.png" alt="image-20211015112136231" style="zoom:50%;" />



- 进程好比图中的工厂，有单独的专属自己的工厂资源。

- 线程好比图中的工人，多个工人在一个工厂中协作工作，工厂与工人是 *1:n* 的关系。也就是说**一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线**。

- 工厂的空间是工人们共享的，这象征**一个进程的内存空间是共享的，每个线程都可用这些共享内存**。

- 多个工厂之间独立存在。



接下来我们回过头来看多进程和多线程的概念：

- 多进程：在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。



- 多线程：程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。



以 *Chrome* 浏览器中为例，当你打开一个 *Tab* 页时，其实就是创建了一个进程。



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-032547.png" alt="image-20211015112546949" style="zoom:50%;" />



一个进程中可以有多个线程，比如渲染线程、*JS* 引擎线程、*HTTP* 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。



### 浏览器内核



简单来说浏览器内核是通过取得页面内容、整理信息（应用 *CSS* ）、计算和组合最终输出可视化的图像结果，通常也被称为渲染引擎。

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- *GUI* 渲染线程
- *JavaScript* 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 *http* 请求线程



#### *GUI* 渲染线程



- 主要负责页面的渲染，解析 *HTML*、*CSS*，构建 *DOM* 树，布局和绘制等。
- 当界面需要重绘或者由于某种操作引发回流时，将执行该线程。
- 该线程与 *JS* 引擎线程互斥，当执行 *JS* 引擎线程时，*GUI* 渲染会被挂起，当任务队列空闲时，主线程才会去执行 *GUI* 渲染。



#### *JavaScript* 引擎线程



- 该线程当然是主要负责处理  *JavaScript*  脚本，执行代码。
- 也是主要负责执行准备好待执行的事件，即定时器计数结束，或者异步请求成功并正确返回时，将依次进入任务队列，等待 *JS* 引擎线程的执行。
- 当然，该线程与 *GUI* 渲染线程互斥，当 *JS* 引擎线程执行 *JavaScript* 脚本时间过长，将导致页面渲染的阻塞。



#### 定时触发器线程



- 负责执行异步定时器一类的函数的线程，如：*setTimeout、setInterval*。
- 主线程依次执行代码时，遇到定时器，会将定时器交给该线程处理，当计数完毕后，事件触发线程会将计数完毕后的事件加入到任务队列的尾部，等待 *JS* 引擎线程执行。



#### 事件触发线程



- 主要负责将准备好的事件交给 *JS* 引擎线程执行。



比如 *setTimeout* 定时器计数结束， *ajax* 等异步请求成功并触发回调函数，或者用户触发点击事件时，该线程会将整装待发的事件依次加入到任务队列的队尾，等待 *JS* 引擎线程的执行。



#### 异步 *http* 请求线程



- 负责执行异步请求一类的函数的线程，如：*Promise、fetch、ajax* 等。
- 主线程依次执行代码时，遇到异步请求，会将函数交给该线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列的尾部，等待 *JS* 引擎线程执行。



### 浏览器中的事件循环



#### 宏任务和微任务



事件循环中的异步队列有两种：宏任务（ *macro* ）队列和微任务（ *micro* ）队列。

**宏任务队列有一个，微任务队列只有一个**。

- 常见的宏任务有：*setTimeout、setInterval、requestAnimationFrame、script*等。
- 常见的微任务有：*new Promise( ).then(回调)、MutationObserver* 等。



#### 事件循环流程



一个完整的事件循环过程，可以概括为以下阶段：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-041213.png" alt="image-20211015121213384" style="zoom:50%;" />



- 一开始执行栈空，我们可以把**执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。微任务队列空，宏任务队列里有且只有一个 *script* 脚本（整体代码）。



- 全局上下文（ *script* 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的宏任务与微任务，它们会分别被推入各自的任务队列里。同步代码执行完了，*script* 脚本会被移出宏任务队列，这个过程本质上是队列的宏任务的执行和出队的过程。



- 上一步我们出队的是一个宏任务，这一步我们处理的是微任务。但需要注意的是：当一个宏任务执行完毕后，会执行所有的微任务，也就是将整个微任务队列清空。

  

- 执行渲染操作，更新界面



- 检查是否存在 *Web worker* 任务，如果有，则对其进行处理



- 上述过程循环往复，直到两个队列都清空



宏任务和微任务的执行流程，总结起来就是：

**当某个宏任务执行完后，会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。**

执行流程如下图所示：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-034206.png" alt="image-20211015114206131" style="zoom: 80%;" />



这里我们可以来看两道具体的代码题目加深理解：

```js
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});

console.log('script end');
```

上面的代码输出的结果为：

```js
script start
script end
promise1
promise2
setTimeout
```

原因很简单，首先会执行同步的任务，输出 *script start* 以及 *script end*。接下来是处理异步任务，异步任务分为宏任务队列和微任务队列，在执行宏任务队列中的每个宏任务之前先把微任务清空一遍，由于 *promise* 是微任务，所以会先被执行，而 *setTimeout* 由于是一个宏任务，会在微任务队列被清空后再执行。



```js
Promise.resolve().then(()=>{
  console.log('Promise1')
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')
  })
},0)
```

上面的代码输出的结果为：

```js
Promise1
setTimeout1
Promise2
setTimeout2
```

一开始执行栈的同步任务（这属于宏任务）执行完毕，会去查看是否有微任务队列，上题中存在（有且只有一个），然后执行微任务队列中的所有任务输出 *Promise1*，同时会生成一个宏任务 *setTimeout2*。

然后去查看宏任务队列，宏任务 *setTimeout1* 在 *setTimeout2* 之前，先执行宏任务 *setTimeout1*，输出 *setTimeout1*。在执行宏任务 *setTimeout1* 时会生成微任务 *Promise2* ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 *Promise2*。

清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 *setTimeout2*。



### *Node.js* 中的事件循环



#### *Node.js* 事件循环介绍



*Node.js* 中的事件循环和浏览器中的是完全不相同的东西。

*Node.js* 采用 *V8* 作为 *JS* 的解析引擎，而 *I/O* 处理方面使用了自己设计的 *libuv*，*libuv* 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 *API*，事件循环机制也是它里面的实现。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-041258.png" alt="image-20211015121258759" style="zoom:50%;" />



可以看出 *Node.JS* 的事件循环比浏览器端复杂很多。*Node.js* 的运行机制如下:

- *V8* 引擎解析 *JavaScript* 脚本。
- 解析后的代码，调用 *Node API*。
- *libuv* 库负责 *Node API* 的执行。它将不同的任务分配给不同的线程，形成一个事件循环，以异步的方式将任务的执行结果返回给 *V8* 引擎。
- *V8* 引擎再将结果返回给用户。



整个架构图如下所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-29-080543.png" alt="image-20211029160543365" style="zoom:50%;" />





#### 事件循环的 *6* 个阶段



其中 *libuv* 引擎中的事件循环分为 *6* 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-054611.jpg" alt="node" style="zoom: 90%;" />



从上图中，大致看出 *Node.js* 中的事件循环的顺序：

外部输入数据 –-> 轮询阶段（ *poll* ）-–> 检查阶段（ *check* ）-–> 关闭事件回调阶段（ *close callback* ）–-> 定时器检测阶段（ *timer* ）–-> *I/O* 事件回调阶段（ *I/O callbacks* ）-–>闲置阶段（ *idle、prepare* ）–->轮询阶段（按照该顺序反复运行）...

以上 *6* 个阶段所做的事情如下：

- *timers* 阶段：这个阶段执行 *timer*（ *setTimeout、setInterval* ）的回调
- *I/O callbacks* 阶段：处理一些上一轮循环中的少数未执行的 *I/O* 回调
- *idle、prepare* 阶段：仅 *Node.js* 内部使用
- *poll* 阶段：获取新的 *I/O* 事件, 适当的条件下 *Node.js* 将阻塞在这里
- *check* 阶段：执行 *setImmediate( )* 的回调
- *close callbacks* 阶段：执行 *socket* 的 *close* 事件回调

注意：**上面六个阶段都不包括 *process.nextTick( )***

接下去我们详细介绍 *timers、poll、check* 这 *3* 个阶段，因为日常开发中的绝大部分异步任务都是在这 *3* 个阶段处理的。



***timer* 阶段**



*timers* 阶段会执行 *setTimeout* 和 *setInterval* 回调，并且是由 *poll* 阶段控制的。同样，**在 *Node.js* 中定时器指定的时间也不是准确时间，只能是尽快执行**。



***poll* 阶段**



*poll* 是一个至关重要的阶段，这一阶段中，系统会做两件事情：

- 回到 *timer* 阶段执行回调
- 执行 *I/O* 回调

并且在进入该阶段时如果没有设定了 *timer* 的话，会发生以下两件事情：

- 如果 *poll* 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 *poll* 队列为空时，会有两件事发生：
  - 如果有 *setImmediate* 回调需要执行，*poll* 阶段会停止并且进入到 *check* 阶段执行回调
  - 如果没有 *setImmediate* 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 *timer* 的话且 *poll* 队列为空，则会判断是否有 *timer* 超时，如果有的话会回到 *timer* 阶段执行回调。

假设 *poll* 被堵塞，那么即使 *timer* 已经到时间了也只能等着，这也是为什么上面说定时器指定的时间并不是准确的时间。例如：

```js
const start = Date.now();
setTimeout(function f1() {
    console.log("setTimeout", Date.now() - start);
}, 200);

const fs = require('fs');

fs.readFile('./index.js', 'utf-8', function f2() {
    console.log('readFile');
    const start = Date.now();
    // 强行延时 500 毫秒
    while (Date.now() - start < 500) { }
})
```



***check* 阶段**



*setImmediate( )* 的回调会被加入 *check* 队列中，从事件循环的阶段图可以知道，*check* 阶段的执行顺序在 *poll* 阶段之后。

我们先来看个例子：

```js
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
// 输出结果：start => end => promise3 => timer1 => promise1 => timer2 => promise2
```

一开始执行同步任务，依次打印出 *start end*，并将 *2* 个 *timer* 依次放入 *timer* 队列，之后会立即执行微任务队列，所以打印出 *promise3*。

然后进入 *timers* 阶段，执行 *timer1* 的回调函数，打印 *timer1*，发现有一个 *promise.then* 回调将其加入到微任务队列并且立即执行，之后同样的步骤执行 *timer2*，打印 *timer2* 以及 *promise2*。



#### 一些注意点



***setTimeout* 和 *setImmediate* 区别**



二者非常相似，区别主要在于调用时机不同。

- *setImmediate* 设计在 *poll* 阶段完成时执行，即 *check* 阶段
- *setTimeout* 设计在 *poll* 阶段为空闲时，且设定时间到达后执行，但它在 *timer* 阶段执行

来看一个具体的示例：

```js
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});
```

对于以上代码来说，*setTimeout* 可能执行在前，也可能执行在后。首先 *setTimeout(fn, 0) === setTimeout(fn, 1)*，这是由源码决定的，进入事件循环也是需要成本的，如果在准备时候花费了大于 *1ms* 的时间，那么在 *timer* 阶段就会直接执行 *setTimeout* 回调。如果准备时间花费小于 *1ms*，那么就是 *setImmediate* 回调先执行了。



但当二者在异步 *I/O callback* 内部调用时，总是先执行 *setImmediate*，再执行 *setTimeout*，例如：

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
// immediate
// timeout
```

在上述代码中，*setImmediate* 永远先执行。因为两个代码写在 *I/O* 回调中，*I/O* 回调是在 *poll* 阶段执行，当回调执行完毕后队列为空，发现存在 *setImmediate* 回调，所以就直接跳转到 *check* 阶段去执行回调了。



***process.nextTick***



这个函数其实是独立于事件循环之外的，它有一个自己的队列。当每个阶段完成后，如果存在 *nextTick* 队列，就会清空队列中的所有回调函数，并且优先于其他 *microtask* 执行。



```js
setTimeout(() => {
 console.log('timer1')
 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
// nextTick => nextTick => nextTick => nextTick => timer1 => promise1
```



***Promise.then***



*Promise.then* 也是独立于事件循环之外的，有一个自己的队列，但是优先级要比 *process.nextTick* 要低，所以当微任务中同时存在 *process.nextTick* 和 *Promise.then* 时，会优先执行前者。



```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
    process.nextTick(() => {
        console.log('nexttick');
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
// timer1、nexttick、promise1、timer2、promise2
```



#### *Node.js* 与浏览器的事件队列的差异



浏览器环境下，就两个队列，一个宏任务队列，一个微任务队列。微任务的任务队列是每个宏任务执行完之后执行。

在 *Node.js* 中，每个任务队列的每个任务执行完毕之后，就会清空这个微任务队列。



![eventloop](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-15-060748.png)



## 真题解答



- 请简述一下 *Node.js* 中的事件循环，和浏览器环境的事件循环有何不同？

> 参考答案：
>
>  *Node.JS* 的事件循环分为 *6* 个阶段：
>
> - *timers* 阶段：这个阶段执行 *timer*（ *setTimeout、setInterval* ）的回调
> - *I/O callbacks* 阶段：处理一些上一轮循环中的少数未执行的 *I/O* 回调
> - *idle、prepare* 阶段：仅 *Node.js* 内部使用
> - *poll* 阶段：获取新的 *I/O* 事件, 适当的条件下 *Node.js* 将阻塞在这里
> - *check* 阶段：执行 *setImmediate( )* 的回调
> - *close callbacks* 阶段：执行 *socket* 的 *close* 事件回调
>
> 事件循环的执行顺序为：
>
> 外部输入数据 –-> 轮询阶段（ *poll* ）-–> 检查阶段（ *check* ）-–> 关闭事件回调阶段（ *close callback* ）–-> 定时器检测阶段（ *timer* ）–-> *I/O* 事件回调阶段（ *I/O callbacks* ）-–>闲置阶段（ *idle、prepare* ）–->轮询阶段（按照该顺序反复运行）...
>
> 浏览器和 *Node.js* 环境下，微任务任务队列的执行时机不同
>
> - 在 *Node.js* 中，每个任务队列的每个任务执行完毕之后，就会清空这个微任务队列。
> - 浏览器环境下，就两个队列，一个宏任务队列，一个微任务队列。微任务的任务队列是每个宏任务执行完之后执行。



-*EOF*-


# *eval*



## 经典真题



- *JavaScript* 中的 *eval* 方法是啥？一般什么场景下使用？



## 关于 *eval* 你所需要知道的内容



### *eval* 的基本用法



首先我们来看一下 *eval( )* 函数的基本用法。

*eval( )* 函数接收一个字符串作为参数，该字符串一个表示 *JavaScript* 表达式、语句或一系列语句的字符串。表达式可以包含变量与已存在对象的属性。

示例如下：

```js
eval('console.log("Hello!")'); // Hello!

var str = `
    var a = 1;
    var b = 2;
    if(a > b) {
        console.log('a > b');
    } else {
        console.log('a<b');
    }
`;
eval(str); // a<b

console.log(eval('2 + 2')); // 4（ number 类型 ）


console.log(eval(new String('Hello'))); // [String: 'Hello']


console.log(eval('2 + 2') === eval('4')); // true


console.log(eval('2 + 2') === eval(new String('2 + 2'))); // false
```

通过上面的代码我们可以发现，*eval( )* 会将传入的字符串作为 *JavaScript* 来进行执行。

如果 *eval( )* 的参数不是字符串， *eval( )* 会将参数原封不动地返回。例如：

```js
console.log(eval(true)); // true
console.log(eval(5)); // 5
```

如果传入的字符串不是 *JavaScript* 代码，那么也会将此字符串原封不动的返回。例如：

```js
var Hello = 5;
console.log(eval('Hello')); // 5
```



### *eval* 作用域



*eval* 里面的代码在当前词法环境中执行，因此它可以看到外部变量：

```js
let a = 1;

function f() {
  let a = 2;

  eval('console.log(a)'); // 2
}

f();
```

它也可以改变外部变量：

```js
let x = 5;
eval("x = 10");
console.log(x); // 10, value modified
```



在严格模式下， *eval* 有自己的词法环境。因此，在 *eval* 内部声明的函数和变量在外部不可见：

```js
eval("let x = 5; function f() {}");

console.log(typeof x); // undefined (no such variable)
```

如果没有 *use strict*，*eval* 没有自己的词法环境，所以我们会在外面看到 *x* 和 *f*  :

```js
eval("var x = 5; function f() {}");

console.log(x); // 5
console.log(typeof x); // number 
```



### 永远不要使用 *eval*



明白了 *eval( )* 函数的基本用法后，你心里一定会有这么一个疑问，那就是这玩意儿用来干嘛？

在现代编程中，*eval* 的使用非常谨慎。人们常说“ *eval is evil（eval 是邪恶的）* ”。

原因很简单：很久很久以前，*JavaScript* 是一种弱得多的语言，很多事情只能用 *eval* 来完成。但那段时间已经过去十年了。

现在，几乎没有理由使用 *eval*。如果有人使用了它，那么一个更好的选择是用现代语言结构或 *JavaScript* 模块替换它。



总结起来，有如下的理由让我们不要使用 *eval*：



- *eval* 是一个危险的函数， 它使用与调用者相同的权限执行代码。如果你用 *eval* 运行的字符串代码被恶意方（不怀好意的人）修改，您最终可能会在您的网页/扩展程序的权限下，在用户计算机上运行恶意代码。（不安全）
- *eval* 通常比其他替代方法更慢，因为它必须调用 *JS* 解释器，而许多其他结构则可被现代 *JS* 引擎进行优化。使用 *eval* 往往比普通 *JavaScript* 代码慢几个数量级。（性能不好）
- 产生混乱的代码逻辑



## 真题解答



- *JavaScript* 中的 *eval* 方法是啥？一般什么场景下使用？

> 参考答案：
>
> *eval* 是 *JavaScript* 中的一个全局函数，它将指定的字符串计算为 *JavaScript* 代码并执行它。
>
> 在现代 *JavaScript* 编程中，我们应该尽量避免使用 *eval*，之前所有使用 *eval* 的地方都有更好的方式来进行代替，所以在现代 *JavaScript* 编程中，*eval* 没有什么使用场景存在，也就是说，并不存在某些场景必须要使用 *eval* 才能实现的。



-*EOF*-


# 尺寸和位置



在 *JavaScript* 中操作 *DOM* 节点使其运动的时候，常常会涉及到各种宽高以及位置坐标等概念，如果不能很好地理解这些属性所代表的意义，就会在书写代码时遇到不小的问题。而由于这些属性概念较多，加上浏览器之间实现方式不同，常常会造成概念混淆。

本章，我们就一起来总结一下使用 *JavaScript* 操作 *DOM* 时，尺寸和宽高相关的属性。



主要分为以下两部分：



- *DOM* 对象相关尺寸和位置属性
  - 只读属性
    - *clientWidth* 和 *clientHeight* 属性
    - *offsetWidth* 和 *offsetHeight* 属性
    - *clientTop* 和 *clientLeft* 属性
    - *offsetLeft* 和 *offsetTop* 属性
    - *scrollHeight* 和 *scrollWidth* 属性
  - 可读可写属性
    - *scrollTop* 和 *scrollLeft* 属性
    - *domObj.style.xxx* 属性
- *event* 事件对象相关尺寸和位置属性
  - *clientX* 和 *clientY* 属性
  - *screenX* 和 *screenY* 属性
  - *offsetX* 和 *offsetY* 属性
  - *pageX* 和 *pageY* 属性



## *DOM* 对象相关尺寸和位置属性



在 *DOM* 对象所提供的尺寸和位置相关属性中，可以分为**只读属性**和**可读可写属性**。



### 只读属性



所谓的只读属性指的是 *DOM* 节点的固有属性，该属性只能通过 *JavaScript* 去获取而不能通过 *JavaScript* 去设置，而且获取的值是只有数字并不带单位的（ *px、em* 等 ）

常见的只读属性有：

- *clientWidth* 和 *clientHeight* 属性
- *offsetWidth* 和 *offsetHeight* 属性
- *clientTop* 和 *clientLeft* 属性
- *offsetLeft* 和 *offsetTop* 属性
- *scrollHeight* 和 *scrollWidth* 属性

下面我们来一组一组进行介绍。



#### *clientWidth* 和 *clientHeight* 属性

该属性指的是元素的可视部分宽度和高度，即 *padding + content*，例如：

```html
<div id="container" class="container"></div>
```

```css
.container{
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

```js
var container = document.getElementById("container");
console.log("clientWidth:",container.clientWidth); // 220
console.log("clientHeight:",container.clientHeight); // 220
```



#### *offsetWidth* 和 *offsetHeight* 属性

这一对属性指的是元素的 *border+padding+content* 的宽度和高度。例如：

```js
var container = document.getElementById("container");
console.log("offsetWidth:", container.offsetWidth); // 222
console.log("offsetWidth:", container.offsetWidth); // 222
```

可以看到该属性和 *clientWidth* 以及 *clientHeight* 相比，多了设定的边框 *border* 的宽度和高度。



#### *clientTop* 和 *clientLeft* 属性

这一对属性是用来读取元素的 *border* 的宽度和高度的。例如：

```js
var container = document.getElementById("container");
console.log("clientTop:", container.clientTop); // 1
console.log("clientLeft:", container.clientLeft); // 1
```



#### *offsetLeft* 和 *offsetTop* 属性

首先需要介绍一下 *offsetParent* 属性，该属性是获取当前元素的离自己最近的并且定了位的祖先元素，该祖先元素就是当前元素的 *offsetParent*。

如果从该元素向上寻找，找不到这样一个祖先元素，那么当前元素的 *offsetParent* 就是 *body* 元素。

*offsetLeft* 和 *offsetTop* 指的是当前元素，相对于其 *offsetParent* 左边距离和上边距离，即当前元素的 *border* 到包含它的 *offsetParent* 的 *border* 的距离。

下面我们来具体举例说明：

```js
var container = document.getElementById("container");
console.log(container.offsetParent); // body
```

可以看到，我们直接访问 *container* 盒子的 *offsetParent* 属性，因为不存在定了位的祖先元素，所以显示出来的是 *body* 元素。

接下来我们对上面的代码进行改造：

```html
<div id="container" class="container">
  <div id="item" class="item"></div>
</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
  position: relative;
}
.item{
  width: 50px;
  height: 50px;
  background-color: blue;
  position: absolute;
  left: 100px;
  top: 100px;
}
```

当前效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-063813.png" alt="image-20211105143812415" style="zoom:50%;" />

接下来我们来获取 *item* 盒子的 *offsetLeft* 以及 *offsetTop* 属性值。

```js
var container = document.getElementById("container");
var item = document.getElementById("item");
console.log(item.offsetParent); // container 盒子 dom 对象
console.log(item.offsetLeft); // 100
console.log(item.offsetTop); // 100
```

接下来我们不对 *item* 子元素进行定位，而是使用 *margin* 的方式来设置子盒子的位置，如下：

```css
.item{
  width: 50px;
  height: 50px;
  background-color: blue;
  margin: 50px;
}
```

然后再次获取 *item* 盒子的 *offsetLeft* 以及 *offsetTop* 属性值，如下：

```js
var container = document.getElementById("container");
var item = document.getElementById("item");
console.log(item.offsetParent); // container 盒子 dom 对象
console.log(item.offsetLeft); // 60
console.log(item.offsetTop); // 60
```

可以看到，打印出来的是 *60*，因为我们设置的 *margin* 的值为 *50*，但是其定了位的父元素还设置了 *10* 像素的 *padding*，所以加起来就是 *60*。



#### *scrollHeight* 和 *scrollWidth* 属性

顾名思义，这两个属性指的是当元素内部的内容超出其宽度和高度的时候，元素内部内容的实际宽度和高度。

如果当前元素的内容没有超过其高度或者宽度，那么返回的就是元素的可视部分宽度和高度，即和 *clientWidth* 和 *clientHeight* 属性值相同。

```html
<div id="container" class="container">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla repellat porro atque culpa rem sunt sed! Voluptates vel incidunt accusamus reiciendis aut, adipisci ut. Hic, impedit officia.Quis, animi beatae. Facere dolorum quasi laborum, rem facilis illum necessitatibus sint doloribus beatae
exercitationem sapiente! Quod vel cupiditate quam libero, delectus natus.</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

上面的代码中，我们为 *container* 盒子加入了一些文字，使其能够产生滚动效果，接下来访问 *scrollHeight* 和 *scrollWidth* 属性，如下：

```js
var container = document.getElementById("container");
console.log("scrollWidth:", container.scrollWidth); // scrollWidth: 220
console.log("scrollHeight", container.scrollHeight); // scrollHeight 372
```

如果 *container* 盒子不具备滚动的条件，那么返回的值和 *clientWidth* 和 *clientHeight* 属性值是相同的。

```html
<div id="container" class="container"></div>
```

```js
var container = document.getElementById("container");
console.log("scrollWidth:", container.scrollWidth); // scrollWidth: 220
console.log("scrollHeight", container.scrollHeight); // scrollHeight 220
```



### 可读可写属性



所谓的可读可写属性指的是不仅能通过 *JavaScript* 获取该属性的值，还能够通过 *JavaScript* 为该属性赋值。



#### *scrollTop* 和 *scrollLeft* 属性

这对属性是可读写的，指的是当元素其中的内容超出其宽高的时候，元素被卷起的高度和宽度。

```html
<div id="container" class="container">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla repellat porro atque culpa rem sunt sed! Voluptates vel incidunt accusamus reiciendis aut, adipisci ut. Hic, impedit officia.Quis, animi beatae. Facere dolorum quasi laborum, rem facilis illum necessitatibus sint doloribus beatae
exercitationem sapiente! Quod vel cupiditate quam libero, delectus natus.</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

```js
var container = document.getElementById("container");
container.onscroll = function () {
  console.log("scrollTop:", container.scrollTop);
  console.log("scrollLeft", container.scrollLeft);
}
```

在上面的代码中，我们的 *container* 盒子内容超出了容器的高度，我们为该盒子绑定了 *scroll* 事件，滚动的时候打印出 *scrollTop* 和 *scrollLeft*，即元素被卷起的高度和宽度。

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-071632.gif" alt="2021-11-05 15.15.58" style="zoom:50%;" />

该属性因为是可读可写属性，所以可以通过赋值来让内容自动滚动到某个位置。例如很多网站右下角都有回到顶部的按钮，背后对应的 *JavaScript* 代码就是通过该属性来实现的。



#### *domObj.style.xxx* 属性

对于一个 *DOM* 元素来讲，它的 *style* 属性返回的也是一个对象，并且这个对象中的任意一个属性是可读写的。例如 *domObj.style.top、domObj.style.wdith* 等，在读的时候，它们返回的值常常是带有单位的（如 *px* ）。

但是，对于这种方式，**它只能够获取到该元素的行内样式，而并不能获取到该元素最终计算好的样式**。如果想要获取计算好的样式，需要使用 *obj.currentstyle（ IE ）*和 *getComputedStyle*（ *IE* 之外的浏览器 ）

另一方面，由于 *domObj.style.xxx* 属性能够被赋值，所以 *JavaScript* 控制 *DOM* 元素运动的原理就是通过不断修改这些属性的值而达到其位置改变的，需要注意的是，**给这些属性赋值的时候需要带单位的要带上单位，否则不生效**。



## *event* 事件对象相关尺寸和位置属性



对于元素的运动的操作，通常还会涉及到事件里面的 *event* 对象，而 *event* 对象也存在很多位置属性，且由于浏览器兼容性问题会导致这些属性间相互混淆，这里也来进行一个总结。



#### *clientX* 和 *clientY* 属性

这对属性是当事件发生时，鼠标点击位置相对于浏览器（可视区）的坐标，即浏览器左上角坐标的（ *0 , 0* ），该属性以浏览器左上角坐标为原点，计算鼠标点击位置距离其左上角的位置，

不管浏览器窗口大小如何变化，都不会影响点击位置的坐标。

```html
<div id="container" class="container"></div>
```

```css
*{
  margin: 0;
  padding: 0;
}
.container {
  width: 200px;
  height: 200px;
  background-color: red;
  border: 1px solid;
  overflow: auto;
  padding: 10px;
  margin: 20px;
}
```

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log(evt.clientX + ":" + evt.clientY);
}
```

在上面的代码中，我们为 *container* 盒子绑定了点击事件，获取该盒子的 *clientX* 以及 *clientY* 的值，接下来我们来进行点击测试：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-073614.png" alt="image-20211105153614467" style="zoom:50%;" />

我们分别点击该盒子的最左上角和最右下角，打印出来的值分别是（*20 , 20*）和 （*241 , 241*），可以看出这确实是以浏览器左上角坐标的（ *0 , 0* ）为原点来进行计算的。



#### *screenX* 和 *screenY* 属性

*screenX* 和 *screenY* 是事件发生时鼠标相对于屏幕的坐标，以设备屏幕的左上角为原点，事件发生时鼠标点击的地方即为该点的 *screenX* 和 *screenY* 值。例如：

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log(evt.screenX + ":" + evt.screenY);
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-074500.png" alt="image-20211105154500066" style="zoom:50%;" />

我们将浏览器缩小，同样是点击 *container* 盒子的最左上角，打印出来的是（*368 , 365*），因为这是以屏幕最左上角为原点的。



#### *offsetX* 和 *offsetY* 属性

这一对属性是指当事件发生时，鼠标点击位置相对于该事件源的位置，即点击该 *DOM* 元素，以该 *DOM* 左上角为原点来计算鼠标点击位置的坐标。例如：

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log("offsetX:", evt.offsetX);
  console.log("offsetY:", evt.offsetY);
}
```

同样点击 *container* 元素的最左上角，打印出（ *0, 0* ）



#### *pageX* 和 *pageY* 属性

顾名思义，该属性是事件发生时鼠标点击位置相对于页面的位置，通常浏览器窗口没有出现滚动条时，该属性和 *clientX* 及 *clientY* 是等价的。

例如：

```js
var container = document.getElementById("container");
container.onclick = function (ev) {
  var evt = ev || event;
  console.log("pageX:", evt.pageX);
  console.log("pageY:", evt.pageY);
  console.log("clientX:", evt.clientX);
  console.log("clientY:", evt.clientY);
}
```

此时点击 *container* 盒子，得到的 *pageX、pageY* 的值和 *clientX、clientY* 完全相同。

但是当浏览器出现滚动条的时候，*pageX* 通常会大于 *clientX*，因为页面还存在被卷起来的部分的宽度和高度。

例如：

```css
...
body{
  height: 5000px;
}
...
```

我们为 *body* 添加一个 *height* 为 *500px*，使其能够产生滚动效果，此时两组属性的区别就出来了。如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-05-080641.gif" alt="2021-11-05 16.06.06" style="zoom:50%;" />



------



-*EOF*-



# 更多知识



该部分知识的特点：

- 面试有较低的机率被问到
- 实际编码中用得不是太多



**1. 符号**

作用：消除魔法字符、避免一个复杂对象中含有多个属性的时候某个属性名覆盖掉、模拟类的私有方法

所在章节：ES6 详细版（袁进）

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-14-073533.png" alt="image-20220214153533405" style="zoom:50%;" />



**2.  迭代器和生成器**

作用：实现异步的一种方式，React 中大量使用到了生成器，Koa第一代也是大量用到了生成器。

所在章节：ES6 详细版（袁进）

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-14-073151.png" alt="image-20220214153151334" style="zoom:50%;" />





**3. 代理与反射**

作用：属于元编程的知识，写框架的时候会用到

所在章节：ES6 详细版（袁进）

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-14-073241.png" alt="image-20220214153240704" style="zoom:50%;" />



**4. 增强的数组功能**

作用：JavaScript 类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。

所在章节：ES6 详细版（袁进）

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-14-073319.png" alt="image-20220214153318805" style="zoom:50%;" />

