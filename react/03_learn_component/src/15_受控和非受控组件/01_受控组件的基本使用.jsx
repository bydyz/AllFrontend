import React, { PureComponent } from 'react'

// 在React中，HTML表单的处理方式和普通的DOM元素不太一样：表单元素通常会保存在一些内部的state。

// ◼ 比如下面的HTML表单元素：
//    这个处理方式是DOM默认处理HTML表单的行为，在用户点击提交时会提交到某个服务器中，并且刷新页面；
//    在React中，并没有禁止这个行为，它依然是有效的；
//    但是通常情况下会使用JavaScript函数来方便的处理表单提交，同时还可以访问用户填写的表单数据；
//    实现这种效果的标准方式是使用“受控组件”；


// ◼ 在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。
// ◼ 而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
//    我们将两者结合起来，使React的state成为“唯一数据源”；
//    渲染表单的 React 组件还控制着用户输入过程中表单发生的操作；
//    被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”；
// ◼ 由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。
// ◼ 由于 handleUsernameChange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。
























// 在 React 中，一个受控组件是由 React 状态（state）来控制的组件。这意味着输入元素的值或其他属性是由 React 状态管理的，而不是 DOM 自身的状态。

// import React, { useState } from 'react';

// function ControlledComponentExample() {
//   // 使用 state 来控制输入框的值
//   const [inputValue, setInputValue] = useState('');

//   // 当输入框的值发生变化时，更新 state
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   return (
//     <div>
//       {/* 受控组件：input 的值受 React 状态（state）控制 */}
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//       />

//       {/* 显示当前输入框的值 */}
//       <p>Current Value: {inputValue}</p>
//     </div>
//   );
// }

// export default ControlledComponentExample;

// 在这个例子中，input 元素的 value 属性被设置为 inputValue 状态，而 onChange 事件处理函数通过更新 setInputValue 来修改这个状态。因此，输入框的值是由 React 状态控制的。

// 使用受控组件的好处之一是你可以完全控制组件的状态，对输入的值进行验证或转换，以及方便地在整个应用程序中传递和管理数据。


export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      username: "coderwhy",

      username1: "666",
    }
  }

  inputChange(event) {
    console.log("inputChange:", event.target)
    this.setState({ username: event.target.value })
  }

  inputChange2(param) {
    this.setState({ username1: param })
  }

  render() {
    const { username, username1 } = this.state

    return (
      <div>
        {/* 受控组件 */}
        <input type="checkbox" value={username} onChange={e => this.inputChange(e)}/>

        {/* 非受控组件 */}
        <input type="text" />
        <h2>username: {username}</h2>





        <input type="checkbox" onChange={() => this.inputChange2("fuck")}/>
        <h2>username: {username1}</h2>
      </div>
    )
  }
}

export default App