<template>
  <div>
    <p class="mb-[8px]">
      <vxe-button @click="onContainerScroll">滚动</vxe-button>
      <vxe-button @click="onInnerDomScroll">内部dom滚动</vxe-button>
    </p>

    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #radioHeader>
        <vxe-button mode="text" @click="" :disabled="!selectRow">取消</vxe-button>
      </template>
    </vxe-grid>

    <div class="vxe-table--column666" colid="col_16">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { VxeUI } from "vxe-table";

// 示例一
const gridRef = ref();
const selectRow = ref();
const gridOptions = reactive({
  border: true,
  height: 300,
  radioConfig: {
    highlight: true,
  },
  columns: [
    { field: "sex", title: "Sex", width: "500px" },
    { field: "age", title: "Age", width: "500px" },
    { field: "height", title: "Height", width: "500px" },
    { field: "weight", title: "Weight", width: "500px" },
    { field: "address", title: "Address", width: "500px", showOverflow: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, height: 170, weight: 60, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, height: 170, weight: 60, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, height: 170, weight: 60, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, height: 170, weight: 60, address: "test abc" },
    { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, height: 170, weight: 60, address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, height: 170, weight: 60, address: "test abc" },
    { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, height: 170, weight: 60, address: "test abc" },
    { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, height: 170, weight: 60, address: "test abc" },
  ],
});

const domContainer = ref();
const innerDom = ref();

const onContainerScroll = () => {
  domContainer.value = document.querySelector(".vxe-table--body-inner-wrapper");
  domContainer.value.scrollTo({
    top: 500, // 垂直位置
    left: 300, // 水平位置
    behavior: "smooth", // 滚动行为
  });
};

const onInnerDomScroll = () => {
  innerDom.value = document.querySelector('[rowid="row_11"] .vxe-body--column[colid="col_18"]');
  console.log("00000000000000000000000000000000000000000000000000000000", innerDom.value);
  innerDom.value.scrollIntoView({
    behavior: "smooth", // 'auto' 或 'smooth'
    block: "nearest", // 'start', 'center', 'end', 'nearest'
    inline: "center", // 'start', 'center', 'end', 'nearest'
  });
};
</script>
