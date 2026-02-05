<template>
  <div>
    <div class="div1"></div>

    <br />

    <div class="div2"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.div1 {
  width: 1400px;
  height: 2000px;

  background-color: #8c8c82;
  background-image: url(./Alipay.png);
  /* 默认平铺 */
  background-repeat: no-repeat;
  /* background-repeat的取值有：
                1.repeat（这是默认值，即全铺满）
                2.repeat-x  铺一行 
                3.repeat-y  铺一列
                4.no-repeat  就放一张*/

  /* background-position: 100px 100px; */
  /* background-position: 50% 50%; */
  background-position: center top;
  /* 第一个空取值  left  center  right
               第二个空取值  top  center  bottom */
  /* 小图片放在比之大一些的盒子里，三种 */
}

.div2 {
  width: 1000px;
  height: 1000px;

  background-color: #ca9a9a;
  background-image: url(./Wechat.png);
  background-repeat: no-repeat;

  background-position: center center;
  /* background-position: 50px 50px; */
  /* 大图片放在比之小的盒子里，少个百分比 */
}
</style>
