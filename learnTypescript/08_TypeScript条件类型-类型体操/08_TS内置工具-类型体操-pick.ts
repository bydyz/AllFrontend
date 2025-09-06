interface IKun {
  name: string
  age: number
  slogan?: string
}

//!    K extends keyof T 限定了 K 只能是 "slogan"|"name"|"age" 的子类型             keyof 后面是只能接对象吗
type HYPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

//!   从原有接口中抽出第二个参数的属性，组成一个新的类型    原本有什么特殊字符，新的依旧有
type IKuns = HYPick<IKun, "slogan"|"name">
type IKuns2 = Pick<IKun, "slogan"|"name">




export {}
