

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



const store: IStore = {
  state: {
    name: "why",
    age: 18
  },
  eating: function(this: IState) {
    // 上面给this指定属性，这样就可以取到 IState 中的值了
    console.log(this.name)
  },
  running: function(this: IState) {
    console.log(this.name)
  }
}

//！！！！！ 指定this，需要上面绑定，下面也要修改this指向
// !!上面写有对this进行类型限制，下面若没有用 call apply 修改this指向的会报错
// !!下面用修改this指向的 call apply ，上面没有对this进行类型限制则指定无效
store.eating.call(store.state)





export {}
