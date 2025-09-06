<template>
  <div>
    <h2>{{ title }}</h2>
    <p class="content">我是内容，哈哈哈哈哈！</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "我是Vue的标题"
      }
    }
  }
</script>

<style>
  .content {
    font-size: 60px;
    color: pink;
  }
</style>