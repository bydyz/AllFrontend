import React, { memo, useRef, forwardRef, useImperativeHandle } from 'react'

const HelloWorld = memo(forwardRef((props, ref) => {

  const inputRef = useRef()

  // 子组件对父组件传入的ref进行处理    使得在父组件中可以调用 return 返回的函数
  useImperativeHandle(ref, () => {
    return {
      focus() {
        console.log("focus")
        inputRef.current.focus()
      },
      setValue(value) {
        console.log("setValue")
        inputRef.current.value = value
      }
    }
  })

  return <input type="text" ref={inputRef}/>
}))


const App = memo(() => {
  const titleRef = useRef()
  const parentInputRef = useRef()

  function handleDOM() {
    console.log("parentInputRef.current", parentInputRef.current)
    parentInputRef.current.focus()

    // 给  parentInputRef.current  设置 key为 value, \且值为 "666"      但是组件不会重新渲染，故输入框中依旧是空的
    parentInputRef.current.value = "666"

    // parentInputRef.current.setValue("哈哈哈")
  }

  return (
    <div>
      <h2 ref={titleRef}>哈哈哈</h2>
      <HelloWorld ref={parentInputRef}/>
      <button onClick={handleDOM}>DOM操作</button>
    </div>
  )
})

export default App



// memo: 用于性能优化，防止组件在父组件重新渲染时进行不必要的重渲染。
// forwardRef: 用于向子组件转发父组件传递的 ref。