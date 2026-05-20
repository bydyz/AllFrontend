interface IKun {
  name: string
  age: number
  slogan?: string
}


// ！   作用是拿 第一个参数 的属性中不包含 第二个参数 的属性  生成一个新的类型
type HYOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never: P]: T[P]
}
// 这是一个 TypeScript 中的映射类型（Mapped Types）的定义，用于从对象类型中排除指定的属性。
// T 是输入的对象类型。
// K 是要排除的属性名的联合类型。
// [P in keyof T as P extends K ? never : P] 部分是映射类型的语法

// 这个类型的目的是排除 T 类型中键为 K 联合类型的属性。在映射类型中，as 关键字用于在映射中添加额外的约束。

// P in keyof T 表示遍历 T 类型的所有属性，并用 P 表示每个属性的键名。
// P extends K ? never : P 是一个条件类型。如果 P 是 K 的子类型（也就是属性名在 K 联合类型中），则映射到 never，否则映射到原来的属性名 P。
// 最终，[P in keyof T as P extends K ? never : P] 就是排除了 K 联合类型中属性的映射类型。

// ！   as  前后的两个条件需要先后满足
// ！   似乎这个 never 有排除的作用       似乎是控制永远不能出现 P extends K


type IKuns = HYOmit<IKun, "slogan"|"name">


//!   type BaseOmit<T, K extends keyof any> = { [P in Exclude<keyof T, K>]: T[P]; }
//!   type BaseExclude<T, U> = T extends U ? never : T
type IKuns2 = Omit<IKun, "slogan"|"name">


export {}
