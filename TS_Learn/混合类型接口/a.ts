// 只有调用签名的接口
interface SimpleCallable {
  (x: number, y: number): number;
}

// 实现：任何函数都可以赋值
const add: SimpleCallable = (a: number, b: number) => a + b;
const multiply: SimpleCallable = (a: number, b: number) => a * b;

// 使用
console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6