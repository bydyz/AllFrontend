const name = "why"
const age = 18

function sayHello() {
  console.log("sayHello")
}

console.log("bar 111")

// 导出 export   此处的  {}  不是对象，只是特殊的语法而已
export {
  name,
  age,
  sayHello
}

console.log("bar 222")

