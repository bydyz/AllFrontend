import { createApp } from "vue";
import App from "./01_自定义指令/App.vue";

import useDirectives from "./01_自定义指令/directives/index"

const app = createApp(App);

// 第一种，相当于 执行函数
useDirectives(app)
// 第二种，利用 app.use 也会执行其中的 函数，且会传入参数 app
// app.use(useDirectives)

app.mount("#app");