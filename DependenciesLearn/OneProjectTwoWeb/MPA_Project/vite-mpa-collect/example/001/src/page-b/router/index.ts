import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/layout/index.vue";
import Home from "../views/home/index.vue";
import Dashboard from "../views/home/Dashboard.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home,
          redirect: "/home/dashboard",
          children: [
            {
              path: "/home/dashboard",
              name: "Dashboard",
              component: Dashboard,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
