import { createStore, compose, combineReducers } from "redux"
import { log, thunk, applyMiddleware } from "./middleware"
// import thunk from "redux-thunk"

import counterReducer from "./counter"
import homeReducer from "./home"
import userReducer from "./user"

// 正常情况下 store.dispatch(object)
// 想要派发函数 store.dispatch(function)

// 将 reducer 合并在一起
const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer,
  user: userReducer
})

// combineReducers实现原理(了解)
// function reducer(state = {}, action) {
//   // 返回一个对象, store的state
//   return {
//     counter: counterReducer(state.counter, action),
//     home: homeReducer(state.home, action),
//     user: userReducer(state.user, action)
//   }
// }

// redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;

const store = createStore(reducer)

// 使用中间件，可以在action即将被派发出去前将其拦截，然后加入一些操作在里面    redux-thunk即是一个中间件，或拦截派发，判断其是一个函数时，先进行运行
// 粗略实现了  react-thunk   applyMiddleWare  的底层，比较粗略，但是核心大概是哪个意思，故封装的  applyMiddleware  不能像redux的applyMiddleware一样传入 composeEnhancers  用以开启redux-devtools
applyMiddleware(store, log, thunk)

export default store
