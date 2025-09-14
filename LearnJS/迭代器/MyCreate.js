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