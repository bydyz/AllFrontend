const store = require("./store")

// 当 store 的state发生变化，会触发 subscribe 传入的函数
// 其返回值是一个函数，调用后会取消订阅
const unsubscribe = store.subscribe(() => {
  console.log("订阅数据的变化:", store.getState())
})


// 修改store中的数据: 必须action
store.dispatch({ type: "change_name", name: "kobe" })
store.dispatch({ type: "change_name", name: "lilei" })

unsubscribe()

// 修改counter
store.dispatch({ type: "add_number", num: 10 })
store.dispatch({ type: "add_number", num: 20 })
store.dispatch({ type: "add_number", num: 30 })
store.dispatch({ type: "add_number", num: 100 })

