//!  静态方法重载


class StringUtils {
  // 重载签名
  static format(template: string, ...args: string[]): string;
  static format(template: string, ...args: number[]): string;
  static format(template: string, ...args: any[]): string {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }

  // 另一个重载示例
  static parse(input: string): string;
  static parse(input: string, radix: number): number;
  static parse(input: string, radix?: number): string | number {
    if (radix !== undefined) {
      return parseInt(input, radix);
    }
    return input.trim();
  }
}

// 使用
const formatted1 = StringUtils.format("Hello {0}, welcome to {1}", "Alice", "TypeScript");
// ✅ 类型: string，值: "Hello Alice, welcome to TypeScript"

const formatted2 = StringUtils.format("The values are: {0}, {1}, {2}", 10, 20, 30);
// ✅ 类型: string，值: "The values are: 10, 20, 30"

const parsed1 = StringUtils.parse("   hello   ");
// ✅ 类型: string，值: "hello"

const parsed2 = StringUtils.parse("FF", 16);
// ✅ 类型: number，值: 255



export {}