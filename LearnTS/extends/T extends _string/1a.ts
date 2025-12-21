// 1. 普通字符串字面量
function processString<T extends string>(input: T): T {
    return input;
}

// ✅ 可接受的类型示例
const result1 = processString("hello");           // T = "hello"
const result2 = processString("world");           // T = "world"
const result3 = processString("");                // T = "" (空字符串)
const result4 = processString("123");             // T = "123" (数字字符串)





export {}