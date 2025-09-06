// import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
// import App from "./App"
import App from "./APP_F"

import { Suspense } from "react"

// ◼ react-router最主要的API是给我们提供的一些组件：
// ◼ BrowserRouter或HashRouter
//    Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件；
//    BrowserRouter使用history模式；
//    HashRouter使用hash模式；
import { HashRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  // <StrictMode>
    <HashRouter>
      {/* 懒加载后，不确定分包的js文件有没有正常下载下来，加上这个，可以再js没下载下来是显示fallback里的内容 */}
      <Suspense fallback={<h3>Loading...</h3>}>
        <App/>
      </Suspense>
    </HashRouter>
  // </StrictMode>
)

