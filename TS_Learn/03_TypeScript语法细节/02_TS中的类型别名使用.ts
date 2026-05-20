// 对定义的复杂数据类型起别名，可以方便的在多个地方使用


//！ 类型别名: type
type MyNumber = number
const age: MyNumber = 18



// 给ID的类型起一个别名
type IDType = number | string

function printID(id: IDType) {
  console.log(id)
}



// 打印坐标
type PointType = { x: number, y: number, z?: number }
function printCoordinate(point: PointType) {
  console.log(point.x, point.y, point.z)
}



//！ JavaScript 规范声明任何没有 export 的 JavaScript 文件都应该被认为是一个脚本，而非一个模块
//！ 如果你有一个文件，现在没有任何 import 或者 export，但是你希望它被作为模块处理，添加这行代码  export{}

export {}
