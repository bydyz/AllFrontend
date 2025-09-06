interface IIndexType {
  // 返回值类型的目的是告知通过索引去获取到的值是什么类型
  // [index: number]: string
  [index: string]: any
  // [index: string]: string
}


// 索引签名: [index: number]: string
const names: IIndexType = ["abc", "cba", "nba"]




// ！ 这个索引签名好牛
// 索引签名: [index: string]: any: 没有报错               [index: number]: string  没有报错
// 1.索引要求必须是字符串类型 names[0] => names["0"]
// const names: IIndexType = ["abc", "cba", "nba"]


// 索引签名: [index: string]: string: 会报错
// const names: IIndexType = ["abc", "cba", "nba"]







//！ 为什么 [index: string]: any 不报错？
// 当你使用 [index: string]: any; 作为索引签名时，TypeScript 允许你将任何类型的值赋给对象的属性。这意味着你可以将数组（或其他任何类型）直接赋给这种类型的变量，因为 any 表示可以是任意类型。在这种情况下，TypeScript 并不会对数组的内容进行严格的检查，它只关心你是否满足了基本的类型结构要求——即能够通过字符串键访问到某个值。

// 然而，这里存在一个微妙之处：数组在 JavaScript 中也是对象，并且可以通过字符串索引访问其元素（例如 arr['0'] 等价于 arr[0]）。因此，从技术上讲，数组确实符合 [index: string]: any; 的定义，因为它允许通过字符串索引来获取元素（尽管通常我们会使用数字索引来访问数组元素）。

//！ 为什么 [index: string]: string 会报错？
// 当你试图将一个数组赋值给 [index: string]: string; 类型的变量时，TypeScript 会报错。这是因为数组本质上是一个具有特定结构的对象，它的元素可以是任意类型（默认是 any），而不是严格意义上的字符串。即使数组中的所有元素都是字符串类型，数组本身并不符合 [index: string]: string; 的定义，因为这个定义要求所有的属性值都必须是字符串，并且它期望的是一个对象结构而非数组结构。

// 具体来说，对于数组 ["abc", "cba", "nba"]，虽然每个元素都是字符串，但是数组作为一个整体不符合 [index: string]: string; 的要求，因为它不是一个纯粹的对象形式，而是带有长度、原型方法等特性的特殊对象。此外，数组的索引通常是数字而不是字符串，这与索引签名的要求不匹配。

export {}

