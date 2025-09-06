// squareSumPlugin.js

// 定义插件
// 这里的写法有点怪哦，为啥 { } 里面直接包裹了一个函数，和plugin2做对比

// ES6 中引入的一种新语法，称为 "简写方法"（Method Shorthand）。在对象字面量中，当一个属性的值是一个函数时，可以省略函数关键字 function，只需写下函数名即可。这种简写方法更加简洁，但功能与完整的语法形式是一样的。

// 故，下面的简写模式，原本是：
// const SquareSumPlugin = {
//   install: function(app) {
//   }
// };

// ES6 的 对象字面量增强写法
const SquareSumPlugin = {
  install(app) {
    // 添加全局方法或属性
    // ！可以在  html  声明周期函数  组件内函数中使用
    app.config.globalProperties.$squareSum = (num1, num2) => {
      return num1 ** 2 + num2 ** 2;
    };

    // 添加实例方法
    // ！可以在  html  声明周期函数  组件内函数中使用
    app.mixin({
      methods: {
        $squareSumInstance(num1, num2) {
          return num1 ** 2 + num2 ** 2;
        }
      }
    });
  }
};

export default SquareSumPlugin;
