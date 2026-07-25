<template>
  <!-- 示例一 -->
  <h2 class="mt-[0px]">不设置宽度, 默认平分</h2>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>

  <!-- 示例二 -->
  <h2>通过 setColumnWidth 设置宽度</h2>
  <div>
    <vxe-button @click="changeNameWidth(300)">修改name=300宽度</vxe-button>
    <vxe-button @click="changeNameWidth(400)">修改name=400宽度</vxe-button>
    <vxe-grid ref="gridRef" class="mt-[8px]" v-bind="gridOptions1"></vxe-grid>
  </div>

  <!-- 示例三 -->
  <h2>设置固定和最小宽，实现等比例放大</h2>
  <div>
    <vxe-grid v-bind="gridOptions2"></vxe-grid>
  </div>

  <!-- 示例四 -->
  <h2>设置百分比</h2>
  <div>
    <vxe-grid v-bind="gridOptions3"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 示例一
const gridOptions = reactive({
  border: true,
  columns: [{ type: "seq" }, { field: "name", title: "Name" }, { field: "role", title: "Role" }, { field: "sex", title: "Sex" }, { field: "date", title: "Date" }],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  ],
});

// 示例二
const gridRef = ref();
const gridOptions1 = reactive({
  border: true,
  columns: [{ type: "seq" }, { field: "name", title: "Name", width: 200 }, { field: "role", title: "Role" }, { field: "sex", title: "Sex", width: 140 }, { field: "date", title: "Date" }],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  ],
});
const changeNameWidth = width => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.setColumnWidth("name", width);
  }

  // 如此设置，不会 发生改变
  // gridOptions1.columns[1].width = 400

  // 方法一： 不会改动
  // 方法二： 会改动，但不会影响界面
  console.log(gridOptions1.columns[1].width);
};

// 示例三
const gridOptions2 = reactive({
  border: true,
  columns: [
    { type: "seq", width: 80 },
    { field: "name", title: "Name", minWidth: 200 },
    { field: "role", title: "Role", minWidth: 140 },
    { field: "sex", title: "Sex", minWidth: 120 },
    { field: "date", title: "Date", minWidth: 120 },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  ],
});

// 示例四
const gridOptions3 = reactive({
  border: true,
  columns: [
    { type: "seq", width: "10%" },
    { field: "name", title: "Name", width: "30%" },
    { field: "role", title: "Role", width: "20%" },
    { field: "sex", title: "Sex", width: "20%" },
    { field: "date", title: "Date", width: "20%" },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  ],
});
</script>
