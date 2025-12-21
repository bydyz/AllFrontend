// 2. 字符串联合类型
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

function createConfig<T extends string>(
    type: T, 
    value: string
): { type: T; value: string } {
    return { type, value };
}

// ✅ 字符串联合类型示例
const colorConfig = createConfig("red" as Color, "#ff0000");
const sizeConfig = createConfig("medium" as Size, "中号");

// 直接使用字面量（TypeScript 会自动推断）
const directColor = createConfig("blue", "#0000ff");    // T = "blue"
const directSize = createConfig("large", "大号");       // T = "large"





export {}