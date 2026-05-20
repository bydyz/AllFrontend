interface IKun {
  name: string
  age: number
  slogan?: string
}

// 类型体操
//!   name | age | slogan
type keys = keyof IKun

let a: keys = 'name'

export {}