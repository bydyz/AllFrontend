// 在定义一个TypeScript中的函数时, 都要明确的指定参数的类型
//! 未设置返回值类型，相当于其为any   此处是由类型推导决定
function sum(num1: number, num2: number) {
  return num1 + num2
}

const res = sum(123, 321)
// sum("abc", "cba")
// sum({}, {})








//! 限定一个函数接受的参数是一个对象，这个时候要如何限定
//! 限定了对象中的key的 名称 类型 以及 数量(多或少均不可)
//! 这个感觉是是只针对函数的
// 在对象我们可以添加属性，并且告知TypeScript该属性需要是什么类型；
//！ 属性之间可以使用 , 或者 ; 来分割，最后一个分隔符是可选的；
//！ 每个属性的类型部分也是可选的，如果不指定，那么就是any类型；
function printCoordinate(point: {x: number, y: number}) {
  console.log('x坐标：', point.x)
  console.log('y坐标：', point.y)
}
printCoordinate({m: 10, y: 30})
printCoordinate({x: 10, y: 30})
printCoordinate({x: 10})
printCoordinate({x: 10, y: 30, z: 50})
printCoordinate({x: 10, y: '30'})








//! 对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个  ?
function printCoordinate1(point: {x: number, y: number, z?: number}) {
  console.log('x坐标：', point.x)
  console.log('y坐标：', point.y)
  if(point.z) {
    console.log('z坐标：', point.z)
  }
}
printCoordinate1({x: 10, y: 30})
printCoordinate1({x: 10, y: 30, z: 50})
printCoordinate1({x: 10, y: 30, z: '50'})
printCoordinate1({x: 10, y: '30'})












// 函数的参数类型
//   函数是JavaScript非常重要的组成部分，TypeScript允许我们指定  函数的参数  和  返回值的类型
//   参数的类型注解
//     声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型
function greet(name: string): string {
  console.log("hello" + name.toUpperCase())
  return "hello" + name.toUpperCase()
}


export {}
