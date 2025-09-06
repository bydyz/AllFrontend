interface ILength {
  length: number
}

// 1.getLength没有必要用泛型
function getLength(arg: ILength) {
  return arg.length
}


function getLength1<Type = ILength>(arg: Type): Type {
  // return arg
  // !  这里的报错， 是因为最终的返回值类型需要时 Type
  return { length: arg.length }
}
function getLength2<Type>(arg: Type): Type {
  // !  这里的报错， 是因为最终的返回值类型需要时 Type
  return arg.length
}


function getLength3(arg: ILength): number {
  return arg.length
}

const length1 = getLength("aaaa")
const length2 = getLength(["aaa", "bbb", "ccc"])
const length3 = getLength({ length: 100 })














//! extends

//! 泛型约束：
//! extends
//！ 必要条件：传入的类型必须包含 Lengthwise 接口中定义的所有属性（本例中为 length 和 age），并且这些属性的类型也必须匹配。
//！ 可选条件：传入的类型可以包含额外的属性，这不会影响类型检查的结果。
interface Lengthwise {
  length: number;
  age: number
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength({length: 170, age: 26, hobby: "eating"}); // 编译通过，因为字符串有 length 属性
logLength(42); // 编译错误，数字没有 length 属性

//! 在上述例子中，T 必须是一个具有 length 属性的类型。这样，我们可以安全地访问传递给 logLength 函数的参数的 length 属性。



//! 在类的继承中，extends 用于创建一个类继承另一个类。子类继承父类的属性和方法，并且可以添加新的属性和方法。
export {}


//! T Extends String
// T 是 String 的子类型，则 T 可以 是 String 或者 任何字符串







// PropNames extends string = never;
// PropNames 被赋予了一个初始值 never，这在TypeScript中通常用来表示一个类型是不可能存在的。never 类型通常用于表示函数永远不会返回值（例如，抛出异常的函数），或者用于类型守卫，以排除某些类型的值。

// 将 PropNames 赋值为 never 意味着 PropNames 将不会是任何实际的字符串值。这通常用于类型系统中的约束，以确保 PropNames 不会被用作字符串字面量之外的任何方式。