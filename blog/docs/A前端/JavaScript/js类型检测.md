## js类型检测总结
**js常见类型检测方法**

* `typeof`
* `instanceof`
* `constructor`
* `Object.prototype.toString.call`
* `Array.isArray`

## 1. typeof
> 作用： typeof 操作符返回一个字符串，表示未经计算的操作数的类型。  
> 语法： typeof operand 或 typeof(operand)。   
> 参数： operand一个表示对象或原始值的表达式，其类型将被返回。
    
|类型|结果|
|:---:|:---:|
|Undefined|"undefined"|
|Null|"object"|
|Boolean|"boolean"|
|Number|"number"|
|String|"string"|
|Symbol|"symbol"|
|Function |"function"|
|BigInt|"bigInt"|
|其他任何对象|"object"|

总结:
```text
typeof function === 'function'
typeof null === 'object'
typeof execeptFunctionObject === 'object'
```
注意：
+ 当我们使用typeof来判断一个未声明的变量时，会返回undefined，并不会报错:
```text
const a = 1
console.log(typeof a) // 'number'
console.log(typeof b) // 'undefined' （不会报错）
```
+ 当使用new操作符时
```text
// 除 Function 外的所有构造函数的类型都是 'object'
var str = new String('String');
var num = new Number(100);

typeof str; // 返回 'object'
typeof num; // 返回 'object'

var func = new Function();

typeof func; // 返回 'function'
```

## 2. instanceof
> 作用： instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。  
> 语法： object instanceof constructor  
> 参数： object 某个实例对象;  constructor 某个构造函数

**示例:**
```text
let newStr  = new String("String created with constructor");
let myDate  = new Date();
newStr instanceof String; // 返回 true
myString  instanceof Object; // 返回 true
```

+ 模拟实现：
> 思路：  
>  + 首先 instanceof 左侧必须是对象, 才能找到它的原型链  
>  + instanceof 右侧必须是函数, 函数才会prototype属性  
>  + 迭代 , 左侧对象的原型不等于右侧的 prototype时, 沿着原型链重新赋值左侧
```javascript
const _instanceof = function(instance, Class) {
  if (typeof Class !== 'function') {
    throw new TypeError("Right-hand side of 'instanceof' is not an object")
  }
    // 验证如果为基本数据类型，就直接返回false
  const baseType = ['string', 'number','boolean','undefined','symbol','bigInt']
  if(instance === null || baseType.includes(typeof(instance))) { return false; }

  let _proto = Object.getPrototypeOf(instance);
  let FP = Class.prototype;
  while (true) {
    if(_proto === null){    //找到最顶层
      return false;
    }
    if (_proto === FP) {
      return true;
    } 
    _proto = Object.getPrototypeOf(_proto);
  }
}
```
**结论：**
```text
原型链的指向可以改变，所以instanceof用来检测数据类型并不完全准确

由于简单数据类型没有__proto__属性，所以无法使用instanceof来检测类型
```

3. Object.prototype.toString.call (万能公式)  
**示例：**
```javascript
const toString = Object.prototype.toString
// 判断简单数据类型
console.log(toString.call(1)); // '[object Number]'
console.log(toString.call('a')); // '[object String]'
console.log(toString.call(true)); // '[object Boolean]'
console.log(toString.call(null)); // '[object Null]'
console.log(toString.call(undefined)); // '[object Undefined]'

// 判断复杂数据类型，可以详细区分不同的对象
console.log(toString.call([])); // '[object Array]'
console.log(toString.call({})); // '[object Object]'
console.log(toString.call(new Date)); // '[object Date]'
```

**深入Object.prototype.toString.call（）**  
> toString 继承的都是来自Object 的内部属性toSting,根据原型链的访问顺序我们知道先访问内部方法再访问原型上的方法。  
```javascript
Object.toString()//"function Object() { [native code] }"
Object.prototype.toString()//"[object Object]"
```
**So:**
```javascript
Object.prototype.toString.call([1,2,3])//"[object Array]"
Array.prototype.toString.call([1,3,4]) // "1,2,3"
```
|数据类型|例子|return|
|:---:|:---:|:---:|
|字符串|	"foo".toString()|	"foo"|
|数字|	1.toString()|	Uncaught SyntaxError: Invalid or unexpected token|
|布尔值|	false.toString()|	"false"|
| undefined|	undefined.toString()|	Uncaught TypeError: Cannot read property 'toString' of undefined|
| null|	null.toString()|	Uncaught TypeError: Cannot read property 'toString' of null|
| String|	String.toString()|	"function String() { [native code] }"|
| Number|	Number.toString()|	"function Number() { [native code] }"|
| Boolean|	Boolean.toString()|	"function Boolean() { [native code] }"|
| Array|	Array.toString()|	"function Array() { [native code] }"|
| Function|	Function.toString()|	"function Function() { [native code] }"|
| Date|	Date.toString()|	"function Date() { [native code] }"|
| RegExp|	RegExp.toString()|	"function RegExp() { [native code] }"|
| Error|	Error.toString()|	"function Error() { [native code] }"|
| Promise|	Promise.toString()|	"function Promise() { [native code] }"|
| Obejct|	Object.toString()|	"function Object() { [native code] }"|
| Math|	Math.toString()|	"[object Math]"|

