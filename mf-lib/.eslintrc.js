module.exports = {
  root: true, // 停止在父级目录中寻找
  env: {
    browser: true, // 浏览器全局变量
    es6: true, // 启用除模块以外的所有ECMAScript 6功能（这会自动将ecmaVersion解析器选项设置为6）
    node: true // Node.js 全局变量和 Node.js 作用域
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off', // vue组件名必须由多个单词组成
    'vue/no-reserved-component-names': 'off', // vue组件名不能和html标签同名（不区分大小写）
    'no-alert': 'error', // 禁止用alert confirm prompt
    'no-var': 'error', // 禁用var,用let和const代替
    'no-inline-comments': 'off', // 禁止行内备注
    eqeqeq: 'error' // 必须使用全等
  }
}
