<template>
  <div>
    <h1>一般的非响应数据：</h1>
    <h2>message: {{ message }}</h2>
    <button @click="changeMessage">修改message</button>

    <hr />

    <h1>reactive：</h1>
    <h2>账号: {{ account.username }}</h2>
    <h2>密码: {{ account.password }}</h2>
    <button @click="changeAccount">修改账号</button>

    <hr />

    <!-- 默认情况下在template中使用ref时, vue会自动对其进行解包(取出其中value)        此时不可加  .value -->
    <!-- 修改counter，在template中不能用 .value，在setup()中需要用 .value  -->
    <h1>ref：</h1>
    <h2>当前计数（单纯）: {{ counter }} - {{ counter.value }}</h2>
    <button @click="increment">+1</button>
    <button @click="counter++">+1</button>

    <!-- 
      对于单纯ref  
        在setup函数使用时，均要使用  .value
        在template中使用时，不加  .value   无论是在 {{  }}  或是在  template中的函数里
    -->
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 1.定义普通的数据: 可以正常的被使用
// 缺点: 数据不是响应式的  即，用函数修改数据后，不会响应式修改
let message = "Hello World";
function changeMessage() {
  message = "你好啊,李银河!";
  console.log(message);
}

// 2.定义响应式数据
// 2.1.reactive函数: 定义复杂类型的数据  对传入的类型是有限制的，它要求我们必须传入的是一个对象或者数组类型  如果我们传入一个基本数据类型（String、Number、Boolean）会报一个警告 value cannot be made reactive: XXX
const account = reactive({
  username: "coderwhy",
  password: "123456",
});
function changeAccount() {
  account.username = "kobe";
  account.password = "888888";
}

// 2.2.ref函数: 定义简单类型的数据(也可以定义复杂类型的数据)   ref 会返回一个可变的响应式对象，该对象作为一个 响应式的引用 维护着它内部的值，这就是ref名称的来源；它内部的值是在ref的 value 属性中被维护的；在模板中引入ref的值时，Vue会自动帮助我们进行解包操作，所以我们并不需要在模板中通过 ref.value 的方式来使用； 但是在 setup 函数内部，它依然是一个 ref引用， 所以对其进行操作时，我们依然需要使用 ref.value的方式
// ref的解包是浅层的解包，如果我们将ref放到一个reactive的属性当中，那么在模板中使用时，它会自动解包
// counter定义响应式数据
const counter = ref(0);
function increment() {
  counter.value++;
}
</script>

<style scoped lang="scss">
h1 {
  color: rgb(243, 165, 178);
}
/* hr {
  margin: 12px 0;
} */
</style>
