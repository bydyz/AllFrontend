<template>
  <h2>App: {{ info }}</h2>

  <hr />

  <ShowInfo :info="info" :roInfo="roInfo" @changeInfoName="changeInfoName" @changeRoInfoName="changeRoInfoName"> </ShowInfo>
</template>

<script setup>
import { reactive, ref, readonly } from "vue";
import ShowInfo from "./ShowInfo.vue";

// 本地定义多个数据, 都需要传递给子组件
// name/age/height
const info = reactive({
  name: "why",
  age: 18,
  height: 1.88,
});

function changeInfoName(payload) {
  info.name = payload;
}

// 使用readOnly包裹info   readonly会返回原始对象的只读代理（也就是它依然是一个Proxy，只是一个proxy的set方法被劫持，并且不能对其进行修改）
/* 
  readonly方法会传入三个类型的参数：
    类型一：普通对象；
    类型二：reactive返回的对象；
    类型三：ref的对象；
*/

/* 
  readonly返回的对象都是不允许修改的；
  但是经过readonly处理的原来的对象是允许被修改的；
    ✓ 比如 const info = readonly(obj)，info对象是不允许被修改的；
    ✓ 当obj被修改时，readonly返回的info对象也会被修改；
    ✓ 但是我们不能去修改readonly返回的对象info；
*/

// 本质上就是readonly返回的对象的setter方法被劫持了而已

/* 
    ◼ isProxy
      检查对象是否是由 reactive 或 readonly创建的 proxy。
    ◼ isReactive
      检查对象是否是由 reactive创建的响应式代理：
      如果该代理是 readonly 建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true；
    ◼ isReadonly
      检查对象是否是由 readonly 创建的只读代理。
    ◼ toRaw
      返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。
    ◼ shallowReactive
      创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。
    ◼ shallowReadonly
      创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）
    */
const roInfo = readonly(info);
function changeRoInfoName(payload) {
  // 因为 roInfo 是readonly 修改会报警告
  roInfo.name = payload;
}
</script>

<style scoped></style>
