React框架学习

## 学习曲线

## 起步
```bash
npm install create-react-app
create-react-app reactTodoList

or 

npx create-react-app reacttodo
```
## 组件定义
+ 函数式
```jsx harmony
export function welcomeFunction() {
  return (
    <div></div>
  )
}
```
+ class式
```jsx harmony
import React, { Component } from "react";
export default class welcomeClass extends Component{
  render(){
    return  (
      <div>
      
      </div>
    );
  }
}
```

## 组件传值
Cart.js   
使用this.props.value进行接收
```jsx harmony
import React, { Component } from "react";

export  default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'test'
    };
    setTimeout( () => {
      this.setState({
        name: 'setState更新数据入门了'
      });
    }, 2000);
  }
  render() {
    return (
      <div>
        <div> 购物车数据信息 </div>
        <div> {this.state.name}</div>
        <div> {this.props.value}</div>
      </div>
    );
  }
}
```
引入Cart并传入value值

App.js
```jsx harmony
import React, { Component }  from "react";
import Cart from './Cart';
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cartId: 1
    }
  }
  renderCard() {
    return (
      <Cart value = {this.state.cartId} />
    )
  }
  render() {
    const name = 'react';
    return (
      <div>
        <div>
          <button> { name } </button>
        </div>
        <div>
          {this.renderCard()}
        </div>
      </div>
    )
  }
}

```

setState 更新数据
::: warning
避免直接使用this.state.属性值 修改值，不会生效
:::
+ this.setState(obj)
> 多次调用连续改变失败，如下counter的值只会改变一次，最终值为2
```jsx harmony
import React, { Component }  from "react";
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      counter:1
    }
  }
  componentDidMount() {
    this.setState({
      counter: this.state.counter + 1
    })
    this.setState({
      counter: this.state.counter + 1
    })
    this.setState({
      counter: this.state.counter + 1
    })
  }
  render() {
    return (
        <div>
          <button> { this.state.counter } </button>
        </div>
    )
  }
}

```
+ this.setState(fn) 如果state的值已经被修改过了，他获取的是最后一次的数据
> 使用函数式参数，最终counter 的值为4
```jsx harmony
  componentDidMount() {
    this.setState( prevState => {
      return {
        counter: prevState.counter + 1
    }
    })
    this.setState( prevState => {
      return {
        counter: prevState.counter + 1
      }
    })
    this.setState( prevState => {
      return {
        counter: prevState.counter + 1
      }
    })
  }
``

## 容器组件 vs 展示组件
> 基本原则：容器组件负责数据获取，展示组件负责根据props显示信息
   
`
## antd 按需加载
```text
 npm install antd --save
```
+ 安装react-app-rewired取代react-scripts，可以扩展webpack的配置 ，类似vue.conﬁg.js
```text
npm install react-app-rewired@2.0.2-next.0 babel-plugin-import --save
```
+ 新建config-overrides.js
>  libraryName,libraryDerectory,style 对应antd包内的目录

```javascript
const {injectBabelPlugin} = require('react-app-rewired');
module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDerectory: "es", style:"css" }],
    config
  );
  return config;
}
```

```jsx harmony
import React, {Component} from 'react';
import {Button} from 'antd';

class App extends Component {
  render() {
    return (
      <div id="root"><Button type="primary">Button</Button></div>)
  }
}

export default App;

```

## 防止组件重复渲染
> 当传入函数里的值未发生变化时，不对函数进行刷新 
> 如下componentDidMount 中componentDidMount每一秒执行一次更新'render comment会多次输出，
```jsx harmony
import React, {Component} from "react";

// 容器组件
export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: []};
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [{body: "react is very good", author: "facebook"}, {
          body: "vue is very good",
          author: "youyuxi"
        }]
      });
    }, 1000);
  }

  render() {
    return (<div>
      {
        this.state.comments.map((c, i) => (<Comment key={i} data={c}/>))}
    </div>);
  }
}
// 展示组件
function Comment({ data }) {
  console.log('render comment')
   return (  
     <div>      
       <p>{data.body}</p>
       <p> --- {data.author}</p>
     </div>
   );
}
```


+ 15版本前
> 使用class定义组件使用shouldComponentUpdate 钩子函数判断前两次传值是否一致再决定是否更新  
> 缺点： 太过繁琐。
```jsx harmony
class Comment extends Component{
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.data.body === this.props.data.body
        && nextProps.data.author === this.props.data.author ) {
      return false;
    }
    return true;
  }
  render() {
    console.log('render comment')
     return (  
       <div>      
         <p>{this.props.data.body}</p>
         <p> --- {this.props.data.author}</p>
       </div>
     );
  }
}
```
+ 15版本后
> 使用PureComponent  
> 原理： 对参数进行浅对比，先判断两个值是否时地址引用入obj1 === obj2 在判断是否为对象、null，再比较值的长度，最后比较嵌套对象的第一层  
> 注意事项： 给组件传参时，避免传递嵌套对象

修改如下：(用拓展符{...c},将值一个个传递，避免传递嵌套对象)
```jsx harmony
export default class CommentList extends Component {
  render() {
    return (<div>
      {
        this.state.comments.map((c, i) => (<Comment key={i} {...c} />))}
    </div>);
  }
}
class Comment extends React.PureComponent {
  render() {
    console.log('render comment')
     return (  
       <div>      
         <p>{this.props.body}</p>
         <p> --- {this.props.author}</p>
       </div>
     );
  }
}
```

