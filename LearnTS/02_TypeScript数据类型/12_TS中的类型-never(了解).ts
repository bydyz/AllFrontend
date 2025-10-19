//! 进行类型推导时, 可能会自动推导出来是never类型
//! never 表示永远不会发生值的类型     死循环 或者 抛出一个异常
// 如果一个函数中是一个死循环或者抛出一个异常，那么它不会返回东西，此时写void类型或者其他类型作为返回值类型都不合适(似乎可以写void)，我们就可以使用never类型
function loopFun(): void {
  while(true) {
    console.log('123')
  }
}

function loopErr(): never {
  throw new Error()
}



function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case "string":
      console.log(message.length)
      break
    case "number":
      console.log(message)
      break
    case "boolean":
      console.log(Number(message))
      break
    default:
      const check: never = message
  }
}

handleMessage("aaaa")
handleMessage(1234)
handleMessage(true)

export {}

