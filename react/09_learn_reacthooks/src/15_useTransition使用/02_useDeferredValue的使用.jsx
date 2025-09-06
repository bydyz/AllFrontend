import React, { memo, useState, useDeferredValue } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const deferedShowNames = useDeferredValue(showNames)

  function valueChangeHandle(event) {
    const keyword = event.target.value
    const filterShowNames = namesArray.filter(item => item.includes(keyword))
    setShowNames(filterShowNames)
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: </h2>
      <ul>
        {
          deferedShowNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App


// useDeferredValue 是 React 的新特性之一，用于处理延迟渲染（deferred rendering）。延迟渲染是指将某些渲染工作推迟到浏览器空闲时段进行，以提高性能和响应速度。

// 在你的例子中，useDeferredValue 被用于处理 showNames，使得在输入框内容发生变化时，不立即更新 ul 中的用户名列表，而是等到浏览器处于空闲状态时再进行更新。

// 具体解释如下：
// useDeferredValue(showNames) 创建一个延迟渲染的版本，称为 deferedShowNames。
// 当输入框的值发生变化时，valueChangeHandle 函数会根据输入框的值过滤 namesArray，然后将过滤后的结果设置为 showNames。
// 由于 deferedShowNames 是延迟渲染的，所以在输入框值变化时，ul 中的用户名列表不会立即更新。
// 在浏览器空闲时段，React 将会检查 deferedShowNames 是否有更新，并在需要时更新 ul 中的用户名列表。


// 这个特性主要用于优化性能，避免在用户输入时过早地进行大量计算或渲染，从而提高应用的响应速度。