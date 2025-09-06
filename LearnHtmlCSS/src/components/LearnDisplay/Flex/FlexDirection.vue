<template>
  <div class="selectArea flex">
    <div>
        <input type="radio" name="111" value="row" id="a" checked>
        <label for="a">row</label>
    </div>
    <div>
        <input type="radio" name="111" value="row-reverse" id="b">
        <label for="b">row-reverse</label>
    </div>
    <div>
        <input type="radio" name="111" value="column" id="c">
        <label for="c">column</label>
    </div>
    <div>
        <input type="radio" name="111" value="column-reverse" id="d">
        <label for="d">column-reverse</label>
    </div>

    <button type="button" @click="getSelectedValue()">获取选择</button>
  </div>
  
  <div class="textarea">
    <div>1 placeholder resize vertical</div>
    <div>2 horizontal both none</div>
    <div>3 select size multiple</div>
    <div>4 select size multiple</div>
    <div>5 select size multiple</div>
    <div>6 select size multiple</div>
    <div>7 select size multiple</div>
    <div>8 select size multiple</div>
    <div>9 select size multiple</div>
  </div>
</template>

<script setup>
const getSelectedValue = () => {
  const selected = document.querySelector('input[name="111"]:checked');
  
  // 获取第一个具有 'container' class 的元素
  const element = document.querySelector('.textarea');
  // 设置 flex-direction 样式
  if (element) {
    element.style.flexDirection = selected.defaultValue;
    // 或者使用更详细的写法：
    // element.style.setProperty('flex-direction', selected.defaultValue);
  }
}
</script>

<style scoped lang="stylus">
.selectArea {
  margin: 16px 0;
  div {
    margin-right: 8px;

    input {
      margin-right: 4px;
    }
  }
}
.textarea {
  width: 600px;
  height: 600px;
  background: rgb(214, 162, 162);

  display: flex;
  flex-wrap: wrap;

  flex-direction: row;

  /* 调整主轴item的排列方向 */
  /* flex-direction的取值有

      row（行   从左到右）  
      column（列）column是竖直排列，从上往下
      row-reverse(行反向)效果有点像右浮动
      column-reverse(列反向)同row-reverse，竖直排列，但是是从下往上； */
}

.textarea div {
  width: 100px;
  height: 100px;
  background: rgb(163, 163, 211);
  border: 1px dashed black;
  text-align: center;
}
</style>
