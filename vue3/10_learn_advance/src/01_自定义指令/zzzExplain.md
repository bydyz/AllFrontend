### Vue 3 自定义指令的生命周期钩子：

```javascript
const myDirective = {
  // 指令第一次绑定到元素时调用（初始化）
  beforeMount(el, binding, vnode, prevVnode) {},
  
  // 绑定元素插入父节点时调用
  mounted(el, binding, vnode, prevVnode) {},
  
  // 所在组件的 VNode 更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  
  // 所在组件的 VNode 及其子 VNode 更新后调用
  updated(el, binding, vnode, prevVnode) {},
  
  // 指令与元素解绑前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  
  // 指令与元素解绑时调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```








### 全局注册

```javascript
// main.js
import { createApp } from 'vue'

const app = createApp(App)

// 方式1：完整对象形式
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})


// 方式2：简写函数形式（仅在 mounted 和 updated 时调用）
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})

// 方式2的写法 它完全等价于：

app.directive('color', {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
})

// 当使用简写函数时：
//    初始渲染阶段：
//        元素首次插入 DOM 时，Vue 会调用您的函数（相当于 mounted 钩子）
//    更新阶段：
//        当指令绑定的值发生变化时，Vue 会再次调用同一函数（相当于 updated 钩子）
//    其他生命周期：
//        不会触发 beforeMount、beforeUpdate、beforeUnmount 或 unmounted 钩子


// 简写形式不会带来性能优势或劣势，它只是语法糖。Vue 内部会将其转换为完整的钩子函数形式。

app.mount('#app')
```








### 局部注册

```javascript
// 组件内
export default {
  directives: {
    // 局部指令
    focus: {
      mounted(el) {
        el.focus()
      }
    },
    // 简写形式
    pin: (el, binding) => {
      el.style.position = 'fixed'
      const s = binding.arg || 'top'
      el.style[s] = binding.value + 'px'
    }
  }
}



// 2.方式二: 写在 setup 语法内
const vFocus = {
  // 生命周期的函数(自定义指令)
  mounted(el) {
    // console.log("v-focus应用的元素被挂载了", el)
    el?.focus()
  }
}



// binding 对象包含以下属性：
{
  value: '',       // 指令的绑定值，如 v-my-directive="1 + 1" 中，value 为 2
  oldValue: '',    // 之前的值，仅在 beforeUpdate 和 updated 中可用
  arg: '',         // 参数，如 v-my-directive:foo 中，arg 为 "foo"
  modifiers: {},   // 修饰符对象，如 v-my-directive.foo.bar 中，modifiers 为 { foo: true, bar: true }
  instance: null,  // 使用指令的组件实例
  dir: {}          // 指令的定义对象
}
```








### 常用举例

#### 权限控制指令
```javascript
// 全局注册权限指令
app.directive('permission', {
  beforeMount(el, binding) {
    const { value } = binding
    const permissions = store.getters.permissions // 假设从Vuex获取权限列表
    
    if (!permissions.includes(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})

// 使用
<button v-permission="'admin'">只有admin可见</button>
```


#### 图片懒加载
```javascript
app.directive('lazy', {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.unobserve(el)
        }
      })
    })
    observer.observe(el)
  }
})

// 使用
<img v-lazy="'https://example.com/image.jpg'" alt="">
```


#### 拖拽指令
```javascript
app.directive('drag', {
  mounted(el) {
    el.style.cursor = 'move'
    el.onmousedown = function(e) {
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
      
      document.onmousemove = function(e) {
        el.style.left = e.clientX - disX + 'px'
        el.style.top = e.clientY - disY + 'px'
      }
      
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// 使用
<div v-drag style="position: absolute;">可拖拽元素</div>
```








### Vue 2 的主要钩子：

bind：指令第一次绑定到元素时调用（类似 Vue 3 的 beforeMount）

inserted：元素插入 DOM 后调用（类似 Vue 3 的 mounted）

update：组件更新时调用（类似 Vue 3 的 updated）

unbind：指令解绑时调用（类似 Vue 3 的 unmounted）









### 与 Vue 2 的主要区别

1. 钩子函数重命名：

  bind → beforeMount

  inserted → mounted

  unbind → unmounted

2. 新增钩子：

  beforeUpdate 和 updated 现在可以单独使用

3. 参数变化：

  移除了 vnode 参数中的一些内部属性

  提供了更一致的 API


特性	        Vue 2	        Vue 3
挂载后钩子	  inserted	    mounted
更新钩子	    update	      updated
卸载钩子	    unbind	      unmounted
新增钩子	    无	          beforeMount、beforeUpdate、beforeUnmount
简写方式	    无	          函数形式默认绑定 mounted + updated






### 最佳实践

1. 命名规范：使用小驼峰命名指令，模板中使用 kebab-case

2. 避免副作用：指令应该主要操作 DOM，避免修改组件状态

3. 性能考虑：在 unmounted 中清理事件监听器和定时器

4. 复用性：将复杂指令拆分为可组合的简单指令