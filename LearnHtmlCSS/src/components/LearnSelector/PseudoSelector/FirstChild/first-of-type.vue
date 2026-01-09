<template>
  <div>
    <div class="container">
      <h3>标题</h3>
      <p>第一个p（被选中）</p>
      <span>第一个span（被选中）</span>
      <p>第二个p</p>
      <span>第二个span</span>
    </div>

    <br>

    <div class="container">
      <span>第一个span（被选中）</span>
      <p>第一个p（被选中）</p>
      <div>div元素</div>
      <p>第二个p</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
/* 选择每个父元素中第一个 p 类型的元素 */
.container p:first-of-type {
  background-color: #667eea;
  color: white;
  padding: 10px;
}

/* 选择每个父元素中第一个 span 类型的元素 */
.container span:first-of-type {
  background-color: #ffa726;
  color: white;
  padding: 10px;
}
</style>
