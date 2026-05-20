<template>
  <div>
    <!-- 新建文件时加上“/”，相当于先建立文件夹，再新建文件 -->
    <dl>
      <dt>我是图片</dt>
      <!-- ctrl+enter, 直接换行 -->
      <dd>我是文字</dd>
      <!-- dt  dd 出现是为了图文混排 -->
    </dl>

    <dl>
      <dt>我是图片</dt>
      <!-- ctrl+enter, 直接换行 -->
      <dd>我是文字</dd>
    </dl>

    <dl>
      <dt>我是图片</dt>
      <!-- ctrl+enter, 直接换行 -->
      <dd>我是文字</dd>
    </dl>

    <dl>
      <dt>11</dt>
      <dd>22</dd>
    </dl>
    <!-- dl>dt{11}+dd{22} -->
  </div>
</template>

<script setup>
// 创建函数
const InitPage = async () => {};
// 写在此处 大致相当于 created 里调用
InitPage();
</script>

<style lang="less" scope></style>
