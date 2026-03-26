Vue 3.3+ 提供了 defineOptions 宏，用于在 `<script setup>` 中声明组件选项（如 inheritAttrs、name 等）。语法如下：

```vue
<!-- 如果不使用 <script setup>，也可以在普通的 export default 中直接设置 inheritAttrs: false。 -->
<script setup>
defineOptions({
  inheritAttrs: false
})
</script>

```


# inheritAttrs: false    表示 禁用继承

禁用继承后，透传属性会不会自动应用到根元素上，而是需要通过 useAttrs() 获取并手动绑定。

```vue
<!-- 父组件 -->
<template>
  <MyButton class="large" data-testid="submit-btn" @click="handleClick" />
</template>


<!-- 子组件 MyButton.vue -->
<script setup>
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()
</script>

<template>
  <!-- 手动将透传属性绑定到 button 元素上 -->
  <button v-bind="attrs">
    Click me
  </button>
</template>
```


# class 和 style 的合并

* 如果不禁用继承（默认情况），class 和 style 会自动与根元素上已有的 class/style 合并。
* 禁用继承后，必须手动处理合并，**否则会覆盖**。你可以通过 attrs.class 获取传入的类名，并与本地类名合并。

```vue
<template>
  <button :class="['local-class', $attrs.class]" v-bind="attrs">
    Click me
  </button>
</template>
```


# 多个根节点时的行为

当组件有多个根节点时，默认不会自动透传属性，因为 Vue 不知道应该透传到哪个根节点上。这种情况下，你需要手动通过 useAttrs 将属性绑定到某个元素上，并通常会收到控制台警告。
此时设置 inheritAttrs: false 可以消除警告，但手动处理仍是必须的。
