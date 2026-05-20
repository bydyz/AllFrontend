<template>
  <!-- 示例一 -->
  <h2 class="mt-[0px]">基本排序</h2>
  <div>
    <vxe-button @click="sortEvent('name', 'asc')">Name 升序</vxe-button>
    <vxe-button @click="sortEvent('name', 'desc')">Name 降序</vxe-button>
    <vxe-button @click="clearSortEvent">清除排序</vxe-button>

    <vxe-grid ref="gridRef" class="mt-[8px]" v-bind="gridOptions"></vxe-grid>
  </div>

  <!-- 示例二 -->
  <h2>sortBy</h2>
  <div>
    <vxe-grid v-bind="gridOptions1"></vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import XEUtils from "xe-utils";

// 示例一
const gridRef = ref();
const gridOptions = reactive({
  border: true,
  height: 300,
  rowConfig: {
    isHover: true,
  },
  columns: [
    { type: "seq", width: 70 },
    { field: "name", title: "Name", sortable: true },
    { field: "role", title: "Role", sortable: true },
    { field: "age", title: "Age", sortable: true },
    { field: "num", title: "字符串", sortable: true, sortType: "string" },
    { field: "num2", title: "数值", sortable: true, sortType: "number" },
    { field: "address", title: "Address", sortable: true },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", sex: "Man", age: 28, num: "3.8", num2: "3.8", address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", sex: "Women", age: 22, num: "511", num2: "511", address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", sex: "Man", age: 32, num: "12.8", num2: "12.8", address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", sex: "Women", age: 23, num: "103", num2: "103", address: "test abc" },
    { id: 10005, name: "Test5", role: "Develop", sex: "Women", age: 30, num: "56", num2: "56", address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", sex: "Women", age: 21, num: "49", num2: "49", address: "test abc" },
    { id: 10007, name: "Test7", role: "Test", sex: "Man", age: 29, num: "400.9", num2: "400.9", address: "test abc" },
    { id: 10008, name: "Test8", role: "Develop", sex: "Man", age: 35, num: "5000", num2: "5000", address: "test abc" },
  ],
});
const sortEvent = (field, order) => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.sort({ field, order });
  }
};
const clearSortEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.clearSort();
  }
};

// 示例二
const gridOptions1 = reactive({
  border: true,
  height: 300,
  rowConfig: {
    isHover: true,
  },
  columns: [
    { type: "seq", width: 70 },
    {
      field: "name",
      title: "Name",
      sortable: true,
      sortBy({ row }) {
        // 按名称长度进行排序
        return row.name.length;
      },
    },
    { field: "num", title: "Num", sortable: true },
    {
      field: "num1",
      title: "字符串",
      sortable: true,
      formatter({ cellValue }) {
        return XEUtils.commafy(Number(cellValue), { digits: 2 });
      },
    },
    {
      field: "num2",
      title: "数值",
      sortable: true,
      sortType: "number",
      formatter({ cellValue }) {
        return XEUtils.commafy(Number(cellValue), { digits: 2 });
      },
    },
    {
      field: "time1",
      title: "日期",
      width: 180,
      sortable: true,
      formatter({ cellValue }) {
        return XEUtils.toDateString(cellValue);
      },
    },
  ],
  data: [
    { name: "小红11", role: "前端", num: 7, num1: 1368.7, num2: "1368.7", time1: 1756892956721 },
    { name: "老王1", role: "后端", num: 6, num1: 89657, num2: "89657", time1: 1757892956721 },
    { name: "小红111111", role: "后端", num: 1, num1: 672, num2: "672", time1: 1766892956721 },
    { name: "小明11", role: "前端", num: 2, num1: 482456, num2: "482456", time1: 1756692956721 },
    { name: "老徐111", role: "测试", num: 3, num1: 7546.7, num2: "7546.7", time1: 1761892956721 },
    { name: "老王11", role: "前端", num: 3, num1: 6897, num2: "6897", time1: 1758292956721 },
    { name: "老徐11111111", role: "测试", num: 4, num1: 8957, num2: "8957", time1: 1769892956721 },
    { name: "小明111111111", role: "前端", num: 4, num1: 56433.57, num2: "56433.57", time1: 1793892956721 },
    { name: "小明1", role: "前端", num: 8, num1: 977, num2: "977", time1: 1778892956721 },
    { name: "小明111", role: "测试", num: 6, num1: 98477, num2: "98477", time1: 1785892956721 },
    { name: "小红11111", role: "后端", num: 9, num1: 67017, num2: "67017", time1: 1759192956721 },
    { name: "老徐11", role: "前端", num: 5, num1: 7364, num2: "7364", time1: 172992956721 },
    { name: "老徐11", role: "测试", num: 1, num1: 1573.7, num2: "1573.7", time1: 1738892956721 },
    { name: "小红1111", role: "前端", num: 4, num1: 16807, num2: "16807", time1: 1722892956721 },
    { name: "小红111", role: "前端", num: 2, num1: 744345.7, num2: "744345.7", time1: 1755492956721 },
    { name: "小明111", role: "测试", num: 3, num1: 10957, num2: "10957", time1: 1718892956721 },
    { name: "老王1", role: "前端", num: 6, num1: 6737, num2: "6737", time1: 1758792956721 },
    { name: "老王1111", role: "后端", num: 4, num1: 83445.1, num2: "83445.1", time1: 1753392956721 },
    { name: "老徐11", role: "前端", num: 8, num1: 4636677, num2: "4636677", time1: 1799892956721 },
    { name: "小明111111", role: "测试", num: 7, num1: 5783537, num2: "5783537", time1: 1721892956721 },
  ],
});
</script>
