import React from 'react';
import ReactDOM from 'react-dom/client';

// import { UserContext, ThemeContext } from "./05_useContext的使用/context"

// import { UserContext, TokenContext } from "./12_自定义Hooks/context"

// import { Provider } from "react-redux"
// import store from './13_redux中的hooks/store';



// import App from './01_不使用Hook/App';
// import App from "./02_计时器实现对比/App"
// import App from "./03_useState的使用/App"

// import App from "./04_useEffect的使用/01_修改标题-class实现"
// import App from "./04_useEffect的使用/02_修改标题-hook实现"
// import App from "./04_useEffect的使用/03_清除机制-返回回调函数"
// import App from "./04_useEffect的使用/04_逻辑分离-多个Effect"
// import App from "./04_useEffect的使用/05_执行时机-控制回调执行"

// import App from "./05_useContext的使用/App"

// import App from "./06_useReducer的使用(了解)/App"
// import App from "./07_useCallback的使用/App"
// import App from "./08_useMemo的使用/App"

// import App from "./09_useRef的使用/01_useRef绑定DOM"
// import App from "./09_useRef的使用/02_useRef绑定值-解决闭包陷阱"

// import App from "./10_useImperativeHandle/App"

// import App from "./11_useLayoutEffect使用/01_layoutEffect和Effect时机"
// import App from "./11_useLayoutEffect使用/02_切换数字-useEffect"
// import App from "./11_useLayoutEffect使用/03_切换数字-useLayoutEffect"

// import App from "./12_自定义Hooks/01_打印生命周期"
// import App from "./12_自定义Hooks/02_Context获取数据"
// import App from "./12_自定义Hooks/03_获取窗口滚动位置"
// import App from "./12_自定义Hooks/App"

// import App from "./13_redux中的hooks/App_connect"
// import App from "./13_redux中的hooks/App_hooks"
// import App from "./13_redux中的hooks/App"

// import App from "./14_useId的使用/App"

// import App from "./15_useTransition使用/01_useTransition的使用"
import App from "./15_useTransition使用/02_useDeferredValue的使用"
// import App from "./15_useTransition使用/useTransition_animated "

const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <UserContext.Provider value={{name: "why", level: 99}}>
//     <TokenContext.Provider value={'coderwhy'}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </TokenContext.Provider>
//   </UserContext.Provider>
// );

// root.render(
//   <UserContext.Provider value={{name: "why", level: 99}}>
//     <TokenContext.Provider value={'coderwhy'}>
//         <App />
//     </TokenContext.Provider>
//   </UserContext.Provider>
// );

// root.render(
//   <UserContext.Provider value={{name: "why", level: 99}}>
//     <ThemeContext.Provider value={{color: "red", size: 30}}>
//       <App />
//     </ThemeContext.Provider>
//   </UserContext.Provider>
// );

// root.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
// );

root.render(
  <App />
);
