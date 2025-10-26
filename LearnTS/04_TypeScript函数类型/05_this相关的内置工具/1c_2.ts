// ◼ Typescript 提供了一些工具类型来辅助进行常见的类型转换，这些类型全局可用。

//！ ◼ ThisParameterType
  // 用于提取一个函数类型Type的this (opens new window)参数类型；
  // 如果这个函数类型没有this参数返回unknown

//！ ◼ OmitThisParameter：
//   用于移除一个函数类型Type的this参数类型, 并且返回当前的函数类型

//！ ◼ ThisType
//    这个类型不返回一个转换过的类型，它被用作标记一个上下文的this类型。（官方文档）



//！ 3.ThisType: 用于绑定一个上下文的this
interface IState {
  name: string
  age: number
}

interface IStore {
  state: IState
  eating: () => void
  running: () => void
}



// ！！   & ThisType<IState>  给store绑定IState的this
// ！！   & ThisType<IState> 指定了该对象中方法的 this 上下文应该符合 IState 接口。
// ！！   & ThisType<IState> 只是限定，下面的调用也需绑定
const store: IStore & ThisType<IState> = {

  state: {
    name: "why",
    age: 18
  },
  eating: function() {
    console.log(this.name)
  },
  running: function() {
    console.log(this.name)
  }
}

store.eating.call(store.state)


export {}
