/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

// 这段代码表示告诉 ESLint 运行环境为 Node.js，而 @rushstack/eslint-patch/modern-module-resolution 则是一些用于修复 ESLint 与现代模块解析器的兼容性问题的代码。

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  // root: true 表示 ESLint 将停止在父级目录中寻找配置文件，以此作为根配置。
  // extends 字段指定了该配置文件继承了哪些其他配置文件。这里使用了 Vue.js、ESLint 推荐规则、Vue TypeScript 规则、Vue Prettier 规则以及 Prettier 推荐规则。

  // 'plugin:vue/vue3-essential': 这是 Vue.js 官方 ESLint 插件提供的一个基本配置，包含了一些 Vue.js 开发中常见的规则。vue3-essential 针对 Vue 3 进行了优化。
  // 'eslint:recommended': 这是 ESLint 提供的一组推荐规则，涵盖了一些常见的 JavaScript 代码风格和错误检查。
  // '@vue/eslint-config-typescript': 这是 Vue.js 官方提供的一个 TypeScript 相关的 ESLint 配置。它会添加一些适用于 TypeScript 项目的规则。
  // '@vue/eslint-config-prettier': 这是 Vue.js 官方提供的一个配置，用于与 Prettier 协同工作，确保 ESLint 不会与 Prettier 发生冲突。
  // 'plugin:prettier/recommended': 这个配置使用了 eslint-plugin-prettier 插件，它会将 Prettier 的一些规则集成到 ESLint 中，确保 ESLint 和 Prettier 协同工作。

  // plugin:vue/vue3-essential 和 eslint:recommended 是 ESLint 配置的扩展名，用于引入一组预定义的规则集。这些规则集定义了一系列的 ESLint 规则，可以通过这种方式方便地配置项目的代码风格和质量标准。
  // plugin:vue/vue3-essential: 这个配置来自 eslint-plugin-vue，是针对 Vue.js 项目的规则集。vue3-essential 表示是适用于 Vue 3 的规则集，包含了一些建议的 Vue.js 代码规范。
  // eslint:recommended: 这是 ESLint 提供的一组推荐规则，涵盖了一般性的 JavaScript 代码风格和质量检查。这是官方推荐的一套规则，适用于大多数 JavaScript 项目。
  // @vue/eslint-config-typescript: 这个配置来自 @vue/eslint-config-typescript 包，提供了一套适用于 Vue.js 项目的 TypeScript 规则。当你的项目使用 TypeScript 时，可以引入这个配置来进行 TypeScript 相关的代码检查。
  // @vue/eslint-config-prettier: 这个配置也来自 @vue/eslint-config-prettier 包，它用于关闭一些与 Prettier 冲突的 ESLint 规则。这样，ESLint 和 Prettier 就可以更好地配合使用。
  // plugin:prettier/recommended: 这个配置来自 eslint-plugin-prettier，它启用了 eslint-plugin-prettier 中的规则，使 ESLint 能够识别 Prettier 的规则并进行相应的代码格式化。这样可以确保 ESLint 和 Prettier 在代码格式方面保持一致。

  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 这里指定了解析选项，其中 ecmaVersion 设置为 'latest'，表示使用最新的 ECMAScript 版本。

  plugins: ['prettier'],

  rules: {
    'no-multiple-empty-lines': 'off',

    // 设置成  off  就不会因为有多个换行而报警告
    // 上面 extends plugin:prettier/recommended 即可 确保 ESLint 和 Prettier 在代码格式方面保持一致

    // 'prettier/prettier': [
    //   'error',
    //   {
    //     useTabs: false,
    //     tabWidth: 2,
    //     printWidth: 80,
    //     singleQuote: true,
    //     trailingComma: 'none',
    //     semi: false,
    //     endOfLine: 'auto'
    //   }
    // ],

    // 'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1, maxEOF: 1 }] 表示配置了 no-multiple-empty-lines 规则，'error' 表示触发规则时将其视为错误，后面的对象是规则的具体配置。
    //   max: 2 表示最多允许连续两个空行。
    //   maxBOF: 1 表示在文件开头（Beginning Of File）最多允许一个空行。
    //   maxEOF: 1 表示在文件末尾（End Of File）最多允许一个空行。

    'vue/multi-word-component-names': 'off',
    'no-undef': 'off'
  }
  // 在 rules 字段中，可以添加自定义的 ESLint 规则配置。上述例子中关闭了两个规则：vue/multi-word-component-names 和 no-undef。
}

