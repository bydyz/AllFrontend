const PlusThreeSumPlugin = function(app) {
  // 添加全局方法或属性
  // ！可以在  html  声明周期函数  组件内函数中使用
  app.config.globalProperties.$plusThreeSum = (num1, num2) => {
    return num1 * 3 + num2 * 3;
  };

  // 添加实例方法
  // ！可以在  html  声明周期函数  组件内函数中使用
  app.mixin({
    methods: {
      $plusThreeSumInstance(num1, num2) {
        return num1 * 3 + num2 * 3;
      }
    }
  });
}

export default PlusThreeSumPlugin;
