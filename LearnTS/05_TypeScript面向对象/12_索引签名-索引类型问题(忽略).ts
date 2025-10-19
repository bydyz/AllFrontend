interface IIndexType {
  [index: number]: any
}

// !    和 11 里不同的是   any          这个any造成了都可以使用 
const num: IIndexType = ["abc", "cba", "nba"]
const numbers: IIndexType = [1, 2, 3]

//！ 通过数字类型访问索引时, 最终都是转化成string类型访问
const num1 = num[0]
console.log(num1)

//！ 通过数字类型访问索引时, 最终都是转化成string类型访问
const numbers1 = numbers[0]
console.log(numbers1)









interface IIndexType1 {
  [index: string]: any
}
const info: IIndexType1 = { name: "why", age: 18 }
const name = info["name"]
console.log(name)

export {}
