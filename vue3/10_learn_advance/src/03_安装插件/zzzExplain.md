## 在 Vue 3 中，插件（Plugin）的书写方式主要有 对象形式 和 函数形式 两种，它们本质上都是通过 install 方法来实现插件的安装逻辑。


### 对象形式（推荐）

插件是一个对象，必须包含 install 方法，Vue 会自动调用它。

```javascript
// 自定义全局指令/方法的插件
const MyPlugin = {
  install(app, options) {
    // 插件安装逻辑
    // app - Vue 应用实例
    // options - 可选的配置对象
  }
}

// plugins/myPlugin.js
export default {
  install(app, options) {
    // 1. 添加全局指令
    app.directive('focus', {
      mounted(el) {
        el.focus()
      }
    })

    // 2. 添加全局方法
    app.config.globalProperties.$myMethod = () => {
      console.log('全局方法调用', options)
    }

    // 3. 注入全局属性
    app.provide('pluginOptions', options)
  }
}





// 注册插件
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import myPlugin from './plugins/myPlugin'

const app = createApp(App)

// 注册插件（可传入配置选项）
app.use(myPlugin, { theme: 'dark' })

app.mount('#app')
```








### 函数形式

插件直接是一个函数，Vue 会将它作为 install 方法调用。

```javascript
// plugins/simplePlugin.js
export default function (app, options) {
  // 添加全局属性
  app.config.globalProperties.$simple = (msg) => {
    console.log(`[SimplePlugin]: ${msg}`, options)
  }
}





// main.js
import simplePlugin from './plugins/simplePlugin'

app.use(simplePlugin, { debug: true })
```












### 两种形式的对比

特性	        对象形式	                         函数形式
结构	        必须包含 install 方法	             直接是函数，隐式作为 install 使用
适用场景	    复杂插件（需要封装多个功能）	       简单插件（单一功能）
可读性	      更清晰（显式声明 install）	        更简洁
是否推荐	    ✅ 推荐（官方示例常用）	          ⚠️ 简单场景可用