# 组件命名的最佳实践

## 如何在导入组件时，给组件命名

### 1. Vue 2

```js
// 默认导入
import MyComponent from './MyComponent.vue'
// 命名导出
import { MyComponent } from './components'
```

```vue
<script>
import MyComponentOne from './MyComponentOne.vue'
import MyComponentTwo from './MyComponentTwo.vue'
export default {
  components: {
    MyComponentOne,
    aaa: MyComponentTwo // aaa 既是其命名
  }
}
</script>
```

### 2. Vue 3

```js
// 默认导入
import MyComponent from './MyComponent.vue'
// 命名导出
import { MyComponent } from './components'
```

-------------------------------------------------------------------------------------------------------

## 命名规则

### 组件名命名

- **PascalCase**：用大驼峰 `MyComponent`，则在 `template` 中，即可使用 大驼峰 ，也可使用 全小写用连字符
- **kebab-case**：全小写用连字符 `my-component`，则在 `template` 中，只使用 全小写用连字符
- **避免**：`v-` 前缀（保留给指令）

### 最佳实践

- 全部使用 **使用大驼峰**

-------------------------------------------------------------------------------------------------------

## 特殊场景

```html
<html>
  <body>
    <div id="app">
      <star-rate></star-rate>
    </div>
  </body>

  <script>
const StarRate = {
  template: 'XXX'
}
const app = Vue.createApp(StarRate)
// 挂载
app.mount("#app")
  </script>
</html>

```

类似上述，使用模板字符串，在html使用时，则只能使用 全小写用连字符；因为浏览器有个纠错机制，html从上到下解析，解析到自定义组件时，若用大驼峰 `<StarRate></StarRate>`，浏览器会纠错，因为html中不应存在大写标签，因此会将其转换为 `<starrate></starrate>` 则有问题

-------------------------------------------------------------------------------------------------------

## 组件中 name 属性的作用

* 组件递归
* 调试
* 和`keep-alive`配合是哦那个

目前的脚手架工具会自动根据组件的文件名来设置name