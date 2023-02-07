# webpack.config.js基本内容
1、mode: development   production

2、entry: 指定打包入口文件
    const path = require('path');
    <!-- 单入口文件。__dirname当前文件目录 -->
    entry: resolve(__dirname, 'scr/app.js');
    <!-- 多入口文件。index是文件名称 -->
    entry: {
      index: path.resolve(__dirname, '/src/js/index.js')
    }
    

3、output:  path  filename   打包输出路径  
    output: {
          <!-- 指定打包输出路径，即在当前文件夹中创建dist文件夹，并将打包结果输出到dist文件夹中 -->
             path: path.require(__dirname, 'dist'),
          <!-- 打包输出的主文件路径和文件名称。[name]是以entry对象的属性名作为打包文件的名称-->
            filename: 'js/[name].js',
          <!--打包输出的其他文件命名  -->
            chunkFilename: "state/js/[name].chunk.js",
          <!-- 图片、字体等通过type:asset处理资源命名方式 -->
            assetModuleFilename:'state/images/[name]_[hash:4][ext]',
            <!-- 在打包前，将path整个目录内容清空，再进行打包 -->
            clean: true,
      }

<!-- webpack.config.js在本地服务器中运行，因此文件导入导出遵循commonJS的规定。
devServer自动开启热更新，即hot: true
 -->
4、devServer: 开启服务器。
      devServer: {
            <!-- 是否自动打开浏览器页面 -->
            open: true,
            <!-- 本地服务器的名称 -->
            host: 'localtion',
            <!-- 服务器的端口号 -->
            port: 8888
      }

<!-- sourceMap 提升开发体验。开发时运行的代码是经过webpack编译后的代码。如果代码运行出错，错误定位到的是webpack编译后的代码，无法查找到错误在源代码的位置。
      sourceMap是一个用来生成源代码和构建后代码一一映射的文件的方案。它会生成一个xxx.map文件，里面包含
源代码和构建后代码每一行，每一列的映射关系。当构建后代码出错了，会通过xxx.map文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。
      开发模式建议使用cheap-module-source-map。优点：打包编译速度快，只包含行映射。缺点：没有列映射。
生产模式建议使用source-map。优点：包含行/列映射。缺点：打包编译速度更慢。
 -->
5、devtool: soruce-map 开发工具
    devtool: 'source-map',

6、resolve
      resolve: {
        extensions: ['.ts', '.js']
      },

7、module:  加载器
    module: {
            rules: [{
<!-- oneOf：每个文件只能被其中一个规则处理。文件匹配成功一个规则后，就不再匹配后面的规则。  -->
                    oneOf: [

<!-- 规则书写属性：1、test：匹配的文件。2、loader/use：使用的加载器。单个加载器可直接用loader，多个加载器需要使用use。从下到上、从右到左使用loader处理匹配到的文件。3、options：配置选项。给loader设置一些处理的要求。4、exclude：排除不需要匹配的文件。5、include：指明要匹配的文件范围 -->

<!--处理ts文件。 
所需loader：ts-loader  babel-loader
 -->
      {
            test: /\.ts$/,
            include: path.resolve(__dirname, 'src'),
            use: [
                  'babel-loader',
                  'ts-loader'
            ],
            exclude: /node_modules/
      },

<!-- 处理js文件。thread-loader：开启多进程，处理babel
所需loader：thread-loader  babel-loader @babel/core  @babel/preset-env
 -->
      {
            test: /\.js$/,
            use: [{
                  loader: 'thread-loader',
                  options: {
                        <!-- threads是进程数量 -->
                        works: threads
                        }
                  },
                  {
                        loader: 'babel-loader',
                        options: {
                              <!-- 开启babel缓存 -->
                              cacheDirectory: true,
                              <!-- 关闭缓存的压缩 -->
                              cacheCompression: false,
                              //减少代码体积
                              plugins: ['@babel/plugin-transform-runtime'],
                              }
                  }]
      }

<!-- 处理css文件。 
所需使用的loader：css-loader  style-loader
-->
      {
            test: /\.css$/,
            use: [
                  'style-loader',
                  'css-loader'
            ]
      },

<!-- 处理less文件。
所需使用的loader：less-loader css-loader  style-loader
 -->
      {
            test: /\.less$/,
            use: [
                  <!-- 创建style标签，将js中的样式资源插入进行，添加到head中生效 -->
                  'style-loader',
                  <!-- 将css文件变成commonjs模块加载js中，里面内容是样式字符串 -->
                  'css-loader',
                  <!-- 将less文件编译成css文件 -->
                  'less-loader'
            ]
      },   

<!-- 处理css中的图片，无法处理html中的图片 -->
      {
            test: /\.(jpe?g|png|gif)$/,
            type: "asset",
                  <!-- 优化图片。base64:将图片转化为字符串，然后将字符串当作src地址，浏览器就会将字符串识别成图片。优势：图片变成字符串不需要额外发请求，减少请求次数。缺点：体积会变大，导致页面加载缓慢.小于10kb的图片转化成base64字符串，可以在built.js中查看
                    */ -->
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024
                        }
                    },
                    generator: {
                        <!-- 输出图片名字，并放在images文件夹中。 -->
                        filename: 'state/images/[name]_[hash:4][ext]'
                  },
      },

<!-- 处理html文件的img图片 
所需loader: html-loade
-->
      {
            test: /\.html$/,
            loader: 'html-loader'
      },

<!-- 处理其他文件 -->
      {
            test: /\.(ttf|woff2?|map3)$/,
            <!-- 按原文件输出 -->
            type: "asset/resource",
            generator: {
                  filename: "static/media/[hash:4][ext][query]"
                  }
      }

<!--自定义loader：tpl-loader将匹配到的tpl结尾的文件中的模版解析成字符串程序。然后将字符串程序交给babel-loader转成javascript程序，然后打到输出的包文件中，即app.js。  -->
      {
            <!-- 匹配以tpl结尾的文件 -->
            test: /\.tpl$/
            <!-- 从下到上使用loader处理匹配到的文件 -->
            use: [
                  'babel-loader',   
                  {
                        loader: 'tpl-loader',
                        options: {
                              <!-- 当解析完毕后，需要打印出来当前解析的文件路径 -->
                              log: true
                        }
                  }
                  ]
      }

                  ]
            }]
      }


