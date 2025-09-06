import React, { memo, useContext } from 'react'
// 要配合最外围的 index.js 里的内容使用
import { UserContext, ThemeContext } from "./context"

const App = memo(() => {
  // 使用Context
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)

  return (
    <div>
      <h2>User: {user.name}-{user.level}</h2>
      <h2 style={{color: theme.color, fontSize: theme.size}}>Theme</h2>
    </div>
  )
})

export default App

// useContext 是 React 中用于在函数组件中访问 Context 的 Hook。它接收一个 Context 对象（通过 React.createContext 创建），并返回该 Context 的当前值。