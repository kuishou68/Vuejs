const path = require("path");
const rootpath = path.dirname(__dirname); //执行一次dirname将目录定位到docs目录
const CopyPlugin = require("copy-webpack-plugin");
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
  title: '魁首',
  description: '一个没有天赋的前端程序员👨‍💻 ',
  themeConfig: {
    lastUpdated: '最后更新时间',
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
  ],
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'public', to: '.' },
        ],
      })
    ]
  }
}

