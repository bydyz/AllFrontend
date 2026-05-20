// 记忆

//！ 第一个
// ('aaa' | 'bbb') extends ('aaa' | 'bbb' | 'ccc')

//！ 第二个
// interface IKun {
//   name: string
//   age: number
// }
// type a = keyof IKun     // 结果是  键名的联合  即  'name' | 'age'




// type a = 'aaa' | 'bbb'
type b = 'aaa' | 'bbb' | 'ccc'

let test1: a extends b ? string : never = "It's true";



