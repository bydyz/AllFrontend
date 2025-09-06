<template>
  <div class="home">
    <h2>1Basic</h2>

    <!-- 上面两种方法都可以 -->
    <h2>count: {{ counterStore.count }}</h2>
    <h2>count: {{ count }}</h2>
    
    <!-- 次处三种方法均可 -->
    <button @click="incrementCount">count+1</button>
    <button @click="counterStore.count++">count+1</button>
    <button @click="count++">count+1</button>
  </div>
</template>

<script setup>
  import { toRefs } from 'vue'
  import { storeToRefs } from 'pinia'
  import useCounter from '@/stores/counter';

  //！ counterStore 可以 取用、设置state  取用getters  调用actions
  const counterStore = useCounter()

  // 两种写法都可以
  // const { count } = toRefs(counterStore)
  const { count } = storeToRefs(counterStore)


  function incrementCount() {
    // counterStore.count++

    count.value++
  }

</script>

<style scoped>
</style>

