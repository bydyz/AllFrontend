// 可迭代对象示例
const iterableObject = {
  data: [1, 2, 3],
  
  // 实现Symbol.iterator方法
  [Symbol.iterator]() {
    let index = 0;
    // 返回一个迭代器
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 使用for...of循环（需要可迭代对象）
for (const value of iterableObject) {
  console.log(value); // 输出: 1, 2, 3
}