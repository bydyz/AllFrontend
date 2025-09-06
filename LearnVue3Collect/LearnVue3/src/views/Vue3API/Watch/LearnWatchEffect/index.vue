<template>
  <div>
    <h2>counter: {{ counter }} &emsp;&emsp;&emsp; name: {{ name }} &emsp;&emsp;&emsp; age: {{ age }}</h2>
    <button @click="counter++">+1</button>
    <button @click="name = 'kobe'">修改name</button>
    <button @click="age++">修改age</button>
  </div>
</template>

<script setup>
import { watchEffect, watch, ref } from "vue";

let counter = ref(0);
let name = ref("why");
let age = 18;

// watch(counter, (newValue, oldValue) => {})

// 1.watchEffect传入的函数默认会直接被执行一次
// 2.在执行的过程中, 会自动的收集依赖(依赖哪些响应式的数据   里面有哪些响应式数据，则会收集哪些)      只会收集响应式数据的依赖，非响应式则不会
const stopWatch = watchEffect(() => {
  console.log("-------", counter.value);
  console.log("-------", name.value)
  console.log("-------", age);

  // 判断counter.value > 10
  if (counter.value >= 10) {
    // 调用  watchEffect  返回的函数，会销毁监听
    stopWatch();
  }
});





const id = ref(1);
watchEffect((onInvalidate) => {
  const timer = setTimeout(() => {
    console.log('请求数据，ID:', id.value);
  }, 1000);

  onInvalidate(() => {
    clearTimeout(timer); // 在重新执行或停止时清除副作用
  });
});
id.value = 2; // 触发重新执行，先清除上一次的 timer





const data = ref(null);
watchEffect(
  () => {
    console.log('DOM 已更新?', document.getElementById('app').innerHTML);
  },
  { flush: 'post' } // DOM 更新后执行
);
// 可选值：
//   pre（默认）：在组件更新前执行。
//   post：在组件更新后执行（访问 DOM 时用）。
//   sync：同步触发（极少用）。





const state = reactive({ count: 0 });
watchEffect(
  () => {
    console.log('state.count:', state.count);
  },
  {
    onTrack(e) {
      console.log('依赖被追踪:', e.target);
    },
    onTrigger(e) {
      console.log('依赖触发变化:', e.target);
    },
  }
);
state.count++; // 触发 onTrack 和 onTrigger





const input = ref('');
watchEffect(async () => {
  if (input.value.length === 0) return;
  const isValid = await validateInput(input.value);
  console.log('验证结果:', isValid);
});





const settings = reactive({ theme: 'light' });
watchEffect(() => {
  localStorage.setItem('settings', JSON.stringify(settings));
});


// 注意事项
//   避免无限循环：
//     不要在 watchEffect 中同步修改其依赖的数据。
//     // 错误示例（无限循环）
//     const count = ref(0);
//     watchEffect(() => {
//       count.value++; // 修改依赖会触发重新执行
//     });

//   性能优化：
//     对复杂计算使用 computed + watch 替代 watchEffect。
    
//   异步操作：
//     结合 onInvalidate 清理副作用，避免竞态条件。
</script>

<style scoped></style>
