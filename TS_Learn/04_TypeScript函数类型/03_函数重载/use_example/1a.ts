//！   根据参数类型重载


// 重载签名
function processInput(input: string): string[];
function processInput(input: number): number[];
function processInput(input: boolean): boolean;

// 实现签名
function processInput(input: any): any {
  if (typeof input === 'string') {
    return input.split('');
  } else if (typeof input === 'number') {
    return Array.from({ length: input }, (_, i) => i + 1);
  } else if (typeof input === 'boolean') {
    return !input;
  }
  throw new Error('Invalid input type');
}

// 使用
const stringResult = processInput("hello"); 
// ✅ 类型: string[]，值: ['h', 'e', 'l', 'l', 'o']

const numberResult = processInput(5);
// ✅ 类型: number[]，值: [1, 2, 3, 4, 5]

const booleanResult = processInput(true);
// ✅ 类型: boolean，值: false

// ❌ 错误调用
// processInput(null); // 编译错误：没有匹配的重载



export {}