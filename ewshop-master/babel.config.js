module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant', //库名
      libraryDirectory: 'es', // 库的目录
      style: true // 样式是真
    }, 'vant']
  ]
}
