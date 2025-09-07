<template>
  <div class="selectRowsArea flex flex-wrap">
    <div>
      <input type="radio" name="111" value="200px 200px 200px" id="1a" checked />
      <label for="1a">200px 200px 200px</label>
    </div>
    <div>
      <input type="radio" name="111" value="33.3% 33.3% 33.4%" id="1b" />
      <label for="1b">33.3% 33.3% 33.4%</label>
    </div>
    <div>
      <input type="radio" name="111" value="repeat(3, 33.33%)" id="1c" />
      <label for="1c">repeat(3, 33.33%)</label>
    </div>
    <div>
      <input type="radio" name="111" value="repeat(3, 30%)" id="1d" />
      <label for="1d">repeat(3, 30%)</label>
    </div>
    <div>
      <input type="radio" name="111" value="repeat(auto-fill, 200px)" id="1e" />
      <label for="1e">repeat(auto-fill, 200px)</label>
    </div>
    <div>
      <input type="radio" name="111" value="repeat(auto-fill, 20%)" id="1f" />
      <label for="1f">repeat(auto-fill, 20%)</label>
    </div>
    <div>
      <input type="radio" name="111" value="1fr 2fr 1fr" id="1g" />
      <label for="1g">1fr 2fr 1fr</label>
    </div>
    <div>
      <input type="radio" name="111" value="1fr 50% 1fr" id="1h" />
      <label for="1h">1fr 50% 1fr</label>
    </div>
    <div>
      <input type="radio" name="111" value="minmax(100px,200px) 200px 100px" id="1i" />
      <label for="1i">minmax(100px,200px) 200px 100px</label>
    </div>
    <div>
      <input type="radio" name="111" value="100px 200px auto" id="1j" />
      <label for="1j">100px 200px auto</label>
    </div>
    <div>
      <input type="radio" name="111" value="" id="1k" />
      <label for="1k"></label>
    </div>
  </div>
  <div class="selectColumnsArea flex flex-wrap">
    <div>
      <input type="radio" name="222" value="200px 200px 200px" id="2a" checked />
      <label for="2a">200px 200px 200px</label>
    </div>
    <div>
      <input type="radio" name="222" value="33.3% 33.3% 33.4%" id="2b" />
      <label for="2b">33.3% 33.3% 33.4%</label>
    </div>
    <div>
      <input type="radio" name="222" value="repeat(3, 33.33%)" id="2c" />
      <label for="2c">repeat(3, 33.33%)</label>
    </div>
    <div>
      <input type="radio" name="222" value="repeat(3, 30%)" id="2d" />
      <label for="2d">repeat(3, 30%)</label>
    </div>
    <div>
      <input type="radio" name="222" value="repeat(auto-fill, 200px)" id="2e" />
      <label for="2e">repeat(auto-fill, 200px)</label>
    </div>
    <div>
      <input type="radio" name="222" value="repeat(auto-fill, 20%)" id="2f" />
      <label for="2f">repeat(auto-fill, 20%)</label>
    </div>
    <div>
      <input type="radio" name="222" value="1fr 2fr 1fr" id="2g" />
      <label for="2g">1fr 2fr 1fr</label>
    </div>
    <div>
      <input type="radio" name="222" value="1fr 50% 1fr" id="2h" />
      <label for="2h">1fr 50% 1fr</label>
    </div>
    <div>
      <input type="radio" name="222" value="minmax(100px, 200px) 200px 100px" id="2i" />
      <label for="2i">minmax(100px, 200px) 200px 100px</label>
    </div>
    <div>
      <input type="radio" name="222" value="100px 200px auto" id="2j" />
      <label for="2j">100px 200px auto</label>
    </div>
    <div>
      <input type="radio" name="222" value="" id="2k" />
      <label for="2k"></label>
    </div>
  </div>
  <div class="mb-[16px]">
    <button type="button" @click="getSelectedValue()">获取选择</button>
  </div>

  <div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
  </div>
</template>

<script setup>
const getSelectedValue = () => {
  const selectedRows = document.querySelector('input[name="111"]:checked');
  const selectedRColumns = document.querySelector('input[name="222"]:checked');

  // 获取第一个具有 'container' class 的元素
  const element = document.querySelector(".box");
  if (element) {
    element.style.gridTemplateRows = selectedRows.defaultValue;
    element.style.gridTemplateColumns = selectedRColumns.defaultValue;
    // 或者使用更详细的写法：
    // element.style.setProperty('align-self', selected.defaultValue);
  }
};
</script>

<style scoped>
.selectRowsArea, .selectColumnsArea {
  margin: 16px 0;
  div {
    margin-right: 16px;
    margin-bottom: 8px;

    input {
      margin-right: 8px;
    }
  }
}
div.box {
  width: 900px;
  height: 900px;
  display: grid;
  gap:20px 20px;

  /* 1 固定值 */
  grid-template-rows: 200px 200px 200px;
  grid-template-columns: 200px 200px 200px;

  /* 2 百分比 */
  /* grid-template-rows: 33.3% 33.3% 33.4% ;
            grid-template-columns: 33.3% 33.3% 33.4% ; */

  /* 3 repeat */
  /* grid-template-rows: repeat(3,33.33%);
            grid-template-columns: repeat(3,33.33%); */

  /* grid-template-rows: repeat(3, 30%);
  grid-template-columns: repeat(3, 30%); */

  /* 4. repeate autofill */
  /* grid-template-rows: repeat(auto-fill,200px);
            grid-template-columns: repeat(auto-fill,20%); */
  /* 第二个关键字处可去固定值，也可以取百分比 */

  /* 5. fr 片段 */
  /* grid-template-rows: 1fr 2fr  1fr;
            grid-template-columns: 1fr 50%  1fr; */
  /* 关键字可取fr，也可取固定的px，也可取百分比，fr部分是按照fr的数值比例进行划分的 */

  /* 6. minmax  确定某个数值的范围
             */
  /* grid-template-rows: minmax(100px,200px)  200px 100px;
            grid-template-columns: 200px  200px 200px; */

  /* 7 auto   自动填满剩余空间 */
  /* grid-template-rows: 100px  200px auto;
            grid-template-columns: 100px  200px auto; */

  div {
    background-color: #bdbaba;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* 通常我们进行设置时都会把项目设置得刚好占满盒子 */
</style>
