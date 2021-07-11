---
title: 《JavaScript高级程序设计》红宝书第二遍阅读（动手实践）
date: 2020-05-28
---

### 第1章——什么是JavaScript

DOM将整个页面抽象为一组分层节点。

BOM用于支持访问和操作浏览器的窗口。

-------------------------

### 第2章——HTML中的JavaScript

- **2.1  < script >元素**

| 元素        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| async       | 立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载，只对外部脚本文件有效； |
| charset     | 使用src指定代码字符集，很少使用，大多数浏览器不在乎它的值；  |
| crossorigin | 配置相关CORS(跨源资源共享)设置。默认不使用CORS；             |
| defer       | 表示在文档解析和显示完成后，再执行脚本，只对外部脚本文件有效； |
| integrity   | 运行比对接收到的资源和指定的加密签名以验证子资源的完整性(SRI，Subresource Intergrity)。可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。 |
| src         | 包含要执行的代码的外部文件；                                 |
| type        | 表示代码中脚本语言的内容类型（也称MIMI类型），这个值始终是“text/javascript”，如果这个值是module，则代码会被当作ES6模块，而且只有这种时候，代码中才能出现import和export关键字。 |

**2.1.3  异步加载脚本**

async属性和defer，两者都能适用于外部脚本，告诉浏览器立即开始下载。

```html
<html>
	<head>
	<title>异步执行脚本</title>
	<script async src="main.js></script>
	<script async src="main1.js></script><!--可能先于第一个脚本执行-->
	</head>
	<body>
	</body>
</html>
```

**2.1.4  动态加载脚本**

````javascript
let script = document.createElement('script');
script.src = 'gibberish.js';
script.async = false;
document.head.appendChild(script);
````

--------------------------------------------------------------------------------------------------------------------------------------------------------

### 第3章——语言基础

var声明的变量会被提升（hoist），把所有变量声明都拿到函数作用域顶部，在函数退出时被销毁。

```javascript
//var 提升（hoist）
function foo(){
    console.log(age);
    var age = 21;
}
foo();
// ↑上面的相当于提升后的下面↓
function foo(){
    var age;//把所有变量声明都拿到函数作用域顶部
    console.log(age);
    age = 21;
}
foo();
```

let声明的范围是**块作用域**，var声明的范围是**函数作用域**。

