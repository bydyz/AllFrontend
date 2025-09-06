const PlusTwoSumPlugin = {
  install: function(app) {
    // 添加全局方法或属性
    // ！可以在  html  声明周期函数  组件内函数中使用
    app.config.globalProperties.$plusTwoSum = (num1, num2) => {
      return num1 * 2 + num2 * 2;
    };

    // 添加实例方法
    // ！可以在  html  声明周期函数  组件内函数中使用
    app.mixin({
      methods: {
        $plusTwoSumInstance(num1, num2) {
          return num1 * 2 + num2 * 2;
        }
      }
    });
  }
};

// 导出 install 方法，以便手动安装插件
export const install = app => {
  app.use(PlusTwoSumPlugin);
};

export default PlusTwoSumPlugin;
