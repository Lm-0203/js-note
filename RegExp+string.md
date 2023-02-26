## 正则表达式：由特殊字符组成的检测字符串是否符合某种规则的表达式;
## 正则表达式的作用:

+ 模式匹配：匹配字符串是否符合规则
+ 文字检索：检索文字位置或者敏感词;
+ 替换功能：替换敏感词

## 正则表达式的创建：
+ 通过构造函数创建正则的实例;

  第一个参数可以是字符串，也可以是正则表达式

  ```js
  var reg = new RegExp("正则表达式","修饰符");
  
  var reg1 = /abc/;
  var reg2 = new RegExp(reg1); // reg2 和 reg1 是不同地引用，返回一个新的正则
  
  var reg3 = RegExp(reg1); // reg3 和 reg1 拿的是同一个正则表达式的引用
  ```

+ 字面量的方式;

  ```js
  var reg = /正则表达式/修饰符;  (regular)
  ```

+ 正则表达式的数据类型 'object'

  ```js
  let reg = /[a]/;
  console.log(typeof reg) // 'object'
  ```

  

## 量词：表示数量的词;
1. a{n,m}   -->匹配a至少n次最多m次;
2. b{n,}   -->匹配字符b至少n次最多不限;
3. c{n}    --->匹配字符c只能n次;
4. a{0,}   -->字符a可有可无，多了不限。  * ---> {0,} --->  a\*
5. b{1,} -->匹配字符b至少1次多了不限。   + ---> {1,}  ---> b+
6. c{0,1} -->字符c可以有可无最多一次。   ? ---> {0,1} ---> c?

```js
var reg = /\w*/g;
var str = 'abc';
console.log(str.match(reg)); ['abc', ''] // 第一次匹配abc,因为*至少可以匹配0位，所以等光标移到c的后面的时候，又匹配到一个空串

var reg1 = /\d*/g;
var str1 = 'abc';
console.log(str1.match(reg1)); ['', '', '', '']

// 因为正则默认的贪婪匹配原则，能匹配多，就不匹配少，所以第一次用\w匹配的时候，因为可以直接匹配到a以及a后面的字母，就没有匹配空格

var reg = /\w?/g;
var str = 'aaa';
console.log(str.match(reg)); ['a', 'a', 'a', '']

var reg = /\w{1,3}/g; // 首先是贪婪匹配原则，能3个，不要1个
var str = 'aaaaaaaa';
console.log(str.match(reg)); ['aaa', 'aaa', 'aa']
```





## 字符集：一类字符的集合(只取其中一个字符)

> 表示一个字符的范围,一个方括号只能匹配到一个字符
>
> ```js
> /[0-9][a-z][\u4e00-\u9fa5]/
> ```

> 0 ---> 48
> 
> A ---> 65
>
> a ---> 97

1. 0到9    [0-9] -->表示-0到9之间的任意一个字符;  [0-9]{0,3}
2. a到z    [a-z] -->表示任意一个小写字母
3. A到Z    [A-Z] -->表示任意一个大写字符
4. [0-9a-zA-Z] 任意一个数字或者大小写字母
5. [\u4e00-\u9fa5]; //任意一个汉字;

- 基本汉字：[\u4e00-\u9fa5];
- 基本汉字补充：[\u9fa6-\u9fef];
## 元字符：转义后有特殊意义的字符(一个元字符，只能表示一个字符)
### 占位字符

+ \d ---> [0-9] 代表0-9之间的任意数字
+ \D ---> [^0-9] 代表除了0-9之间的任意字符;
+ \w ---> [0-9a-zA-Z_] 字符：字符只包含数字字母下划线;
+ \W ---> [^0-9a-zA-Z_][^\w] :除了数字字母下划线以外的其他符号
+ \s ---> 空格  直接一个空格也可以匹配 / / [\t\n\r\v\f ]
+ \S ---> 非空格;
+ .  ---> [^\r\n]除了换行符（\n）和行结束符(nul)以外的任意字符; 
+ \r ---> 行结束符，正常情况下，一个回车代表 \r\n
+ \b ---> 单词边界
+ 还有等等等。。。

```js
var reg = /\bcde\b/g;
var str = 'abc cde fgr';
console.log(str.match(reg)); //['cde']

var str2 = 'abc cdefgr';
console.log(str2.match(reg)); // null

var reg2 = /\bcde\B/g; // c是一个单词的边界，e不是一个单词的边界
console.log(str2.match(reg)); // ['cbe']
```

