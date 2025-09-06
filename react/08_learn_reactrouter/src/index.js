// import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// ◼ react-router最主要的API是给我们提供的一些组件：
// ◼ BrowserRouter或HashRouter
//    Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件；
//    BrowserRouter使用history模式；
//    HashRouter使用hash模式；
import { HashRouter } from "react-router-dom"

import { Suspense } from "react"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  // <StrictMode>
    <HashRouter>
      <Suspense fallback={<h3>Loading...</h3>}>
        <App/>
      </Suspense>
    </HashRouter>
  // </StrictMode>
)

