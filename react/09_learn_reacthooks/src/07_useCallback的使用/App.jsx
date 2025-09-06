import React, { memo, useState, useCallback, useRef } from 'react'

// useCallback性能优化的点:
// 1.当需要将一个函数传递给子组件时, 最好使用useCallback进行优化, 将优化之后的函数, 传递给子组件

// props中的属性发生改变时, 组件本身就会被重新渲染
const HYHome = memo(function(props) {
  const { increment } = props
  console.log("HYHome被渲染")
  return (
    <div>
      <button onClick={increment}>increment+1</button>

      {/* 100个子组件 */}
    </div>
  )
})

const App = memo(function() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("hello")

  console.log("App被渲染")

  // 普通的函数     会使得 HYHome 和 App 均被渲染
  // count 发生改变时，即函数也发生了改变，即HYHome的props也发生了改变
  // 如此写，即使message发生变化，父组件会重新渲染，则返回给子组件的函数发生改变，则子组件也会重新渲染
  // 使用 useCallback 的主要场景是在父组件传递回调函数给子组件时，避免因为每次渲染都创建新的回调函数导致子组件重新渲染。通过记忆化，可以确保回调函数在依赖变化时才重新创建。
  // const increment = () => {
  //   setCount(count+1)
  // }



  // 会使得 HYHome 和 App 均被渲染
  // count 发生改变时，即函数也发生了改变，即HYHome的props也发生了改变
  // const increment = useCallback(function foo() {
  //   console.log("increment")
  //   setCount(count+1)
  // }, [count])


  // 做法一: 将count依赖移除掉, 缺点: 闭包陷阱          只会加一个1
  // const increment = useCallback(function foo() {
  //   console.log("increment")
  //   setCount(count+1)
  // }, [])



  // 进一步的优化: 当count发生改变时, 也使用同一个函数(了解)
  // 做法一: 将count依赖移除掉, 缺点: 闭包陷阱
  // 做法二: useRef, 在组件多次渲染时, 返回的是同一个值
  const countRef = useRef()         // 只有 App 均被渲染
  countRef.current = count
  const increment = useCallback(function foo() {
    console.log("increment")
    setCount(countRef.current + 1)
  }, [])



  // 自己写的对象没有效果
  // let countObject = {
  //   count: 1
  // }
  // const increment = () => {
  //   setCount(countObject.count + 1)
  // }



  // 自己写的对象没有效果
  // let countObject = {
  //   count: 1
  // }
  // const increment = useCallback(function foo() {
  //   console.log("increment")
  //  // setCount只需传入数值，就可以修改 count
  //   setCount(countObject.count+1)
  // }, [])

  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={increment}>+1</button>

      <HYHome increment={increment}/>

      <h2>message:{message}</h2>
      <button onClick={e => setMessage(Math.random())}>修改message</button>
    </div>
  )
})

export default App

// useCallback 是 React 中用于创建记忆化版本回调函数的 Hook。它接收一个回调函数和一个依赖数组，并返回一个记忆化后的回调函数。记忆化的意思是，只有在依赖数组发生变化时，才会返回新的回调函数，否则返回缓存的回调函数。

// 使用 useCallback 的主要场景是在父组件传递回调函数给子组件时，避免因为每次渲染都创建新的回调函数导致子组件重新渲染。通过记忆化，可以确保回调函数在依赖变化时才重新创建。




// const countRef = useRef()         
// countRef.current = count

// 详解:

// 在这段代码中，使用了 React 的 useRef 钩子来创建了一个引用（countRef）。useRef 返回一个可变的对象，其 current 属性可以被赋值为任何可变的值。

// 下面是对代码的详解：

// 创建 useRef 对象： const countRef = useRef() 创建了一个 useRef 对象，初始值为 undefined。

// 更新 current 属性： countRef.current = count 将 count 的当前值赋给 countRef 对象的 current 属性。这样做的目的是将 count 的当前值存储在 countRef 中。

// 这样的使用场景通常用于解决闭包陷阱的问题。在 React 中，由于事件处理函数和一些异步操作的回调函数是在组件重新渲染后执行的，如果在这些回调函数中使用了状态或其他引用，可能会捕获到旧的值。通过使用 useRef 来存储可变的值，可以确保在回调函数中访问的是最新的值。

// 在这个特定的例子中，countRef.current 将始终包含 count 的最新值。这样，如果在某个回调函数中需要访问当前的 count，可以通过 countRef.current 来获取。