// node 环境下，能用require，不能用import
// redux 能够脱离浏览器 在node下运行
const { createStore } = require("redux")

// 初始化的数据
const initialState = {
  name: "why",
  counter: 100
}

// reducer 纯函数
function reducer(state = initialState) {
  return state
}

// 创建的store
const store = createStore(reducer)

module.exports = store