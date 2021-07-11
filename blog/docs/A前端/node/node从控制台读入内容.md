## 使用readline
```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
   const [op,key,value] =input.split(" ")
    if(op == 'get'){
        get(key)
    }else if(op == 'set'){
        set(key,value)

    }else if(op == 'quit'){
        rl.close()
    }else {
        console.log('没有该操作')
    }
});

rl.on('close',()=>{
    console.log("程序结束")
    process.exit(0)
})

```

## 封装
```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close',()=>{
    console.log("程序结束")
    process.exit(0)
})

function readLine () {
    return new Promise(resolve => {
        rl.on('line',(str => {
            resolve(str);
        }))
    })
}
function close () {
  rl.close();
  process.exit(0);
}
```
+ 使用：(新建test.js) 测试
```javascript
const { readLine, close } = require('./read')

/**
 * 运行的main函数
 **/
async function main() {
    let i = await readLine();
    while (+i !== 0) {
        console.log(`你输入的是${i}`);
        i = await readLine();
    }
    close();
}

// 调用执行
main();

```


## 案例
> 读取控制台，存储数据,存入同目录下的db.json文件中  
> 测试数据： 写入： set name 123、获取：get name
JsonFileDb.js
```javascript
const fs = require('fs')
const path = require('path')
const readline = require('readline');
//获取
function get(key){
    fs.readFile(path.resolve(__dirname,'db.json'),(err,data)=>{
        if(err)
            console.log(err)
        const json =JSON.parse(data)
        console.log(json[key])
    })
}
// 写入
function set(key,value){
    fs.readFile(path.resolve(__dirname,'db.json'),(err,data)=>{
        if(err)
            console.log("文件不存在")
        const json = data ? JSON.parse(data) : {}
        json[key] = value

        fs.writeFile(path.resolve(__dirname,'db.json'),JSON.stringify(json),(err)=>{
            if(err)
                console.log(err)
            console.log('写入成功')
        })

    })
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', (input) => {
    const [op,key,value] =input.split(" ")
    if(op == 'get'){
        get(key)
    }else if(op == 'set'){
        set(key,value)

    }else if(op == 'quit'){
        rl.close()
    }else {
        console.log('没有该操作')
    }
});

rl.on('close',()=>{
    console.log("程序结束")
    process.exit(0)
})

```
