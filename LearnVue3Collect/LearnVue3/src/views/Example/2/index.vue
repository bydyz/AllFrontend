<script setup>
import { shallowRef, h, defineComponent, reactive, nextTick, markRaw } from "vue";
import Test from "./Test.vue";



// 这个会受到父组件的影响
const test1 = shallowRef(Test);



const test2 = shallowRef(
  h(Test, {
    name: "动态标题",
  })
);



// 这个会受到父组件的影响
const WrappedComponent = defineComponent({
  setup() {
    return () =>
      h(Test, {
        name: "包装后的标题",
      });
  },
});
const test3 = shallowRef(WrappedComponent);



// 改动后，没有响应式，为啥
const componentProps = reactive({
  name: "动态标题1",
});
// 创建组件引用
const test4 = shallowRef(h(Test, componentProps));
const onChange4 = () => {
  componentProps.name = '动态标题2'
  console.log(componentProps.name)
}



function createTestComponent(props) {
  return h(Test, props)
}
const test5 = shallowRef(
  createTestComponent({
    name: '工厂函数创建的组件'
  })
)



// 改动后，没有响应式，为啥
const myProps = reactive({
  name: '响应式标题'
})
const test6 = shallowRef(
  markRaw(
    h(Test, myProps)
  )
)
function onChange6() {
  myProps.name = '响应式标题2'
}
</script>

<template>
  <main>
    <component :is="test1" />
    <component :is="test2" />
    <component :is="test3" />
    <component :is="test4" />
    <button @click="onChange4">{{ componentProps.name }} - 改4</button>
    <component :is="test5" />
    <component :is="test6" />
    <button @click="onChange6">{{ myProps.name }} - 改6</button>
  </main>
</template>

<style scoped lang="scss">
div {
  font-size: 30px;
}
</style>
