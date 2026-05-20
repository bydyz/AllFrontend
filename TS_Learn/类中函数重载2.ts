//! 函数重载      extends number 稍稍注意一下这个用法         注意，这里不可以用 =  
// function sum<T extends number | string>(num1: T, num2: T): T extends number ? number : string
function sum<T extends number | string>(num1: T, num2: T): T 

function sum(num1: any, num2: any): any {
  return num1 + num2
}

const res = sum(20, 30)
console.log('11111111111111111111111111111111111111111111111111111111', res)
const res2 = sum("abc", "cba")
console.log('22222222222222222222222222222222222222222222222222222222', res2)

export {}