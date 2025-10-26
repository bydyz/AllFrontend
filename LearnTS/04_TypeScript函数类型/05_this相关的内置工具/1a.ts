// ◼ Typescript 提供了一些工具类型来辅助进行常见的类型转换，这些类型全局可用。

//！ ◼ ThisParameterType
  // 用于提取一个函数类型Type的this (opens new window)参数类型；
  // 如果这个函数类型没有this参数返回unknown

//！ ◼ OmitThisParameter：
//   用于移除一个函数类型Type的this参数类型, 并且返回当前的函数类型

//！ ◼ ThisType
//    这个类型不返回一个转换过的类型，它被用作标记一个上下文的this类型。（官方文档）


function foo(this: { name888: string }, info: {name: string}) {
  console.log(this, info)
}


type FooType = typeof foo

//！ 1.ThisParameterType: 获取FooType类型中this的类型
type FooThisType = ThisParameterType<FooType>

let testOne: FooThisType = { name888: 'string888' }



export {}