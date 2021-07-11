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
    //读取主要文件
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
      sidebarDepth: 2,    // 可选的, 默认值是 1
      children:[]
    }];
  },
  _initSideBar(name, relPath) {
    let aliasName = '简介';
    let pathName = name = name.replace('.md','');
    if (name === 'index' || name.toUpperCase() === 'README') {
      name = aliasName;
      pathName = '';
    }
    let path = `${relPath}${pathName}`
    let barItem = {
      title: name,   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      path: path,
      sidebarDepth: 1,    // 可选的, 默认值是 1
    }
    if (name === aliasName) {
      init.sideBar[relPath][0]['children'] = [barItem].concat(init.sideBar[relPath][0]['children'])
    } else {
      init.sideBar[relPath][0]['children'].push(barItem);
    }

  }
}
module.exports = init;
