type IKun = "sing" | "dance" | "rap" | null | undefined

// ！   绝对不能是 null|undefined 子属性 的 T
type HYNonNullable<T> = T extends null|undefined ? never: T

// ！   除去 null、undefined  留下剩下的构成新类型
type IKuns = HYNonNullable<IKun>

export {}
