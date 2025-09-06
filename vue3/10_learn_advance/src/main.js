import { createApp } from "vue";

import App from "./03_安装插件/App.vue";

// 默认导出
import plugin1 from "./03_安装插件/plugin1";
import plugin2 from "./03_安装插件/plugin2";
import plugin3 from "./03_安装插件/plugin3";


// 这个是共有的逻辑，上面复制后需要加上这个导入
import router from "./router"


const app = createApp(App);

plugin1.install(app);
plugin2.install(app);
app.use(plugin3);

app.mount("#app");
















// import { createApp } from "vue";

// import App from "./03_安装插件/App.vue";

// import plugin1 from "./03_安装插件/plugin1";
// import plugin3 from "./03_安装插件/plugin3";
// import { install as SquareSumPluginInstall } from "./03_安装插件/plugin2";

// const app = createApp(App);

// plugin1.install(app);

// SquareSumPluginInstall(app);
// app.use(SquareSumPluginInstall)

// app.use(plugin3);

// app.mount("#app");