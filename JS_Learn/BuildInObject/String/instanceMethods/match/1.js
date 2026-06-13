// match(regexp)

// 参数
//   regexp
//     一个正则表达式对象
//     任何具有 Symbol.match 方法的对象。

//     如果 regexp 不是 RegExp 对象并且对象上无 Symbol.match 方法，则会使用 new RegExp(regexp) 将其隐式地转换为 RegExp。

//     如果你没有给出任何参数并直接使用 match() 方法，你将会得到一个包含空字符串的数组：[""]，因为这等价于 match(/(?:)/)。

// 返回值
//   一个 Array，其内容取决于是否存在全局（g）标志，如果没有匹配，则返回 null。

//   如果使用 g 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
//   如果没有使用 g 标志，则只返回第一个完整匹配及其相关捕获组。在这种情况下，match() 方法将返回与 RegExp.prototype.exec() 相同的结果（一个带有一些额外属性的数组）。

const str = "Hello, my email is user@example.com";

const regex = /(\w+)@(\w+\.\w+)/; // 匹配邮箱，有捕获组
const result = str.match(regex);

console.log(result);
// [
//   "user@example.com",  ← 完整匹配
//   "user",              ← 第一个捕获组 (\w+)
//   "example.com",       ← 第二个捕获组 (\w+\.\w+)
//   index: 16,           ← 匹配开始的索引
//   input: "Hello, my email is user@example.com",  ← 原始字符串
//   groups: undefined
// ]