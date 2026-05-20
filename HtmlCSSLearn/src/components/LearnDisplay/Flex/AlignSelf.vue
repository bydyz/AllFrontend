<template>
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="auto" id="a0" checked />
      <label for="a0">auto</label>
    </div>
    <div>
      <input type="radio" name="111" value="stretch" id="a1" />
      <label for="a1">stretch</label>
    </div>
    <div>
      <input type="radio" name="111" value="flex-start" id="a" />
      <label for="a">flex-start</label>
    </div>
    <div>
      <input type="radio" name="111" value="flex-end" id="b" />
      <label for="b">flex-end</label>
    </div>
    <div>
      <input type="radio" name="111" value="center" id="c" />
      <label for="c">center</label>
    </div>
    <div>
      <input type="radio" name="111" value="baseline" id="d" />
      <label for="d">baseline</label>
    </div>

    <button type="button" @click="getSelectedValue()">获取选择</button>
  </div>

  <h3 class="mb-[4px]">控制 单个项目 相对于 自己所处的框框 而言的，侧轴上的排列</h3>
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
  const element = document.querySelector(".textarea div:nth-child(4)");
  if (element) {
    element.style.alignSelf = selected.defaultValue;
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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;

  div:nth-child(1) {
    min-height: 60px;
  }
  div:nth-child(2) {
    min-height: 70px;
  }
  div:nth-child(3) {
    min-height: 80px;
  }
  div:nth-child(4) {
    min-height: 90px;
  }
  div:nth-child(5) {
    min-height: 100px;
  }
  div:nth-child(6) {
    min-height: 110px;
  }
  div:nth-child(7) {
    min-height: 120px;
  }
  div:nth-child(8) {
    min-height: 130px;
  }
  div:nth-child(9) {
    min-height: 140px;
  }

  div:nth-child(4) {
    align-self: auto;

    /* 
      auto                继承容器的 align-items 值。
      stretch             拉伸项目以填满交叉轴上的容器高度
      flex-start          项目在交叉轴的 起始位置 对齐
      flex-end            项目在交叉轴的 结束位置 对齐
      center              项目在交叉轴上居中对齐
      baseline            项目按它们的基线对齐
   */
  }
}

.textarea div {
  width: 100px;
  background: rgb(163, 163, 211);
  border: 1px dashed black;
  text-align: center;
}
</style>
