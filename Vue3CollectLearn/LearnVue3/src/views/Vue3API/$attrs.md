**只有那些既未在 props 中声明、也未在 emits 中声明的传入属性，才会出现在 $attrs 中。**

# 父组件示例

```vue
<!-- Parent.vue -->
<template>
  <Child
    :propA="'prop value'"          <!-- 普通 prop -->
    :propB="123"                    <!-- 另一个普通 prop -->
    class="parent-class"            <!-- class 属性 -->
    style="color: red;"             <!-- style 属性 -->
    id="custom-id"                  <!-- 普通 HTML 属性 -->
    data-testid="test"              <!-- 自定义数据属性 -->
    @custom-event="handleCustom"    <!-- 自定义事件 -->
    @click="handleClick"            <!-- 原生 click 事件 -->
  />
</template>

<script setup>
const handleCustom = () => console.log('custom event')
const handleClick = () => console.log('click event')
</script>
```


# 子组件的不同声明情况

## 仅声明部分 props 和 emits

```vue
<!-- Child.vue -->
<script setup>
import { useAttrs } from 'vue'

// 只声明了 propA，没有声明 propB
const props = defineProps(['propA'])
// 只声明了 custom-event，没有声明 click 事件
const emit = defineEmits(['custom-event'])

// 获取 attrs
const attrs = useAttrs()
console.log(attrs)
// {
//   propB: 123,                    // 未声明为 prop，进入 attrs
//   class: 'parent-class',         // class 总是进入 attrs（除非声明为 prop）
//   style: 'color: red;',          // style 总是进入 attrs（除非声明为 prop）
//   id: 'custom-id',               // 普通 HTML 属性，进入 attrs
//   dataTestid: 'test',            // 注意：data-testid 被转换为驼峰 dataTestid
//   onClick: () => {}              // click 事件未在 emits 中声明，进入 attrs
//   // 注意：custom-event 已在 emits 中声明，所以不会出现在 attrs 中
// }

</script>

<template>
  <div>
    <p>props.propA: {{ propA }}</p>
    <p>props.propB: {{ propB }}</p>   <!-- propB 未声明，不会作为 props 出现，会进入 attrs -->
    <button @click="$emit('custom-event')">触发自定义事件</button>
  </div>
</template>
```

说明：
  * propA 在 props 中声明了，所以它不会出现在 attrs 中，而是作为普通的 prop 在 props 对象中。
  * propB 未声明，因此进入 attrs。
  * custom-event 在 emits 中声明了，Vue 将其视为自定义事件，不会放入 attrs。父组件传递的 @custom-event 会被正确地绑定到子组件的 emit 上。
  * click 事件未在 emits 中声明，所以被当作原生 DOM 事件放入 attrs（键名为 onClick）。
  * class、style、id、data-testid 这些未在 props 中声明的属性，都会进入 attrs。


## 特殊情况：class 和 style

* 即便 class 和 style 没有在 props 中声明，默认情况下它们会自动合并到子组件的根元素上，但它们仍然会出现在 attrs 中（可以通过 useAttrs() 访问）。
* 如果设置了 inheritAttrs: false，那么它们就不会自动合并，需要手动处理。你可以在手动绑定时用 attrs.class 和 attrs.style 与本地类/样式合并。


## 总结

| 传入内容 | 是否在 `props` 中声明 | 是否在 `emits` 中声明 | 是否进入 `attrs` | 说明 |
| --- | --- | --- | --- | --- |
| 普通 prop | ✅ | 无关 | ❌ | 成为组件 props |
| 普通 prop | ❌ | 无关 | ✅ | 进入 attrs |
| 自定义事件 | 无关 | ✅ | ❌ | 成为 emit 事件，不入 attrs |
| 自定义事件 | 无关 | ❌ | ✅ | 被当作原生事件，入 attrs（键名为 `onEventName`） |
| `class` | ❌ | 无关 | ✅ | 即使自动合并到根元素，仍在 attrs 中 |
| `style` | ❌ | 无关 | ✅ | 同上 |
| 其他 HTML 属性 | ❌ | 无关 | ✅ | 进入 attrs |


**核心原则：** `$attrs` 是**组件未被显式消费的所有传入数据**的集合。通过 `props` 和 `emits` 声明，组件告诉 Vue 哪些数据是它希望“消费”的；其余未声明的，就统统归入 `attrs`，由开发者决定如何处理（默认透传给根元素，或手动控制）。
