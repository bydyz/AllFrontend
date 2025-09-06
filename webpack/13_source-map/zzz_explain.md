## 认识source-map
◼ 我们的代码通常运行在浏览器上时，是通过打包压缩的：
  也就是真实跑在浏览器上的代码，和我们编写的代码其实是有差异的；
  比如ES6的代码可能被转换成ES5；
  比如对应的代码行号、列号在经过编译后肯定会不一致；
  比如代码进行丑化压缩时，会将编码名称等修改；
  比如我们使用了TypeScript等方式编写的代码，最终转换成JavaScript；
◼ 但是，当代码报错需要调试时（debug），调试转换后的代码是很困难的
◼ 但是我们能保证代码不出错吗？不可能。
◼ 那么如何可以调试这种转换后不一致的代码呢？答案就是source-map
  source-map是从 已转换的代码(打包后的代码) ，映射到原始的源文件；
  使浏览器可以重构原始源并在调试器中显示重建的原始源；



## 如何使用source-map  可以在 webpack.config.js 中设置 devtools: source-map
◼ 如何可以使用source-map呢？两个步骤：
  第一步：根据源文件，生成source-map文件，webpack在打包时，可以通过配置生成source-map；
  第二步：在转换后的代码，最后添加一个注释，它指向sourcemap；
    //# sourceMappingURL=common.bundle.js.map
◼ 浏览器会根据我们的注释，查找相应的source-map，并且根据source-map还原我们的代码，方便进行调试。
◼ 在Chrome中，我们可以按照如下的方式打开source-map：
  勾选 Enable JavaScript source maps、  Enable CSS source maps



## 分析source-map
◼ 最初source-map生成的文件大小是原始文件的10倍，第二版减少了约50%，第三版又减少了50%，所以目前一个133kb的文件，
最终的source-map的大小大概在300kb。
◼ 目前的source-map长什么样子呢？
  version：当前使用的版本，也就是最新的第三版；
  sources：从哪些文件转换过来的source-map和打包的代码（最初始的文件）；
  names：转换前的变量和属性名称（因为我目前使用的是development模式，所以不需要保留转换前的名称）；
  mappings：source-map用来和源文件映射的信息（比如位置信息等），一串base64 VLQ（veriable-length quantity可变
长度值）编码；
  file：打包后的文件（浏览器加载的文件）；
  sourceContent：转换前的具体代码信息（和sources是对应的关系）；
  sourceRoot：所有的sources相对的根目录；



## 生成source-map
◼ 如何在使用webpack打包的时候，生成对应的source-map呢？
  webpack为我们提供了非常多的选项（目前是26个），来处理source-map；
  https://webpack.docschina.org/configuration/devtool/
  选择不同的值，生成的source-map会稍微有差异，打包的过程也会有性能的差异，可以根据不同的情况进行选择；
◼ 下面几个值不会生成source-map
◼ false：不使用source-map，也就是没有任何和source-map相关的内容。
◼ none：production模式下的默认值（什么值都不写） ，不生成source-map。
◼ eval：development模式下的默认值，不生成source-map
  但是它会在eval执行的代码中，添加 //# sourceURL=；
  它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码；