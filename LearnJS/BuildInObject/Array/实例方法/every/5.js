// 语法
// every(callbackFn)
// every(callbackFn, thisArg)

// callbackFn = (element, index, array) => {}


// every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。


// 结合 filter 或其他方法使用

const criteria = {
  minScore: 60,
  maxScore: 100,
  inRange(score) {
    return score >= this.minScore && score <= this.maxScore;
  }
};

const scores = [65, 70, 58, 90, 95];

// 检查是否所有分数都在有效范围内
const allValid = scores.every(criteria.inRange, criteria);

console.log(allValid); // false（因为 58 < 60）