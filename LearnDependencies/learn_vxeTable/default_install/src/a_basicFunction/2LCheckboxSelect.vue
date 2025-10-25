<template>
  <!-- 示例一 -->
  <h2 class="mt-[0px]">选中、取消、获取</h2>
  <div>
    <p class="mb-[8px]">
      <vxe-button @click="toggleSelectRow(gridOptions.data[1])">切换第二行选中</vxe-button>
      <vxe-button @click="setSelectRow([gridOptions.data[2], gridOptions.data[3]], true)">设置第三、四行选中</vxe-button>
      <vxe-button @click="selectAllEvent">设置所有行选中</vxe-button>
      <vxe-button @click="clearSelectEvent">清除所有行选中</vxe-button>
      <vxe-button @click="getSelectEvent">获取选中</vxe-button>
    </p>

    <vxe-grid
      ref="gridRef"
      v-bind="gridOptions"
      @checkbox-all="selectAllChangeEvent"
      @checkbox-change="selectChangeEvent">
    </vxe-grid>
  </div>

  <!-- 示例二 -->
  <h2>默认选中, 此默认行为只会在 reload 之后触发一次</h2>
  <div>
    <vxe-grid v-bind="gridOptions1"></vxe-grid>
  </div>

  <!-- 示例三 -->
  <h2>通过 checkStrictly 设置父子节点不互相关联，启用后 showHeader 默认为 false</h2>
  <div>
    <p class="mb-[8px]">
      <vxe-button @click="setSelectRow2(gridOptions.data, true)">设置所有行选中</vxe-button>
      <vxe-button @click="clearSelectEvent2">清除所有行选中</vxe-button>
    </p>

    <vxe-grid ref="gridRef2" v-bind="gridOptions2"></vxe-grid>
  </div>

  <!-- 示例四 -->
  <h2>多选可单选同时使用</h2>
  <div>
    <vxe-grid v-bind="gridOptions3"></vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { VxeUI } from 'vxe-table'

// 示例一
const gridRef = ref()
const gridOptions = reactive({
  border: true,
  height: 300,
  rowConfig: {
    isCurrent: true,
    isHover: true
  },
  radioConfig: {
    labelField: 'name',
    trigger: 'row'
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
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
const selectAllChangeEvent = ({ checked }) => {
  const $grid = gridRef.value
  if ($grid) {
    const records = $grid.getCheckboxRecords()
    console.log(checked ? '所有勾选事件' : '所有取消事件', records)
  }
}
const selectChangeEvent = ({ checked }) => {
  const $grid = gridRef.value
  if ($grid) {
    const records = $grid.getCheckboxRecords()
    console.log(checked ? '勾选事件' : '取消事件', records)
  }
}
// 切换第二行选中、取消
const toggleSelectRow = (row) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.toggleCheckboxRow(row)
  }
}
// rows 是 数组，此为设置多行选中，无取消功能
const setSelectRow = (rows, checked) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setCheckboxRow(rows, checked)
  }
}
// 设置所有行选中
const selectAllEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setAllCheckboxRow(true)
  }
}
const clearSelectEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.clearCheckboxRow()
  }
}
const getSelectEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    VxeUI.modal.alert(`${selectRecords.length}条数据`)
  }
}

// 示例二
const gridOptions1 = reactive({
  border: true,
  rowConfig: {
    keyField: 'id',
    isHover: true
  },
  checkboxConfig: {
    checkRowKeys: [10002, 10003]
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'id', title: 'ID' },
    { type: 'radio', title: 'Name', width: 300 },
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

// 示例三
const gridRef2 = ref()
const gridOptions2 = reactive({
  border: true,
  rowConfig: {
    isHover: true
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
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
const setSelectRow2 = (rows = [], checked) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setCheckboxRow(rows, checked)
  }
}
const clearSelectEvent2 = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.clearCheckboxRow()
  }
}

// 示例四
const gridOptions3 = reactive({
  border: true,
  rowConfig: {
    isHover: true
  },
  checkboxConfig: {
    labelField: 'name'
  },
  columns: [
    { type: 'checkbox', title: 'Name', width: 300 },
    { type: 'radio', width: 60 },
    { field: 'sex', title: 'Sex' },
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
</script>
