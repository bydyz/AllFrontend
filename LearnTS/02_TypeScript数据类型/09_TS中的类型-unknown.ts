let foo: unknown = "aaa"
foo = 123
//! unknown类型，只可赋值，不可有其他操作
console.log(foo.length)

//！ 在 TypeScript 中，你可以对 unknown 类型的变量进行重新赋值，包括赋值为另一个完全不同的类型。这是因为重新赋值操作不会违反类型安全，它只是改变了变量的值，并没有尝试以不安全的方式使用它。

//! 要求必须进行类型的校验(缩小), 才能根据缩小之后的类型, 进行对应的操作
if (typeof foo === "string") { // 类型缩小
  console.log(foo.length, foo.split(" "))
}












// unknown类型
// unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量
//! unknown类型的值上做任何事情都是不合法的   但是可以赋值
const flag = true
let result: unknown
function foo1(param: any): any {
  return param
}
if(flag) {
  //！ 只是不能操作，但是可以赋值
  result = foo1('666')
} else {
  // 只是不能操作，但是可以赋值
  result = foo1(666)
}
if(typeof result === 'string') {
  console.log(result.length)
}
// unknown类型的值上做任何事情都是不合法的

// 这句话指的是在 TypeScript 中，对于类型为 unknown 的值进行任何操作都是不合法的。unknown 是 TypeScript 3.0 引入的一种顶级类型，用于表示未知类型的值。与 any 类型不同，unknown 类型是类型安全的，即使在对其进行操作之前，你必须先进行类型检查或类型断言。

// 如果一个值的类型是 unknown，那么在该值上进行任何操作都会被 TypeScript 视为不合法的操作，因为 TypeScript 不能确定该值的确切类型。这种设计强制开发者在使用 unknown 类型的值时进行类型检查，以确保安全性。

function processValue(value: unknown): void {
  // 以下操作都是不合法的，需要先进行类型检查或类型断言
  // value++; // Error: 对类型为 "unknown" 的值进行操作是不允许的
  // value.toUpperCase(); // Error: 对类型为 "unknown" 的值进行操作是不允许的

  // 正确的方式是进行类型检查或类型断言
  if (typeof value === 'string') {
    value.toUpperCase(); // 此时是合法的
  }

  // 或者使用类型断言
  (value as string).toUpperCase(); // 也是合法的
}

export {}
