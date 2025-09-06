import { createApp } from "vue";
import App from "./App.vue";

import VxeUIAll from "vxe-pc-ui";
import "vxe-pc-ui/es/style.css";

import VxeUITable from "vxe-table";
import "vxe-table/es/style.css";

createApp(App).use(VxeUIAll).use(VxeUITable).mount("#app");
