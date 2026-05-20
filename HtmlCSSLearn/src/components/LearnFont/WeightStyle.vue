<template>
  <div>
    <p class="p1">Lorem ipsum dolor sit</p>

    <p>Lorem ipsum dolor sit.</p>

    <p class="p2">Lorem ipsum dolor.</p>

    <h1 style="font-weight: normal">一级标题</h1>
    <h1>一级标题</h1>
  </div>
</template>

<script setup></script>

<style scoped>
.p1 {
  font-weight: 700;
  /* font-weight的范围是100-900 */
  /* font-weight的常见取值
                100  细体  ligter
                400  正常  normal
                700  加粗  bold
                900  更粗体  bolder（与900在肉眼上没有很大区别，有强调意味）
             */
}

.p2 {
  font-style: italic;
  /* font-style的属性值有
                italic  斜体字
                oblique  更倾斜（表示强调）
                normal  正常*/
}
</style>
