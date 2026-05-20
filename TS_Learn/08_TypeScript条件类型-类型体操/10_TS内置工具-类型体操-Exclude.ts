type IKun = "sing" | "dance" | "rap"

// ！   只有最后的三个是正确的    因此 IKun 是  "sing"  "dance"  "rap"  三者之一
// let a1: IKun = "sing" | "dance" | "rap"
// let a2: IKun = "sing" | "dance"
// let a3: IKun = "sing" | "rap"
// let a4: IKun = "rap" | "dance"
// let a5: IKun = "sing"
// let a6: IKun = "dance"
// let a7: IKun = "rap"

// !   返回 永远不能是E的子类型的 T       最后的结果就是其他两个的联合类型
//!    用于排除类型 T 中与给定类型 E 相同的部分。
//!    T 是 "sing"  "dance"  "rap"  三者之一 排除不能为的即是 最后的答案
type HYExclude<T, E> = T extends E ? never: T


type IKuns1 = HYExclude<IKun, "sing"|"rap"|"dance">
type IKuns2 = HYExclude<IKun, "rap"|"dance">
type IKuns3 = HYExclude<IKun, "dance">








type IKuns5 = Exclude<IKun, "rap">

type IKuns6 = Exclude<IKun, "666">


export {}
