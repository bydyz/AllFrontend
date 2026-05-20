<template>
  <div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <!-- <div>7</div>
        <div>8</div> -->

    <!-- 同表格的合并类似，合并后记得及时删除一些项目，以保证不会溢出 -->
    <!-- 这里和表格的合并不同的是，没有全部进行区域设置时，它里面的项目都是依次往后
            排列的，所以删除时都是除去末尾的项目 -->
    <!-- 除了设定的div所占区域外，其它div依次从左至右、从上往下进行排列 -->
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.box {
  width: 900px;
  height: 900px;
  display: grid;
  gap: 10px;

  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 200px 200px 200px;

  grid-template-areas:
    "a e e"
    "d e e"
    "g h i";

  div {
    border-radius: 8px;
    background: linear-gradient(135deg, #999999, #999998);
  }
}
/* .box div:nth-child(1){
  grid-area:a;
} */

/* .box div:nth-child(5){
  grid-area:e;
} */

.box div:nth-child(1) {
  grid-area: e;
}
</style>
