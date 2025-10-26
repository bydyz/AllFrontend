//！   联合类型参数重载


// 重载签名
function parseValue(value: string): string;
function parseValue(value: number): number;
function parseValue(value: boolean): boolean;
function parseValue(value: string[]): string[];
function parseValue(value: object): string;

// 实现签名
function parseValue(value: any): any {
  if (typeof value === 'string') {
    return value.trim();
  } else if (typeof value === 'number') {
    return Math.round(value * 100) / 100; // 保留两位小数
  } else if (typeof value === 'boolean') {
    return value ? '是' : '否';
  } else if (Array.isArray(value)) {
    return value.map(item => String(item).toUpperCase());
  } else if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  throw new Error('Unsupported value type');
}

// 使用
const str = parseValue("  hello world  "); 
// ✅ 类型: string，值: "hello world"

const num = parseValue(3.14159);
// ✅ 类型: number，值: 3.14

const bool = parseValue(true);
// ✅ 类型: boolean，值: "是"

const arr = parseValue(["apple", "banana"]);
// ✅ 类型: string[]，值: ["APPLE", "BANANA"]

const obj = parseValue({ key: "value" });
// ✅ 类型: string，值: '{"key":"value"}'



export {}