8、plugins: 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const threads = os.cpus().length //cup核数
const TerserWebpackPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

<!-- 插件导入的结果是构造函数，因此通过new来实例化执行构造函数，构造函数的参数就是配置项 --> 
    plugins: [
<!--HtmlWebpackPlugin：以template指定的html文件为模版，创建一个新的html文件，新旧html文件的DOM结构完全相同。将webpack打包输出的资源添加到新的html文件中。
      插件的常用属性：1、template：指定html模版文件。2、filename：新html文件名。
      所需要的插件：html-webpack-plugin-->
            new HtmlWebpackPlugin({
                  template: path.resolve(__dirname, './src/index.html'),
                  filename: 'index.html',
                  chunks: ['index'],
                  excludeChunks:['node_modules']
            })  

<!-- eslint处理js代码格式，提高代码的健壮性 -->
            new ESLintPlugin({
            <!-- 指定被检查的文件 -->
                  context: path.resolve(__dirname, '../src'),
                  <!-- 开启缓存 -->
                  cache: true, 
                  <!-- 缓存存放的地址 -->
                  cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintCache'), 
                  <!--开启多进程处理eslint  -->
                  threads,  
            }),

<!-- 清空上一次打包结果 -->
            new CleanWebpackPlugin(),

<!-- 将CSS提取到单独的文件中，为每个包含CSS的JS文件创建一个CSS文件。通过link标签来引入样式，避免网慢造成的闪屏现象。 -->
            new MiniCssExtractPlugin({
                  filename: 'state/css/[name].css',
                  chunkFilename:'state/css/[name].chunk.css'
            }),

<!-- 优化和压缩css文件 -->
            new CssMinimizerPlugin(),
<!-- 预加载文件 -->
            new PreloadWebpackPlugin({
                  // js使用preload方式加载
                  // rel:'preload',
                  // 作为script优先级去做
                  // as:'script'
                  rel:'prefetch'
            })
      ]

9、optimization 压缩统一放在这里
optimization:{
        minimizer:[
            <!-- 压缩js -->
            new TerserWebpackPlugin({
                <!-- 开启多进程和设置进程数量 -->
                parallel: threads   
            }) 
        ],
        <!-- 将hash值单独打包，避免文件重新打包后，它的关联文件也会重新打包（因为hash值的改变） -->
        runtimeChunk:{
            name:(entrypoint) => `runtime~${entrypoint.name}.js`
        }
    },



### webpack安装包
# 1、初始化三大件：
webpack：webpack程序本身。
webpack-cli：搭配webpack程序的脚手架工具。
webpack-dev-server：webpack的开发服务器工具。

# 2、处理JS
ES6： babel-loader  @babel/core  @babel/preset-env
ES7/ES8: babel-plugin-transform-runtime
装饰器： babel-plugin-transform-decorators babel-plugin-transform-decorators-legacy

# 4、处理模版：ejs  tpl
ejs-loader


--save-dev(-D)：安装在开发环境下的。--save(-d)：安装在生产环境下的，例如ejs。




### HotModuleReplacement 提升打包构建速度
### 为什么
    开发时，我们修改了其中一个模块代码，webpack默认会将所有模块全部重新打包编译，速度很慢。所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。
