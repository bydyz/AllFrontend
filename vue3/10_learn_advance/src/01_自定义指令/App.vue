<template>
  <div class="app">
    <h2 v-ftime="'YYYY/MM/DD'">{{ timestamp }}</h2>
    <h2 v-ftime>{{ 1551111166666 }}</h2>
  </div>

  <hr>

  <firstVue></firstVue>

  <hr>

  <secondVue></secondVue>

  <hr>

  <thirdVue></thirdVue>
</template>

<script setup>

import firstVue from './01_自定义指令基本使用.vue';
import secondVue from './02_自定义指令生命周期.vue';
import thirdVue from './03_自定义指令参数修饰符值.vue';

const timestamp = 1231355453

</script>

<style scoped>
 hr {
  margin: 60px 0;
 }
</style>
