interface IKun {
  name: string
  age: number
  slogan?: string
}

// 类型体操
//!   name | age | slogan
type keys = keyof IKun

//!  number|string|symbol
type Res = keyof any



// !    number|string|symbol  
type Res1 = keyof any
// !    a、b、c 的结果是 true     d 是 false
type a = "上海" | "北京" | "洛杉矶" extends keyof any ? true : false
type b = "上海" | 1 | "洛杉矶" extends keyof any ? true : false
type c = 5 | 1 | 16 extends keyof any ? true : false

type d = 5 | 1 | true extends keyof any ? true : false




//!   需要特别注意  [P in Keys]  
type HYRecord<Keys extends keyof any, T> = {
  [P in Keys]: T
}


//!   弄成了新的 type    对象里面的属性类型为对象，即第二个参数的类型
type t1 = "上海" | "北京" | "洛杉矶"
type IKuns = HYRecord<t1, IKun>

type IKuns2 = Record<t1, IKun>



const ikuns: IKuns = {
  "上海": {
    name: "xxx",
    age: 10
  },
  "北京": {
    name: "yyy",
    age: 5,
    slogan: "it's very important"
  },
  "洛杉矶": {
    name: "zzz",
    age: 3
  }
}

export {}