### 是什么
    HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。
### 怎么用
    hot:true webpack默认开启
    实际开发中，vue和react脚手架会自动配置热模替换

### oneOf
### 为什么
    打包时每个文件都会经过所有loader处理，虽然因为test正则原因实际没有处理上，但是都要过一慢。
### 是什么
    当文件匹配上一个loader后，剩下的就不匹配了。

### Include/Exclude
### 为什么
    开发时我们需要使用第三方的库或插件，所有文件都下载到node_modules中了。而这些文件是不需要编译可以直接使用的。所以，我们在对js文件处理时，要排除node_modules下面的文件。
### 是什么
    include:包含，只处理xxx文件
    exclude:排除，除了xxx文件以外其他文件都处理

### cache
### 为什么
    每次打包时js文件都要经过eslint检查和babel编译，速度比较慢。我们可以缓存之前的eslint检查和babel编译结果，这样第二次打包时速度就会更快
### 是什么
    对eslint检查和babel编译结果进行缓存

### Thead
### 为什么
    当项目越来越庞大时，打包速度越来越慢。我们想继续提升打包速度，其实就是要提升js的打包速度，因为其他文件都比较少。而对js文件处理主要就是eslint\babel\terser三个工具，所以我们要提升它的运行速度。我们可以开启多进程同时处理js文件，这样速度就比之前的单进程打包更快了。

### 是什么
    多进程打包

### Tree Shaking  减少代码体积
### 为什么
    开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。如果没有特殊处理的话，我们打包时会引入整个库，但是实际上可能我们只用上极小部分的功能。这样将整个库都打包进来，体积就太大了。
### 怎么用
    webpack默认开启

### babel
### 为什么
    babel为编译的每个文件都插入了辅助代码，使代码体积过大。babel对一些公共方法使用了非常小的辅助代码，比如_extend。默认情况下会被添加到每一个需要它的文件中。假如有十个文件都用了_extend，那这个方法就被定义了十次。我们应该把这个方法单独定义成一个模块，来避免重复引入。
### 是什么
    @babel/plugin-transform-runtime:禁用了babel自动对每个文件的runtime注入，而是从@babel/plugin-transform-runtime引入辅助代码。
    
### Image minimizer
### 为什么
    开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。因此要对图片进行压缩，减少图片体积。注意：如果项目中图片都是在线链接，那就不需要了。本地项目静态图片才需要进行压缩。
### 是什么
    image-minimizer-webpack-plugin:用来压缩图片的插件

### code Split 优化代码运行性能
### 为什么
    打包代码时会将所有js文件打包到一个文件中，体积太大了。我们如果只想渲染首页，就应该只加在首页的js文件，其他文件不应该加载。所以我们需要将打包生成的文件进行代码分割，生成多个js文件，渲染哪个页面就只加载某个js文件，这样加载的资源就少，速度就更快。
### 是什么
    代码分割（Code Split）主要做了两件事：1、分割文件：将打包生成的文件进行分割，生成多个js文件。2、按需加载：需要哪个文件就加载哪个文件。 
### 怎么用
    多入口打包文件
    将复用的文件代码，单独打包
    对于页面中暂时不用的文件，先不打包。等要打包的时候再加载。

### Preload/Prefetch
### 为什么
    我们前面已经做了代码分割，同时会使用import动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）。但是加载速度还不够好，比如：是拥护点击按钮时才加载这个资源的，如果资源体积很大，那么拥护会感觉明显卡顿效果。我们想在浏览器空闲时间，加载后继续使用的资源。我们就需要用上Preload或Prefetch技术。
### 是什么
    Preload:告诉浏览器立即加载资源
    Prefetch:告诉浏览器在空闲时才开始加载资源
    它们都只会加载资源，但不执行，并且都有缓存。它们的区别是Preload加载优先级高，Prefetch加载优先级低。Preload只能加载当前页面需要使用的资源，Prefetch可以加载当前页面资源，也可以加载下一个页面需要使用的资源。因此，当前页面优先级高的资源用Preload加载。下一个页面需要使用的资源用Prefetch加载。

### Core.js
### 为什么
    过去我们使用babel对js代码进行了兼容性处理，其中使用@babel/preset-env智能预设来处理兼容性问题。它能将ES6的一些语法进行编译转换，比如箭头函数，点点点运算符等。但是如果是async函数、promise对象、数组的一些方法（includes）等，它没办法处理。所以此时我们js代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将js兼容性问题彻底解决。
### 是什么
    core-js是专门用来做ES6以及以上API的polyfill。polyfill翻译过来叫做补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

### PWA
### 为什么
    开发Web App项目，项目一旦处于网络离线情况，就没法访问了。