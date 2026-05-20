function demonstrateCaching() {
  console.log('\n=== 使用 WeakMap 实现缓存 ===');
  
  class ExpensiveOperationCache {
    constructor() {
      this.cache = new WeakMap();
    }
    
    // 执行昂贵操作（带缓存）
    expensiveOperation(obj) {
      // 检查缓存
      if (this.cache.has(obj)) {
        console.log('从缓存获取结果');
        return this.cache.get(obj);
      }
      
      // 模拟昂贵操作
      console.log('执行昂贵计算...');
      const result = {
        computed: `Result for ${JSON.stringify(obj)}`,
        timestamp: Date.now(),
        hash: Math.random().toString(36).substr(2, 9)
      };
      
      // 缓存结果
      this.cache.set(obj, result);
      return result;
    }
    
    // 清空缓存（实际上不需要，对象被回收时缓存自动清除）
    clear() {
      // WeakMap 没有 clear 方法，这是设计上的特点
      console.log('WeakMap 缓存会自动管理，无需手动清空');
    }
  }
  
  // 使用缓存
  const cache = new ExpensiveOperationCache();
  
  const objA = { data: 'A' };
  const objB = { data: 'B' };
  
  console.log('第一次计算 objA:', cache.expensiveOperation(objA));
  console.log('第二次计算 objA（应缓存）:', cache.expensiveOperation(objA));
  console.log('第一次计算 objB:', cache.expensiveOperation(objB));
  
  // 当 objA 和 objB 不再被引用时，缓存条目会自动被垃圾回收
  return cache;
}

const cachingDemo = demonstrateCaching();