```js
var reg = /\nc/g;
var str = 'bac\ncdjk';

var reg2 = /\ta/g;
var str2 = 'fdk\tad';
```

## 修饰符：

+ i : 不区分大小写
+ m : 多行匹配
+ g : 全局匹配
+ u : 使用 unicode 码的模式进行匹配。
+ s : 允许 . 匹配换行符。
+ y : 匹配时，完全按照正则对象中的lastIndex位置开始匹配，并且匹配的位置必须在lastIndex位置。
  
  ```js
  const text = "Hello World";
  const reg = /W\w+/;
  console.log(reg.test(text)); // true

  const reg1 = /W\w+/y;
  console.log(reg1.test(text)); // false

  reg1.lastIndex = 6;
  console.log(reg1.test(text)); // true

  ```

可以一起使用，也可以自由匹配

```html
<script>
    var str = 'no zuo \nno die'; // \n是换行
    
    // 匹配n字符，并且n字符是一个字符串的开头
    // 如果不写m的话，只会匹配一行，第二行的n不会被匹配到
    var reg = /^n/gm; 
    
    console.log(str.match(reg)); // ['n', 'n']
</script>
```


## 匹配位置

### 不占位字符

+ ^ ：以什么开头 /^1/  以1开头（上尖角）
+ $ ：以什么结尾 /\d{9}$/ 以任意9位数字结尾;
+ \b ：以某个字符为边界   /\ba/  以字符a开头的单词，匹配字符a;
    
```html
<script>
    var str = 'no zuo no die';
    var reg = /\bn[a-z]+/g;
    var arr = str.match(reg);
    consoel.log(arr); //['no', 'no']
</script>
```
## 分组：()

(abc){3}--->匹配abc三次  abcabcabc:
## 或：|

匹配多个字符

```js
// 匹配字符a、b、c、d四个字符，只要遇到这四个字符，就开始匹配，然后做某些操作;
var  reg = /a|b|c|d/;
```

```js
var reg = /(abc|bcd)[0-9]/g;
var str = abc2;
console.log(str.match(reg)); // ['abc2']
```


## 正则的方法：

### text方法：

语法：正则.test(字符串);

返回值：如果匹配成功，则返回true，否则返回false;

作用：验证字符串是否符合正则的规则，或者是这个正则测验有没有符合我规则的字符串片段

```js
let reg = /^1[3-7]\d{9}$/；
```

### exec [ɪɡˈzek]

语法：正则.exec(字符串);

返回值：如果匹配成功，则返回类数组。否则返回null;

注意：返回值上面有一个index属性（正则.exec(字符串).index） ：发现敏感词的位置

正则.lastIndex ：下次开始查找的位置;可读写属性。

作用：查找敏感词的位置
    

```html
<script>
var str = 'ad889ss848sc89';
var reg = /\d+/g; //如果不写全局，会死循环
var arr = [];
while ((arr = reg.exec(str)) != null) {
	console.log('在' + arr.index + '位置发现敏感词；在' + reg.lastIndex + '位置开始查找');
}
//不加g的话，lastIndex会一直是0
</script>

```

## 支持正则的字符串方法：

### str.split(正则);

字符串分割成数组

语法：字符串.split(正则);[splɪt]

返回值：是一个数组;

```js
var str = '123   34 90 sld   lt';
var reg = /\s+/;
var arr = str.split(reg);
console.log(arr); // ["123", "34", "90", "sld", "lt"]

var str = '123   34 90 sld   lt';
var reg = /\s/;
var arr = str.split(reg);
console.log(arr); // ["123", "", "", "34", "90", "sld", "", "", "lt"]

var str = ' ';
var reg = /\s/;
var arr = str.split(reg);
console.log(arr); // ["", ""]

// 如果正则里面有子表达式,返回的数组里面会带上子表达式的内容
var reg = /(\w)\1/;
var str = 'abcdeefghhigk';
console.log(str.split(reg)); // ["abcd", "e", "fg", "h", "igk"]
```



### str.search(正则);

返回值：如果匹配到则返回对应字符串的下标，否则返回-1;

```js
var str = 'edbaabb';
var reg = /(\w)\1(\w)\2/g;
console.log(str.search(reg)); // 3
```

### str.match(正则);

返回值：数组，如果匹配到，则返回匹配到的内容，如果匹配不到，返回null。

如果不写修饰符g，默认只匹配一次，数组的长度是1

```js
var str = '123ASD390xusos34uk';
var reg = /\d+/g;
var arr = str.match(reg);
console.log(arr); // ["123", "390", "34"]
```



