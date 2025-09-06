// 函数式组件
// function App(props) {
//   // 返回值: 和类组件中render函数返回的是一致
//   return <h1>App Functional Component</h1>
// }


// 等同下面类的写法


import React from "react";
class App extends React.Component {
  // constructor() {
  //   super()
  // }

  render() {
    return <h1>App Functional Component</h1>
  }
}



export default App

