import React, { memo, useCallback } from 'react'
import { useMemo, useState } from 'react'


const HelloWorld = memo(function(props) {
  console.log("HelloWorld被渲染~")
  return <h2>Hello World</h2>
})


function calcNumTotal(num) {
  console.log("calcNumTotal被调用~")
  let total = 0
  for (let i = 1; i <= num; i++) {
    total += i
  }
  return total
}

const App = memo(() => {
  console.log("App被渲染了")

  const [count, setCount] = useState(0)



  // 如此写，只要 父组件重新渲染，calcNumTotal就会被调用
  // const result = calcNumTotal(50)




  // 如此写，只要 父组件重新渲染，calcNumTotal就会被调用
  const result = calcNumTotal(count*2)



  // 1.不依赖任何的值, 进行计算   父组件重新渲染，但calcNumTotal不会被调用
  // const result = useMemo(() => {
  //   return calcNumTotal(50)
  // }, [])



  // 2.依赖count
  // 打印顺序：   App被渲染了  >  calcNumTotal被调用~  >  HelloWorld被渲染~
  // const result = useMemo(() => {
  //   return calcNumTotal(count*2)
  // }, [count])



  // 此种写法是错误的
  // const result = useMemo(() => {
  //   return calcNumTotal(50)
  // }, [count])



  // 3.useMemo和useCallback的对比
  // function fn() {}
  // const increment = useCallback(fn, [])
  // const increment2 = useMemo(() => fn, [])



  // 4.使用useMemo对子组件渲染进行优化
  // const info = { name: "why", age: 18 }
  const info = useMemo(() => ({name: "why", age: 18}), [])

  return (
    <div>
      <h2>计算结果: {result}</h2>
      <h2>计数器: {count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>

      <HelloWorld result={result} info={info} />

      <hr />

      {/* <HelloWorld result={result} /> */}
    </div>
  )
})

export default App


// useMemo 是 React 提供的一个 Hook，用于对值进行记忆（缓存），以避免在每次渲染时都重新计算。它接受一个工厂函数和依赖项数组，并返回计算结果

// 使用 useMemo 缓存阶乘计算结果
// const factorialResult = useMemo(() => calculateFactorial(count), [count]);

// 在上面例子中，useMemo 用于缓存计算阶乘的结果。它接受一个工厂函数 () => calculateFactorial(count) 和一个依赖项数组 [count]。只有当 count 发生变化时，才会重新计算阶乘。这样可以避免在每次渲染时都执行阶乘的计算，提高性能。

// 注意：在许多情况下，使用 useMemo 可以帮助避免不必要的计算，但也需要谨慎使用，因为过度使用可能会导致性能问题。只有在需要时才使用它，确保性能提升的同时不影响代码的可读性。