<template>
  <div>
    <p style="font-size: 30px; font-family: 宋体">这是宋体</p>

    <p class="p2">这是黑体</p>

    <p id="p3">宋体, 楷体, 微软雅黑</p>

    <p>细明体</p>
  </div>
</template>

<script setup></script>

<style scoped>
.p2 {
  font-size: 60px;
  font-family: 黑体;
}

#p3 {
  font-size: 90px;
  font-family: 宋体, 楷体, 微软雅黑;
}

p {
  margin-bottom: 50px;
  font-size: 120px;
  font-family: 细明体;
}

/* 若字体大小不加单位px，则在网页检查时会font-size会被划掉 */
/* 字体大小默认16px，字体默认微软雅黑 */
</style>
