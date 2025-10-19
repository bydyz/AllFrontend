// 没有 as const
let a = "hello";        // string
let b = 42;             // number
let c = true;           // boolean

// 使用 as const
let a2 = "hello" as const;        // "hello"
let b2 = 42 as const;             // 42
let c2 = true as const;           // true

// 常量声明自动推断为字面量
const d = "world";      // "world"
const e = 100;          // 100
const f = false;        // false





//！ typeof 的结果 是 string/number/boolean

console.log(typeof a)
console.log(typeof b)
console.log(typeof c)

console.log(typeof a2)
console.log(typeof b2)
console.log(typeof c2)

console.log(typeof d)
console.log(typeof e)
console.log(typeof f)

export {}