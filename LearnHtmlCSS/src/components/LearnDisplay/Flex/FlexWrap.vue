<template>
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="wrap" id="a" checked />
      <label for="a">wrap</label>
    </div>
    <div>
      <input type="radio" name="111" value="nowrap" id="b" />
      <label for="b">nowrap</label>
    </div>
    <div>
      <input type="radio" name="111" value="wrap-reverse" id="c" />
      <label for="c">wrap-reverse</label>
    </div>

    <button type="button" @click="getSelectedValue()">获取选择</button>
  </div>

  <div class="textarea">
    <div>1 placeholder</div>
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
  const element = document.querySelector(".textarea");
  if (element) {
    element.style.flexWrap = selected.defaultValue;
    // 或者使用更详细的写法：
    // element.style.setProperty('flex-wrap', selected.defaultValue);
  }
};
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

  flex-direction: row;
  flex-wrap: wrap;
  /* 
      wrap              项目在需要时换行，从上到下排列
      nowrap            项目不换行，都在一行内显示
      wrap-reverse      项目在需要时换行，但从下到上排列
   */

  justify-content: flex-start;
  align-content: flex-start;
  align-items: stretch;
  
}

.textarea div {
  width: 100px;
  height: 100px;
  background: rgb(163, 163, 211);
  border: 1px dashed black;
  text-align: center;
}
</style>