````javascript
//let声明
function f1(){
  let n = 5;
  if(true){
    let n = 10;
  }
  console.log(n); // 5 使用let声明的变量 外层代码块 不受 内层代码块 的影响。
//var声明
function f1(){
  var n = 5;
  if(true){
    var n = 10;
  }
  console.log(n); // 10 使用var定义变量n，块作用域下最后输出的值是 内层代码块 的结果。

````

const声明范围也是**块作用域**，是必须同时**初始化变量**。

````javascript
const age = 'kuishou';
if(true){
    const name = 'zhangsan';
}
console.log(age);//kuisou 
console.log(name);//undefined 块作用域只能拿到当前层代码块的结果。
````

**注意**：平时使用中，const优先，let次之。

- **3.4数据类型**

typeof操作符：用来区分函数和其他对象

**undefined 和 null 的****区别**：

**undefined 类型**：表示声明了变量但是未初始化（没有值），undefined是由null中派生而来的。

**null类型**：表示一个空对象指针。

**boolean类型**：要将一个其他类型的值转换成布尔值，可以调用Boolean()转换函数。

````javascript
let message = "Hello kuishou";
if(message){
    console.log("message 已经转换成布尔类型");
}//if等流控制语句会自动执行其他类型转换为布尔类型语句
````

**Number类型**：表示整数和浮点值，范围在Number.MIN_VALUE~Number.MAX_VALUE之间。

````javascript
let Number = 68;    //整数

let octalNum1 = 070;//八进制56
let octalNum3 = 08;//无效的八进制数，当成8处理

let folatNum1 = 0xA;//十六进制10
let folatNum2 = 0x1f;//十六进制31

let floatNum1 = 1.1;
let floatNum2 = 0.1;
let floatNum3 = .1;//有效，但不推荐

let floatNum4 = 1. //小数点后面没有数字，当做1处理
let floatNum5 = 10.0 //小数点后面是0，当成整数处理

let floatNum6 = 3.153e7;//以3.153为系数，乘以10的7次幂；
````

**NaN**（Not a Number）：意思'不是数值',**表示**本来要返回数值的操作失败了。

**isNaN() 函数**：接收一个任意类型的参数，判断这个参数是否‘不是数值’

````javascript
console.log(isNaN(NaN));//true
console.log(isNaN(10));//false,10是数值
console.log(isNaN("10"));//false,可以转换为数组
console.log(isNaN("blue"));//true,不可以转换为数值
console.log(isNaN(true));//false,可以转换成数值1

let num1 = Number("Hello kuishou");//NaN  字符串"Hello kushou"找不到对应的值的时候会提示NaN
let num2 = Number("");             //0
let num3 = Number("000011");       //11
let num4 = Number(true);           //1
````

**数值转换**：Number、parseInt()、parseFloat()

**paresInt() 函数**：能识别不同的整数格式（十进制、八进制、十六进制）

````javascript
let num1 = parseInt("1234blue");//1234
let num2 = parseInt("");        //NaN
let num3 = parseInt("0xA");     //10,解释为十六进制
let num4 = parseInt(22.5);      //22
let num5 = parseInt("70");      //70,解释为十进制

let num1 = parseInt("10",2);    //2,按二进制解析
let num2 = parseInt("10",8);    //8,按十进制解析
let num3 = parseInt("10",10);   //10,按十进制解析
let num4 = parseInt("10",16);   //16，按十六进制解析
````

**String 类型**：可以用双引号（"）、单引号（'）、反引号（`）标示。

````javascript
let Name = "kuishou";
let Name = 'lingxiu';
let Name = `jianlin`;
````

**toSting()**： 转换为字符串。

````javascript
let num = 10;
console.log(num.toString(2));//1010,转换成二进制数

let num = "kuishou";
console.log(String(num));   //kuishou
````

**模板字面量**：求值后得到的字符串，保留换行字符，可以跨行定义字符串。

````javascript
let myMultLineString = `first line\nsecond line`;
let myMultLineTemplatLiteral = `first line second line`;
console.log(myMultLineString);                              //first line
                                                            // second line
console.log(myMultLineTemplatLiteral);                      //first line second line
console,log(myMultLineString == myMultLineTemplatLiteral);  //true
//模板字面量在定义模板时特别有用，比如下面这个 HTML 模板:
let `
<div>
    <a href="#">
        <span>kuishou</span>
    </a>
</div>
`
````

**字符串插值**：可以在一个连续定义中插入一个或多个值。

````javascript
let value = 5;
let exponent = 'second';
// 以前的写法
let interpolatedString =
 value + ' to the ' + exponent + ' power is ' + (value * value);
// 现在的写法
let interpolatedTemplateLiteral =
 `${ value } to the ${ exponent } power is ${ value * value }`;
console.log(interpolatedString); // 5 to the second power is 25
console.log(interpolatedTemplateLiteral); // 5 to the second power is 25 
//模板也可以插入自己之前的值：
let value = '';
function append(){
    value = `${value}abc`
    console.log(value);
}
append();   //abc,第一遍显示abc
append();   //abcabc,第二遍在abc前面加了abc
append();   //abcabcabc,第三遍在abcabc前面加个abc
````

**模板字面量标签函数**：通过标签函数自定义插值行为.

````javascript
let a = 8;
let b = 9;
function simpleTag(strings,aValExpression,bValExpression,sumExpression){
    console.log(strings);// ["", " + ", " = ", ""]
    console.log(aValExpression);// 6
    console.log(bValExpression);// 9
    console.log(sumExpression);// 15
    return 'foobar';
}
let untaggedRealut = `${a} + ${b} = ${a+b}`;
let taggedRedult = simpleTag`${a} + ${b} = ${a+b}`;
console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "foobar" 
````

**Symbol类型**：确保**对象属性**使用使用唯一的标识符，不会发生冲突的危险。是用来创建唯一记号，进而用作非 字符串形式的对象属性。

````javascript
let o = {
    [Symbol('fool')]:'foo val', 
    [Symbol('bar')]:'bar val'
}
console.log(o);             //{Symbol(fool): "foo val", Symbol(bar): "bar val"}

let barSymbol = Object.getOwnPropertySymbols(o)
                .find((symbol) => symbol.toString().match(/bar/));
console.log(barSymbol);     //Symbol(bar)
````

| Symbol符号                | 属性                                                         |
| ------------------------- | ------------------------------------------------------------ |
| Symbol.asyncItertor       | 一个方法，该方法返回的对象默认到的AsyncItertor,由for-await-of语句使用。 |
| Symbol.hasInstance        | 一个方法，该方法决定一个构造器对象是否认可的一个对象是它的实例。 |
| Symbol.isConcatSpreadable | 一个布尔值，如果是true,则意味着对象应该用Array.protype.concat()打平其数组元素。 |
| Symbol.iterator           | 一个方法，该方法返回**对象默认的迭代器**，由for-of语句使用   |
| Symbol.match              | 一个正则表达式，该方法用**正则表达式**去匹配字符串。         |
| Symbol.replace            | 一个正则表达式方法，该方法**替换**一个字符串中匹配的字符     |
| Symbol.search             | 一个正则表达式方法，该方法返回字符串中匹配**正则表达式的索引** |
| Symbol.species            | 一个函数值，该函数作为创建**派生对象**的构造函数             |
| Symbol.spilt              | 一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。 |
| Symbol.toPrimitve         | 一个方法，该方法将对象转换为相应的原始值。                   |
| Symbol.toStringTag        | 一个字符串，该字符串用于创建对象的默认字符串描述。           |
| Symbol.unscopables        | 一个对象，该对象所有的以及继承的属性，都会从关联对象的With环境绑定中排除。 |

**Object 类型**：通过创建 Object 类型的实例来创建自己的对象，然后再给对象添加属性和方法。

| Object实例                         | 属性                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| constructor                        | 用于创建当前对象的函数。                                     |
| hasOwnProperty(propertyName)       | 用于判断当前对象实例（不是原型）上是否存在给定的属性。       |
| isPrototypeOf(object)              | 用于判断当前对象是否为另一个对象的原型。                     |
| propertyIsEnumerable(propertyName) | 用于判断给定的属性是否可以使用。                             |
| toLocaleString()                   | 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。 |
| toString()                         | 返回对象的字符串表示。                                       |
| valueOf()                          | 返回对象对应的字符串、数值或布尔值表示。                     |

- **3.5一元操作符（只操作一个值的操作符）**

位操作符：有符号整数使用32位前31位表示整数值，第32位表示数值的符号，这一位称为**符号位**，他的值决定了数值其余部分的格式。

布尔操作符：逻辑与&&（短路操作符）、逻辑或||、逻辑非!

乘性操作符：乘法*、除法/、取模%

指数操作符：Math.pow(底数，指数)

加性操作符：加法+、减法-

关系操作符：小于<、大于>~~~

- **3.6语句**

**if语句**：

````javascript
if(i>18){
    console.log("成年了！");
}else if(i>22){
    soncole.log("大学毕业了！");
}else{
    console.log("找工作了！");
}
````

**do-while语句**:后测试语句

````javascript
let i = 0;
  do{
    i += 2;
    console.log(i);
}while(i<10);
````

**whilel语句**: 先测试语句

````javascript
let i = 0;
while(i<10){
    i += 2;
    console.log(i);
}
````

**for语句**:

````javascript
for(let i = 0;i<10;i++){
    console.log(i);
}
````

**for-in语句**：for(property in windows )  statment，用于枚举对象中的非符号键属性，每次循环都给变量property 赋予一个 windows对象的属性作为值，直到所有属性都被枚举一遍。

````javascript
for(const propName in windows){
    console.log(propName);
}//表示每次执行循环，都会给变量propName赋予一个windows对象的属性作为值，直到windows的所有属性都被枚举一遍。
````

**for-of语句**：for(const el of [1,3,5,7])，用于遍历可迭代对象的元素，循环会持续到所有元素都别迭代完。

````javascript
for(const el of [1,3,5,7,9]){
    console.log(el);//以此输出1,3,5，7,9
}
````

**for in 和 for of 的区别:**

````javascript
var a = ["a","b","c","d","e"];
for (var idx in a) {//建议 循环对象属性 的时候使用。
 console.log( idx );
}
// 0 1 2 3 4   for..in 在数组 a 的键 / 索引上循环。
for (var val of a) {//建议 遍历数组 的时候使用
 console.log( val );
}
// "a" "b" "c" "d" "e"   而 for..of 在 a 的 值 上循环。
````

①在底层，for..of 循环向 iterable 请求一个迭代器，然后反复调用这个迭代器把它产生的值赋给循环迭代变量。---《你不知道的JavaScript-下卷》

②for..of可以通过break、continue、return 提前终止，并抛出异常。---《你不知道的JavaScript-下卷》

**break 和 continue的区别**：

**break语句**：跳出当前循环，执行循环后的下一条语句；

````javascript
let num = 0;
for(let i = 1;i<10;i++){
    if(i%5==0){
        break;
    }
    num++;
}
console.log(num);//结果是4,为什么？
                 //因为循环体递增到i能够被5取模的时候，循环体已经跳出了，num没有继续+1
````

**continue语句**：退出循环后，再次回到循环顶部重新开始执行。

````javascript
let num = 0; 
for(let i = 1;i<10;i++){
    if(i%5==0){
        console.log(num);
        continue;
    }
    num++;
    console.log(num);
}
console.log(num);//结果是8，为什么？
                 //因为循环体递增到i能够被5取模的时候，遇到continue跳出，再次回到循环顶部重新执行了一遍，
                 //又因为0%5和1%5都等于1，所以最终结果为8。
````

**switch语句**：

````javascript
switch(i){
    case 25:
        console.log("25");
        borek;
    case 35:
        console.log("35");
        borek;
    case 45:
        console.log("45");
        borek;
    case 55:
         console.log("55");
         borek;
    default:
        console.log("Outher");
}
````

**With语句**：用于设置代码在特定对象中的作用域

````javascript
var sMessage ="hello kuishou";
with(sMessage){
    alert(toUpperCase());//
}
````

- **3.7函数**

diff()函数：结算两个数值的差。

````javascript
function diff(num1,num2){//diff()函数用于计算两个数值的差
    if(num1<num2){
        return num2 - num1;
    }else{
        return num1-num2;
    }
}
````

sayHi()函数：合并传递的参数，并用逗号隔开。

--------------------------------------------------------------------------------------------------------------------------------------------------------

### 第4章——变量、作用域与内存

- **4.1传递参数**

````javascript
function addTen(num){
    num +=10;
    return num;
}
let count = 20;
let result = addTen(count);
console.log(count);//20
console.log(result);//30

function setName(obj) {
 	obj.name = "kuishou";
	obj = new Object();
 	obj.name = "jianlin";
}
let person = new Object();
setName(person);
console.log(person.name);//kuishou
````

- **4.2执行上下文与作用域。**

每个上下文都有一个关联的**变量对象**,这个上下文中定义的所有变量和函数都存在于这个对象上。

````javascript
var color = "blue";
function changeColor(){
    if(color === "blue"){
        color = 'red';
    }
}
changeColor();     //这个函数的作用域包含两个对象：所以能把red显示在全局变量中
console.log(color);//red
````

- **4.3垃圾回收**

  确定某个变量不会再使用，然后释放它占用的内存，周期性清理，属于’不判定的‘问题。

  两种标记策略：标记清理、引用计数。

  	**标记清理**流程：声明一个变量时，这个变量就会被加上 **存在于上下文  **的标记，垃圾回收程序运行的时候，被加上标记的变量就是待删除变量，随后垃圾回收程序做一次内存清理，销毁带标记的所有值并回收他们的内存。

````javascript
functiontest(){
 vara = 10 ; //被标记
 ，进入环境
 varb = 20 ; //被标记
 ，进入环境
}
test();//执行完毕
 之后 a、b又被标离开环境，被回收。
````

```
	**引用计数**：对每个值都记录它被引用的次数，变量被引用一次，那么引用数+1；变量被其他值覆盖，引用值-1；当引用值为0的时候，回收其内存。
```

````javascript
functiontest(){
 vara = {} ; //a的引用次数为0
 varb = a ; //a的引用次数加1，为1
 varc =a; //a的引用次数再加1，为2
 varb ={}; //a的引用次数减1，为1
}
````



--------------------------------------------------------------------------------------------------------------------------------------------------------

### 第5章——基本引用类型

- **5.1 Date 类型**

````javascript
let now = new Date();
console.log(now);//Tue Mar 23 2021 18:03:19 GMT+0800 (中国标准时间)
````

- **5.2 RegExp 正则表达式**

````javascript
// g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
// i：不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
// m：多行模式，表示查找到一行文本末尾时会继续查找。
// y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
// u：Unicode 模式，启用 Unicode 匹配。
// s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）。
// 匹配字符串中的所有"at"
let pattern1 = /at/g;
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern2 = /[bc]at/i;
// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern1 = /[bc]at/i;
// 匹配第一个"[bc]at"，忽略大小写
let pattern2 = /\[bc\]at/i;
// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;
// 匹配所有".at"，忽略大小写
````

- **5.3  原始值包装类型**

**Boolean 类型**

````javascript
let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(result);//true
````

**Number 类型**

````javascript
let num = 10;
console.log(num.toString(2));//1010，转换成二进制
console.log(num.toFixed(2));//10.00,返回2位小数点位数的数值字符串
console.log(num.toExopnential(1));//1.0e+1，带0-20个小数位的数值
console.log(num.toString(1));//1.0e+2,带1-21个小数位的数值
````

**String 类型**

````javascript
let stringValue = new String("Hello kuishou");
console.log(stringValue.length);//13,字符串的字符数量为13，一个空格占两个字节

let stringValue = "Hello kuishou";
console.log(stringValue.slice(3));//llo kuishou，从左边0位开始，返回3后面所有的字符串
console.log(stringValue.slice(3,7));//llo，从左边0位开始，返回3-7这个区间内所有的字符串
console.log(stringValue.slice(-3));//hou,从右边开始，返回-3前面面所有的字符串
console.log(stringValue.slice(3,-4));//llo kui，从右边开始，返回3-7这个区间内所有的字符串

console.log(stringValue.indexOf("o"))//4,从左边开始，找出字母o所在的位置
console.log(stringValue.lastIndexOf("o"))//11,从左边开始，找出字母o所在的位置
console.log(stringValue.indexOf("o",6));//11,从位置6（字符k）开始向后开始搜索，在位置11找到了o
console.log(stringValue.lastIndexOf("o",6));//4,从位置6（字符k）开始反向开始搜索，在位置4找到了o
````

**trim()方法**：创建字符串的一个副本，删除前后所有空格符，再返回起结果。

````javascript
let stringValue = " hello world ";
let trimmedStringValue = stringValue.trim();
console.log(stringValue); // " hello world "
console.log(trimmedStringValue); // "hello world" 
````

**repeat()方法**：接收一个参数，将字符串复制参数中指定的次数，然后拼接所有副本的结果。

````javascript
let stringValue = "na ";
console.log(stringValue.repeat(16) + "batman");
// na na na na na na na na na na na na na na na na batman
````

- **5.4  Math**

````javascript
let max = new Math.max(1,2,3,4,5);
console.log(max);//

let min = new Math.min(1,2,3,4,5);
console.log(min);
````

**Math.round()**方法执行四舍五入

**Math.ceil()方法**：始终向上舍入最接近的整数。

**Math.floor()方法**：始终向下舍入最接近的整数。

**Math.round()方法**：执行四舍五入。

**Math.fround()方法**：返回数值最接近的单精度（32位）浮点值表示。

````javascript
console.log(Math.ceil(25.9));//26,向上取整
console.log(Math.ceil(25.5));//26
console.log(Math.ceil(25.4));//26
console.log(Math.ceil(25.1));//26

console.log(Math.floor(25.9));//25，向下取整
console.log(Math.floor(25.5));//25
console.log(Math.floor(25.4));//25
console.log(Math.floor(25.1));//25

console.log(Math.round(25.9));//26，四舍五入
console.log(Math.round(25.5));//26
console.log(Math.round(25.4));//25
console.log(Math.round(25.1));//25

console.log(Math.fround(25.9));//25.899999618530273，返回数值最接近的单精度浮点值
console.log(Math.fround(25.5));//25.5
console.log(Math.fround(25.4));//25.399999618530273
console.log(Math.fround(25.1));//25.100000381469727
````

**Math.random()**生成随机数。

```javascript
let num = Math.floor(Math.random()*10+1);
console.log(num);//1~10范围内的随机数

/*-------------------------- */
function selectFrom(lowerValue,upperValue){
    let choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
let num = selectFrom(2,10);
console.log(num);   //2~10范围内的随机数

/*-------------------------- */
let colors = ["red","green","blue","black","brown"];
let color = [selectFrom(0,colors.length-1)];
console.log(color);
```



----------------------------------------------------------------------

### 第6章——集合应用类型

- **6.1  Object**

object适合存储和在应用程序之间交换数据。

**对象字面量**：对象定义的简写形式，目的是为了简化包含大量属性的对象的创建。

````javascript
let person ={//对象字面量 表示法
    name : "kuishou",
    age : 21,
    sex : "男"
};

function displayInfo(args){
    let output = "";
    if(typeof args.name == "string"){
        output += "Name:" + args.name + "\n";
    }
    if(typeof args.age  == "number"){
        output += "Age: " + args.age + "\n";
    }
    alert(output);//Name:kuishou Age:21
}

displayInfo({
    name: "kuishou",
    age: 21
});

displayInfo({
    name: "lingxiu"
});
````

- **6.2  Array 数组**

  创建数组

````javascript
let colors = new Array();
let colors = new Array("red","blue","black");
let colors = ["red","green","black"];
````



````javascript
//Array.from()拆分、合并数组
console.log(Array.from("kuishou"));//["k", "u", "i", "s", "h", "o", "u"],拆分数组

const s = new Set().add(1).add(2).add(3).add(5).add(4);
console.log(Array.from(s));//[1, 2, 3, 5, 4]，合并数组

const m = new Map().set(1,2).set(3,4);
console.log(Array.from(m));//[[1,2],[3,4]]，合并二维数组

//Array.of()把一组参数转换为数组
console.log(Array.of(1,2,3,4,5));//[1, 2, 3, 4, 5]
console.log(Array.of(red,black,green));//["red", "black","green"]

//数组索引
 let colors = ["red","yellow","blue"];
 console.log(colors[0]);    //red，显示第一项
 colors[2] = "yellow";//修改第三项中blue
 colors[3] = "green"; //添加第四项，数组长度+1
 console.log(colors.length);//4,显示数组长度
````

**迭代器方法**：keys()返回数组**索引**,values()返回数组**元素**，entries()返回**索引/值对**。

````javascript
const b = ["red","blue","green","black"];//注意const在控制台声明时候会被初始化变量，也就是这个变量用过一次之后不能再重复使用了。
const bKeys = Array.from(b.keys());
console.log(bKeys);     //[0, 1, 2, 3]
const bValues = Array.from(b.values());
console.log(bValues);   // ["red", "blue", "green", "black"]
const bEntries = Array.from(b.entries());
console.log(bEntries);  // [[0, "red"],[1, "blue"],[2, "green"],[3, "black"]]
````

**栈方法**：posh()推入，pop()弹出，遵循后进先出的原则。

````javascript
let colors = ["red","green"];
let count = colors.push("blue","black");//推入两项
console.log(count);                     //4,push接收参数后，返回数组最新长度

let item = colors.pop();                //弹出最后一项
console.log(item);                      //black
````

**队列方法**：shift()删除数组中第一项，并返回数组长度；posh()在数组末尾添加数据；遵循先进先出原则。

````javascript
let colors = ["red","green"];
let count = colors.push("blue","black");//推入两项
console.log(count);                     //4,push接收参数后，返回数组最新长度

let item = colors.shift();              //取得第一项
console.log(item);                      //red
````

**排序方法**：reverse()反向排序；sort()中包含一个比较函数，用于判断那个值应该排在前面。

````javascript
let values = [1,2,3,4,5]
let count = values.reverse();
console.log(count);         //[5, 4, 3, 2, 1]，降序
console.log(count.sort());  //[1, 2, 3, 4, 5]，升序

function compare(value1,value2){//降序
    if(value1 < value2){
        return 1;
    }else if(value1 > value2){
        return -1;
    }else{
        return 0;
    }
}
let values = [0,1,5,10,15,20];
console.log(values.sort(compare));//[20, 15, 10, 5, 1, 0]

function compare(value1,value2){//升序
    if(value1 < value2){
        return -1;
    }else if(value1 > value2){
        return 1;
    }else{
        return 0;
    }
}
let values = [20, 15, 10, 5, 1, 0];
console.log(values.sort(compare));//[0, 1, 5, 10, 15, 20]
````

**操作方法**：concat()在现有数组后面创建一个新的数组;slice()创建一个包含原有数组中一个或多个元素的心数组；splice()在数组中插入新的元素，删除传递2个参数，第一个是元素的位置，第二个是删除的数量，插入传递3个参数；

````javascript
//concat()可以在现有数组的基础上创建一个新数组
let colors = ["red","green","blue"];
let colors2 = colors.concat("yellow",["black","brown"]);//传入yellow和数组["black","brown"]，默认不打平
console.log(colors);        // ["red", "green", "blue"]
console.log(colors2);       //["red", "green", "blue", "yellow", "black", "brown"]，形成一个新数组

let colors = ["red","blue","green"];
let newColors = ["black","brown"];
let moreNewColors = {
    [Symbol.isConcatSpreadable] : true,
    length : 2,
    0 : "pink",
    1 : "cyan"
};
newColors[Symbol.isConcatSpreadable] = false;
//强制不打平数组
let colors2 = colors.concat("yellow",newColors);
//强制打平数组
let colors3 = colors.concat(moreNewColors);
console.log(colors);    //["red", "blue", "green"]
console.log(colors2);   //["red", "blue", "green", "yellow", ["black","brown"]],不打平数组输出二维数组
console.log(colors3);   //["red", "blue", "green", "pink", "cyan"]，打平数组强制输出一维数组

//slicie()用于创建一个包含原有数组中一个或多个元素的新数组
let colors = ["red","green","blue","black","pink"];
let colors2 = colors.slice(1);      //从索引1(green)开始，读取1后面所有值
console.log(colors2);               //["green", "blue", "black", "pink"]
let colors3 = colors.slice(1,4);    //从索引1(green)开始，3(black)结束，读取区间内的值
console.log(colors3);               //["green", "blue", "black"]

let colors = ["red","green","blue"];
let removed = colors.splice(0,1);   //删除第一行
console.log(colors);                //["green", "blue"]

removed = colors.splice(1,0,"yellow","orange"); //在位置1插入两个元素
console.log(colors);                //["green", "yellow", "orange", "blue"]
 
removed = colors.splice(1,1,"red","peuple");    //插入两个值，删除一个元素
console.log(colors)                 //["green", "red", "peuple", "orange", "blue"]
````

**迭代方法**：三个参数（数组元素、元素索引、数组本身）,

 \*  every()从数组中搜索符合某个条件的元素，传入的函数对每一项都返回true，这个方法才会返回true.

 \* some()从数组中搜索符合某个条件的元素，传入的函数只要有一项返回true，这个方法就返回true.

 \* filter()满足条件的项，组成新的数组返回。

 \* map()返回的结果组成新的数组。

 \* forEach()会运行每一项传入的函数，没有返回值，实现遍历。

````javascript
let numbers = [1,2,3,4,5,4,3,2,1];
let everyResult = numbers.every((item,index,array) => item > 2);
console.log(everyResult);//false

let someResult = numbers.some((item,index,array) => item > 2);
console.log(someResult);//true

let filterResult = numbers.filter((item,index,array) => item > 2);
console.log(filterResult);//[3, 4, 5, 4, 3]

let mapResult = numbers.map((item,index,array) => item * 2);
console.log(mapResult);//[2, 4, 6, 8, 10, 8, 6, 4, 2]
````

归并方法：接收**四个参数**：上一个归并值、当前项、当前项的索引、数组本身。

 \* reduce()从第一项开始遍历到最后一项

 \* reduceRight()从最后一项遍历到第一项

````javascript
let values = [1,2,3,4,5];
let sum = values.reduce((prev,cur,index,array) => prev + cur);
console.log(sum);//15,从左至右归并，第一次执行，prev是1，cur是2；第二次执行prev是3，cur是3；第三次执行prev是6，cur是4；依次归并，最后sum为15

let sum = values.reduceRight(function(prev,cur,index,array){
    return prev + cur;
});
console.log(sum);//15，从右边向左边归并。
````

- **6.4  Map**

Map是一种新的集合类型，使用**对象属性**作为键，再使用属性来引用值。

 \* get()、set()查询

 \* size()获取映射中的数量

 \* delete()、clear()删除

````javascript
const m1 = new Map([//使用嵌套数组初始化映射
    ["key1","val1"],
    ["key2","val2"],
    ["key3","val3"],
]);
console.log(m1.size);

const m = new Map();

m.set("firstName","Matt")
 .set("lastName","Frisbie");
console.log(m.has("firstName"));//true
console.log(m.get("firstName"));//Math
console.log(m.size);//2

m.delete("firstName");//只删除这一个键/值对
console.log(m.has("firstName"));//false
console.log(m.get("lastName"));//Frisbie,get获取的lastName键，返回得到是Frisbie值
console.log(m.size);//1,删除之后，长度-1

m.clear("firstName");//清除这个映射实例中的所有键/值对
console.log(m.has("firstName"));//false
console.log(m.get("lastName"));//undefined
console.log(m.size);
````

**Map和Object的区别**：

**内存方面**：Map比Object多存储50%的键/值对；

**插入性能**：插入速度不会随着键/值对的数量增加而线性增加；

**查找速度**：Object当做数组使用的情况下，Object速度更佳；

**删除性能**：Map 的 delete()操作都比插入和查找更快。

--------------------------------------

### 第7章——迭代器与生成器

**迭代器**：是一个对象，它定义了一个序列，并在终止时返回值。两个返回值：value、done。可以由任意对象实现的接口，支持连续获取对象产出的每一个值。

````javascript
for (let i = 1;i <= 10;i++){
    console.log(i);
}//1 2 3 4 5 6 7 8 9 10

let collection = ['foo','bar','baz'];
for(let index = 0;index < collection.length;++index){
    console.log(collection[index]);
}//foo bar baz

collection.forEach((item) => console.log(item));//foo bar baz
````

**可迭代协议**：支持自我识别能力和创建实现Iterator接口对象的能力。

````javascript
//for-of 循环
let arr = ['foo','bar','baz'];
for(let el of arr){
    console.log(el);//foo bar baz
}

//数组解构
let arr = ['foo','bar','baz'];
let [a,b,c] = arr;
console.log(a,b,c);//foo bar baz

//扩展操作符
let arr = ['foo','bar','baz'];
let arr2 = [...arr];
console.log(arr2);//["foo", "bar", "baz"]

//Array.from()
let arr = ['foo','bar','baz'];
let arr3 = Array.from(arr);
console.log(arr3);//["foo", "bar", "baz"]

//Set构造函数
let arr = ['foo','bar','baz'];
let set = new Set(arr);
console.log(arr3);//["foo", "bar", "baz"]

//Map构造函数
let arr = ['foo','bar','baz'];
let pairs = arr.map((x,i) => [x,i]);
console.log(pairs);//[["foo", 0], ["bar", 1], ["baz", 2]]

let map = new Map(pairs);
console.log(map);// {"foo" => 0, "bar" => 1, "baz" => 2}
````

**迭代对象**：一种一次性使用的对象，用于迭代与其关联的可迭代对象。

````javascript
//可迭代对象
let arr = ['foo','bar'];
//迭代器工厂函数
console.log(arr[Symbol.iterator]);//values() { [native code] }
//迭代器
let iter = arr[Symbol.iterator]();
console.log(iter);//Array Iterator {}
//执行迭代
console.log(iter.next());//{value: "foo", done: false}
console.log(iter.next());//{value: "bar", done: false}
console.log(iter.next());//{value: undefined, done: true}
````

**生成器**：允许定义一个包含自由迭代算法的函数，同时它可以自动维护自己的状态，拥有一个函数块内暂停和恢复代码执行的能力，生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。

````javascript
//生成器函数声明
function* generationFn(){}
//生成器函数表达式
let generationFn = function* (){}
//作为对象字面量方法的生成器函数
let foo = {
    * generationFn(){}
}
//作为类实例方法的生成器函数
class Foo{
    * generationFn(){}
}
//作为类静态方法的生成器函数
class Bar{
    static* generationFn(){}
}
//生成器放回指定的值
function* generationFn(){
    return 'foo';
}
let generatorObject = generationFn();
console.log(generatorObject);//generationFn {<suspended>}
console.log(generatorObject.next());//{value: "foo", done: true}

/**
 * yield中断执行
 */
function* generationFn(){
    yield 'foo';
    yield 'bar';
    return 'baz';
}
let generatorObject = generationFn();
console.log(generatorObject.next());//{value: "foo", done: false}
console.log(generatorObject.next());//{value: "bar", done: false}
console.log(generatorObject.next());//{value: "baz", done: true}
````

------------------

### 第8章——对象、类与面向对象编程

- **8.1  理解对象**

面向字面量书写方式：

````javascript
let person = {
	name: "kuishou"	,
    age:21,
    job:"前端开发",
    sayName(){
		console.log(this.name);
	}
};
````

-   8.1.1 定义多个属性

 Object.defineProperties()通过多个描述符一次性定义多个属性。

````javascript
let book = {};
Object.defineProperty(book,{
    year_:{
        value:2021
    },
    edition:{
        value:1
    },
    year:{
        get(){
            return this.year_;
        },
        set(newValue){
            if(newValue > 2020){
                this.year_ = newValue;
                this.edition += newValue - 2020;
            }
        }
    }
});
````

- 8.1.2 读取属性的特征 

Object.getOwnProprttyDescriptor()可以指定属性的特征描述符

````javascript
let book = {};
Object.defineProperties(book,{
    year_:{
        value:2021
    },
    edition:{
        value:1
    },
    year:{
        get:function(){
            return this.year_;
        },
        set:function(newValue){
            if(newValue > 2020){
                this.year_ = newValue;
                this.edition += newValue - 2020;
            }
        }
    }
})
let descriptor = Object.getOwnPropertyDescriptor(book,"year_");
console.log(descriptor.value);        //2021
console.log(descriptor.configurable); //false
console.log(descriptor.enumerable);   //undefined
console.log(typeof descriptor.get);   //undefined
````

- 8.1.3 合并对象：把源对象所有的本地属性一起复制到目标对象上。

Object.assign()对每个源对象执行的是浅复制。

````javascript
let dest , src , result;
//覆盖属性
dest = {id: 'dest'};
result = Object.assign(dest,{id:'src1',a:'foo'},{id:'src2',b:'bar'});
console.log(result);//{id: "src2", a: "foo", b: "bar"}

/**
 * 属性值简写
 */
let name = 'Matt';
let person = {
    name
};
console.log(person);//{name: "Matt"}

/**
 * 对象解构
 */
let person ={
    name:'Matt',
    age:'21'
};
let {name:personName,age:personAge} = person;
console.log(personName);//Matt
console.log(personAge);//21
````

- **8.2 创建对象**

- 8.2.1  工厂模式：用于抽象特定对象的过程。

````javascript
function createPerson(name,age,job){
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
let person1 = createPerson("kuishou",21,"前端开发");
let person2 = createPerson("lingxiu",20,"后端开发");
````

- 8.2.1 构造函数模式：用于创建特定类型对象。

````javascript
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    };
}
let person1 = createPerson("kuishou",21,"前端开发");
let person2 = createPerson("lingxiu",20,"后端开发");
person1.sayName();//kuishou
person2.sayName();//lingxiu
````

- **8.3 继承**

````javascript
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
}
function SubType(){
    this.subproperty = false;
}
//继承SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSuperValue = function(){
    return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue());
