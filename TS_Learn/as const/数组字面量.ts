// 没有 as const
const numbers = [1, 2, 3];                    // number[]
const mixed = ["text", 123, true];            // (string | number | boolean)[]

// 使用 as const
const numbers2 = [1, 2, 3] as const;          // readonly [1, 2, 3]
const mixed2 = ["text", 123, true] as const;  // readonly ["text", 123, true]

// 访问元素类型  注意：这里是对 mixed2 的操作
type First = typeof mixed2[0];  // "text"
type Second = typeof mixed2[1]; // 123
type Third = typeof mixed2[2];  // true