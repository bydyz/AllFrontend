<template>
  <!-- 示例一 -->
  <h2 class="mt-[0px]">显示序号</h2>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>

  <!-- 示例二 -->
   <h2>使用seqConfig</h2>
   <div>
    <vxe-grid v-bind="gridOptions1"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// 示例一
const gridOptions = reactive({
  border: true,
  height: 300,
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})

// 示例二
const gridOptions1 = reactive({
  border: true,
  height: 300,
  seqConfig: {
    startIndex: 100
  },
  // seqConfig: {
  //   seqMethod ({ rowIndex }) {
  //     return `NO${rowIndex + 1000}`
  //   }
  // },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})

</script>
