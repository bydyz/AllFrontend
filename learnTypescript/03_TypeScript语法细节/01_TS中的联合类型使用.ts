//! TypeScript的类型系统允许我们使用多种运算符，从现有类型中构建新类型。

//! 我们来使用第一种组合类型的方法：联合类型（Union Type）
//!   联合类型是由两个或者多个其他类型组成的类型；
//!   表示可以是这些类型中的任何一个值；
//!   联合类型中的每一个类型被称之为联合成员（union's members）

//! 只要保证是联合类型中的某一个类型的值即可

//! TypeScript可以根据我们缩小的代码结构，推断出更加具体的类型






// 1.联合类型的基本使用
let foo: | number | string = "abc"
foo = 123

// 使用的时候要特别的小心
if (typeof foo === "string") {
  //！ 因为上面已经赋值，foo会被推断为 number，故此处不可达，其会变为 never 类型
  console.log(foo.length)
}






// 2.举个栗子: 打印id
function printID(id: number | string) {
  console.log("您的ID:", id)

  //！ 类型缩小
  if (typeof id === "string") {
    console.log(id.length)
  } else {
    console.log(id)
  }
}

printID("abc")
printID(123)




//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}
export {}