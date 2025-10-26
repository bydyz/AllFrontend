//！   类方法重载


class Calculator {
  // 重载签名
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number[], b: number[]): number[];
  add(a: any, b: any): any;

  // 实现
  add(a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
      return a + b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b];
    }
    throw new Error('Invalid parameters');
  }

  // 另一个重载示例
  multiply(value: number): number;
  multiply(value: number, times: number): number;
  multiply(value: number, times?: number): number {
    return times ? value * times : value * 2; // 默认乘2
  }
}

// 使用
const calc = new Calculator();

const numResult = calc.add(5, 3);
// ✅ 类型: number，值: 8

const strResult = calc.add("Hello", "World");
// ✅ 类型: string，值: "HelloWorld"

const arrResult = calc.add([1, 2], [3, 4]);
// ✅ 类型: number[]，值: [1, 2, 3, 4]

const multi1 = calc.multiply(5);    // 默认乘2 → 10
const multi2 = calc.multiply(5, 3); // 乘3 → 15



export {}