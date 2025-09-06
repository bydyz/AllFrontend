// import { createStore, applyMiddleware } from "redux"
// import thunk from 'redux-thunk';
// import reducer from "./reducer"

// const store = createStore(reducer, applyMiddleware(thunk))

// export default store







// 下面的与上方的不同之处在于 开启了 redux_devtools_extension
import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk';
import reducer from "./reducer"

// 由 redux_devtools_extension 提供，可通过window窗口获取
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 开启 redux_devtools_extension 的trace功能
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
