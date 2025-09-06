import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* 
  react-redux 这个库有提供方案，目的是使我们在使用store时，不需要像 06_react_redux_base 一样重复编写同样一套代码，其使用分两步：

  1.用其内部封装好的context向下提供store，即用Provider向下提供store
  2.在需要用store的组件内，用connect建立store的state、reducer和组件的联系
*/
import { Provider } from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);