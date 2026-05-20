

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
  eating: function() {
    //! 此时这里的  this  指向  store，不存在  name
    console.log(this.name)
  },
  running: function() {
    //! 此时这里的  this  指向  store，不存在  name
    console.log(this.name)
  }
}

store.eating.call(store.state)





export {}
