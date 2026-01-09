<template>
  <div class="h-[900px] w-[1500px] flex">
    <!-- h-6--w-6--border--rounded-sm--m-1 -->

    <!-- 控制主轴方向 -->
    <div>
      <form>
        <div class="flex py-[4px]">
          <span class="mr-[8px] text-[#f6899c]">flex-direction:</span>
          <div class="mr-[12px]">
            <input type="radio" value="row" name="flex-direction" id="a" checked />
            <label for="a">row</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="row-reverse" name="flex-direction" id="b" />
            <label for="b">row-reverse</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="column" name="flex-direction" id="c" />
            <label for="c">column</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="column-reverse" name="flex-direction" id="d" />
            <label for="d">column-reverse</label>
          </div>
        </div>

        <!-- 主轴方向上的排列方式 -->
        <div class="flex py-[4px]">
          <span class="mr-[8px] text-[#f6899c]">justify-content:</span>
          <div class="mr-[12px]">
            <input type="radio" value="flex-start" name="justify-content" id="a1" />
            <label for="a1">flex-start</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="flex-end" name="justify-content" id="b1" />
            <label for="b1">flex-end</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="center" name="justify-content" id="c1" />
            <label for="c1">center</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="space-between" name="justify-content" id="d1" />
            <label for="d1">space-between</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="space-around" name="justify-content" id="e1" />
            <label for="e1">space-around</label>
          </div>
        </div>

        <!-- 侧轴方向上的排列方式  适用于有多个侧轴 -->
        <div class="flex py-[4px]">
          <span class="mr-[8px] text-[#f6899c]">align-content:</span>
          <div class="mr-[12px]">
            <input type="radio" value="flex-start" name="align-content" id="a5" />
            <label for="a5">flex-start</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="flex-end" name="align-content" id="b5" />
            <label for="b5">flex-end</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="center" name="align-content" id="c5" />
            <label for="c5">center</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="space-between" name="align-content" id="d5" />
            <label for="d5">space-between</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="space-around" name="align-content" id="e5" />
            <label for="e5">space-around</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="space-evenly" name="align-content" id="f5" />
            <label for="f5">space-evenly</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="baseline" name="align-content" id="g5" />
            <label for="g5">baseline</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="stretch" name="align-content" id="h5" />
            <label for="h5">stretch</label>
          </div>
        </div>

        <!-- 侧轴方向上的排列方式  适用于有一个侧轴 -->
        <div class="flex py-[4px]">
          <span class="mr-[8px] text-[#f6899c]">align-items:</span>
          <div class="mr-[12px]">
            <input type="radio" value="flex-start" name="align-items" id="a6" />
            <label for="a6">flex-start</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="flex-end" name="align-items" id="b6" />
            <label for="b6">flex-end</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="center" name="align-items" id="c6" />
            <label for="c6">center</label>
          </div>
          <!-- <div class="mr-[12px]">
              <input type="radio" name="align-items" id="d6">
              <label for="d6">space-between</label>
            </div>
            <div class="mr-[12px]">
              <input type="radio" name="align-items" id="e6">
              <label for="e6">space-around</label>
            </div>
            <div class="mr-[12px]">
              <input type="radio" name="align-items" id="f6">
              <label for="f6">space-evenly</label>
            </div> -->
          <div class="mr-[12px]">
            <input type="radio" value="baseline" name="align-items" id="g6" />
            <label for="g6">baseline</label>
          </div>
          <div class="mr-[12px]">
            <input type="radio" value="stretch" name="align-items" id="h6" />
            <label for="h6">stretch</label>
          </div>
        </div>

        <div>
          <button type="submit">提交</button>
        </div>
      </form>

      <div class="flex flex-wrap h-[500px] w-[1000px] m-[4px] p-[4px] bg-[#f1f5f9]" id="divContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const startFun = () => {
  // 下方的div盒子
  const container = document.getElementById("divContainer");

  for (let i = 0; i <= 13; i++) {
    // !!! 将下方两句写在for循环外面时，无效，只会添加一个
    const elDiv = document.createElement("div");
    elDiv.className = "h-[78px] w-[78px] shrink-0 bg-[#fca5a5] border border-[#cbd5e1] rounded-sm m-[4px]";

    container.appendChild(elDiv);
  }

  const form = document.querySelector("form");

  form.addEventListener(
    "submit",
    event => {
      const data = new FormData(form);

      // for (let value of data.values()) {
      //   console.log(value);
      // }

      let styleInfo = "";

      for (let [a, b] of data.entries()) {
        styleInfo += `${a}:${b};`;
      }

      container.setAttribute("style", styleInfo);

      event.preventDefault();
    },
    false
  );
};

onMounted(() => {
  startFun();
});
</script>

<style scoped>
input {
  margin-right: 2px;
}
</style>