```js
var reg = /[^a][^b]/g;
var str = 'ab1cd';
console.log(str.match(reg)); // ['b1', 'cd']
```



```js
var str = 'aabb';
// 如果正则不加g
var reg = /(\w)\1(\w)\2/;
console.log(str.match(reg)); 
// ['aabb', 'a', 'b', index:0, input:'aabb'] 
// 返回值的效果同reg.exec(str)类似

// 如果正则加g
var reg = /(\w)\1(\w)\2/g;
console.log(str.match(reg)); // ['aabb']
```



### str.replace(参数1，参数2)

​语法：str.replace(参数1，参数2);

参数1：可以是正则，也可以是字符串;

参数2：可以是回调函数，也可以是字符串;

如果想替换成$,必须用$转义$,也就是$$

只能匹配一个，如果是第一个参数是字符串

```js
var str = 'aa';
console.log(str.replace('a', 'b')); // 'ba';

console.log(str.replaceAll('a', 'b')); // 'bb';

// 如果第一个参数是正则的话，给正则加上修饰符g，就可以全局匹配了
console.log(str.replace(/a/g, 'b');) // 'bb'
```

```js
// 用回调函数的返回值替换正则匹配到的字符串
var str = '顶逛街-韩双双-星宿个-付尚可-李超';
var reg = /韩双双|李超/g;

var newStr = str.replace(reg, function($) {
    var star = '';
    for (var i = 0; i < $.length; i++) {
        star += '*';
    }
    return star;
})
console.log(newStr);
```

- 如果参数1是字符串的话，没有全局匹配的能力，只能匹配一个
  
    ```html
    <script>
      var str = 'aa';
      console.log(str.replace('a', 'b')); // 返回结果的是ba，只能匹配第一个，而正则表达式，加上全局g，就能多个匹配
    </script>
    ```
    
    ```html
    <script>
      var reg = /(\w)\1(\w)\2/;
      var str = 'aabb';
      console.log(str.replace(reg, '$2$2$1$1'));
      //$1表示第一个子表达式的内容，$2表示第二个子表达式的内容
    </script>
    ```
    
- 通过正则将一个单词变成小驼峰式
  
    ```html
    <script>
      var reg = /-(\w)/g;
      var str = 'the-first-name';
      var newStr = str.replace(reg, function($, $1) {
          // return 相当于替换$匹配到的内容，
          return $1.toUpperCase();
      })
      console.log(newStr); // "theFirstName"
      //里面第一个参数传的是正则表达式匹配到的全局，第二个参数是第一个子表达式匹配到的内容，依次类推；
    </script>
    ```

+ 把aabb 变成bbaa

  ```js
  var str = 'aabb';
  var reg = /(\w)\1(\w)\2/g;
  
  console.log(str.replace(reg, '$2$2$1$1')); // bbaa
  
  console.log(str.replace(reg, function($, $1, $2) {
      return $2 + $2 + $1 + $1
  })) // bbaa
  ```
  - . ：除了换行符和行结束符以外的任意字符; 
    点：除了换行符以外和行结束符以外的任意字符;\n \r


  - / 斜杠
  - \ 反斜杠 在正则里面，有特殊含义的字符，都要用反斜杠转义，例如? + * ( )等等等 


----------------------------------------------------------------
## 常用的正则

```html
<script>
    var reg = /^1[3-9]\d{9}$/   //手机号码

    var reg = /^0\d{2}\d?-\d{7}\d?$/;  //判断作机 3/4位区号 - 7/8为数字

    //数字，字母下划线，点，减组成的任意序列，至少包含一个数字，至少包含一个字母,8-16位
    var reg = /^(?=.*\d)(?=.*[a-zA-Z])[\w\.\-]{8, 16}$/;
</script>
```

## 正向预查  正向断言

```html
<script>
  var str = 'abaaabaa';  
  var reg = /a(?=b)/g;//想匹配到一个后面是b的a，但是只要a不要b
  var reg = /a(?!b)/g;//想匹配到一个后面不是b的a，但是只要a不要b
</script>
```
## 非贪婪匹配

正常正则表达式的原则是贪婪匹配

在任何量词的后面加一个问好？，就能把正则变成非贪婪匹配

```html
<script>
    var str = 'aaaaabdjd29c8u98c'
    var reg = /\w+?/; //能找到一个数字就不会再找了
    var reg2 = /\d??/; //第一个？代表量词，匹配0次，或一次，第二个问号代表，能取0不取1；
    var reg3 = /a{3,6}?/; //能来3个，不要4个

    var str = 'aaa';
    var reg4 = /a??/g;
    console.log(str.match(reg4));// ['', '', '', '']
</script>
```

