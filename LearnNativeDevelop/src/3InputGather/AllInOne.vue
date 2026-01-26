<template>
  <div id="cardContainer">
    <div class="text-[red] font-[700] mb-[60px]">checkbox</div>

    <input type="checkbox" />
    <input type="checkbox" checked />
  </div>

  <div id="cardContainer">
    <div class="text-[red] font-[700] mb-[60px]">number</div>

    <input type="number" id="resizeValue" value="24" min="1" max="1024" />
    <button @click="onGetInputValue">获取input的值</button>
  </div>

  <div id="cardContainer">
    <div class="text-[red] font-[700] mb-[60px]">file</div>

    <input type="file" multiple name="keyName" id="forLabel" />

    <!-- 
      附加属性
        multiple 
          支持多选
     -->

    <!-- 
      IDL 属性:
        value
          文件 input 的 value 属性包含了一个字符串，表示已选择文件的路径。如果用户没有选择任何文件，则该值为空字符串（""）。如果用户选择了多个文件，则 value 表示他们选择的文件列表中的第一个文件。
        files
          选中的文件的标识信息组成的数组
     -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const selectedFile = ref(null);
onMounted(() => {
  selectedFile.value = document.getElementById("forLabel");

  selectedFile.value.addEventListener("change", event => {
    console.log("selectedFile.value", selectedFile.value.value);
    console.log("selectedFile.files", selectedFile.value.files);
  });
});

const onGetInputValue = () => {
  console.log(document.getElementById("resizeValue").value);
  console.log(parseInt(document.getElementById("resizeValue").value));
};
</script>

<style scoped lang="scss">
#resizeValue {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
