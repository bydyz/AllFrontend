<template>
  <p id="XTU1">11111111</p>
  <!-- id的属性值是唯一的，不像class后可以加其他的 -->
  <p id="XTU2">11111111</p>
  <!-- 此时的XTU2最好不要写为XTU1，要遵循一对一 -->
  <p id="XTU3">11111111</p>

  <div id="XTU1">11111111</div>
  <div id="XTU2">11111111</div>
  <div id="XTU3">11111111</div>

  <h3 id="XTU1">11111111</h3>
  <h3 id="XTU2">11111111</h3>
  <h3 id="XTU3">11111111</h3>
</template>

<script setup></script>

<style scoped>
#XTU1 {
  background-color: rgb(228, 228, 191);
}
#XTU2 {
  background-color: rgb(237, 197, 197);
}
#XTU3 {
  background-color: rgb(196, 196, 232);
}
</style>
