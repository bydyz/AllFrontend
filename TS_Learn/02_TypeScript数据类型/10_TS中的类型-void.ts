//! 1.在TS中如果一个函数没有任何的返回值, 那么返回值的类型就是void类型

//! 2.如果返回值是void类型, 那么我们也可以返回undefined(TS编译器允许这样做而已)
function sum(num1: number, num2: number): void {
  console.log(num1 + num2)

  // return 123 // 错误的做法  不能return 123
}







// 基于上下文的类型推导（Contextual Typing）推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容

// 在 TypeScript 中，如果你对一个函数的类型限制是 type FnType = () => void，这表示该函数的返回类型是 void，即没有明确的返回值。
//! 在这种情况下，函数可以有返回语句，但返回的值会被忽略。
type FnType = () => void
 
const foo0: FnType = () => {
  return 123
}
//! 上面的例子中，尽管函数体中有 return 123; 这个返回语句，但由于函数的类型限制是 () => void，TypeScript 会忽略返回值。
//? 如果你尝试使用该函数的返回值，TypeScript 会给出相应的类型错误。

//！ 虽然可以打印123  但是不能使用
console.log(foo0)


type FooType = () => void
const foo: FooType = () => {}
const foo2: FooType = () => 1
const foo3: FooType = () => {return 1}
const foo1: FooType = (1) => {}








// 举个例子:(涉及函数的类型问题, 后续还会详细讲解)
//! 1.定义要求传入的函数的类型   any[] 修饰的是 args
//! (...args: any[]) 是一个函数类型的参数部分，它表示这个函数接受任意数量、任意类型的参数。
type ExecFnType = (...args: any[]) => void

// 2.定义一个函数, 并且接收的参数也是一个函数, 而且这个函数的类型必须是ExecFnType
function delayExecFn(fn: ExecFnType) {
  setTimeout(() => {
    fn("why", 18)
  }, 1000);
}

// 3.执行上面函数, 并且传入一个匿名函数
delayExecFn((name, age) => {
  console.log(name, age)
})

//!  此处需要 显式指定参数的类型为any    上面的匿名函数不需要 显式指定参数的类型为any
function passFn(name: any, age: any) {
  console.log(name, age)
}

delayExecFn(passFn)











// void类型
//! void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型     
//! 没有返回值时，倘若对函数没有写任何类型，那么它默认返回值的类型就是void的，我们也可以显示的来指定返回值是void
function sum0(num1: number, num2: number) {
  console.log(num1 + num2)
}
// 等同于
function sum1(num1: number, num2: number): void {
  console.log(num1 + num2)
}

//! 可以将undefined赋值给void类型，也就是函数可以返回undefined
function sum2(num1: number, num2: number): void {
  console.log(num1 + num2)
  // return num1 + num2
  // return ''
  // return 
  return undefined
}



export {}