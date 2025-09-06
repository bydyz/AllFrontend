// configureStore：包装createStore以提供简化的配置选项和良好的默认值。它可以自动组合你的 slice reducer，添加你提供的任何 Redux 中间件，redux-thunk默认包含，并启用 Redux DevTools Extension。
// 即，我不需要再集成 redux-thunk   也不需要自己去开启  Redux DevTools Extension。

// ◼ configureStore用于创建store对象，常见参数如下：
//    reducer，将slice中的reducer可以组成一个对象传入此处；
//    middleware：可以使用参数，传入其他的中间件（自行了解）；
//    devTools：是否配置devTools工具，默认为true；

import { configureStore } from "@reduxjs/toolkit"

import counterReducer from "./features/counter"
import homeReducer from "./features/home"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer
  }
})

export default store
