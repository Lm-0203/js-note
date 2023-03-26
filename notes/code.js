// 1 返回一个数组的最大值
const maxItemOfArray = (arr) => [...arr].sort((a, b) => b - a).slice(0, 1)[0];
let maxItem = maxItemOfArray([3, 5, 12, 5]);

// 2 检查数组的所有项是否相等
const areAllEqual = array => array.every(item => item === array[0]);

const check1 = areAllEqual([3, 5, 2]); //false
const check2 = areAllEqual([3, 3, 3]); //true


// 3 返回给定数的平均数
const averageOf = (...numbers) => numbers.reduce((a, b) => a + b, 0) / numbers.length;

let average = averageOf(5, 2, 4, 7); //4,5


// 4 反转字符串
const reverseString = str => [...str].reverse().join('');
let a = reverseString('Have a nice day!') //!yad ecin a evaH


// 5 返回给定数的和
const sumOf = (...numbers) => numbers.reduce((a, b) => a + b, 0);
let sum = sumOf(5, -3, 2, 1); //5

// 6 在字符串中查找给定的单词，并且替换另一词汇
const findAndReplace = (string, wordToFind, wordToReplace) => string.split(wordToFind).join(wordToReplace);

let result = findAndReplace('I like banana', 'banana', 'apple'); //I like apple

// 7 将RGB模式下的颜色转换为十六进制
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

let hex = RGBToHex(255, 255, 255);


// 8 你知道有多少音乐播放器可以拖拽播放项目吗？ 或许这段代码可以给你答案。
const shuffle = ([...array]) => {
    let m = array.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [array[m], array[i]] = [array[i], array[m]];
    }

    return array;
}

shuffle([5, 4, 3, 6, 20]);

// 9 移除数组中的false值
const removeFalseValues = arr => arr.fliter(item => item);
const arr1 = removeFalseValues([3, 4, false, '', 5, true, undefined, NaN, '']); //[3, 4, 5, true]

// 10 去重
const removeDuplicatedValues = array => [...new Set(array)];
const arr2 = removeDuplicatedValues([5, 3, 2, 6, 1, 2, 2, 6]);

// 11 日期对象返回字符串时间
const getTimeFormDate = data => data.toTimeString().slice(0, 8);
let time = getTimeFormDate(new Date()); //09:46:08

// 12 将字符串中所有单词的首字母大写
const capitalizeAllWords = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
let str = capitalizeAllWords('i love reading book');

// 13 返回两个日期之间的天数差
const getDayDiff = (datel, date2) => (date2 - date1) / (1000 * 3600 * 24);
let diff = getDayDiff(new Date('2020-04-01'), new Date('2020-08-15'));


// 14 将角度从弧度转为度
const radianToDegree = radian => (radian * 180.0) / Math.PI;
let degree = radianToDegree(2.3);

// 15 检查给定的字符串是否是有效的JSON
const isValidJSON = string => {
    try {
        JSON.parse(string);
        return true;
    } catch (error) {
        return false;
    }
};

const check3 = isValidJSON('{"title": "javascript", "price": 14}'); //true
const check4 = isValidJSON('{"title": "javascript", "price": 14, subtitle}');

// 16 将给定的字符串转换为一个单词数组
const toWords = (string, pattern = /[^a-zA-Z-]+/) => string.split(pattern).filter(item => item);

let words = toWords('I want to be come a great programmer'); //['I', 'want', 'to', 'be', 'come', 'a', 'great', 'programmer']

// 17 快速回到顶部时，滚动操作更加流畅
const scrollToTop = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop;

    if (t > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, t - t / 8);
    }
};

// 18 这段代码常被用于对一个数字进行有效的验证
const isValidNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n;

const check5 = isValidNumber(10); //true;
const check6 = isValidNumber('a'); //false;