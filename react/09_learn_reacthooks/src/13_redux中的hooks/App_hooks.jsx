import React, { memo } from 'react'
import { useSelector, useDispatch } from "react-redux"
// import { addNumberAction, subNumberAction } from './store/modules/counter'
import { changeMessageAction } from './store/modules/counter'

const App = memo((props) => {




  // ！ useSelector  和  useDispatch  两个 react-redux 封装的 hooks， 可以取代 connect 直接使用 store 中的数据和方法

  // //！ 1.使用useSelector将redux中store的数据映射到组件内
  // const { count } = useSelector((state) => ({
  //   count: state.counter.count
  // }))


  // //！ 2.使用dispatch直接派发action
  // const dispatch = useDispatch()
  // function addNumberHandle(num, isAdd = true) {
  //   if (isAdd) {
  //     dispatch(addNumberAction(num))
  //   } else {
  //     dispatch(subNumberAction(num))
  //   }
  // }







  //！ 此处  即使没有  shallowEqual  也不会重新渲染  是memo的功劳吗
  const { message } = useSelector((state) => ({
    message: state.counter.message
  }))

  const dispatch = useDispatch()
  function changeMessageHandle() {
    dispatch(changeMessageAction("你好啊, 师姐!"))
  }





  console.log("App Render")

  return (
    <div>
      {/* <h2>当前计数: {count}</h2>
      <button onClick={e => addNumberHandle(1)}>+1</button>
      <button onClick={e => addNumberHandle(6)}>+6</button>
      <button onClick={e => addNumberHandle(6, false)}>-6</button> */}



      <h2>Home: {message}</h2>
      <button onClick={e => changeMessageHandle()}>修改message</button>
    </div>
  )
})

export default App
