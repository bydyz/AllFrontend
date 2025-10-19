interface IIndexType {
  // 两个索引类型的写法
  [index: number]: string
  [key: string]: any

  //！ 由于 JavaScript 中所有对象的属性名都可以通过字符串访问（即使它们被定义为数字），因此任何通过数字索引获取的值也必须能够通过字符串索引获取。这意味着数字索引签名的返回类型必须是字符串索引签名返回类型的子类型。

  //！ 要求一:下面的写法不允许: 数字类型索引的值的类型, 必须是字符串类型索引的值的类型的 子类型
  // 结论: 数字类型必须是比如字符串类型更加确定的类型(需要是字符串类型的子类型)
  // 原因: 所有的数字类型都是会转成字符串类型去对象中获取内容
  // 数字0: number|string, 当我们是一个数字的时候, 既要满足通过number去拿到的内容, 不会和string拿到的结果矛盾
  // 数字"0": string

  // 数字0: string
  // 数字"0": number|string
  // [index: number]: number|string
  // [key: string]: string

  

  //！ 要求二: 当同时存在字符串和数字索引签名时，通常会优先考虑字符串索引签名，因为 JavaScript 对象本质上是基于字符串键的映射。
  // [index: number]: string
  // [key: string]: number|string

  // aaa: string
  // bbb: boolean 错误的类型
}

const names: IIndexType = ["abc", "cba", "nba"]
const item1 = names[0]
const forEachFn = names["forEach"]

names["aaa"]

export {}

