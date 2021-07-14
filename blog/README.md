## 简介

> 如下目录结构实现第一层目录生成一级导航，二层目录生成二级导航，二级导航内的md文件构成每页的侧边导航栏

## 目录结构

```text
blog					修改过的静态网站生成器，生成个人博客专用
├── docs				把你的所有文章都放在这里
│   ├── .vuepress
│   │   ├── components  可以写一些Vue组件，暂时用不上
│   │   ├── dist        npm run build 后生产的静态文件
│   │   ├── public 		博客的公共资源
│   │   ├── styles      暂时用不上
│   │   ├── utils       自动生成导航栏、侧边栏脚本
│   │   └── README.md   
│   └── config.js       在这里配置nav与sideBar
├── public				
│   └── CNAME           个人域名 
│       └── README.md   页面描述
├── deploy.bat          安装文件，建议在VScode中打开，一条条命令执行！
├── dpackage-lock.json  配置文件
├── package.json        配置文件
```

- 生成静态文件`npm run build`

- 进入生成的文件夹`cd docs/.vuepress/dist`


- 提交至远程仓库  
   `git init
  git add -A
  git commit -m 'first commit'
  git branch -M main`

- 如果发布到 https://<USERNAME>.github.io  填写你刚刚创建的仓库地址
  `git push -f git@github.com:<你的github名>/<你的github名>.github.io.git main
  `



## initPage.js

> 新建`.vuepress/utils/initPage.js`  

::: details initPage.js

```javascript
const fs = require('fs');
const path = require('path');
let init = {
  navs:[],
  sideBar:{},
  excludes : ['.vuepress'],
  getFileName:function(rpath) {
    let fullPath = '';
    let fileTypes = /\.md$/; //只匹配以md结尾的文件
    const readDir = function (rpath, type, relativePath, index = 0) {
      let dir;
      let list = fs.readdirSync(rpath);
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          dir = rpath + '/' + list[i];
          let isFile = fs.statSync(dir);
          if (init.excludes.indexOf(list[i]) >= 0) continue;
          if (type === 0) {
            if (isFile && isFile.isDirectory()) {
              init._initNav(list[i]);

            } else {
              continue;
            }
          }
          if (type === 1)
            if (isFile && isFile.isDirectory()) {
              init._initNavChild(list[i], relativePath, index);
            } else {
              continue;
            }
          if (type === 2) {
            if (isFile && isFile.isFile()) {
              if (fileTypes.test(list[i]) > 0)
                init._initSideBar(list[i], relativePath);
              else
                continue;

            } else {
              continue;
            }
          }
        }
      }
    }
    //读取一级导航 type = 0;
    readDir(rpath, 0);
    //读取二级导航 type = 1
    for (let i = 0; i < init.navs.length; i++) {
      readDir(rpath + init.navs[i].path, 1, init.navs[i].path, i)
    }
    //读取主要文件（侧边栏）
    for (let i in init.sideBar) {
      readDir(rpath + i, 2, i)
    }
    return {
      nav : init.navs,
      sidebar: init.sideBar
    }
  },
  _initNav(name) {
    let navItems = {
      text: name,
      path:`/${name}/`,
      items: [

      ]
    }
    init.navs.push(navItems);
  },
  _initNavChild(name, relPath, index) {
    let link = `${relPath}${name}/`
    let item = {
      text: name,
      link: link
    };
    init.navs[index]["items"].push(item);
    init.sideBar[link] = [ {
      title: name,   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1,    // 可选的, 默认值是 1
      children:[]
    }];
  },
  _initSideBar(name, relPath) {
    let pathName =  name = name.replace('.md','');
    if (name === 'index' || name.toUpperCase() === 'README') {
      name = '简介';
      pathName = '';
    }
    let path = `${relPath}${pathName}`
    let barItem = {
      title: name,   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      path: path,
      sidebarDepth: 1,    // 可选的, 默认值是 1
    }
    init.sideBar[relPath][0]['children'].push(barItem);
  }
}
module.exports = init;

```

:::  

## config.js

> 在.vuepress/config.js中,themeConfig: 中配置nav与sideBar

```javascript
const rootpath = path.dirname(__dirname); //执行一次dirname将目录定位到docs目录
const { getFileName } = require('./utils/initPage.js');
const {nav, sidebar} = getFileName(rootpath);
module.exports = {
  base:'/',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }]
  ],
  markdown: {
    lineNumbers: true
  },
  title: '魁首的个人网站',
  description: '机会只留给有准备的人',
  themeConfig: {
    lastUpdated: 'Last Updated',
    logo: '/img/logo.png',
    smoothScroll: true,
    nav: nav,  
    sidebar: sidebar
  },
  plugins:[
    ['@vuepress/back-to-top'],
    ['@vuepress/active-header-links'],
    [
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]
  ]
}
```



# 魁首

🔔一个没有天赋的前端程序员！  💡[博客](https://blog.lijianlin.com.cn/)

## 关于我

🔰**社交**:

| 🤖[Github](https://github.com/kuishou68) |🔑[CSDN](https://blog.csdn.net/weixin_44019370?spm=1010.2135.3001.5421) | 💎[掘金](https://juejin.cn/user/3817931570691031) | 📖 [知乎](https://www.zhihu.com/people/kui-shou-27-41) | 💡[博客](https://blog.lijianlin.com.cn/) |
<img align="right" src="https://github-readme-stats.vercel.app/api?username=kuishou68&theme=vue&show_icons=true&icon_color=41b883&text_color=718096&hide_title=true" />

[![github](https://img.shields.io/github/stars/kuishou68?logo=github&logoColor=Stars)](https://github.com/kuishou68)  [![](https://img.shields.io/badge/CSDN-8643%E8%AE%BF%E9%97%AE%E9%87%8F-%23ff4d4d)](https://blog.csdn.net/weixin_44019370?type=blog)  [![](https://img.shields.io/badge/%E6%8E%98%E9%87%91-%40%E9%AD%81%E9%A6%96-blue&logo=zhihu)](https://juejin.cn/user/3817931570691031)

[![知乎](https://img.shields.io/badge/%E7%9F%A5%E4%B9%8E-%40%E9%AD%81%E9%A6%96-blue)](https://www.zhihu.com/people/kui-shou-27-41)  [![](https://img.shields.io/badge/%E9%AD%81%E9%A6%96%E5%8D%9A%E5%AE%A2-blog.lijianlin.com.cn-%23a000a0)](https://blog.lijianlin.com.cn/)  

[![](https://img.shields.io/badge/%E7%BD%91%E6%98%93%E4%BA%91-727%20%E6%AD%8C%E5%8D%95-red)](https://music.163.com/#/my/m/music/playlist?id=987055290)  [![](https://img.shields.io/badge/dynamic/json?color=ff69b4&label=%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9&query=%24.data.totalSubs&suffix=%20%20%E7%B2%89%E4%B8%9D&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D488055374&logo=bilibili)](https://space.bilibili.com/488055374/dynamic)  [![](https://img.shields.io/badge/%E7%A0%81%E4%BA%91-%E9%A2%86%E7%A7%805858-%23d92b2f)](https://gitee.com/lingxiu5858)

## 名字由来

✨魁首，初中创QQ的时候就想到这个名字就一直没换过，多用作褒义，意思是指称在同辈中才华居第一的人。