````

- **8.4  类** 

定义类的两种方式：

````javascript
// 类声明
class Person {}
// 类表达式
const Animal = class {}; 
````

函数声明可以提升，类的定义不能。

类的构造函数 ：不定义构造函数相当于将构造函数定义为空函数。

继承：不仅可以继承一个类，也可以继承普通的构造函数。

抽象基类：可供其他类继承，当本身不会被实例化，使用new,target检测是不是抽象基类.

--------------------

### 第9章——代理与反射

- **9.1  代理**

拦截并向基本操作嵌入额外行为的能力；target目标对象；handler代理对象（Reflect也可以）

````javascript
const target = {
 id: 'target'
};
const handler = {};
const proxy = new Proxy(target, handler);
// id 属性会访问同一个值
console.log(target.id); // target
console.log(proxy.id); // target
// 给目标属性赋值会反映在两个对象上
// 因为两个对象访问的是同一个值
target.id = 'foo';
console.log(target.id); // foo
console.log(proxy.id); // foo
// 给代理属性赋值会反映在两个对象上
// 因为这个赋值会转移到目标对象
proxy.id = 'bar';
console.log(target.id); // bar
console.log(proxy.id); // bar
// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id')); // true
// Proxy.prototype 是 undefined
// 因此不能使用 instanceof 操作符
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype
'undefined' in instanceof check
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype
'undefined' in instanceof check
// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
````

