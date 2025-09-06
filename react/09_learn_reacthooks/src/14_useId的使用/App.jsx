import React, { memo, useId, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  const id = useId()
  console.log(id)

  return (
    <div>
      <button onClick={e => setCount(count+1)}>count+1:{count}</button>

      <label htmlFor={id}>
        用户名:<input id={id} type="text" />
      </label>
    </div>
  )
})

export default App


// 在 React 中，useId 通常指的是一个用于生成唯一标识符（ID）的自定义 Hook。这种 Hook 的目的是为了在组件渲染时生成一个唯一的标识符，通常用于处理一些与 DOM 元素或表单相关的操作，确保生成的 ID 在整个应用中是唯一的。

// 下面是一个简单的 useId 的实现：

// import { useState } from 'react';

// const useId = (prefix = 'id') => {
//   const [id, setId] = useState(`${prefix}-${Math.random().toString(36).substr(2, 9)}`);

//   return id;
// };

// export default useId;

// 这个 useId Hook 接受一个可选的 prefix 参数，默认为 'id'。它使用 useState 来保存生成的唯一标识符，并在组件的生命周期内保持不变。
