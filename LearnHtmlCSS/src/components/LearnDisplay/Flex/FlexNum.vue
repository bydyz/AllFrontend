<template>
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="1" id="a0" checked />
      <label for="a0">1</label>
    </div>
    <div>
      <input type="radio" name="111" value="2" id="a1" />
      <label for="a1">2</label>
    </div>
    <div>
      <input type="radio" name="111" value="3" id="a" />
      <label for="a">3</label>
    </div>

    <button type="button" @click="getSelectedValue()">获取选择</button>
  </div>

  <div class="textarea">
    <div>1 placeholder</div>
    <div>2 horizontal both none</div>
    <div>3 select size multiple</div>
  </div>
</template>

<script setup>
const getSelectedValue = () => {
  const selected = document.querySelector('input[name="111"]:checked');

  // 获取第一个具有 'container' class 的元素
  const element = document.querySelector(".textarea div:nth-child(2)");
  if (element) {
    element.style.flex = selected.defaultValue;
    // 或者使用更详细的写法：
    // element.style.setProperty('align-self', selected.defaultValue);
  }
};
</script>

<style scoped lang="scss">
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
  align-items: stretch;
  
  div:nth-child(1) {
    flex: 1
  }
  div:nth-child(2) {
    flex: 1
  }
  div:nth-child(3) {
    background: rgb(163, 163, 211);
    width: 160px
  }
}

.textarea div {
  border: 1px dashed black;
  text-align: center;
}
</style>
