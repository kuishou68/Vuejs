# Axios  [官网 ](http://axios-js.com/) [Github](https://github.com/axios/axios)

## 前言

> 通ajax，用于请求一个库
>
> 体积小，速度快，效率高

学习一个新东西：去官网，安装，看文档，通读，一遍不会，读第二遍。

npm安装：

```
npm install axios
```

yarn安装：

```
yarn add axios
```

## 1.什么是axios?

> 一个基于promise的HTTP库，可以用在浏览器和node.js中

## 2.特性：

- 浏览器中创建 `XMLHttpRequests`
- 从node.js中创建http请求
- 支持`Promise`API
- 拦截请求和相应
- 转换请求数据和响应数据
- 取消请求
- 自动装好JSON数据
- 客户端支持防御`XSRF`

```javascript
<div>
	<button @click="getData">发送请求</button>
	<ul>
    	<li>
    		{{obj.name}} === {{obj.pinyin}}
    	</li>
    </ul>
</div>
<script>
    ver vm = new Vue({
		el:"#box",
         data:{
			inputValue:'',
             obj:{
                 name:'',
                 pinyin:''
             }
        },
        methods:{
            getData(){
                  // 发送axions请求，获取数据，把数据展示到界面上
			    url:'' + this.inputValue
                 axions.get(urlm{
					type:'food'
                  })
                 .then({data}=>{
                     this.obj.name = data.data.name
                     this.obj.pingyin = data.data.pinyin
                     console.log(this.obj,name)
                 })
                .catch((error)=>{
                     console.log(error)
                 })
            }
        }
    })
</srcipr>
```

