-----------------------

### 第10章——函数

- **10.1   箭头函数**

````javascript
let arrowSum = (a,b) => {//箭头函数
    return a+b;
};
let functionExpressionSum = function (a,b) {//普通函数
    return a+b;
}
console.log(arrowSum(6,8));//14
console.log(functionExpressionSum(6,8));//14
````

- **10.2 函数内部**

arguments对象：是一个类数组对象（第一个参数是arguments[0],第二个参数是arguments[1])。

````javascript
function doAdd(){
    if(arguments.length==1){
        console.log(arguments[0]+10);
    }else if(arguments.length==2){
        console.log(arguments[0]+arguments[1]);
    }
}
doAdd(10);//20
doAdd(20,30);//50

let trueFactorial = factorial;
factorial = function(){
    return 0;
};
console.log(trueFactorial(5));//120
console.log(factorial(5));//0
````

this 对象：在标准函数中，this引用的是把函数当成方法调用的上下文对象。

````javascript
window.coloe = 'red';
let o ={
    color:'bule'
};
function sayColor(){
    console.log(this.coolor);
}
sayColor();//'red'

o.sayColor = sayColor;
o.sayColor();//'blue'

//this 在箭头函数中，this引用的是定义箭头函数的上下文。
windows.color = 'red';
let o ={
    color:'blue'
};
let sayColor = () => console.log(this.color);
sayColor();//'red'
o.sayColor = sayColor;
o.sayColor();//'red'
````

