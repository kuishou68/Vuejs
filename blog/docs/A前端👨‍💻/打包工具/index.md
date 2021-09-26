## 常用打包工具
[引用：前端的打包工具](https://www.cnblogs.com/blackcat/articles/11929125.html)

以发布时间为顺序：grunt ， gulp，webpack， rollup，。

Grunt：最老牌的打包工具，它运用配置的思想来写打包脚本，一切皆配置，所以会出现比较多的配置项，诸如option,src,dest等等。而且不同的插件可能会有自己扩展字段，认知成本高，运用的时候需要明白各种插件的配置规则。

Gulp：用代码方式来写打包脚本，并且代码采用流式的写法，只抽象出了gulp.src, gulp.pipe, gulp.dest, gulp.watch 接口，运用相当简单。更易于学习和使用，使用gulp的代码量能比grunt少一半左右。（PS:此介绍的是gulp3，在gulp4不可用）

Webpack: 是模块化管理工具和打包工具。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、AMD 模块、ES6 模块、CSS、图片等。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。它定位是模块打包器，而 Gulp/Grunt 属于构建工具。Webpack 可以代替 Gulp/Grunt 的一些功能，但不是一个职能的工具，可以配合使用。

Rollup：下一代 ES6 模块化工具，最大的亮点是利用 ES6 模块设计，利用 tree-shaking生成更简洁、更简单的代码。一般而言，对于应用使用 Webpack，对于类库使用 Rollup；需要代码拆分(Code Splitting)，或者很多静态资源需要处理，再或者构建的项目需要引入很多 CommonJS 模块的依赖时，使用 webpack。代码库是基于 ES6 模块，而且希望代码能够被其他人直接使用，使用 Rollup。

##  使用总结
Grunt： MPA，老牌打包工具，基于文件为媒介（运行慢，零散的脚本文件一当多起来就受到影响 
 
Gulp： MPA，易学，基于 nodejs 的 steam 流打包  

Webpack： SPA，目前最强大的打包工具，但是过于臃肿，如何单纯打包js不推荐  

Roleup： MPA，tree-shaking特性（针对es6，按需打包，多余的不要，目前（2018，vuex,react主流使用）

## 如何选择#
如果你一个都不熟悉的话，那么我直接推荐 webpack，官方文档非常详细，更新频率很高。而且在其他的打包工具在处理非网页文件（比如svg, png, vue等）基本还是需要借助它来实现。最关键现在的脚手架主流依旧是它。

如果在处理文件需要关注前端三剑客的话，那么 grunt 和 gulp 会更好点，这两者我直接推荐 gulp，除非你已经很熟悉 grunt了。

如果你更加在意脚本代码的简洁精炼，那么可以使用rollup。（PS:我目前主要使用的打包工具，搭建可以使用的 es6 环境可见我这篇文章）
