<template>
  <!-- https://www.yuque.com/u51716160/gn8srq/heehpw9uy6e6txgw -->
  <div class="flex flex-wrap">
    <div class="textarea textarea1">
      <div>placeholder resize vertical</div>
    </div>

    <div class="textarea textarea2">
      <div>placeholder resize vertical</div>
    </div>

    <div class="textarea textarea3">
      <div>placeholder resize vertical</div>
      <div>placeholder resize vertical</div>
      <div>placeholder resize vertical</div>
    </div>

    <div class="textarea textarea4">
      <div class="leftArea">placeholder resize vertical</div>
      <div class="centerArea">placeholder resize vertical</div>
      <div class="rightArea">placeholder resize vertical</div>
    </div>

    <div class="textarea textarea5">
      <div class="leftArea">placeholder resize vertical</div>
      <div class="centerArea">placeholder resize vertical</div>
      <div class="rightArea">placeholder resize vertical</div>
    </div>

    <div class="textarea textarea6">
      <div class="leftArea">placeholder resize vertical</div>
      <div class="centerArea">placeholder resize vertical</div>
      <div class="rightArea">placeholder resize vertical</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="stylus">
/* 常规块盒子，只能实现 水平居中 */
.textarea {
  margin: 0 8px 8px 0;
  width: 200px;
  height: 200px;
  background: rgb(178, 119, 119);
}

.textarea div {
  width: 100px;
  height: 100px;
  background: rgb(130, 130, 190);
  text-align: center;
}

/* 块盒子， 水平居中、垂直居中 */
.textarea1 {
  display: flex;

  div {
    margin-left: auto;
  }
}

/* display盒子， 水平居中、垂直居中 */
.textarea2 {
  display: flex;

  div {
    margin-left: auto;
  }
}

/* 多个盒子，每个盒子占据一样的尺寸 */
.textarea3 {
  width: 1000px;
  display: flex;

  div {
    margin auto
  }
}

.textarea4 {
  width: 1000px;
  display: flex;

  .leftArea {
    margin-right: auto
  }
}

.textarea5 {
  width: 1000px;
  display: flex;

  .leftArea, .centerArea, .rightArea {
    margin-right: auto
  }
}

.textarea6 {
  width: 1000px;
  display: flex;

  .leftArea {
    margin-top: auto
    margin-bottom: auto
    margin-left: auto
  }
  .centerArea {
    margin: auto
  }
  .rightArea {
    margin-top: auto
    margin-bottom: auto
    margin-right: auto
  }
}
</style>
