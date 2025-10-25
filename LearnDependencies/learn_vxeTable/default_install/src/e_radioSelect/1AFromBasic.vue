<template>
  <!-- 示例一 -->
  <h2>选中、取消、获取</h2>
  <div>
    <p class="mb-[8px]">
      <vxe-button @click="setSelectRow(1)">设置第二行选中</vxe-button>
      <vxe-button @click="clearRadioRowEvent">取消选中</vxe-button>
      <vxe-button @click="getRadioEvent">获取选中</vxe-button>
    </p>

    <vxe-grid ref="gridRef" v-bind="gridOptions" @cell-click="cellClickEvent" @radio-change="radioChangeEvent">
      <template #radioHeader>
        <vxe-button mode="text" @click="clearRadioRowEvent" :disabled="!selectRow">取消</vxe-button>
      </template>
    </vxe-grid>
  </div>

  <!-- 示例二 -->
  <h2>默认选中, 此默认行为只会在 reload 之后触发一次</h2>
  <div>
    <vxe-grid v-bind="gridOptions1"></vxe-grid>
  </div>

  <!-- 示例三 -->
  <h2>严格模式，单选的默认行为是不允许取消的，可以通过设置 radio-config.strict=false 允许取消</h2>
  <div>
    <vxe-grid v-bind="gridOptions2" @radio-change="radioChangeEvent2"> </vxe-grid>
  </div>

  <!-- 示例四 -->
  <h2>混合使用</h2>
  <div>
    <vxe-grid v-bind="gridOptions3"></vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
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
    { type: "radio", width: 60, slots: { header: "radioHeader" } },
    { field: "sex", title: "Sex" },
    { field: "age", title: "Age" },
    { field: "address", title: "Address", showOverflow: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, address: "test abc" },
    { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, address: "test abc" },
    { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, address: "test abc" },
    { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, address: "test abc" },
  ],
});
// 点击 单元格 中，非单选框部分，甚至是内容部分  均会触发
const cellClickEvent = () => {
  console.log("单元格点击事件");
};
// 点击 单选框 触发，不会触发上面的 单元格点击事件
const radioChangeEvent = ({ row }) => {
  selectRow.value = row;
  console.log("单选事件");
};
const setSelectRow = index => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.setRadioRow(gridOptions.data[index]);
  }
};
const clearRadioRowEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    selectRow.value = null;
    $grid.clearRadioRow();
  }
};
const getRadioEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    const currRow = $grid.getRadioRecord();
    VxeUI.modal.alert(JSON.stringify(currRow));
  }
};

// 示例二
const gridOptions1 = reactive({
  border: true,
  height: 300,
  rowConfig: {
    keyField: "id",
  },
  radioConfig: {
    checkRowKey: 10002,
  },
  columns: [
    { type: "radio", width: 60 },
    { field: "id", title: "ID" },
    { field: "name", title: "Name" },
    { field: "sex", title: "Sex" },
    { field: "address", title: "Address", showOverflow: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, address: "test abc" },
    { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, address: "test abc" },
    { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, address: "test abc" },
    { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, address: "test abc" },
  ],
});

// 示例三
const gridOptions2 = reactive({
  border: true,
  height: 300,
  radioConfig: {
    strict: false,
  },
  columns: [
    { type: "radio", width: 60 },
    { field: "id", title: "ID" },
    { field: "name", title: "Name" },
    { field: "sex", title: "Sex" },
    { field: "address", title: "Address", showOverflow: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, address: "test abc" },
    { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, address: "test abc" },
    { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, address: "test abc" },
    { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, address: "test abc" },
  ],
});
const radioChangeEvent2 = ({ newValue, oldValue }) => {
  console.log(newValue, oldValue);
};

// 示例四
const gridOptions3 = reactive({
  border: true,
  height: 300,
  rowConfig: {
    isCurrent: true,
  },
  radioConfig: {
    labelField: "name",   // 此设置 可以将 对应的内容  设置到 单选框后
  },
  columns: [
    { type: "radio", title: "还可以这样", width: 120 },
    { field: "name", title: "Name" },
    { field: "sex", title: "Sex" },
    { field: "age", title: "Age" },
    { field: "address", title: "Address", showOverflow: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, address: "test abc" },
    { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, address: "test abc" },
    { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, address: "test abc" },
    { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, address: "test abc" },
  ],
});
</script>
