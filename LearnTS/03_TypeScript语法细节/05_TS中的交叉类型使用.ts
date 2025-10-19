//! 联合类型：两种(多种)类型要满足一个即可  使用 | 符号
type ID = number | string
const id1: ID = "abc"
const id2: ID = 123


//! 交叉类型: 两种(多种)类型要同时满足  使用&符号     通常是对对象类型进行交叉
type NewType = number & string // 没有意义




interface IKun {
  name: string
  age: number
}

interface ICoder {
  name: string
  coding: () => void
}

type InfoType = IKun & ICoder

//! 此处的 交叉类型 不能用 interface
// interface InfoType0 = IKun & ICoder





type IKun1 = {
  name: string
  age: number
}

type ICoder1 = {
  name: string
  coding: () => void
}

type InfoType1 = IKun1 & ICoder1
//  此处的 交叉类型 亦不能用 interface
// interface InfoType1 = IKun & ICoder





//! 此处即可用 InfoType 也可用 InfoType1
//！ amazing    单独一个接口都会有问题，两个联合就可以，似乎联合是取并集？？？？？？
const info: InfoType1 = {
  name: "why",
  age: 18,
  coding: function() {
    console.log("coding")
  }
}
