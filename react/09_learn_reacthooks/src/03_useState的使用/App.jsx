import React, { memo, useState } from 'react'

const App = memo(() => {
  //! 在 React 中，调用 useState 返回的 set 函数会触发函数组件的重新渲染。这是因为在调用 set 函数后，React 会检测状态的变化，并重新执行函数组件，从而更新组件的 UI 以反映状态的变化。这种行为是 React 函数式组件的基本工作原理之一，它确保了组件能够响应状态的变化并更新视图。
  const [message, setMessage] = useState("Hello World")
  // const [count, setCount] = useState(100)
  // const [banners, setBanners] = useState([])

  function changeMessage() {
    console.log("函数式组件的函数执行了")

    setMessage("你好啊, 李银河!")
  }

  console.log("函数式组件执行了")
  return (
    <div>
      <h2>App: {message}</h2>
      <button onClick={changeMessage}>修改文本</button>
    </div>
  )
})

export default App