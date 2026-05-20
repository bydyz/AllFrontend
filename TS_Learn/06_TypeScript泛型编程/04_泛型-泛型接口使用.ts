//! 在 TypeScript 中，<Type = string> 是泛型参数的默认值。它表示在未显式提供泛型参数类型时，将使用默认类型（在这里是 string）。泛型参数是在定义接口、类或函数时，用于表示类型的占位符，以便在实际使用时指定具体的类型。

// 在你提供的 IKun 接口中，<Type = string> 意味着如果在使用 IKun 时未明确指定泛型参数的类型，那么默认将使用 string 作为泛型参数的类型。

//！ 有默认值的时候，如果要省略尖括号，使用的类型必须是 默认值  不会进行类型推断，但是函数中会
interface IKun<Type = string> {
  name: Type
  age: number
  slogan: Type
}

// !  明确指定泛型参数的类型为 string
const kunkun: IKun<string> = {
  name: "why",
  age: 18,
  slogan: "哈哈哈"
}

// !  明确指定泛型参数的类型为 number
const ikun2: IKun<number> = {
  name: 123,
  age: 20,
  slogan: 666
}

//! 未明确指定泛型参数的类型  默认 string
const ikun3: IKun = {
  name: "kobe",
  age: 30,
  slogan: "坤坤加油!"
}


export {}
