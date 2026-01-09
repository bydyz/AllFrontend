<template>
  <div class="container">
    <div>
      <p>div中的内容1</p>
      <p>div中的内容2</p>
    </div>
    <p>ppp 111</p>
    <p>ppp 222</p>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
// > 符号在 CSS 中表示选择直接子元素，它只匹配作为某个元素直接后代的元素，不会匹配更深层嵌套的元素。

// 任意一个  div  的直接子元素p
.container > p {
  color: pink;
}
.container > p {
  font-size: 30px
}
</style>