- **10.3 递归** ：一个函数通过名称自己调用自己。

arguments.callee 指向一个正在执行的函数的指针。

````javascript
function factorial(num){
    if(num<=1){
        return 1;
    } else {
        return num*arguments.callee(num-1);
    }
}

const factorial = (function f(num){
    if (num<=1){
        return 1;
    } else {
        return num*f(num-1);
    }
});

````

- **10.4  闭包**：引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的。**本质**是包含**函数的活动对象**加长了其作用域链。

````javascript
function createComparisonFunction(propertyName){
    return function(object1,object2){
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];

        if(value1 < value2){
            return -1;
        } else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
    };
}
````

- **10.5  模块模式**：通过自定义类型创建了私有变量和特权方法。

````javascript
let singleton ={
    name:value,
    method(){
        //方法的代码
    }
};

let singleton = function(){
    //私有变量和私有函数
    let privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权、公有方法和属性
    return {
        publicProperty: true,
        publicMethod(){
            privateVariable ++;
            return privateFunction
        }
    }
}
````

-------------------

### 第11章——期约与异步函数

- 11.2   **期约（promise）**:是对 尚不存在结果  的一个替身。

````javascript
/**
 * 期约与异步函数
 * 什么是Promise?
 * （1）从语法上来说：Promise是一个构造函数
 * （2）从功能上来说：Promise对象用来封装一个异步操作并获取其结果。
 * Promise基本远行流程
 * （1）创建一个新的Promise 对象
 * （2) 执行异步操作任务
 * （3）异步任务成功则返回resolve(),失败则返回reject()
 * （4）resolved状态通过then()回调onResolved();rejected状态通过then()/catch()回调onReject()
 * （5）最后形成一个新的Promise对象
 */
