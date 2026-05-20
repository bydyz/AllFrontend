interface IKun {
  name: string
  age: number
  slogan?: string
}

type HYRecord<Keys extends keyof any, T> = {
  [P in Keys]: T
}

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
