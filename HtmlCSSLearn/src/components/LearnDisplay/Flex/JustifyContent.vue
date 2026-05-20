<template>
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="flex-start" id="a" checked />
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

  <h3 class="mb-[4px]">控制主轴上，项目的排列</h3>
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
  // 设置 flex-direction 样式
  if (element) {
    element.style.justifyContent = selected.defaultValue;
    // 或者使用更详细的写法：
    // element.style.setProperty('justify-content', selected.defaultValue);
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

  /* justify-content: start; */
  /* justify-content: end; */
  /* justify-content: center; */
  /* justify-content: flex-start; */
  /* justify-content: flex-end; */
  /* justify-content: left; */
  /* justify-content: right; */

  /* justify-content: normal; */

  /* justify-content: space-between; */
  /* justify-content: space-around; */
  /* justify-content: space-evenly; */
  /* justify-content: stretch; */

  /* justify-content: safe center; */
  /* justify-content: unsafe center; */

  /* justify-content: inherit; */
  /* justify-content: initial; */
  /* justify-content: revert; */
  /* justify-content: revert-layer; */
  /* justify-content: unset; */

  justify-content: flex-start;
  /* justify-content: space-around; */
  /* 调整主轴方向的对齐方式
          flex-start  项目从主轴的起始位置开始排列。
          flex-end    项目从主轴的结束位置开始排列。
          center      项目在主轴上居中对齐。

          space-between   项目均匀分布在主轴线上，第一个项目在起始点，最后一个项目在终点。
          space-around    项目均匀分布在主轴线上，每个项目周围分配相等的空间 
          space-evenly    项目均匀分布，每个项目之间的间隔完全相等。 
          
          */
  /* 主轴是水平或者竖直都可以 */

  /* 先主轴，主轴满了，沿着侧轴都下一行，然后在沿着主轴排列！！！！！！！ */
}

.textarea div {
  width: 100px;
  height: 100px;
  background: rgb(163, 163, 211);
  border: 1px dashed black;
  text-align: center;
}
</style>
