<template>
  <div class="selectArea flex">
    <div>
      <input type="radio" name="111" value="12" id="a0" checked />
      <label for="a0">40</label>
    </div>
    <div>
      <input type="radio" name="111" value="52" id="a1" />
      <label for="a1">52</label>
    </div>
    <div>
      <input type="radio" name="111" value="62" id="a" />
      <label for="a">62</label>
    </div>
    <div>
      <input type="radio" name="111" value="72" id="b" />
      <label for="b">72</label>
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
  const element = document.querySelector(".textarea div:nth-child(4)");
  if (element) {
    element.style.order = selected.defaultValue;
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
    order: 1;
  }
  div:nth-child(2) { 
    min-height: 70px;
    order: 10;
  }
  div:nth-child(3) { 
    min-height: 80px;
    order: 20;
  }
  div:nth-child(4) { 
    min-height: 90px;
    order: 40;
  }
  div:nth-child(5) { 
    min-height: 100px;
    order: 50;
  }
  div:nth-child(6) { 
    min-height: 110px;
    order: 60;
  }
  div:nth-child(7) { 
    min-height: 120px;
    order: 70;
  }
  div:nth-child(8) { 
    min-height: 130px;
    order: 80;
  }
  div:nth-child(9) { 
    min-height: 140px;
    order: 90;
  }

  div:nth-child(4) { 
    align-self: center;
  }
}



.textarea div {
  width: 100px;
  background: rgb(163, 163, 211);
  border: 1px dashed black;
  text-align: center;
}
</style>
