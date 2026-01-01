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
      return this;  // 返回自身，因为自身就是迭代器
    }
  };
}

// 创建迭代器
const iterator = createRangeIterator(1, 5, 2);

// 1. 手动使用 next() 方法
console.log("手动迭代:");
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
