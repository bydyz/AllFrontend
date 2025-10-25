<template>
  <div>
    <p>
      <vxe-button @click="selectRowEvent">设置第二行选中</vxe-button>
      <vxe-button @click="clearSelectEvent">取消选中</vxe-button>
      <vxe-button @click="getCurrentEvent">获取高亮行</vxe-button>
    </p>

    <vxe-grid ref="gridRef" class="mt-[8px]" v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { VxeUI } from "vxe-table";
const gridRef = ref();
const gridOptions = reactive({
  height: 300,
  rowConfig: {
    isCurrent: true,
    isHover: true,
  },
  columns: [
    { type: "seq", width: 70 },
    { field: "name", title: "Name" },
    { field: "sex", title: "Sex" },
    { field: "age", title: "Age" },
    { field: "content", title: "Address", showOverflow: true },
  ],
  data: [
    { name: "Test1", role: "Develop", sex: "Man", age: 28, content: "test abc" },
    { name: "Test2", role: "Test", sex: "Women WomenWomenWomenWomenWomenWomenWomenWomenWomenWomen", age: 41, content: "Guangzhou WomenWomenWomenWomenWomenWomenWomenWomenWomenWomen" },
    { name: "Test3", role: "PM", sex: "Man", age: 32, content: "Shanghai" },
    { name: "Test4", role: "Designer", sex: "Women", age: 24, content: "Shanghai" },
  ],
});
// 行选中事件 触发
const gridEvents = {
  // currentRowChange({ rowIndex }) {
  //   console.log(`行选中事件 ${rowIndex}`);
  // },

  currentRowChange(param1, param2, param3) {
    console.log(param1, param2, param3);
  },
};
// 选中行
const selectRowEvent = () => {
  const $grid = gridRef.value;
  if ($grid && gridOptions.data) {
    $grid.setCurrentRow(gridOptions.data[1]);
  }
};
// 清除 行选中
const clearSelectEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.clearCurrentRow();
  }
};
// 获取选中行数据
const getCurrentEvent = () => {
  const $grid = gridRef.value;
  console.log($grid.getCurrentRecord())
  if ($grid) {
    VxeUI.modal.alert(JSON.stringify($grid.getCurrentRecord()));
  }
};
</script>
