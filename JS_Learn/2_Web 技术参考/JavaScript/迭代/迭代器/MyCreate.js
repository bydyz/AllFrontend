function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  // 迭代次数
  let iterationCount = 0;

  // 迭代器
  const rangeIterator = {
    next() {
      let result;
      if (nextIndex < end) {
        result = { 
          value: nextIndex, 
          done: false 
        };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { 
        value: iterationCount, 
        done: true 
      };
    },
    return() {
      console.log('迭代器提前终止，清理资源...');
      // 执行清理，比如关闭文件句柄
      current = 0; // 重置状态
      return { done: true };
    },
    throw(error) {
      console.log('接收到异常:', error);
      // 可以选择处理异常，然后继续迭代或终止
      return { done: true }; // 终止迭代
    }
  };

  return rangeIterator;
}



let it = makeRangeIterator(1, 10, 2);
console.log('it', it)

let result = it.next();

while (!result.done) {
  console.log('result', result)
  result = it.next();
}
console.log('最后一个result', result)

console.log(`已迭代序列的大小：${result.value}`); // 5