//失败处理
function double(value,success,failure){
    setTimeout(() => {
        try{
            if(typeof value !== 'number'){
                throw 'Must provide number as firdt argument';
            }
            success(2 * value);
        }catch(e){
            failure(e);
        }
    },1000);
}

const successCallback = (x) => console.log('Success：${x}');
const failureCallback = (e) => console.log('Failure：${e}');

double(3,successCallback,factorialCallack);
double('b',successCallback,factorialCallack);

//嵌套异步回调
function double(value,success,failure){
    setTimeout(() => {
        try{
            if(typeof value !== 'number'){
                throw 'Must provide number as firdt argument';
            }
            success(2 * value);
        }catch(e){
            failure(e);
        }
    },1000)
}

const successCallback = (x) => {
    double(x,(y) => console.log('Success：${y}'));
};
const failureCallback = (e) => console.log('Failure:${e}');
double(3,successCallback,failureCallback);

````

Promise 对象状态改变的方式：

````javascript
//1.声明一个Promise对象的状态
let p = new Promise((resolve,reject) => {
    //resolve 函数
    resolve('OK');//pending =>fulfilled(resolve)
    //reject  函数
    reject('Error');//pending => rejected
    //抛出错误
    throw '出问题了';
});
console.log();

//Promise指定多个成功/失败回调函数，都会调用嘛？
//当Promise改变为对应状态时，都会被调用
let p = new Promise((resolve,reject) => {
    resolve('OK');
});
//指定回调
p.then(value => {
    console.log(value);
});
//指定回调
p.then(value => {
    alert(value);
});
````

三种状态：待定（pending）、兑现(resovle)、拒绝(reject)

````javascript
/**
 * promise 期约是对尚不存在结果的一个替身
 * 三种状态：待定（pending）、兑现（fulfilled,可以叫解决（resolve））、拒绝（rejected），三种状态不可逆
 * 待定（pending）:期约的最初始状态。
 * 兑现（fulfilled）:期约落定（settled）为代表成功状态
 * 拒绝（rejected）:期约落定（settled）为代表失败状态
 * 用途：抽象的表示一个异步操作；状态代表期约是否完成。
 */
let p = new Promise(() => {});
setTimeout(console.log,0,p);

let p1 = new Promise((resolve,reject) => resolve());
setTimeout(console.log, 0 ,p1)//Promise {<fulfilled>: undefined}

let p2 = new Promise((resolve,reject) => reject());
setTimeout(console.log, 0 ,p2)//Promise {<rejected>: undefined}
````

Promise.prototype.then()为Promise实例添加状态改变时的回调函数。

````javascript
//then方法返回的是一个新的Promise实例。
getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
).then(
    comments => console.log("resolved:",comments),
    err => console.log("rejected:",err)
);
````

Promise.prototype.catch() 发生错误时的回调函数。

````javascript
const somrAsyncThing = function(){
    return new Promise(function(resolve,reject){
        resolve(x + 2);//会报错，因为x没有声明
    });
};
somrAsyncThing().catch(function(error){
    console.log('error',error);
}).then(function(){
    console.log('error');
});
````

Promise.prototype.finally() 不管Promise对象最后状态如何，都会执行的操作。

````javascript
let p1 = Promise.resolve();
let p2 = Promise.reject();
let onFinally = function(){
    setTimeout(console.log, 0, 'Finally!')
}
p1.finally(onFinally);//Finally
p2.finally(onFinally);//Finally
````

Promise.all() 接收一个可迭代对象，返回一个新期约，在一组期约全部解决之后再解决。

````javascript
const p1 = new Promise((resolve,reject) => {
    resolve("hello");
}).then(result => result);

const p2 = new Promise((resolve,reject) => {
    throw new Error('error');
}).then(result => result);

Promise.all([p1,p2])
.then(result => console.log(result))
.catch(e => console.log(e));
````

Promise.race() 将多个Promise实例，包装成一个新的Promise实例。

