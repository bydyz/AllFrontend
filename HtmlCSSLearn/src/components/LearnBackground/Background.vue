<template>
  <div>
    <div class="div1"></div>
    <div class="div2"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.div1 {
  width: auto;
  height: 100%;

  /* background-color: red;
            background-image: url(./Alipay.png);
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed; */

  background: #e8b8b8 url(./Alipay.png) center center no-repeat fixed;
  /* background复合写法
                1.用空格隔开
                2.顺序可以换，除了background-position的两个值得放一起
                3.可以只写一个属性值，其他的按默认来，若前面还有background的相关属性，会被覆盖 
                4.background-size的属性只能单独写*/

  /* background-position可以对background-attachment产生作用 */
}

.div2 {
  width: 1500px;
  height: 1500px;

  background: no-repeat url(./雏田.png) #bfbfac fixed;
  /* background: yellow; */
}
</style>
