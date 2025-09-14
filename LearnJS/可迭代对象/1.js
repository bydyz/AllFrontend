const myIterable = {
  [Symbol.iterator]() {
    let count = 1;
    return {
      next() {
        if (count <= 5) {
          return { value: count++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// 使用 for...of 循环
for (const value of myIterable) {
  console.log(value); // 1, 2, 3, 4, 5
}