`````javascript
const p = Promise.race([p1,p2,p3]);//只要有一个实例率先改变状态，P的转态就会发生改变
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function(resolve,reject){
        setTimeout(() => reject(new Error('request timeout')),5000)
    })
]);
p.then(console.log).catch(console.error);
`````

- **11.3  异步函数**：旨在解决利用异步结构 组织代码的问题

**async关键字**用于声明异步函数，它是Generator 函数的语法糖。

````javascript
async function foo(){}
let bar = async function(){};
let baz = async () => {};
class Qux{
    async qux(){}
}

let p = new Promise((result,reject) => setTimeout(result,1000,3));
p.then((x) => console.log(x));//3
````

**await关键字**用于暂停步函数代码的执行，等待期约解决。

````javascript
async function foo(){
    let p = new Promise((resolve,reject) => setTimeout(resolve,1000,3));
    console.log(await p);
}
foo();//3

//停止和恢复执行
async function foo(){
    console.log(2);
    await null;
    console.log(4);
}
console.log(1);
foo();
console.log(3);
//1
//2,打印完2后，由于遇到arait关键字，null向消息队列添加一个任务，退出foo()
//3.打印完3，再次回到foo()中恢复执行。
//4

async function foo(){
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
}
async  function bar(){
    console.log(4);
    console.log(await 6);
    console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
````

**手写Promise** :

````javascript
// 参见的内置错误
// 1).ReferenceError:引用的变量不存在
console.log(a); //Uncaught ReferenceError: a is not defined

// 2).TypeError:数据类型不正确
b = {}
b.xxx()//VM274:2 Uncaught TypeError: b.xxx is not a function

//3).RangeError:数据值不在其所允许的范围内
function fn(){
    fn()
}
fn()//ncaught RangeError: Maximum call stack size exceeded

//4).SyntaxError：语法错误
const c = "''"

//创建一个Promise对象
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        const time = Date.now();
        if(time % 2 == 0){
            resolve('成功的数据，time='+time);
        }else{
            reject('失败的数据，time='+time);
        }
    }, 1000);
})
p.then(
    value => {
        console.log('成功的回调'+value);
    },
    reason => {
        console.log('失败的回调，time='+reason);
    }
)

//Promise对象用来封装一个异步操作并返回其结果
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功的数据')
        reject('失败的数据')//这一部分将不起作用，promise每次调用只返回一种结果
    },1000)
})

//Promise.then()
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功的数据')
    },1000)
}).then(
    value => {
        console.log('onResolved()1',value)//onResolved()1 成功的数据
    }
).catch(
    reason => {
        console.log('onReject()1',reason)
    }
)

/**
 * 语法糖：用起来很甜，方便的传值方式
 */
//Promise.resolve()
//产生一个成功值为1的promise的值
const p1 = new Promise((resolve, reject) => {
    resolve(1)
})
const p2 = Promise.resolve(2);//语法糖
const p3 = Promise.reject(3);//语法糖
p1.then(value => {console.log(value)});
p2.then(value => {console.log(value)});
p3.catch(reason => {console.log(reason)});

//Promsie.all()都为resolve才算成功,否则返回reject
const p1 = new Promise((resolve, reject) => {
    resolve(1)
})
const p2 = Promise.resolve(2);//语法糖
const p3 = Promise.reject(3);//语法糖

const pAll = Promise.all([p1,p2,p3])//其中3是一个失败的结果
pAll.then(
    values => {
        console.log('all onReasoned()',values);
    },
    reason => {
        console.log('all onRejected()',reason);//all onRejected() 3
    }
)

//Promise.race()只要有一个resolve/reject就返回其结果
//如果在异步情况下，p1,p2,p3谁先到就去谁的结果
const p1 = new Promise((resolve, reject) => {
    resolve(1)
})
const p2 = Promise.resolve(2);
const p3 = Promise.reject(3);

const pRace = Promise.race([p1,p2,p3])
pRace.then(
    value => {
        console.log('race onResolve()',value)
    },
    reason => {
        console.log('race onRejected()',reason)
    }
)

/**
 * Promise.then()返回的promise的结果由什么所决定？
 * （1）简单表达：由then() 指定的回调函数 执行的结果 决定
 * （2）详细表达：
 *      ①如果抛出异常，新promise变为reject,reason为抛出的异常。
 *      ②如果返回的是非promise的值，新promise变为resolved,value为返回的值
 *      ③如果返回的是另一个新的promise,次promise的结果就会编程新promise的结果
 */
new Promise((resolve, reject) => {
     resolve(1);//onResolved1() 1 onResolved2() undefined
    //  reject(1);//onRejected1() 1 onResolved2() undefined
}).then(
    value => {
        console.log('onResolved1()',value);
        return 2
        // return Promise.resolve(3)
        // return Promise.reject(4)
        // throw 5
    },
    reason => {
        console.log('onRejected1()',reason);
    }
).then(
    value => {
        console.log('onResolved2()',value);
    },
    reason => {
        console.log('onRejected2()',reason);
    }
)

/**
 * Promise如何串联多个操作任务？
 * （1）promise的then()返回的一个新的promise,可以开成then()的链式调用。
 * （2）通过then的链式调用串连多个同步/异步任务
 */
new Promise ((resolve, reject) => {
    setTimeout(() => {
        console.log("执行任务1（异步）");
        resolve(1)
    },1000);
}).then(
    value =>{
        console.log("执行任务2的结果：",value);
        console.log("执行任务2（同步）");
        return 2;
    }
).then(
    value => {
        console.log("执行任务3的结果：",value)
    }
)

/**
 * promise异常穿透？
 * (1)当使用promise的then链式调用时，可以在最后 指定失败的回调。
 * (2)前面任何操作做出了异常，都会传到最后失败的回调处理。
 * 中断promise链？
 * (1)当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数
 * (2)办法：在回调函数中返回一个pending状态的promise对象
 */
 new Promise ((resolve, reject) => {
    resolve(1)
}).then(
    value =>{
        console.log("onRsolved1()",value);
    }
).then(
    value => {
        console.log("onRsolved2()",value)
    }
).then(
    value => {
        console.log("onRsolved3()",value)
    }
).catch(
    reason => {
        console.log('onReasoned4()',reason)
    }
)
````

**宏任务跟微任务**：

````javascript
 		/**
         * 1.JS中用来存储执行回调函数的队列包含2个不同特定的队列
         * 2.宏队列：用来保存待执行的宏任务（回调），比如：dom事件回调、Ajax回调、定时器setTime回调
         * 3.微嘟列：用来保存待执行的微任务（回调），比如：promise回调、MutaionOberver回调
         * 4.JS执行时会区别这2个队列、
         *   (1).JS引擎首先必须先执行所有的初始化同步任务代码。
         *   (2).每次准备取出第一个宏任务执行前，都要讲所有的微任务一个个取出来执行。
         */
        setTimeout(() => {//宏任务 3
            console.log("callback1()")
            Promise.resolve(3).then(//微任务 4
            value => {
                console.log("onResolve3()",value)
            }
        )
        },0)
        setTimeout(() => {//宏任务 5
            console.log("callback2()")
        },0)
        Promise.resolve(1).then(//微任务 1
            value => {
                console.log("onResolve1()",value)
            }
        )
        Promise.resolve(2).then(//微任务 2
            value => {
                console.log("onResolve2()",value)
            }
        )
        //onResolve1() 1
        //onResolve2() 2
        //callback()
        //onResolve3() 3
        //callback()

        setTimeout(() => {
            console.log(1)
        },0)
        new Promise((resolve) => {
            console.log(2)
            resolve()
        }).then(() => {
            console.log(3)
        }).then(() => {
            console.log(4)
        })
        console.log(5)
        //2 5 3 4 1
