<template>
  <div>
    <div class="div1"></div>

    <br />

    <div class="div2"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
/* 背景占据元素的所有内容区域，包括 padding 和 border，但是不包括元素的 margin */

.div1 {
  width: 1400px;
  height: 2000px;

  background-color: #bdbdae;

  /* background-image: url(../../../../image/1.jpg); */
  background-image: url(./a.jpg);
  /* background-image 属性允许指定一个图片展示在背景中。可以和 background-color 连用，因此如果图片不重复地话，图片覆盖不到地地方都会被背景色填充。 */

  /* 默认平铺 */
  background-repeat: no-repeat;
  /* background-repeat: repeat; */
  /* background-repeat: repeat-x; */
  /* background-repeat: repeat-y; */
  /* background-repeat的取值有：
                1.repeat（这是默认值，即全铺满）
                2.repeat-x  铺一行 
                3.repeat-y  铺一列
                4.no-repeat  就放一张
                5.inherit    继承父元素的 background-repeat 属性*/

  background-position: 100px 100px;
  background-position: 50% 50%;
  background-position: center center;
  /* 第一个空取值  left  center  right
               第二个空取值  top  certer  bottom */

  /* background-size: 2000px; */
  /* background-size: 1400px 2000px; */
  /* 将图片调整至属性值指定尺寸 */
  /* background-size: 100% 100%; */
  /* 将图片调整至本div所占大小的横纵百分比 */

  /* background-size: auto 100%; */
  /* 高度占满屏幕，宽度自动适配，宽度有所牺牲 */
  /* background-size: 100% auto; */
  /* 宽度占满屏幕，高度自动适配，高度有所牺牲 */
  /* 等比例压缩，直至100%一方成立，另一方可能无法沾满或者被裁剪 */

  /* background-size: cover; */
  /* 将图片调整到刚好可以覆盖整个div区域，不管图片是不是横宽等比例伸缩 */
  /* background-size: contain; */
  /* 将图片等比例调整到适应区域大小，不管能不能覆盖整个区域 */
}

.div2 {
  width: 1000px;
  height: 1000px;

  background-color: #c7a0a0;
  background-image: url(./Alipay.png);
  background-repeat: no-repeat;
  background-position: center center;

  background-size: contain;
  background-size: cover;
}
</style>
