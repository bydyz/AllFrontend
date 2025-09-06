## app.component() 是用于全局注册组件的方法

它允许你在插件中一次性注册多个组件，使它们在整个应用中可用，而无需在每个组件中单独导入。

### 注册单个组件
```javascript
// plugins/my-component-plugin.js
import MyButton from './components/MyButton.vue'

export default {
  install(app) {
    app.component('MyButton', MyButton)
  }
}
```

### 注册多个组件
```javascript
// plugins/my-ui-plugin.js
import MyButton from './components/MyButton.vue'
import MyInput from './components/MyInput.vue'
import MyCard from './components/MyCard.vue'

export default {
  install(app) {
    app.component('MyButton', MyButton)
    app.component('MyInput', MyInput)
    app.component('MyCard', MyCard)
  }
}
```

### 自动注册目录下所有组件
```javascript
// plugins/auto-components.js
import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    const components = import.meta.glob('./components/*.vue')
    
    for (const [path, component] of Object.entries(components)) {
      const name = path
        .split('/').pop()
        .replace(/\.\w+$/, '')
        .replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())
      
      app.component(name, defineAsyncComponent(component))
    }
  }
}
```

### 按需导入
```javascript
export default {
  install(app, { components = {} }) {
    if (components.Button) {
      app.component('MyButton', MyButton)
    }
  }
}
```

```javascript
```