````

**async 函数和await 函数**

````javascript
  		/**
         * 1.async 函数
         *   函数的返回值为promise对象。
         *   promise对象的结果由async函数执行的返回值决定。
         * 2.await 表达式
         *   await 右侧的表达式一般为promise对象，但也可以是其他的值，
         *   如果表达式是promsie对象，await返回的是promise成功的值，
         *   如果表达式是其他值，直接将此值作为await的返回值。
         *   
         */
        async function fn1(){
            return 1
            // throw 2
            // return Promise.reject(3)
        }
        const result = fn1()
        result.then(
            value => {
                console.log('onResolved',value);//onResolved 1
            },reason => {
                console.log('onRejected',reason)
            }
        )
        function fn2(){
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(6)
                },1000)
            })
        }
        function fn4(){
            return 6;
        }
        async function fn3(){
            const vlaue = await fn2();
            console.log('value',value)
        }
        fn3()
````

--------------------

### 第12章——BOM

- **12.1  Windwos对象**

BOM 的核心是windows对象，windows对象有两个身份，另一个是ECMAScript中的Global对象，另一个是浏览器窗口的JavaScript接口。

**BOM和DOM的区别:**

① DOM：文档对象模型，描述了处理网页内容的方法和接口(windows.document)。

② BOM：浏览器对象模型，描述了与浏览器进行交互的方法和接口(navigater、history、screen、location、windows)。

--------------------

### 第13章——客户端检测

- 能力检测：检测浏览器是否含有某种特性
- 用户代理检测：通过用户代理字符串确定浏览器。

-------------------------

### 第14章——DOM

DOM表示由多层节点构成的文档，DOM树。

Element Traversal API 五个属性：

childElementCount，返回元素数量（不包含文本节点和注释）。

firstElementChild，指向第一个Element类型的子元素。

lastElementChild，指向最后一个Element类型的子元素。

previousElementSibling,指向前一个Element类型的同胞元素。

nextElementSibling,指向后一个Element类型的同胞元素。

-------------------

### 第15章——DOM拓展

- **15.1  Selectors API**

- querySelector()返回匹配该模式的第一个后代元素，如果没有匹配项则返回结果null。

  ````java
  /**
   * DOM编程
   */
  var script = document.createElement("script");
  var code = "function sayHi(){alert('h1');}";
  try{
      script.appendChild(document.createTextNode("code"));
  }catch(ex){
      script.text = "code";
  }
  document.body.appendChild(script);//<script>dode</script>
  
  //querySelector()接收CSS选择符参数，返回匹配该模式的第一个后代元素。
  let myDiv = document.querySelector("#myDiv");
  
  //querySelect()接收CSS选择符参数，返回所有匹配的节点。
  let ems = document.querySelectorAll("p strong");//取得所有是<p>元素子元素的<strong>元素
  
  //DOM对象转Jquery对象
  var box = document.getElementsByClassName('.box');
  var jq = $(box);
  
  //获取所有div的第0个位置的div
  var domeObject = $('div')[0];
  
  //Jquery对象转换成DOM对象
  myvideo.play();//直接调用
  ````

------------------

### 第17章——事件

- **17.1  事件流：页面接收事件的顺序。**
- 事件传播的三个阶段：
- ①事件捕获阶段：事件是从Document节点自上而下向目标节点传播。
- ②目标阶段：达到事件对象的事件目标，找到目标节点后完成后停止。
- ③事件冒泡阶段：事件再从目标节点自下而上向Document节点传播。
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/2021032320253850.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAxOTM3MA==,size_16,color_FFFFFF,t_70)

-------------------------------

### 第20章——Streams API

- 20.2  跨上下文消息：一种执行在不同上下文间传递消息的能力。核心是postMessage()方法。

- postMessage()方法接收三个参数：消息（data）、文档源（origin）、文档中的windows对象代理（souce）。

- ````javascript
  let iframeWindow = document.getElementById("myframe").contentWindow;
  iframeWindow.postMessage("A secret","http://www.xxxx.com");//指定源www.xxx.com,x`向内嵌窗格发送一条消息
  ````

- Streams API

- 可读流：通过公共接口读取数据块的流，由**消费者**进行处理，使用getReader()方法获取流的锁

  ````javascript
  async function* ints(){
  	//每1000毫秒生产一个递增的整数
      for(let i = 0;i<5;++i){
          yieled await new Promise((resovle) => setTimeout(resovle,1000,i));
      }
  }
  const resdableStream = new ReadableStream({
  	async start(controller){
          for await (let chuck of ints()){
  			controller.enqueue(chunk);
          }
          controller.close
      }
  })
  ````

- 可写流：通过公共接口写入数据块的流，**生产者**将数据写入流。

- 转换流：包含可读流和可写流，可根据需要检查和修改流内容。

- 20.11  Web组件

- 一套用于增强DOM行为的工具，包括影子DOM、自定义元素和HTML模板。

- 影子DOM通过attachShadow()方法创建并添加给有效HTML元素。

````javascript
/**
 * 读取拖放元素
 */
let droptarget =document.getElementById("droptarget");
function handleEvent(event){
    let info = "",
        output = document.getElementById("output");
        Files, i,len;
    event.preventDefault();
    
    if(event.type == 'drop'){
        file = event.dataTransfer.failes;
        i = 0;
        len = failes.length;
        
        while(i<len){
            info += `${files[i].name} (${files[i].type},${files[i].size} bytes)<br>`;
            i++;
        }
        output.innerHTML = info;
    }
}
droptarget.addEventListener("dragenter",handleEvent);
droptarget.addEventListener("dragover",handleEvent);
droptarget.addEventListener("drop",handleEvent);

//链式调用
function person(){
}

person.prototype.getName=function(name){
    this.name = name;
    return this;
}
person.prototype.getAge=function(age){
    this.age = age;
    return this;
}
const a = new person().getName('kuishou').getAge('21')
console.log(a);
````

--------------------------

### 第23章——解析与序列化

- 23.2  JSON对象
- 序列化：stringify()方法，第一个**参数**是过滤器，可以是数组或函数；第二个**参数**用于缩进结果JSON字符串的选项。
- 解析：parse()方法又叫复活函数，包含两个参数，属性名（key）和属性值（value）。可以接收一个额外的参数，这个函数会正对每个键/值对都调用一次。

----------------------

### 第24章——网络请求与远程资源

- GET请求：用于向服务器查询某些信息。
- POSE请求：哟用于向服务器发送应该保存的信息。
- Fetch API ：浏览器会向给定的URL发送请求，读取响应、处理状态码
- Web Socket（套接字）：通过一个**长时连接**实现与**服务器**全双工、双向的通信。在JavaScript创建Web Socket的时候，一个HTTP请求会发送到服务器以初始化连接，服务器响应后，连接使用的Upgrade头部从HTTP切换到Web Socket协议，使用该协议的专有服务器。

-------------------

### 第26章——模块

- 本质上是键/值实体，
- ES6模块默认在严格模式下执行，不共享全局命名空间。

------------------

### 第27章——工作者线程

- JavaScript是单线程的，为了为了解决并发问题，JavaScript提出了工作者线程的三种类型
- 专用工作者线程：让脚本单独创建一个JavaScript线程，以执行委托的任务。
- 共享工作者线程：创建到的线程可以别多个不同的上下文使用，包括不同的页面。
- 服务工作者线程：拦截、重定向和修改页面发出的请求，充当王阔请求仲裁者的角色。

- 充当王阔请求仲裁者的角色。