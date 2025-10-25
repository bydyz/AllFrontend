<template>
  <div>
    <vxe-grid v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  border: true,
  height: 300,
  rowConfig: {
    isHover: true
  },
  radioConfig: {
    labelField: 'name',   // 此设置 可以将 对应的内容  设置到 单选框后
    highlight: true
  },
  columns: [
    { type: 'radio', title: 'Name', width: 300 },
    { field: 'id', title: 'ID' },
    { field: 'age', title: 'Age' },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
  ]
})
const gridEvents = {
  radioChange ({ row }) {
    console.log('radio-change', row)
  }
}

</script>
