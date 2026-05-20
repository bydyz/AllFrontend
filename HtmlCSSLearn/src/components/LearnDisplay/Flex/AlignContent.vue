<template>
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="stretch" id="a0" checked />
      <label for="a0">stretch</label>
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
      <input type="radio" name="111" value="space-between" id="d" />
      <label for="d">space-between</label>
    </div>
    <div>
      <input type="radio" name="111" value="space-around" id="e" />
      <label for="e">space-around</label>
    </div>
    <div>
      <input type="radio" name="111" value="space-evenly" id="f" />
      <label for="f">space-evenly</label>
    </div>

    <button type="button" @click="getSelectedValue()">获取选择</button>
  </div>

  <h3 class="mb-[4px]">控制主轴在侧轴上的排列</h3>
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
  const element = document.querySelector(".textarea");
  if (element) {
    element.style.alignContent = selected.defaultValue;
    // 或者使用更详细的写法：
    // element.style.setProperty('align-content', selected.defaultValue);
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
  flex-wrap: wrap;

  flex-direction: row;

  justify-content: flex-start;

  align-content: stretch;
  /* 
      stretch             拉伸所有行来填满交叉轴上的剩余空间
      flex-start          所有行从交叉轴的 起始位置 开始排列
      flex-end            所有行从交叉轴的 结束位置 开始排列
      center              所有行在交叉轴上居中对齐
      space-between       行均匀分布在交叉轴上，第一行在起始点，最后一行在终点
      space-around        行均匀分布在交叉轴上，每行周围分配相等的空间
      space-evenly        行均匀分布，每个行之间的间隔完全相等
   */
}

.textarea div {
  width: 100px;
  // 倘若此时限制死了高度，则 无法拉伸
  min-height: 100px;
  background: rgb(163, 163, 211);
  border: 1px dashed black;
  text-align: center;
}
</style>
