<template>
  <!-- 示例一 -->
  <h2 class="mt-[0px]">最基础的表格</h2>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>

  <!-- 示例二 -->
  <h2>通过控制响应式columns, 隐藏展示列</h2>
  <div>
    <div class="flex">
      <div class="mr-[16px]">显示name<vxe-switch v-model="showName"></vxe-switch>{{ showName }}</div>
      <div>显示address<vxe-switch v-model="showAddress"></vxe-switch>{{ showAddress }}</div>
    </div>

    <vxe-grid :columns="tableColumn" :data="tableData"></vxe-grid>
  </div>

  <!-- 示例三 -->
  <h2>通过控制响应式gridOptions中的columns, 隐藏展示列</h2>
  <div>
    <div>显示age<vxe-switch v-model="showAge"></vxe-switch>{{ showAge }}</div>

    <vxe-grid v-bind="gridOptions1"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";

// 示例一
const gridOptions = reactive({
  columns: [
    { type: "seq", width: 70 },
    { field: "name", title: "Name" },
    { field: "sex", title: "Sex" },
    { field: "age", title: "Age" },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 24, address: "Shanghai" },
  ],
});

// 示例二
const showName = ref(true);
const showAddress = ref(true);
const tableColumn = computed(() => {
  const defCols = [
    { type: "seq", width: 70 },
    { field: "sex", title: "Sex" },
    { field: "age", title: "Age" },
  ];
  if (showName.value) {
    defCols.splice(1, 0, { field: "name", title: "Name" });
  }
  if (showAddress.value) {
    defCols.push({ field: "address", title: "Address" });
  }
  return defCols;
});
const tableData = ref([
  { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
  { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
  { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
  { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 24, address: "Shanghai" },
]);

// 示例三
const showAge = ref(true);
const gridOptions1 = reactive(JSON.parse(JSON.stringify(gridOptions)));
watch(
  () => showAge.value,
  (newValue, oldValue) => {
    console.log("监听的回调函数执行了");
    console.log(newValue, oldValue);
    gridOptions1.columns = gridOptions1.columns.filter(a => !a.field || a.field !== "age");
  }
);
</script>
