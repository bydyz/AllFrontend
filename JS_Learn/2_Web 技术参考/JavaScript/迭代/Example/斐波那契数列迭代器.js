class Fibonacci {
  constructor(limit = Infinity) {
    this.limit = limit;
  }

  [Symbol.iterator]() {
    let count = 0;
    let prev = 0;
    let current = 1;
    const limit = this.limit;
    
    return {
      next() {
        if (count++ >= limit) {
          return { done: true };
        }
        const result = { value: current, done: false };
        [prev, current] = [current, prev + current];
        return result;
      }
    };
  }
}

// 使用
const fibonacci = new Fibonacci(10);
for (const num of fibonacci) {
  console.log(num); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
}