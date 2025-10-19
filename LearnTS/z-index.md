# 编程开发中我们有一个共识：错误出现的越早越好

  能在写代码的时候发现错误，就不要在代码编译时再发现（IDE的优势就是在代码编写过程中帮助我们发现错误）。
  能在代码编译期间发现错误，就不要在代码运行期间再发现（类型检测就可以很好的帮助我们做到这一点）。
  能在开发阶段发现错误，就不要在测试期间发现错误，能在测试期间发现错误，就不要在上线后发现错误





# JavaScript 和 TypeScript 的区别

JavaScript没有对我们传入的参数进行任何的限制，只能等到运行期间才发现这个错误；当这个错误产生时，会影响后续代码的继续执行，也就是整个项目都因为一个小小的错误而深入崩溃

我们可以将TypeScript理解成加强版的JavaScript。
  JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是支持的；
  TypeScript在实现新特性的同时，总是保持和ES标准的同步甚至是领先；
  并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等；
  并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，在编译时也可以不借助于Babel这样的工具





# TypeScript 的特点

始于JavaScript，归于JavaScript
  TypeScript从今天数以百万计的JavaScript开发者所熟悉的语法和语义开始；
  使用现有的JavaScript代码，包括流行的JavaScript库，并从JavaScript代码中调用TypeScript代码；
  TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或更高版本）的JavaScript引擎中

TypeScript是一个强大的工具，用于构建大型项目
  类型允许JavaScript开发者在开发JavaScript应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构；
  类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有JavaScript库的行为；

拥有先进的 JavaScript
  TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和Decorators，以帮助建立健壮的组件；
  这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的ECMAScript3（或更新版本）的JavaScript；





# 编译 TypeScript

TypeScript最终会被编译成JavaScript来运行，所以我们需要搭建对应的环境
  需要在电脑上安装TypeScript，这样就可以通过TypeScript的Compiler将其编译成JavaScript     这个如何操作呢？？？？？？？？？？？？
  npm install typescript -g
  tsc --version  查看版本
  tsc --init    生成ts配置文件   tsconfig.json

通常，对于typeScript，首先通过tsc编译TypeScript到JavaScript代码，然后在浏览器或者Node环境下运行JavaScript代码

通过webpack，配置本地的TypeScript编译环境和开启一个本地服务，可以使得TypeScript直接运行在浏览器上

通过ts-node库，为TypeScript的运行提供执行环境





# ts-node库的使用

  npm install ts-node -g     ts-node --version
  ts-node需要依赖 tslib 和 @types/node 两个包  npm install tslib @types/node -g
  进入ts所在的文件夹，然后直接通过 ts-node 来运行TypeScript的代码  ts-node math.ts





# 在TypeScript中定义变量

在TypeScript中定义变量需要指定 标识符 的类型

完整的声明格式如下：
  声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解（Type Annotation）；
      var/let/const 标识符: 数据类型 = 赋值
      例如：let message: string = 'Hello World'   倘若接下来我们给这个message赋值其他类型的值，则会报错

在TypeScript定义变量（标识符）和ES6之后一致，可以使用var、let、const来定义

在tslint中并不推荐使用var来声明变量
  可见，在TypeScript中并不建议再使用var关键字了，主要原因和ES6升级后let和var的区别是一样的，var是没有块级作用域的，会引起很多的问题





# 变量的类型推导（推断）

  有时候为了方便起见我们并不会在声明每一个变量时都写上对应的数据类型，我们更希望可以通过TypeScript本身的特性帮助我们推断出对应的变量类型  
  （意思是：命名变量时未特意为其设置类型，经过第一次的赋值后，TypeScript由于其本身的特性帮助我们推断出其变量类型，进而下次给变量赋值时会进行类型检测）
  Keep in mind, we don't always have to write explicit type annotations. In many cases, TypeScipt can even just infer(or "figure out") the types for us if we omit them





# TypeScript 和 JavaScript 在类型上的特点

TypeScript和JavaScript一样，不区分整数类型（int）和浮点型（double），统一为number类型，ES6新增了二进制和八进制的表示方法，而TypeScript也是支持二进制、八进制、十六进制的表示

boolean类型只有两个取值：true和false

string类型是字符串类型，可以使用单引号或者双引号表示，也支持ES6的模板字符串来拼接变量和字符串

数组类型的定义也非常简单，有两种方式：
  string[]: 数组类型, 并且数组中存放的字符串类型
  Array<string>: 数组类型, 并且数组中存放的是字符串类型   （Array<string>事实上是一种泛型的写法）

  倘若添加其他类型到数组中，则会报错  Argement of type 'number' is not assignable to parameter of type

object对象类型可以用于描述一个对象，但是从其中不能获取数据，亦不可设置数据       会提示不存在   执行会报Property 'name' does not exist on type 'object'

Symbol类型
ES5中，如果我们是不可以在对象中添加相同的属性名称
  通常我们的做法是定义两个不同的属性名字：比如name1和name2      
  也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值

在 JavaScript 中，undefined 和 null 是两个基本数据类型    在TypeScript中，它们各自的类型也是undefined和null，也就意味着它们既是实际的值，也是自己的类型

函数的参数类型
  函数是JavaScript非常重要的组成部分，TypeScript允许我们指定函数的参数和返回值的类型
  参数的类型注解
    声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型
  和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的返回类型：某些第三方库处于方便理解，会明确指定返回类型

匿名函数与函数声明会有一些不同：
  当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时；
  该函数的参数会自动指定类型