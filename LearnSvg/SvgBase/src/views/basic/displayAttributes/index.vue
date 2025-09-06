<script setup>
import { onMounted, ref } from "vue";

const viewBox = ref({
  vx: 0,
  vy: 0,
  vw: 300,
  vh: 200,
});

let align = ref("none");
let alignOptions = ref(["none", "xMinYMin", "xMidYMin", "xMaxYMin", "xMinYMid", "xMidYMid", "xMaxYMid", "xMinYMax", "xMidYMax", "xMaxYMax"]);

let meetOrSlice = ref("meet");
let meetOrSliceOptions = ref(["meet", "slice"]);

const svg = ref("svg");
const rect = ref("rect");

function updated() {
  console.log("11111111111111111111111111111111111111111111111111111111");
  let viewBoxValue = Object.values(viewBox.value).join(" ");
  let preserveAspectRatio = [align.value, meetOrSlice.value].join(" ");
  svg.value.setAttribute("viewBox", viewBoxValue);
  svg.value.setAttribute("preserveAspectRatio", preserveAspectRatio);

  rect.value.setAttribute("x", viewBox.value.vx);
  rect.value.setAttribute("y", viewBox.value.vy);
  rect.value.setAttribute("width", viewBox.value.vw);
  rect.value.setAttribute("height", viewBox.value.vh);
}

window.addEventListener("input", updated);

onMounted(() => {
  updated();
});
</script>

<template>
  <div class="container">
    <div>
      <div>世界：无限的，SVG代码既是定义世界的内容</div>
      <div>视野：世界之上，视野之内的内容才会显示出来，由 viewBox preserveAspectRatio 控制</div>
      <div>视窗：由 svg标签的 width height 属性控制</div>
    </div>

    <div style="width: 800px; height: 600px; margin-top: 100px">
      <form id="form">
        <fieldset>
          <legend>viewBox</legend>
          <label>x: <input type="number" v-model="viewBox.vx" /></label>
          <label>y: <input type="number" v-model="viewBox.vy" /></label>
          <label>width: <input type="number" v-model="viewBox.vw" /></label>
          <label>height: <input type="number" v-model="viewBox.vh" /></label>
        </fieldset>

        <fieldset>
          <legend>preserveAspectRatio</legend>
          <label>
            align:
            <select v-model="align">
              <option v-for="(item, index) in alignOptions" :key="index" :value="item">{{ item }}</option>
            </select>
          </label>
          <label>
            meetOrSlice:
            <select v-model="meetOrSlice">
              <option v-for="(item, index) in meetOrSliceOptions" :key="index" :value="item">{{ item }}</option>
            </select>
          </label>
        </fieldset>
      </form>

      <svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="300px" height="200px">
        <circle cx="100" cy="100" r="90" fill="#39F"></circle>

        <circle cx="70" cy="80" r="20" fill="white"></circle>
        <circle cx="130" cy="80" r="20" fill="white"></circle>
        <circle cx="65" cy="75" r="10" fill="black"></circle>
        <circle cx="125" cy="75" r="10" fill="black"></circle>

        <path d="M 50 140 A 60 60 0 0 0 150 140" stroke="white" stroke-width="3" fill="none"></path>

        <rect ref="rect" stroke="red" stroke-width="3.5" fill="none"></rect>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* .container {
  background: #eee;
} */
svg {
  border: 3px solid green;
  /* 
  如此，等同与上面在 svg标签中直接使用 width height进行设置
  width: 300px;
  height: 200px; 
  */
  margin: 60px 100px;

  background: white;
}
input[type="number"] {
  width: 80px;
}
</style>
