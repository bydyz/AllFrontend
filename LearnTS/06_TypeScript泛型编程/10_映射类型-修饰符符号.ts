type MapPerson<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property]

  //！ -readonly 的写法表示我们将去除属性的只读修饰符，即允许属性是可写的。
  //！ -? 的写法表示我们将去除属性的可选修饰符，即所有属性都是必需的。
}

interface IPerson {
  name: string
  age?: number
  readonly height: number
  address?: string
}


type IPersonRequired = MapPerson<IPerson>

const p: IPersonRequired = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}


export {}

