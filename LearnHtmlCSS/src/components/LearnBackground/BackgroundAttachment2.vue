<template>
  <div>
    <div class="div1"></div>
    <div class="div2"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.div1,
.div2 {
  width: 600px;
  height: 1300px;
}

.div1 {
  background-image: url(./鸣人.png);
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-attachment: fixed;
  background-color: #a1a198;
}

.div2 {
  background-image: url(./雏田.png);
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-attachment: fixed;
  background-color: #868694;
}

/* 两个div的大小一样，background-attachment的属性值都为fixed时，滚动一个div大小
           就会出现图片更迭的效果。如果由于缩小导致浏览器的页面太小，不足以支撑一个div大小
           的滚动，或者说页面缩得比一个div的长度小，则第二个div无法完全将第一个div覆盖 */

/* fixed  背景图片附着在浏览器的可视区域。因为浏览器的可视区域不具备滚动的性格，所以它是不滚动的
        不仅仅是可视区域，还需要满足在div上 */
</style>
