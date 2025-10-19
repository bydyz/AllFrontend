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

let testOne:FooThisType = { name888: 'string' }



//！ 2.OmitOmitThisParameter: 删除this参数类型, 返回剩余的函数类型
type PureFooType = OmitThisParameter<FooType>



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



// const store: IStore = {
//   state: {
//     name: "why",
//     age: 18
//   },
//   eating: function() {
//     //! 此时这里的  this  指向  store，不存在  name
//     console.log(this.name)
//   },
//   running: function() {
//     //! 此时这里的  this  指向  store，不存在  name
//     console.log(this.name)
//   }
// }

//! store.eating.call(store.state)





// const store: IStore = {
//   state: {
//     name: "why",
//     age: 18
//   },
//   eating: function(this: IState) {
//     // 上面给this指定属性，这样就可以取到 IState 中的值了
//     console.log(this.name)
//   },
//   running: function(this: IState) {
//     console.log(this.name)
//   }
// }

//！！！！！ 指定this，需要上面绑定，下面也要修改this指向
// !!上面写有对this进行类型限制，下面若没有用 call apply 修改this指向的会报错
// !!下面用修改this指向的 call apply ，上面没有对this进行类型限制则指定无效
// store.eating.call(store.state)







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
