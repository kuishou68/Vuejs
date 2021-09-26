![img](/img/js/jsRelationShip.png#width=100)
## 1. new 函数实现
                            
**原理：**    
+ 创建一个新的空对象  
+ 使新对象的__proto__原型 指向 构造函数的的prototype原型  
+ 绑定构造函数的this        
+ 如果函数没有对象类型，那么new表达式会直接返回这个对象   
```javascript
  function _new (obj, args) {
    if (typeof obj !== 'function')
      throw new TypeError(obj + "is not a function");
    //es6中new.target 指向这个对象。
    _new.target = obj;

    //模拟 Object.create
    // function F () {};
    // F.prototype = obj.prototype;
    // F.prototype.constructor = F;
    // let target =  new F();
    let target = Object.create(obj.prototype);
    const result = obj.call(target, ...args);
    let isObject = typeof result === 'object' && result !== null;
    let isFunction = typeof result === 'function';
    if (isObject || isFunction)
      return result;
    return target;
  }
```
**Test:**
```javascript
function Person () {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
}
const per = _new(Person, "myNew");
console.log(per);
```

## 2. new.target 使用及作用（ES6）：
+ 限制类的调用方法，判断new.target是不是未定义
    
+ 写出只能被继承使用的类

> 将上述Person稍作修改,添加_new.target 限制

```javascript
function Person () {
  this.name = name;
  if (_new.target == Person) {
    throw _new(Error,['本类不能实例化'])
  }
}
Person.prototype.getName = function () {
return this.name;
}
const per1 = _new(Person, "myNew"); //直接抛出错误，不允许实例化。
console.log(per);
```
接下来创建Student 继承 Person
```javascript
  // const per = _new(Person,["myNew"]);//直接抛出错误，不允许实例化。
  // console.log(per);
  function Student (){
    Person.call(this,...arguments);
    if  (!(this instanceof Student)) {
       console.warn('should be called with the new !')
    }
  }
  function JiSheng(son,parent) {
    let clone = Object.create(parent.prototype);//创建对象
    son.prototype = clone;      //指定对象
    clone.constructor = son;     //增强对象
  }
  JiSheng(Student, Person);
  const st1 = _new(Student, ["aa"]); // 可以被实例化，因为当前_new.target === Student;不会触发Person的错误
  console.dir(st1);
```
**补充：**
+ 在构造函数里使用 `(!(this instanceof Student))` 判断当前调用Student 是否是通过new调用，禁止直接调用。
