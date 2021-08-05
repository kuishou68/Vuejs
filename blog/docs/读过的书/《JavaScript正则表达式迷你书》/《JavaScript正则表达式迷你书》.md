# 《JavaScript正则表达式迷你书》

[封面](https://github.com/kuishou68/assets/blob/main/image-20210802235508804.png)

## 第1章 正则表达式  字符匹配

正则表达式是匹配模式，要么匹配字符，要么匹配位置！

- 横向匹配  ``/ab[2,5]/c/g ``  匹配 ``abc, abbc,abbbc,abbbbc,abbbbbc``，数字连续出现 2 到 5 次，会匹配 2 位、3 位、4 位、5 位连续数字

- 纵向匹配 ``/a[1,2,3]c/`` 匹配 ``a1c,a2c,a3c``

- 范围表示法  ``[1-3a-dE-G]``  匹配  ``[123abdcEFG]``

- 排除字符组 ``[^abc]`` 匹配 除``a`` 、``b``、``c`` 之外的任意一个字符

#### 1.1 **常见简写形式**

| 字符组 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| ``\d`` | 表示 ``[0-9]` ，digit（数字）的首字母 d，匹配数字            |
| ``\D`` | 表示``[^0-9]`` , 匹配 除数字以外的任意字符                   |
| ``\w`` | 表示``[0-9a-zA-Z]`` ，word（单词）的首字母，匹配 数字、大小写字母、下划线 |
| ``\W`` | 表示``[^0-9a-zA-Z]`` ， 匹配非单词字符                       |
| ``\s`` | 表示``[\t\v\n\r\f]`` ， 匹配空白符、空格、制表位、换行符、回车符、换页符 |
| ``\S`` | 表示``[^\t\v\n\r\f]`` , 匹配非空白符                         |
| ``^``  | 表示开头，如果单独使用，表示 **非**                          |
| ``$``  | 表示结尾，例 ``/^([01][0-9]|[2][0-3]):[0-5][0-9]$/``         |

| 量词     | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| ``{m,}`` | **至少**出现 ``m`` 次                                        |
| ``{m}``  | 等价于``{m,m}`` , 出现 ``m`` 次                              |
| ``?``    | 等价于``{0,1}`` ， 出现或者不出现（您吃饭了吗？吃了/没吃）   |
| ``+``    | 等价于 ``{1,}`` , **至少**出现 1 次（每次只+1）              |
| ``*``    | 等价于``{0,}`` , 出现任意次，也有可能不出现（*星星 可能出现很多，也可能不出现） |

🌰例子1️⃣：要匹配以下👇**16进制颜色**🎨

```CSS
#ffbbad
#Fc01DF
#FFF
#ffE
```

```javascript
// 就需要这样写
var regex = '/#([0-9a-zA-Z]{6} | [0-9a-zA-Z]{3})/g';
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log(string.match(regex));
// ["#ffbbad #Fc01DF #FFF #ffE"]
```

🌰例子2️⃣：要匹配以下👇**时间**⏳

```css
23:59
02:08
```

```javascript
// 需要这样写
var regex = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;
// 第一位数字可以为 [0-2],当第 1 位为 "2" 时，第 2 位可以为 [0-3]，
// 其他情况时，第 2 位为 [0-9], 第3位数字为[0-5], 第 3 位数字为 [0-5]，第4位为 [0-9]。
console.log(regex.text("23:59")); // true
console.log(regex.text("02:08")); // true
```

🌰例子3️⃣：匹配以下👇**年月日**⏱️

```css
2021-08-05
```

```javascript
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
console.log( regex.text("2021-08-05"));//true
```

🌰例子4️⃣：匹配以下👇**文件路径**📂

```css
F:\study\javascript\regex\regular expression.pdf
F:\study\javascript\regex\
F:\study\javascript
F:\
```

```javascript
var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
/* 匹配 ‘F:\’，需要使用 [a-zA-Z]:\\ 
   匹配 ‘文件名’， [^\\:*<>|"?\r\n/] 表示合法字符
   匹配 ‘文件夹\’，可用 [^\\:*<>|"?\r\n/]+\\
   匹配 多个 ‘文件夹\’，可用 ([^\\:*<>|"?\r\n/]+\\)*
*/
console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") );
console.log( regex.test("F:\\study\\javascript\\regex\\") );
console.log( regex.test("F:\\study\\javascript") );
console.log( regex.test("F:\\") );
// => true
// => true
// => true
// => true
```

🌰例子5️⃣：匹配👇  **id**  🆔

```html
<div id="container" class="main"></div>
```

```javascript
var regex = /id="."?/;
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]); // id="container"
```





## 第2章  正则表达式  位置匹配

正则表达式是匹配模式，要么匹配字符，要么匹配位置！

#### 2.1 what is position?（什么是位置？）

位置又被称为（锚），是相连字符之间的位置。如下所示👇

[position](https://github.com/kuishou68/assets/blob/main/image-20210805225110504.png)



#### 2.2 How to match positions？(怎么匹配位置？)

ES5 中的 6 个锚：

| 锚        | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| ``^``     | 脱字符，匹配开头                                             |
| ``$``     | 美元字符，匹配结尾                                           |
| ``\b``    | 单词边界， ``^``与 ``\w`` 、``\w`` 与 ``\W``  、``\W``与``$``之间的位置 |
| ``\B``    | 非单词边界                                                   |
| ``(?=p)`` | 子模式，p 前面的位置，比如 ``(?=l)``，表示 "l" 字符前面的位置，``he#l#lo`` |
| ``(?!p)`` | 子模式反面，``\#h#ell#o#``                                   |



#### 3.3 位置的特性

可以理解为空字符 ``""``，字符之间可以写成多个。

```javascript
// "hello"可以写成："hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + "";
var result = /^^hello$$$/.test("hello");
console.log(result);//true
```

🌰例子1️⃣：