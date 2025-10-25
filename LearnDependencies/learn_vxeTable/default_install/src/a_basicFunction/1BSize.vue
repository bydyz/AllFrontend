<template>
  <h2 class="mt-[0px]">通过 size属性 设置尺寸</h2>
  <div>
    <el-select v-model="gridOptions.size" placeholder="Select" style="width: 240px; margin-bottom: 16px;">
      <el-option label="medium" value="medium" />
      <el-option label="small " value="small " />
      <el-option label="mini" value="mini" />
    </el-select>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const gridOptions = reactive({
  border: true,
  size: "mini", // 设置 尺寸
  columns: [
    { type: "seq", width: 70 },
    { type: "radio", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "name", title: "Name" },
    { field: "age", title: "Age", sortable: true },
    {
      field: "sex",
      title: "Sex",
      filters: [
        { value: "0", label: "女" },
        { value: "1", label: "男" },
      ],
    },
    {
      field: "sex2",
      title: "Sex2",
      sortable: true,
      filterMultiple: false,
      filters: [
        { value: "0", label: "女" },
        { value: "1", label: "男" },
      ],
    },
    { field: "address", title: "Address", showOverflow: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
  ],
});
</script>
