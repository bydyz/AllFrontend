


//! T Extends String
//！ T 是 String 的子类型，则 T 可以 是 String 或者 任何字符串  或则  多个字符串的组合







// PropNames extends string = never;
// PropNames 被赋予了一个初始值 never，这在TypeScript中通常用来表示一个类型是不可能存在的。never 类型通常用于表示函数永远不会返回值（例如，抛出异常的函数），或者用于类型守卫，以排除某些类型的值。

// 将 PropNames 赋值为 never 意味着 PropNames 将不会是任何实际的字符串值。这通常用于类型系统中的约束，以确保 PropNames 不会被用作字符串字面量之外的任何方式。






// type PropNames = "name" | "age" | "address";

// let propertyName: PropNames extends string ? PropNames : string;      // PropNames






type argType = string

//! 如果 T = never，那 T extends string 是否成立？    成立  因为 never 是所有类型的子类型
//！ = never	如果未显式指定泛型，将使用 never 作为默认值
function testOne<T extends string = never>(arg: T): void {
  console.log(arg);
}

testOne('666')
testOne(666)
testOne(argType)



function testTwo<T extends string>(arg: T): void {
  console.log(arg);
}

testTwo('666')
testTwo(666)
testTwo(argType)



//！ 接口使用泛型在有默认值的时候，如果要省略尖括号，使用的类型必须是 默认值  不会进行类型推断，但是函数中会
function testThree<T extends string = '999'>(arg: T): void {
  console.log(arg);
}

testThree('666')
testThree<'666'>('666')
testThree<'666'>('668')

// 上面  T 是  泛型参数        <'666'>的 '666' 是类型参数

// 使用 never 作为默认值在某些情况下是有其意义的：

//！   明确意图：它明确了函数作者的意图，即调用时，这个泛型参数 T 应该被明确指定，而不是依赖于默认的 string 类型。   即要加尖括号

//   防止意外赋值：如果 T 被声明为 string 而不是 never，那么在不提供类型参数的情况下，任何字符串字面量或字符串类型的变量都可以作为参数传递给函数。使用 never 作为默认值可以防止这种情况，迫使调用者显式地提供类型参数。

//   类型保护：在更复杂的类型系统中，使用 never 作为默认值可以作为一种类型保护机制，确保 T 不会意外地被赋予除了明确指定的字符串字面量之外的任何类型。

//   文档化：它作为一种文档化的约定，提示其他开发者在使用这个函数时，应该考虑提供具体的类型参数。    感觉前面四条都是在说同一个问题

//   类型推断限制：在某些特定的上下文中，类型推断可能会受到限制，此时使用 never 作为默认值可以避免类型推断导致的意外行为。





export {}