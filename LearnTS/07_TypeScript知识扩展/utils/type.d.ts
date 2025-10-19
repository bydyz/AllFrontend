//！ .d.ts 文件，它是用来做类型的声明(declare)，称之为类型声明（Type Declaration）或者类型定义（Type Definition）文件。

// 它仅仅用来做类型检测，告知typescript我们有哪些类型；

//！ typescript会在哪里查找我们的类型声明呢？
//  内置类型声明；
//  外部定义类型声明；
//  自己定义类型声明；


//！ ◼ 内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件；
//    包括比如Function、String、Math、Date等内置类型；
//    也包括运行环境中的DOM API，比如Window、Document等；

//！ ◼ TypeScript 使用模式命名这些声明文件lib.[something].d.ts。

//！ 内置类型声明通常在我们安装typescript的环境中会带有的；
//   https://github.com/microsoft/TypeScript/tree/main/lib

//！ ◼ 我们可以通过target和lib来决定哪些内置类型声明是可以使用的：
//    例如，startsWith字符串方法只能从称为ECMAScript 6的 JavaScript 版本开始使用；

//！ ◼ 我们可以通过target的编译选项来配置：TypeScript通过lib根据您的target设置更改默认包含的文件来帮助解决此问题。
//    https://www.typescriptlang.org/tsconfig#lib



//！ ◼ 外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明。

// ◼ 这些库通常有两种类型声明方式：
// ◼ 方式一：在自己库中进行类型声明（编写.d.ts文件），比如axios
// ◼ 方式二：通过社区的一个公有库DefinitelyTyped存放类型声明文件
//    该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/
//    该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search=
//    比如我们安装react的类型声明： npm i @types/react --save-dev



//！ ◼ 什么情况下需要自己来定义声明文件呢？
//    情况一：我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash
//    情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；

//！ 除了声明变量、函数、类之外，我们也可以声明模块，比如lodash模块默认不能使用的情况，可以自己来声明这个模块：
// 声明模块的语法: declare module '模块名' {}。
//    在声明模块的内部，我们可以通过 export 导出对应库的类、函数等；

// declare module "lodash" {
//   export function join(...args: any[]): any
// }

//！ ◼ 在某些情况下，我们也可以声明文件：
//    比如在开发vue的过程中，默认是不识别我们的.vue文件的，那么我们就需要对其进行文件的声明；
//    比如在开发中我们使用了 jpg 这类图片文件，默认typescript也是不支持的，也需要对其进行声明；



//！ ◼ 什么是tsconfig.json文件呢？（官方的解释）
//    当目录中出现了 tsconfig.json 文件，则说明该目录是 TypeScript 项目的根目录；
//    tsconfig.json 文件指定了编译项目所需的根目录下的文件以及编译选项。

//！ ◼ 官方的解释有点“官方”，直接看我的解释。
// ◼ tsconfig.json文件有两个作用：
//    作用一（主要的作用）：让TypeScript Compiler在编译的时候，知道如何去编译TypeScript代码和进行类型检测；
//     ✓ 比如是否允许不明确的this选项，是否允许隐式的any类型；
//     ✓ 将TypeScript代码编译成什么版本的JavaScript代码；
//    作用二：让编辑器（比如VSCode）可以按照正确的方式识别TypeScript代码；
//     ✓ 对于哪些语法进行提示、类型错误检测等等；

//！ ◼ JavaScript 项目可以使用 jsconfig.json 文件，它的作用与 tsconfig.json 基本相同，只是默认启用了一些 JavaScript 相关的
// 编译选项。
//    在之前的Vue项目、React项目中我们也有使用过；

interface IPerson {
  name: string
  age: number
}

type IDType = number | string

