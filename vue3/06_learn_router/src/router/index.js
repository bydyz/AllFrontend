// 架构一个网络时，非常重要的两个设备就是路由器和交换机      路由器主要维护的是一个映射表，映射表会决定数据的流向

// URL的hash
//   URL的hash也就是锚点(#), 本质上是改变window.location的href属性；
//   我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新



// history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面：
//   replaceState：替换原来的路径；
//   pushState：使用新的路径；
//   popState：路径的回退；
//   go：向前或向后改变路径；
//   forward：向前改变路径；
//   back：向后改变路径



// vue-router是基于路由和组件的
//   路由用于设定访问路径, 将路径和组件映射起来；
//   在vue-router的单页面应用中, 页面的路径的改变就是组件的切换

// 安装Vue Router：
//   npm install vue-router

// 使用vue-router的步骤:
//   第一步：创建路由需要映射的组件（打算显示的页面）；
//   第二步：通过createRouter创建路由对象，并且传入routes和history模式；
//     ✓ 配置路由映射: 组件和路径映射关系的routes数组；
//     ✓ 创建基于hash或者history的模式；
//   第三步：使用app注册路由对象（use方法）；
//   第四步：路由使用: 通过<router-link>和<router-view>


// router-link事实上有很多属性可以配置：
// ◼ to属性：
//   是一个字符串，或者是一个对象
// ◼ replace属性：
//   设置 replace 属性的话，当点击时，会调用 router.replace()，而不是 router.push()；
// ◼ active-class属性：
//   设置激活a元素后应用的class，默认是router-link-active
// ◼ exact-active-class属性：
//   链接精准激活时，应用于渲染的 <a> 的 class，默认是router-link-exact-active；


// 路由懒加载

// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载：
//   如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效；
//   也可以提高首屏的渲染效率；
// 其实这里还是我们前面讲到过的webpack的分包知识，而Vue Router默认就支持动态来导入组件：
//   这是因为component可以传入一个组件，也可以接收一个函数，该函数 需要返回一个Promise；
//   而import函数就是返回一个Promise；

// 分包是没有一个很明确的名称的，其实webpack从3.x开始支持对分包进行命名（chunk name）  利用 const Home = () => import(/* webpackChunkName: 'home' */"../Views/Home.vue") 即可实现分包命名



// name属性：路由记录独一无二的名称；
// meta属性：自定义的数据



// 动态路由基本匹配

// 将给定匹配模式的路由映射到同一个组件
// 例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但是用户的ID是不同的；
// 在Vue Router中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数

// 获取动态路由的值

// 在template中，直接通过 $route.params获取值；
// ✓ 在created中，通过 this.$route.params获取值；
// ✓ 在setup中，我们要使用 vue-router库给我们提供的一个hook useRoute；
//   ➢ 该Hook会返回一个Route对象，对象中保存着当前路由相关的值

// 对于哪些没有匹配到的路由，我们通常会匹配到固定的某个页面 NotFound
// 比如NotFound的错误页面中，这个时候我们可编写一个动态路由用于匹配所有的页面
// 可以通过 $route.params.pathMatch获取到传入的参数











import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// import Home from '../Views/Home.vue'
// import About from '../Views/About.vue'

// 路由的懒加载       这个写法有点奇怪，webpackChunkName的作用是啥？？？？？？？？？？？？？？
// const Home = () => import(/* webpackChunkName: 'home' */"../Views/Home.vue")
// const About = () => import(/* webpackChunkName: 'about' */"../Views/About.vue")

// 创建一个路由: 映射关系
const router = createRouter({
  // 指定采用的模式: hash
  history: createWebHashHistory(),
  // history: createWebHistory(),
  // 映射关系
  routes: [
    { 
      path: "/", 
      redirect: "/home" 
    },
    { 
      name: "home",
      path: "/home", 
      component: () => import("../Views/Home.vue"),
      meta: {
        name: "why",
        age: 18
      },
      // ！！三种写法
      // redirect: "/home/ranking",
      redirect: {name: "recommend"},
      children: [
        // {
        //   path: "/home",
        //   redirect: "/home/recommend"
        // },
        {
          name: "recommend",
          path: "recommend", // /home/recommend
          component: () => import("../Views/HomeRecommend.vue")
        },
        {
          path: "ranking", // /home/ranking
          component: () => import("../Views/HomeRanking.vue")
        }
      ]
    },
    { 
      name: "about",
      path: "/about", 
      component: () => import("../Views/About.vue") 
    },
    {
      path: "/user/:id",
      component: () => import("../Views/User.vue")
    },
    {
      path: "/order",
      component: () => import("../Views/Order.vue")
    },
    {
      path: "/login",
      component: () => import("../Views/Login.vue")
    },
    {
      // abc/cba/nba
      path: "/:pathMatch(.*)*",
      component: () => import("../Views/NotFound.vue")
    }
  ]
})


// 1.动态管理路由
let isAdmin = true
if (isAdmin) {
  // 一级路由
  router.addRoute({
    path: "/admin",
    component: () => import("../Views/Admin.vue")
  })

  // 添加vip页面
  router.addRoute("home", {
    path: "vip",
    component: () => import("../Views/HomeVip.vue")
  })
}

// 获取router中所有的映射路由对象
console.log(router.getRoutes())


// 2.路由导航守卫
// 进行任何的路由跳转之前, 传入的beforeEach中的函数都会被回调
// 需求: 进入到订单(order)页面时, 判断用户是否登录(isLogin -> localStorage保存token)
// 情况一: 用户没有登录, 那么跳转到登录页面, 进行登录的操作
// 情况二: 用户已经登录, 那么直接进入到订单页面
router.beforeEach((to, from) => {
  // 1.进入到任何别的页面时, 都跳转到login页面
  // if (to.path !== "/login") {
  //   return "/login"
  // }

  // 2.进入到订单页面时, 判断用户是否登录
  const token = localStorage.getItem("token")
  if (to.path === "/order" && !token) {
    return "/login"
  }
})


export default router
