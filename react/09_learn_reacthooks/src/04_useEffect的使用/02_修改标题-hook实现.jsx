import React, { memo } from 'react'
import { useState, useEffect } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(200)

  useEffect(() => {
    //！ 当前传入的回调函数会在组件被渲染完成后, 自动执行
    // 网络请求/DOM操作(修改标题)/事件监听
    document.title = count
  })

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>
    </div>
  )
})

export default App


//！ useEffect 会在组件初次渲染时执行


//！ 依赖项变化： 如果你在 useEffect 的第二个参数中传递了依赖项数组，那么 useEffect 将会在依赖项发生变化时执行。
// const ExampleComponent = ({ data }) => {
//   useEffect(() => {
//     // 这里的代码会在 data 发生变化时执行
//   }, [data]);
//   // ...
// };


//! 没有依赖项： 如果 useEffect 的依赖项数组为空，它将在每次组件渲染之后都执行。
// 注意： 上面的与如果 useEffect 的依赖项数组为空数组不同，为空数组时，似乎只会在第一次执行。
// useEffect(() => {
//   // 这里的代码会在每次组件渲染之后执行
// });


//! 组件卸载时： 如果 useEffect 返回一个清理函数，那么这个清理函数会在组件卸载时执行。
// useEffect(() => {
//   // 这里的代码会在组件初次渲染时执行

//   return () => {
//     // 这里的代码会在组件卸载时执行
//   };
// }, []);


//! 父组件重新渲染： 如果一个组件是另一个组件的子组件，并且父组件重新渲染，即使子组件的 props 没有变化，子组件中的 useEffect 也会被触发。
// 父组件
// const ParentComponent = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <ChildComponent />
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// };

// // 子组件
// const ChildComponent = () => {
//   useEffect(() => {
//     console.log('Effect in ChildComponent executed');
//   }, []);

//   return <div>Child Component</div>;
// };
// 上述例子中，每次点击 "Increment" 按钮时，父组件重新渲染，即使子组件的 props 没有变化，子组件中的 useEffect 也会被执行。


//! useEffect 中使用了闭包： 如果 useEffect 中使用了外部变量，并且这些变量在每次渲染时都发生变化，那么 useEffect 也会被执行。
// const ExampleComponent = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       console.log('Effect executed');
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [count]);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// };
// 在上述例子中，useEffect 使用了 count 变量，当 count 发生变化时，useEffect 会被执行。

