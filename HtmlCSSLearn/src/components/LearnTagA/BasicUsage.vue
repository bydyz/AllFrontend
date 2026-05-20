<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="ml-[50px] mt-[20px]">
    <a href="https://www.baidu.com">百度</a>
    &emsp;
    <a href="https://www.baidu.com/">百度</a>
    <!-- 只要先前已经在浏览器中点开过   则 a标签 是紫色的且带下划线 -->

    &emsp;
    <a href="https://www.baidu.com/rc">百度</a>
    <!-- 后面那个路径rc是瞎编的，故不可能在浏览器中点开，故此时是默认蓝色带下划线 -->
    &emsp;
    <a href="https://www.caniuse.com">标签使用</a>

    &emsp;
    <a href="https://www.baidu.com" target="_self">百度</a>
    &emsp;
    <a href="https://www.baidu.com" target="_blank">百度</a>
    <!-- 若不打中间百度两个字，什么也出不来 -->

    &emsp;
    <!-- title是悬浮时的展示内容 -->
    <a href="https://www.baidu.com" title="百度查询">
      <img src="./happy.jpg">
      <!-- 这个标签也可以用alt+w -->
    </a>

    &emsp;
    <a href="test.html">成绩查询系统</a>
  </div>
</template>

<style scoped></style>
