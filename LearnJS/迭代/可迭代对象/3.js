// 完整的迭代器实现示例
function createFibonacciIterator(maxTerms = 10) {
  let n1 = 0, n2 = 1, count = 0;
  
  return {
    // 实现next()方法使该对象成为迭代器
    next() {
      if (count++ < maxTerms) {
        const current = n1;
        [n1, n2] = [n2, n1 + n2];
        return { value: current, done: false };
      }
      return { value: undefined, done: true };
    },
    
    // 可选：实现return()方法用于提前终止
    return(value) {
      console.log('迭代提前终止');
      return { value, done: true };
    },
    
    // 可选：实现[Symbol.iterator]使该对象同时也是可迭代对象
    [Symbol.iterator]() {
      return this;
    }
  };
}

// 使用迭代器
const fibIterator = createFibonacciIterator(5);
console.log(fibIterator.next()); // { value: 0, done: false }
console.log(fibIterator.next()); // { value: 1, done: false }
console.log(fibIterator.next()); // { value: 1, done: false }