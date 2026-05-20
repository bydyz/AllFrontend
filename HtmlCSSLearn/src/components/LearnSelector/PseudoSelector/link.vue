<template>
  <div>
    <a href="http://www.baidu.com/a">百度</a>
    <a href="http://www.baidu.com">百度</a>
  </div>
</template>

<script setup></script>

<style scoped>
/* a{
            color:red;
        } */
/* 这样设置，无论如何“百度”两字都会是红色的 */

/* a:link{
            color:yellow;
        } */
/* 这是针对没被点击访问的网址而设置的 */

/* a:visited{
            color:orange;
        } */
/* 这是针对被点击访问过的网址而设置的 */

a:hover {
  color: red;
}
/* 鼠标悬浮其上时的设置 */

a:active {
  color: green;
}
/* 点击后一瞬间的设置 */

/* 顺序一定得为link visited active hover，否则会失效 */
</style>
