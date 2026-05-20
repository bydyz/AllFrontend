//！ 导入 多个 namespace 的写法
import { price, date } from "./utils/format";

// !    导入一个函数
import { sum } from "./utils/math";



//! 导入的是类型, 推荐在类型的前面加上type关键
// import { type IDType, type IPerson } from "./utils/type"
import type { IDType, IPerson } from "./utils/type"

console.log(sum(20, 30))

const id1: IDType = 111
const p: IPerson = { name: "why", age: 18 }
// tsconfig => includes

// 使用命名空间中的内容
price.format("1111")
date.format("22222")




