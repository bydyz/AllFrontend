// 总结类型体操题目: MyReturnType     
//! 获取函数的返回类型
//!     T extends (...args: any[]) => infer R：这是一个条件类型（conditional type）。它表示如果 T 是一个函数类型，那么将函数的返回类型赋值给 R。infer R 的作用是在条件类型中引入一个新的类型变量 R，用于捕获 T 的返回类型。
//!     ? R : never：如果 T 是一个函数类型，返回 R，否则返回 never。这是通过条件运算符来实现的。
//!     最终，MyReturnType<T> 的含义是：如果 T 是一个函数类型，那么返回这个函数的返回类型；否则，返回 never。
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
type MyReturnType1<T> = T extends (...args: any[]) => infer R ? R : never

type CalcFnType = (num1: number, num2: string) => number

type CalcFnType6 = number

type CalcReturnType = MyReturnType<CalcFnType>        // number

//！ CalcFnType6 是 number类型，不符合   T extends (...args: any[]) => any  这一个限制条件
type CalcReturnType6 = MyReturnType<CalcFnType6>

//！ never
type CalcReturnType61 = MyReturnType1<CalcFnType6>

//!   foo 将被推断为 string，因为 exampleFunction 的返回类型是 string。
function foo() {
  return "abc"
}
type FooReturnType = MyReturnType<typeof foo>


















//! 自己定义的返回  参数类型
//!    这段 TypeScript 代码定义了一个通用类型 MyParameterType<T>，它接受一个函数类型 T 作为泛型参数。这个类型的作用是获取函数的参数类型。
//!    T extends (...args: any[]) => any：这个部分表示泛型参数 T 必须是一个函数类型，其参数可以是任意类型，而返回类型是任意类型。
//!    T extends (...args: infer A) => any：这是一个条件类型（conditional type）。它表示如果 T 是一个函数类型，那么将函数的参数类型数组赋值给 A。infer A 的作用是在条件类型中引入一个新的类型变量 A，用于捕获 T 的参数类型。
//!    ? A : never：如果 T 是一个函数类型，返回 A，否则返回 never。这是通过条件运算符来实现的。
//!    最终，MyParameterType<T> 的含义是：如果 T 是一个函数类型，那么返回这个函数的参数类型数组；否则，返回 never。
type MyParameterType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never

type CalcFnType2 = (num1: number, num2: string) => number
type CalcParameterType = MyParameterType<CalcFnType2>
//！     CalcParameterType 的值将是 [num1: number, num2: string]


















// 获取一个函数的返回值类型: 内置工具
//! TypeScript 提供了一个内置的工具类型来获取  函数类型的返回类型  ，它就是 ReturnType<T>。所以，你可以使用内置的 ReturnType 工具类型来达到相同的目的，而不需要手动定义 MyReturnType。
function exampleFunction2(a: string, b: number): string {
  return "Hello, TypeScript!";
}
//!   exampleFunction2 将被推断为 string，因为 exampleFunction2 的返回类型是 string。
type ResultType = ReturnType<typeof exampleFunction2>;
// ResultType 的值将是 string

// ！  Parameters  以集合的形式返回  函数的参数
type paramType = Parameters<typeof exampleFunction2>

// !    顺序也必须一致
let a: paramType = [ '111', 1 ]





export {}
