import { memo, useState } from "react";

// 普通的函数, 里面不能使用hooks
// 在自定义的hooks中, 可以使用react提供的其他hooks: 必须使用use开头
// function useFoo() {
//   const [ message ] = useState("Hello World")
//   return message
// }

function CounterHook(props) {
  const [counter, setCounter] = useState(0)

  const [name] = useState("why")
  // 修改 counter 此处也会执行，似乎是修改state的值时，函数式组件即会执行
  console.log(name)

  return (
    <div>
      <h2>当前计数: {counter}</h2>
      <button onClick={e => setCounter(counter+1)}>+1</button>
      <button onClick={e => setCounter(counter-1)}>-1</button>
    </div>
  )
}

export default memo(CounterHook)

