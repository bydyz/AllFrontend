interface IKun {
  name: string
  age: number
  slogan?: string
}

// 类型体操
type HYRequired<T> = {
  [P in keyof T]-?: T[P] 
}


// IKun都变成必选的
type IKun3 = HYRequired<IKun>

//!   Required 是TS的内置工具 
type IKun2 = Required<IKun>


export {}