## 练习

- 字符串去重
  ```html
  <script>
    var str = 'aaaaabbbbbcccccc'
    var reg = /(\w)\1*/g; //*匹配前面的\1,因为是贪婪匹配，能匹配无数位，不会匹配0位
    // 正则是全局匹配，会匹配到'aaaaa', 'bbbbb', 'cccccc', 把他们拿各自的$1替换
    var newStr = str.replace(reg, '$1'); // "abc"
  </script>
  ```

- html换行写

  ```js
  var test = "\ // 把换行符转义
  <div></div>\
  <span></span>\
  ";
  var text = `
    <div></div>
    <span></span>
  `
  ```

- 检验一个字符串首尾是否含有数字

  ```js
  // 首尾都有
  var reg = /^\d[\s\S]*\d$/g;

  // 只有首或者只有尾
  var reg = /^\d[\s\S]*|\d$/g; 

  // 目的是本来想的是用 .   来代替所有的字符，但是 [\s\S] 比 . 更加准确
  ```

- 匹配四个连续相同的单词

  ```js
  var str = 'aaaa';
  var reg = /(\w)\1/g;
  // 小括号是子表达式，后面加一个\1(给数字1进行转义),就是匹配第一个子表达式里面元素的内容，或者说是反向引用第一个子表达式匹配到的内容,
  // 如果我要匹配四个连续相同的字母
  var reg1 = /(\w)\1\1\1/g;
  console.log(str.match(reg1)); // ['aaaa']

  var str2 = 'aabb';
  console.log(str2.match(reg1)); // null

  var reg3 = /(\w)\1(\w)\2/g;
  console.log(str2.match(reg3)); // \2就是反向引用第二个字表达式的内容

  console.log(reg.exac(str2)); 
  //['aabb', 'a', 'b', index:0, input:'aabb']
  // 可以显示出第一个子表达式和第二个子表达式匹配到的内容
  ```

- 给一个字符串用科学计数法表示

  ```js
  var str = '10000333388';
          
  let num = str.length % 3;
  str = str.substr(0, num) + str.substr(num).replace(/(\B(\d{3}))/g, ',$1')
  console.log(str);


  var str = '10000333388';

  str = str.replace(/(?=(\B)(\d{3})+$)/g, ',')
  str = str.replace(/(?=\B)(?=(\d{3})+$)/g, ',') // "10,000,333,388"
  str = str.replace(/(?=\B)(?=(\d{3})+)$/g, ',')  // "10000333388"

  console.log(str);
  ```

## 字符串和正则表达式

### 更好的Unicode支持

早期，由于存储空间宝贵，Unicode使用16位二进制来存储文字。我们将一个16位的二进制编码叫做一个码元（Code Unit）。

16位二进制，2的16次方，最多保存65536个文字。

后来，由于技术的发展，Unicode对文字编码进行了扩展，将某些文字扩展到了32位（2的32次方，占用两个码元），并且，将某个文字对应的二进制数字叫做码点（Code Point）。这就导致有些文字会占用两个码元，有些文字占一个码元。

ES6为了解决这个困扰，为字符串提供了方法：codePointAt，根据字符串码元的位置得到其码点。

同时，ES6为正则表达式添加了一个flag: u，如果添加了该配置，则匹配时，使用码点匹配

```js
const text = "𠮷"; //占用了两个码元（32位）

console.log("字符串长度：", text.length); // 2 js取字符串长度是按照码元来取的。
console.log("使用正则测试：", /^.$/.test(text)); // false 正则表达式也是按照码元来匹配的。这段正则是匹配任意一个字符，但是 𠮷 看着是一个字，但是是两个字符，或者两个码元。
console.log("使用正则测试：", /^.$/u.test(text)); // true 加了flag：u，使用码点匹配

console.log("得到第一个码元：", text.charCodeAt(0));
console.log("得到第二个码元：", text.charCodeAt(1));

//𠮷：\ud842\udfb7
console.log("得到第一个码点：", text.codePointAt(0));
console.log("得到第二个码点：", text.codePointAt(1));

/**
 * 判断字符串char，是32位，还是16位
 * @param {*} char 
 */
function is32bit(char, i) {
    //如果码点大于了16位二进制的最大值，则其是32位的
    return char.codePointAt(i) > 0xffff;
}
console.log("𠮷是否是32位的：", is32bit("𠮷", 0))


/**
 * 得到一个字符串码点的真实长度
 * @param {*} str 
 */
function getLengthOfCodePoint(str) {
    var len = 0;
    for (let i = 0; i < str.length; i++) {
        //i在索引码元
        if (is32bit(str, i)) {
            //当前字符串，在i这个位置，占用了两个码元
            i++;
        }
        len++;
    }
    return len;
}

console.log("ab𠮷ab的码点长度：", getLengthOfCodePoint("ab𠮷ab"))
```


