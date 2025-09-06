<template>
  <div class="div1">i love you</div>

  <br />

  <div class="div2">i love you</div>

  <br />

  <div class="div3">Lorem ipsum dolor</div>

  <br />

  <div class="div4">Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor</div>

  <br />

  <div class="div5">i love you</div>

  <br />

  <div class="div6">i love you</div>

  <br />

  <div class="div7">Lorem ipsum dolor sit!</div>

  <br />

  <div class="div8">Lorem ipsum dolor sit!</div>
</template>

<script setup></script>

<style scoped>
.div1 {
  text-align: center;
  /* text-align的取值有left  center  right */
  background-color: #999;
  /* 没有设置div的宽度是，默认占满显示部分 */
}

.div2 {
  text-align: left;
  background-color: #999;
  width: 500px;
}

.div3 {
  text-align: right;
  background-color: #999;
  width: 500px;
}

.div4 {
  text-align: justify;
  /* 两端对齐，只适用于多行文本 */
  background-color: #999;
  width: 500px;
}

.div5 {
  width: 500px;
  height: 100px;
  background-color: #999;
  /* line-height: 100px; */
}

.div6 {
  width: 500px;
  height: 100px;
  background-color: #999;
  /* line-height: 100px; */
}

.div7 {
  width: 500px;
  height: 100px;
  background-color: #999;
}

.div8 {
  width: 500px;
  height: 100px;
  background-color: #999;
  line-height: 100px;
  /* line-height是针对每一行的行高设置 */
}
</style>
