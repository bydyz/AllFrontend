import { createApp } from "vue";

import App from "./03_安装插件/App.vue";

import plugin1 from "./03_安装插件/plugin1";
import plugin2 from "./03_安装插件/plugin2";
import plugin3 from "./03_安装插件/plugin3";

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