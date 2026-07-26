function demonstrateOnceExecution() {
  console.log('\n=== 单次执行保证 ===');
  
  const executedFunctions = new WeakSet();
  
  function once(fn) {
    return function(...args) {
      // 检查函数是否已经执行过
      if (executedFunctions.has(fn)) {
        console.log('函数已执行过，跳过');
        return undefined;
      }
      
      // 执行函数并记录
      const result = fn.apply(this, args);
      executedFunctions.add(fn);
      
      return result;
    };
  }
  
  // 测试用例
  const initializeApp = once(() => {
    console.log('应用初始化...');
    return '初始化完成';
  });
  
  const loadConfig = once(() => {
    console.log('加载配置...');
    return { theme: 'dark', lang: 'zh' };
  });
  
  console.log('第一次调用:', initializeApp());
  console.log('第二次调用:', initializeApp()); // 不会执行
  
  console.log('第一次加载配置:', loadConfig());
  console.log('第二次加载配置:', loadConfig()); // 不会执行
  
  // 不同的函数可以分别控制
  const anotherInit = once(() => console.log('另一个初始化'));
  anotherInit(); // 会执行
  anotherInit(); // 不会执行
  
  return executedFunctions;
}

const onceDemo = demonstrateOnceExecution();