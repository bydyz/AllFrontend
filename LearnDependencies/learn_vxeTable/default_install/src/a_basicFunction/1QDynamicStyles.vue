<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  border: true,
  headerCellStyle ({ column }) {
    if (column.field === 'name') {
      return {
        backgroundColor: 'rgb(215 172 144)',
        color: '#ffffff'
      }
    }
  },
  rowStyle ({ rowIndex }) {
    if ([2, 3, 5].includes(rowIndex)) {
      return {
        backgroundColor: '#cb8787',
        color: '#ffffff'
      }
    }
  },
  cellStyle ({ row, column }) {
    if (column.field === 'sex') {
      if (row.sex >= '1') {
        return {
          backgroundColor: 'rgb(116 184 175)'
        }
      } else if (row.age === 26) {
        return {
          backgroundColor: '#2db7f5'
        }
      }
    }
  },
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
