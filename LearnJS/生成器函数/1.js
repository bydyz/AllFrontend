function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
  console.log('生成器函数最上面执行了！！！')
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  console.log('生成器函数最后面执行了！！！')
  return iterationCount;
}


// 创建生成器实例
const generator = makeRangeIterator(1, 5);
console.log(generator)

// 逐步获取值
let result = generator.next();
console.log(result); // { value: 1, done: false }

result = generator.next();
console.log(result); // { value: 2, done: false }

result = generator.next();
console.log(result); // { value: 3, done: false }

result = generator.next();
console.log(result); // { value: 4, done: false }

result = generator.next();
console.log(result); // { value: 4, done: true }

// 迭代完毕后，继续调用 next()
result = generator.next();
console.log(result); // { value: undefined, done: true }