# 更多的字符串API

以下均为字符串的实例（原型）方法

- includes

  判断字符串中是否包含指定的子字符串

  第二个参数：从指定下标开始查找
  
  返回值：true ｜ false

  ```js
  const text = "成哥是狠人";
  console.log("是否包含“狠”：", text.includes("狠", 3));
  ```

- startsWith

  判断字符串中是否以指定的字符串开始

  ```js
  const text = "成哥是狠人";
  console.log("是否以“成哥”开头：", text.startsWith("成哥"));
  ```

- endsWith

  判断字符串中是否以指定的字符串结尾

  ```js
  const text = "成哥是狠人";
  console.log("是否以“狠人”结尾：", text.endsWith("狠人"));
  ```

- repeat

  将字符串重复指定的次数，然后返回一个新字符串。

  ```js
  const text = "成哥是狠人";
  console.log("重复4次：", text.repeat(4));
  ```

# 模板字符串

ES6之前处理字符串繁琐的两个方面：

1. 多行字符串
2. 字符串拼接

在ES6中，提供了模板字符串的书写，可以非常方便的换行和拼接，要做的，仅仅是将字符串的开始或结尾改为 ` 符号

如果要在字符串中拼接js表达式，只需要在模板字符串中使用```${JS表达式}```

```js
var love1 = "秋葵";
var love2 = "香菜";

var text = `邓哥喜欢${love1}
邓哥也喜欢${love2}
表达式可以是任何有意义的数据${1 + 3 * 2 / 0.5}
表达式是可以嵌套的：${`表达式中的模板字符串${love1 + love2}`}
\n\n
奥布瓦的发顺丰
在模板字符串中使用\${JS表达式}可以进行插值
`;

console.log(text);
```

# 带标签的模板字符串

更高级的形式的模板字符串是带标签的模板字符串。标签使您可以用函数解析模板字符串。标签函数的第一个参数包含一个字符串值的数组。其余的参数与表达式相关。最后，你的函数可以返回处理好的的字符串（或者它可以返回完全不同的东西 , 如下个例子所述）。用于该标签的函数的名称可以被命名为任何名字。

在模板字符串书写之前，可以加上标记:

标记是一个函数，函数参数如下：

1. 参数1：被插值分割的字符串数组
2. 后续参数：所有的插值

```js
var love1 = "秋葵";
var love2 = "香菜";

// 标记名`模板字符串` -> 这么写就相当于 myTag 函数的调用
var text = myTag`邓哥喜欢${love1}，邓哥也喜欢${love2}。`;

//相当于： 
// text = myTag(["邓哥喜欢", "，邓哥也喜欢", "。"], "秋葵", "香菜")

// 标记名需要自己定义
function myTag(parts) {
    const values = Array.prototype.slice.apply(arguments).slice(1);
    let str = "";
    for (let i = 0; i < values.length; i++) {
        str += `${parts[i]}：${values[i]}`;
        if (i === values.length - 1) {
            str += parts[i + 1];
        }
    }
    return str;
}

console.log(text);

```

# String.row

使用String.raw() 用来获取一个模板字符串的原始字符串的

```js
String.raw`Hi\n${2+3}!`; // 'Hi\\n5!'

let name = "Bob";
String.raw `Hi\n${name}!`; // 'Hi\\nBob!'

String.raw`abc\t\nbcd`; // 'abc\\t\\nbcd'
```

```js
const container = document.getElementById("container");
const txt = document.getElementById("txt");
const btn = document.getElementById("btn");

btn.onclick = function(){
    container.innerHTML = safe`<p>
        ${txt.value}
    </p>
    <h1>
        ${txt.value}
    </h1>
    `;
}

function safe(parts){
    const values = Array.prototype.slice.apply(arguments).slice(1);
    let str = "";
    for (let i = 0; i < values.length; i++) {
        const v = values[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        str += parts[i] + v;
        if (i === values.length - 1) {
            str += parts[i + 1];
        }
    }
    return str;
}
```


