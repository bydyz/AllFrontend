import React, { memo, useEffect, useLayoutEffect, useState } from 'react'

// 打印顺序：  App render >  useLayoutEffect > useEffect

const App = memo(() => {
  const [count, setCount] = useState(0)
  
  useLayoutEffect(() => {

    // setTimeout(() => {
    //   console.log("验证useLayoutEffect是否会阻塞渲染")
    // }, 10000)

    console.log("useLayoutEffect")
  })

  useEffect(() => {
    console.log("useEffect")
  })

  console.log("App render")

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
})

export default App

// useLayoutEffect 的特点：

// 同步执行： useLayoutEffect 的回调会在所有的 DOM 变更之后同步执行。这意味着它会在浏览器布局（layout）之前执行，可以确保在 DOM 变更之后立即同步获取到布局信息。

// 阻塞渲染： 如果 useLayoutEffect 中进行了 DOM 的变更，会阻塞浏览器的渲染，直到 useLayoutEffect 中的代码执行完成。


// import React, { useLayoutEffect, useRef } from 'react';

// function MyComponent() {
//   const myRef = useRef();

//   useLayoutEffect(() => {
//     // 此处可以同步获取到 DOM 元素的布局信息
//     const { width, height } = myRef.current.getBoundingClientRect();
//     console.log(`Width: ${width}, Height: ${height}`);
//   }, []); // 依赖为空数组，表示只在组件挂载和卸载时执行

//   return <div ref={myRef}>Hello, World!</div>;
// }

// 在上述示例中，useLayoutEffect 中的回调会在组件挂载时立即执行，此时可以同步获取到 myRef 对应的 DOM 元素的布局信息。



// 注意事项：

// 尽量避免在 useLayoutEffect 中进行耗时的操作，以免阻塞页面的渲染。

// 如果不需要同步获取布局信息，可以使用 useEffect 代替，因为 useEffect 的回调会在浏览器布局之后异步执行，不会阻塞渲染。

// 如果有多个 useLayoutEffect，它们会按照在组件中的声明顺序同步执行。

// 总的来说，useLayoutEffect 主要用于需要同步获取布局信息并进行相应操作的场景，但要注意谨慎使用，以避免影响性能。
