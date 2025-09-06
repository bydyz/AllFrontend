import React, { memo, useRef } from 'react'

const App = memo(() => {
  const titleRef = useRef()
  const inputRef = useRef()
  
  function showTitleDom() {
    console.log(titleRef.current)
    inputRef.current.focus()
  }

  return (
    <div>
      {/* 好像是在函数组件中  它只能绑定 dom  但是不能绑定组件 */}
      <h2 ref={titleRef}>Hello World</h2>
      <input type="text" ref={inputRef} />
      <button onClick={showTitleDom}>查看title的dom</button>
    </div>
  )
})

export default App