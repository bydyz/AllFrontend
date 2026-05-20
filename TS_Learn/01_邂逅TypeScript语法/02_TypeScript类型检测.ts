//！   : { length: number }           似乎是传入的变量需要包含length属性，且其为number
function getLength(args: { length: number }) {
  console.log(args)
  console.log(args.length)
  console.log('')
  return args.length
}

getLength("aaaaa")

getLength(["abc", "cba", "nba", 123])

const info = {
  length: 100
}
getLength(info)

const info1 = {
  length: '100'
}
getLength(info1)

getLength(123)

export {}
