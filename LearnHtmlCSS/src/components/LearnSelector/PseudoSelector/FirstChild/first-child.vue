<template>
  <div>
    <ul>
      <li>第一个li（被选中）</li>
      <li>第二个li</li>
      <li>第三个li</li>
    </ul>

    <br>

    <div class="container">
      <p>第一个p（被选中）</p>
      <p>第二个p</p>
      <span>这是一个span</span>
      <p>第三个p</p>
    </div>

    <br>

    <div class="container">
      <span>第一个span（不是p，所以不匹配）</span>
      <p>第一个p（不是第一个子元素，所以不匹配）</p>
      <p>第二个p</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
/* 选择作为父元素第一个子元素的 li */
ul li:first-child {
  background-color: #ff6b6b;
  color: white;
  font-weight: bold;
}

/* 选择作为父元素第一个子元素的 p */
.container p:first-child {
  border-left: 4px solid #4ecdc4;
  padding-left: 10px;
}
</style>
