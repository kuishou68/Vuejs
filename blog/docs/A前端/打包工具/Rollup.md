## 介绍
[腾讯Rollup开发手册](https://cloud.tencent.com/developer/section/1489412)  
[Rollup-demo github](https://github.com/ywymoshi/Rollup-Demo)  

Rollup 是一个 JavaScript 模块打包工具，可以将小块代码编译成大块复杂的代码，使用原生import

注意js打包器，所以需要引入其他文件，需要安装对应的plugin包
[plugin入门](https://github.com/docschina/rollupjs.org/blob/cn/guide/zh/999-big-list-of-options.md#getting-started-with-plugins)


::: details rollup.config.js所有配置选项
```javascript
export default { // can be an array (for multiple inputs)
   // 核心选项
  external, //外链，不打包
  input,  // 核心选项
  plugins,

 // 额外选项
  cache,
  onwarn,
  preserveEntrySignatures,
  strictDeprecations,

  // 额外选项
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,

  // experimental
  experimentalCacheExpiry,
  perf,

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // core output options
    dir,
    file,
    format, // required
    globals,
    name,
    plugins,

    // advanced output options
    assetFileNames,
    banner,
    chunkFileNames,
    compact,
    entryFileNames,
    extend,
    footer,
    hoistTransitiveImports,
    inlineDynamicImports,
    interop,
    intro,
    manualChunks,
    minifyInternalExports,
    outro,
    paths,
    preserveModules,
    preserveModulesRoot,
    sourcemap,
    sourcemapExcludeSources,
    sourcemapFile,
    sourcemapPathTransform,

    // 高危区
    amd,
    esModule,
    exports,
    externalLiveBindings,
    freeze,
    indent,
    namespaceToStringTag,
    noConflict,
    preferConst,
    strict,
    systemNullSetters
  },

  watch: {
    buildDelay,
    chokidar,
    clearScreen,
    skipWrite,
    exclude,
    include
  } | false
};
```
:::

## 命令行
1. 命令行的参数(Command line flags)
```text
-c, --config                使用配置文件（如果使用了参数但是没有指定值，默认的是rollup.config.js）
-i, --input                 入口文件（可选参数<entry file>）
-o, --file<output>          输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --format [es]           输出的文件类型 (amd, cjs, es, iife, umd)
-e, --external              排除以模块ID的逗号分隔的列表
-g, --globals               以`module ID:Global` 键值对的形式，用逗号分隔开 
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name                  生成UMD模块的名字
-m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
-l, --legacy				支持IE8
--amd.id                    AMD模块的ID，默认是个匿名函数
--amd.define                使用Function来代替`define`
--no-strict                 在生成的包中省略`"use strict";`
--no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
--no-treeshake              不使用tree-shaking
--intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
--interop                   包含公共的模块（这个选项是默认添加的）

....more
```
此外，还可以使用以下参数：

-h/--help  
打印帮助文档。

-v/--version  
打印已安装的Rollup版本号。

-w/--watch  
监听源文件是否有改动，如果有改动，重新打包

--silent  
不要将警告打印到控制台。

--environment <values>  
通过 process.ENV 传递额外的设置到配置文件
