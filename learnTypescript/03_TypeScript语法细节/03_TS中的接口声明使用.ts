// Interface 的合并行为

// 在 TypeScript 中，interface 支持声明合并（Declaration Merging）。
//! 这意味着你可以多次定义同一个接口，TypeScript 会自动将这些定义合并为一个完整的接口。
interface Person1 {
  name: string;
}

interface Person1 {
  age: number;
}

const person: Person1 = {
  name: "Alice",
  age: 25,
};

//! TypeScript 将两次定义合并为一个完整的 Person 接口，最终 Person 包含了 name 和 age 两个属性。

// 合并规则：
//   如果两个接口定义中有相同的属性或方法，它们的类型必须一致，否则会导致编译错误。
//   如果两个接口定义中有不同的属性或方法，则会被合并到一起。







//! Type 不支持合并
// 与 interface 不同，type 定义的是类型别名（Type Alias），它不支持声明合并。如果你尝试对同一个类型别名进行多次定义，TypeScript 会报错。
type Person = {
  name: string;
};

type Person = {
  age: number;
};

// 上述代码会报错：Duplicate identifier 'Person'.








// 实际开发中的选择
//! 如果你需要定义一个可以逐步扩展的类型，建议使用 interface。
//! 如果你需要定义一个复杂的类型（如联合类型、元组等），或者希望类型定义更加稳定，建议使用 type。






//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}

