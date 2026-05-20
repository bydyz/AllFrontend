<template>
  <div>
    <h2>info: {{ name }} - {{ age }} - {{ height }}</h2>
    <button @click="age++">修改age</button>
    <button @click="height = 1.89">修改height</button>
  </div>
</template>

<script setup>
import { reactive, toRefs, toRef } from "vue";

const info = reactive({
  name: "why",
  age: 18,
  height: 1.88,
});

// reactive被解构后会变成普通的值, 失去响应式，即利用以下常规方式结构，  info 还有结构后的 name1 age1 height1 均会变成非响应式的
const { name1, age1, height1 } = info;

// 利用 toRefs 则不会有上述影响   这种做法相当于已经在state.name和ref.value之间建立了 链接，任何一个修改都会引起另外一个变化
const { name, age } = toRefs(info);

// 只希望转换一个reactive对象中的属性为ref, 那么可以使用toRef的方法
const height = toRef(info, "height");

/* 
  ◼ unref 如果我们想要获取一个ref引用中的value，那么也可以通过unref方法：
    如果参数是一个 ref，则返回内部值，否则返回参数本身；
    这是 val = isRef(val) ? val.value : val 的语法糖函数；
  ◼ isRef
    判断值是否是一个ref对象。
  ◼ shallowRef
    创建一个浅层的ref对象；
  ◼ triggerRef
    手动触发和 shallowRef 相关联的副作用
*/
</script>

<style scoped></style>
