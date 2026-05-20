type MapPerson<Type> = {
  readonly [Property in keyof Type]?: Type[Property]
}

// ！   在 本接口的情况下，添加  readonly  ?
interface IPerson {
  name: string
  age: number
  height: number
  address: string
}

type IPersonOptional = MapPerson<IPerson>

export {}

