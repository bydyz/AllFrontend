interface IKun {
  name: string
  age: number
  slogan?: string
}

// 类型体操
type HYPartial<T> = {
  [P in keyof T]?: T[P] 
}


// IKun都变成可选的
//! 参数的属性是不是可选的经过此操作均会变为 可选的 
type IKunOptional = HYPartial<IKun>

//!   Partial 是TS的内置工具 
type IKunOptional1 = Partial<IKun>

export {}
