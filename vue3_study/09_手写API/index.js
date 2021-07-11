// shallowReactive（浅的劫持、监视、相应数据）与 reactive（深的）
// 定义一个 reactiveHandler 处理对象
const reactiveHandler = {
    // 查询数据
    get (target, key) {
      if (key ==='_is_reactive') return true
      console.log('数据已读取, 去更新界面')
      return Reflect.get(target, key)
    },
    // 修改数据
    set (target, key, value) {
      const result = Reflect.set(target, key, value)
      console.log('数据已更新, 去更新界面')
      return result
    },
    // 删除某个属性
    deleteProperty (target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('数据已删除, 去更新界面')
      return result
    },
}
  // 定义一个 shallowReactive（浅拦截） 函数，传入一个目标对象
function shallowReactive (target){
      // 判断当前的目标对象是不是 object 类型（对象/数组）
      if(target && typeof target === 'object'){
          return new Proxy(target, reactiveHandler)
      }
      // 如果传入的数据是基本类型数据，那么直接返回
      return target
}
  // 定义一个 reactive（深拦截） 函数
function reactive (target){
    // 判断当前的目标对象是不是 object 类型（对象/数组）
    if(target && typeof target === 'object'){
        // 对数组或者对象中的所有数据进行 reactive 的递归处理
        // 1.先判断是不是数组
        if(Array.isArray(target)){
            // 2.进行遍历操作
            target.forEach((item, index)=>{
                target[index] = item
            })
        }else{
            // 再判断是不是对象
            Object.keys(target).forEach(key=>{
            })
        }
        return new Proxy(target, reactiveHandler)
    }
    // 如果传入的数据是基本类型数据，那么直接返回
    return target
}
  // =====================================================================
  // 定义了一个 readonlyHandler 处理器
const readonlyHandler ={
    get (target, prop){
        // 判断是否为 readonly 对象
        if(prop === '_is_readonly') return true
        const result = Reflect.get(target, prop)
        console.log('拦截读取数据', prop, result)
        return result
    },
    set () {
        console.warn('只读的, 不能修改')
        return true
    },
      deleteProperty () {
        console.warn('只读的, 不能删除')
        return true
    },
}

  // 定义一个 shallowReadonly（浅只读） 函数
function shallowReadonly(target){
      // 需要判断当前的数据是不是对象
      if(target && target === 'object'){
          return new Proxy(target, readonlyHandler)
      }
      return target
  }
  // 定义一个 readonly（深只读） 函数
function  readonly(target){
    // 1.需要判断当前的数据是不是对象
    if(target && target === 'object'){
        // 2.判断 target 对象是不是数组
        if(Array.isArray(target)){
            // 2.1 遍历数组
            target.forEach((item, index)=>{
                target[index] = readonly(item)
            })
        }else {
            // 3.判断 target 对象是不是数组
            // 3.1 遍历对象
            Object.keys(target).forEach(key => {
                target[key] = readonly(target[key])
            })
        }
        return new Proxy(target, readonlyHandler)
    }
    // 如果不是对象或数组，直接返回
    return target
}
  // 定义一个 shallowRef 函数
function shallowReactive(target){
    return {
        // 保存 target 数据
        _value: target,
        gte() {
            console.log('劫持到了get读取数据')
            return this._value
        },
        set() {
            console.log('劫持了set修改数据，准备更新界面', val)
            this._value = val
        }
    }
}

  // 定义一个 ref 函数
function ref(target){
    // ref 本质是基于 reactive 的
    target = reactive(target)
    return {
        // 标识当前的对象时 ref 对象
        _is_ref:true,
        // 保存 target 数据
        _value: target,
        gte() {
            console.log('劫持到了get读取数据')
            return this._value
        },
        set() {
            console.log('劫持了set修改数据，准备更新界面', val)
            this._value = val
        }
    }
}

  // 定义一个 isRef 函数，判断当前对象是否为 isRef 对象
function isRef(obj){
    return obj && obj._is_ref
}
  // 定义一个 isReactive 函数，判断当前对象是否为 reactive 对象
function isReactive(obj){
    return obj && obj._is_reactive
}
  // 定义一个 isreadonly 函数，判断当前对象是否为 readonly 对象
function isreadonly(obj){
    return obj && obj._is_readonly
}
  // 定义一个 isProxy 函数，判断当前对象是否为 reactive 对象或 readonly 对象
function isProxy(obj){
    return isReactive(obj) || isReadonly(obj)
}