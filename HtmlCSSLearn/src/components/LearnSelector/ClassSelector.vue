<template>
  <div>111111</div>
  <div class="XTU spark">111111</div>
  <div class="spark XTU">111111</div>
  <!-- class的属性值前后顺序无所谓 -->
  <div class="XTU">111111</div>
  <div class="XTU">111111</div>
  <div>111111</div>
  <div>111111</div>
</template>

<style scoped>
.XTU {
  background-color: rgb(112, 112, 156);
}

.spark {
  color: rgb(210, 162, 162);
  background-color: rgb(234, 234, 201);
  /* 两个出现同一个属性，取就近的那个 */
}
</style>
