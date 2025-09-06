import React, { memo, useState, useTransition } from 'react'

// 似乎是生成 英文名 数组
import namesArray from './namesArray'


const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const [ pending, startTransition ] = useTransition()

  function valueChangeHandle(event) {
    startTransition(() => {
      const keyword = event.target.value
      const filterShowNames = namesArray.filter(item => item.includes(keyword))
      setShowNames(filterShowNames)
    })
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: {pending && <span>data loading</span>} </h2>
      <ul>
        {
          showNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App

// useTransition 是 React Spring 库中的一个 Hook，用于处理元素的进入和离开动画。这个 Hook 返回一个数组和一个处理元素的方法。它通常与 Transition 组件一起使用。