+ 16版本后
> React v16.6.0 之后的版本，可以使用 React.memo 让函数式的组件也有PureComponent的功能
```jsx harmony
const Joke = React.memo(() => (    <div>        {this.props.value || 'loading...' }    </div> ));
```

## 高阶组件
> 对傻瓜组件进行加强，嵌套一个函数，可多次加强，使用class组件时还可以重写生命周期。   
> 缺点： 使用时函数嵌套太蛋疼

```jsx harmony
import React, { Component } from "react";

//初始函数
function Foolish (props) {
  return (<div> { props.name } - { props.func } </div>)
}
//加强函数
const withFoolish = function (Come) {
    const func = 'HOC';
    return (props) => <Come {...props} func = {func} />
}
const withFoolish = function (Come) {
    const func = 'HOC';
    return class extends Component {
        com
    }
}
/*const withFoolish = function (Come) {
    const func = 'HOC';
    return class extends Component{
      componentDidMount() {
        console.log('do something')
      }
      render() {
        return (
          <Come {...this.props} func = {func} />
        )
      }
    }
}*/


const withLog =  (Comp)  => {
  console.log(Comp.name, '渲染了');
  return props => <Comp { ...props }  />
}
//加强
const NewFoolish = withLog(withFoolish(withLog(Foolish)));

export default class HOC extends Component {
  render() {
    return (
      <div>
        <NewFoolish name = 'React' />
        aaa
      </div>
      )
    }
}

```

## 高阶组件装饰器
> 使用注解的方式，注意注解的嵌套上下顺序 且只能用于class定义的组件。
```text
npm install --save-dev babel-plugin-transform-decorators-legacy
```
```jsx harmony

@withLog
@withFoolish
@withLog
class Foolish extends Component{
  render() {
    return (<div> { this.props.name } - { this.props.func } </div>)
  }
}
class HOC extends Component {
  render() {
    return (
      <div>
        <Foolish name = 'React' />
        aaa
      </div>
    )
  }
}
```

## 复合组件
> 使用props.chilrden 相当于vue中的slot  
> 父类获取子类的数据返回进行处理，传入函数式props.children 并执行,如下实例Fetch 传入name 获取值然后渲染
```jsx harmony
import React from "react";

function Diglog (props) {
  return <div style={ {border:`1px solid ${props.color || "red"}`} }> { props.children } </div>
}

const API = {
  getUser: {
    name: " react",
    age: 5
  }
}
function Fetch (props) {
  const user = API[props.name];
  return props.children(user);
}

function WelcomeDiglog (props) {
  return <Diglog { ...props }>
    <div>
      <p> 复合组件 </p>
      <Fetch name = "getUser">
        {({name, age}) =>(
          <p> { name} - { age } </p>
        )}
      </Fetch>
    </div>

  </Diglog>
}

export  default function () {
  return <WelcomeDiglog color = "green" />
}
```

+ 案例：
> 使用RadioGroup 为每个Radio添加name属性，使radio为一组元素    
> 在RadioGroup 中遍历children ，并使用React.cloneElement克隆元素，因为vdom不能被修改。  
> 在Radio形参中注意使用{ children, ...rest } 对参数进行结构，用于不同的用途
```jsx harmony
import React from "react";

function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, child => {
        return  React.cloneElement(child, { name:props.name})
      })
      }
    </div>
  )
}
function Radio({ children, ...rest }) {
  return (
    <label>
      <input type="radio"  {...rest} />
      {children}
    </label>
  )
}

function WelcomeRadio (props) {
  return
    <div>
      <RadioGroup name="mvvm">
          <Radio value="vue"> vue </Radio>
          <Radio value="react">react </Radio>
          <Radio value="angular">angular </Radio>
      </RadioGroup>
    </div>
}

```

## Hooks
+ 状态钩子 - State Hook 
+ 副作用钩子 - Effect Hook 
> useState ： 传入参数赋值给第一个数组解构变量，第二个变量用于修改值，变量名不固定。  
> useEffect: 相当于componentDidMount 、componentDidUpdate 和 componentDidUnMount 合并的API,所以会执行多次，传入第二个参数传入依赖 为 空数组[]，让useEffect只执行一次。
```jsx harmony
import React, { useState, useEffect } from "react";

export default function HookTest () {
const [count, setCount] = useState(0);
const [fruit, setFruit] = useState('苹果');
const [fruits, setFruits] = useState(['栗子', '香蕉', '梨子']);

useEffect(() => {
  document.title = `你点击了${count}次`
},[])

return (
  <div>
    <p>点击了{ count } 次 </p>
    <button onClick={() => setCount(count + 1)}>添加</button>
    <p>{ fruit }</p>
    <ol>
      {
        fruits.map((item,index) => {
          return <li key={ index }> { item }</li>
        })
      }
    </ol>
  </div>
)
};

```

## 组件跨层级通信 - Context
> 父组件传值Provider  
> 子组件3种方式获取：useContext 、 class组件 static contextType 、Consumer

````jsx harmony
import React, { Component, useContext } from "react";
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;
function Child( props ) {
  return (
    <div>
      children {props.foo}
    </div>
  )
}
function Child1( props ) {
  const ctx = useContext(MyContext);
  return (
    <div>
      children {ctx.foo}
    </div>
  )
}
class Child2 extends  Component{
  static contextType = MyContext;
  render() {
    return <div>Child3: { this.context.foo}</div>
  }
}
export default class ContextTest extends Component  {
  render() {
    return (
      <div>
        <Provider value={{foo:"bar"}}>
          <Consumer>
            {value => <Child {...value} />}
          </Consumer>
          <Child1 />
          <Child2 />
        </Provider>
      </div>
    )
  }
}
```
