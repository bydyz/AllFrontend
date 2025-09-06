//！ 函数的参数可以有默认值
//！ 1.有默认值的情况下, 参数的类型注解可以省略
//！ 2.有默认值的参数, 是可以接收一个undefined的值
function foo(x: number, y = 100) {
  console.log(y + 10)
}

foo(10)
foo(10, undefined)
foo(10, 55)



//！ foo  foo1的参数y类型其实都是  undefined 和 number 类型的联合



// ! 此处虽然指明了形参的属性，但是有默认值，故依旧可以传undefined
function foo1(x: number, y: number = 100) {
  console.log(y + 10)
}

foo1(10)
foo1(10, undefined)
foo1(10, 55)

export {}

