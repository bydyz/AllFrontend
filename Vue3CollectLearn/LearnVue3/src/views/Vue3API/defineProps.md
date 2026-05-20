# const props = defineProps()  作用

defineProps 是 Vue 3 的编译宏，只能在 `<script setup>` 中使用。

* `defineProps()` 不传任何参数时：表示该组件没有声明任何 prop，因此返回的 props 对象是 空对象 {}。
* 只有当你声明了某个 prop（例如 defineProps(['aaa'])），对应的属性才会出现在 props 中，**未声明的则进入 `$attrs`**。
* 父组件传递的属性全部进入了 $attrs。你可以通过 useAttrs() 看到它们：
    ```vue
    <!-- 父组件中 -->
    <FatherOne class="myClass" style="background-color: pink;" id="myId" aaa="aaa" @click="onClick" key="list-item"
  ref="compRef"></FatherOne>


    <!-- 子组件中 -->
    <script setup>
    import { useAttrs } from 'vue'

    // 只在 defineProps 定义了 aaa  故最终 props 中只会有 aaa属性  其他的会在 useAttrs() 中
    const props = defineProps({
      aaa: {
        type: String
      }
    })

    const attrs = useAttrs()
    console.log('attrs:', attrs)
    // 输出: { class: 'myClass', style: 'background-color: pink;', id: 'myId', onClick: fn, ... }
    </script>
    ```


*********************************


# 会将哪些传入组件内的属性全量传递到子组件，哪些不会

## 可以通过组件传递的属性有
1. 所有常规 HTML 属性：`class`、`style`、`id`、`title`、`disabled`、`placeholder` 等。
2. 自定义属性：`data-*`、`aria-*`，以及任何开发者自定义的属性名（如 my-prop）。
3. 组件 props：如果父组件传递了一个自定义 prop（如 :user="user"），它也会被包含在 props 中并向下传递。
4. 布尔属性：如 disabled、readonly 等（在模板中通常写作 disabled 或 :disabled="true"）。
5. 事件监听器。
6. Vue 特殊属性：如 `key`、`ref`、`ref_for`、`is`。这些属性在组件使用时由 Vue 内部处理，不会进入 props。
7. v-model 展开的事件部分：`v-model="value"` 会被展开为 `:modelValue="value"` 和 `@update:modelValue="handler"`。其中 `:modelValue` 会进入 props，但 `@update:modelValue` 作为事件不会进入。


## 不可以定义到 defineProps 里有哪些
在 Vue 中，class、style、key、ref 这些特殊的 attribute 确实不能（也不需要）在子组件的 defineProps 中声明。这是因为它们有特殊的处理机制，由 Vue 框架本身消费，不会作为 props 传递给子组件。

1. 核心特殊 Attribute。如 `key`、`ref`、`ref_for`、`is`
2. 样式相关。如 `class`、`style`
3. 事件相关。如 `onClick`


Vue 2：$attrs 不包含 class 、 style 、 onClick
Vue 3：$attrs 包含 class 、 style 、 onClick


*********************************


# 使用 `v-bind="$attrs"`

想要实现“将所有外部传入的内容（包括属性和事件）全部传递给内部元素”，应该使用 `v-bind="$attrs"`：

* `$attrs` 包含所有未被 `defineProps` 声明的 props 以及所有事件监听器。
* 如果同时使用 `defineProps` 声明了部分 props，则 `$attrs` 只包含剩余未声明的属性和事件。
* `v-bind="$attrs"` 会把属性和事件一起绑定到元素上。

$attrs 只能在 template 中使用，不可直接在 script 中使用


*********************************


# const props = defineProps()  v-bind="props"  会将哪些传入组件内的属性全量传递到子组件，哪些不会
