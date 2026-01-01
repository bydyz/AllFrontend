function createRangeIterator(start, end, step = 1) {
  let current = start;  // 闭包变量，记录当前值
  
  return {
    // 1. 迭代器协议的核心方法
    next() {
      if (current <= end) {
        const value = current;
        current += step;
        return { value, done: false };
      }
      return { value: undefined, done: true };
    },
    
    // 2. 可选的迭代器方法（提前终止）
    return(value) {
      console.log('迭代提前终止');
      return { value, done: true };
    },
    
    // 3. 可迭代协议的核心方法
    [Symbol.iterator]() {
      return this;  // 返回自身，因为自身就是迭代器   也就是 外层 return后的一坨
    }
  };
}

console.log("\n测试提前终止:");
const iterator2 = createRangeIterator(1, 10);
for (const num of iterator2) {
  if (num > 3) {
    break; // 触发 return 方法
  }
  console.log(num); // 1, 2, 3
}
// 控制台会输出: "迭代提前终止"
