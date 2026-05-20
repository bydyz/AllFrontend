//！ 要求  同名且刚好
function printCoordinate(point: {x: number, y: number}) {
  console.log('x坐标：', point.x)
  console.log('y坐标：', point.y)
}
printCoordinate({m: 10, y: 30})
printCoordinate({x: 10, y: 30})
printCoordinate({x: 10})
printCoordinate({x: 10, y: 30, z: 50})
printCoordinate({x: 10, y: '30'})

// !    如此通过变量来一步转换则多参数无问题
let b = {x: 10, y: 30, z: 50}
printCoordinate(b)









//！ 要求  同名且刚好
type a = {x: number, y: number}
function printCoordinate1(point: a) {
  console.log('x坐标：', point.x)
  console.log('y坐标：', point.y)
}
printCoordinate1({m: 10, y: 30})
printCoordinate1({x: 10, y: 30})
printCoordinate1({x: 10})
printCoordinate1({x: 10, y: 30, z: 50})
printCoordinate1({x: 10, y: '30'})










type CalcType = (num1: number, num2: number) => number

//！    限定传入的参数 是  CalcType 类型        其需要 传入 两个 数字类型参数，返回一个数字类型的函数     但是最终传入的函数是  一个 数字类型参数，返回一个数字类型的函数
function calc(calcFn: CalcType) {
  const num1 = 10
  const num2 = 20
  const res = calcFn(num1, num2)
  console.log(res)
}

function foo(num1: number) {
  return num1
}

calc(foo)
//  这样也可
calc((num1: number) => {return num1})


export{}