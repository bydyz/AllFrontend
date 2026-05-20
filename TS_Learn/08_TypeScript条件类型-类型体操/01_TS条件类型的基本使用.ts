type IDType = number | string

//!   判断number是否是extends IDType        只能在这种特定的场合下使用，像是三元表达式
//!   如果 boolean 是 IDType 的子类型，那么 ResType 就是 true，否则为 false。

type ResType = boolean extends IDType ? true : false       // 字面量类型  false








//! 函数重载      extends number 稍稍注意一下这个用法         注意，这里不可以用 =  
// function sum<T extends number | string>(num1: T, num2: T): T extends number ? number : string
function sum<T extends number | string>(num1: T, num2: T): T 

function sum(num1: any, num2: any): any {
  return num1 + num2
}

const res = sum(20, 30)
const res2 = sum("abc", "cba")
// const res3 = sum(123, "cba")    // 如此用有错

export {}