// prettier/prettier 错误通常表示在使用 ESLint 的 Prettier 插件时，发现与 Prettier 的规则不一致的地方。这个错误可能有几个原因：

// Prettier 配置文件缺失或不正确： 如果项目中没有 .prettierrc 或 prettier.config.js 文件，或者文件中的配置与 ESLint 的 Prettier 插件配置不一致，就可能触发这个错误。

// ESLint Prettier 插件配置不一致： ESLint 中的 Prettier 插件需要与项目中 Prettier 的配置一致，否则就会报错。确保 ESLint 配置中的 Prettier 插件配置与你的项目 Prettier 配置一致。

// Prettier 版本问题： 确保你的项目中安装的 Prettier 版本与 ESLint 插件要求的版本兼容。

// 为了解决这个问题，你可以执行以下步骤：

// 1.安装 Prettier： 确保你的项目中已经安装了 Prettier。你可以运行以下命令安装：
// npm install --save-dev prettier

// 2.创建 Prettier 配置文件： 在项目根目录下创建一个 .prettierrc 文件，或者使用 prettier.config.js，并配置你的 Prettier 规则。例如：
// .prettierrc
// {
//   "singleQuote": true,
//   "semi": false,
//   // 其他配置...
// }
// 或者使用 prettier.config.js：
// prettier.config.js
// module.exports = {
//   singleQuote: true,
//   semi: false,
//   // 其他配置...
// };

// 3.确保 ESLint Prettier 插件配置一致： 在 ESLint 配置文件中，确保 Prettier 插件的配置与你的 Prettier 配置一致。例如：
// .eslintrc.js
// module.exports = {
//   // ...其他配置...
//   plugins: ['prettier'],
//   rules: {
//     'prettier/prettier': ['error', { singleQuote: true, semi: false }],
//     // ...其他规则...
//   },
// };

// 在 ESLint 配置中，Prettier 插件的配置通常是在 plugins 数组中引入了 'prettier' 插件，并在 rules 中配置了 'prettier/prettier' 规则。这个规则用于与 Prettier 的规则进行集成和检查。

// 以下是一个简单的示例，展示了如何在 ESLint 配置文件中配置 Prettier 插件：

// .eslintrc.js
// module.exports = {
//   // ...其他配置...
//   plugins: ['prettier'],
//   rules: {
//     'prettier/prettier': ['error', { singleQuote: true, semi: false }],
//     // ...其他规则...
//   },
// };

// 在这个配置中：

// plugins: ['prettier'] 表示引入了 Prettier 插件。
// rules: {'prettier/prettier': ['error', { singleQuote: true, semi: false }]} 表示配置了 Prettier 插件的规则，其中 'error' 表示触发规则时将其视为错误，后面的数组是规则的具体配置。
// 具体 Prettier 插件的规则配置取决于你项目中的需求和 Prettier 的配置。在上述示例中，singleQuote: true 表示使用单引号，semi: false 表示不使用分号。

// .prettierrc.json可以配置以下属性

// {
//   "semi": false, // 在语句末尾添加分号
//   "singleQuote": true, // 使用单引号而不是双引号
//   "tabWidth": 2, // 指定缩进的空格数
//   "useTabs": false, // 使用制表符进行缩进
//   "printWidth": 80, // 指定每行代码的最大长度
//   "endOfLine": "auto", // 换行符类型，可以是 "auto"、"lf"、"crlf"，根据项目情况选择
//   "trailingComma": "none", // 在对象和数组最后一个元素后面是否加逗号
//   "bracketSpacing": true, // 在对象字面量的括号之间打印空格
//   "jsxBracketSameLine": false, // 在多行 JSX 元素的末尾添加 > 而使 > 单独一行
//   "arrowParens": "always" // 在单个箭头函数参数周围加上括号
// }
