<template>
  <!-- 示例一 -->
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>

  <!-- 示例二 -->
  <div class="mt-[30px]">
    <vxe-grid v-bind="gridOptions1"></vxe-grid>
  </div>

  <!-- 示例三 -->
  <div class="mt-[30px]">
    <vxe-grid v-bind="gridOptions2"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// 示例一
const gridOptions = reactive({
  rowConfig: {
    useKey: true
  },
  columnConfig: {
    useKey: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'content', title: 'Html', type: 'html', showOverflow: true },
    { field: 'role', title: 'Role', showOverflow: true }
  ],
  data: [
    { name: 'Test2', age: 28, sex: '男', role: '后端', content: '<img height="40" src="https://vxeui.com/resource/img/546.gif">' },
    { name: 'Test4', age: 26, sex: '男', role: '前端', content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' },
    { name: 'Test3', age: 20, sex: '女', role: '程序员鼓励师', content: '<img height="40" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">' },
    { name: 'Test1', age: 22, sex: '女', role: '设计师', content: '<div><span style="color: red">我是 Htmp 片段</span></div>' }
  ]
})

// 示例二
const gridOptions1 = reactive({
  rowConfig: {
    useKey: true
  },
  columnConfig: {
    useKey: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'userInfo.name', title: 'Name' },
    { field: 'other[0].sex', title: 'Sex' },
    { field: 'userInfo.age', title: 'Age' },
    { field: 'other[1].more.content', title: 'Html', type: 'html', showOverflow: true },
    { field: 'role', title: 'Role', showOverflow: true }
  ],
  data: [
    {
      userInfo: { name: 'Test1', age: 22 },
      other: [
        { sex: '女' },
        { more: { content: '<div><span style="color: red">我是 Htmp 片段</span></div>' } }
      ],
      role: '设计师'
    },
    {
      userInfo: { name: 'Test2', age: 28 },
      other: [
        { sex: '男' },
        { more: { content: '<img height="40" src="https://vxeui.com/resource/img/546.gif">' } }
      ],
      role: '后端'
    },
    {
      userInfo: { name: 'Test3', age: 20 },
      other: [
        { sex: '女' },
        { more: { content: '<img height="40" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">' } }
      ],
      role: '程序员鼓励师'
    },
    {
      userInfo: { name: 'Test4', age: 26 },
      other: [
        { sex: '男' },
        { more: { content: '<a href="https://github.com/x-extends/vxe-table">我是链接</a>' } }
      ],
      role: '前端'
    }
  ]
})

// 示例三
const gridOptions2 = reactive({
  rowConfig: {
    useKey: true,
    keyField: '0'
  },
  columnConfig: {
    useKey: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: '1', title: 'Name' },
    { field: '2', title: 'Sex' },
    { field: '3', title: 'Age' },
    { field: '4', title: 'Html', type: 'html', showOverflow: true },
    { field: '5', title: 'Role', showOverflow: true }
  ],
  data: [
    [101, 'Test4', '男', 26, '<a href="https://github.com/x-extends/vxe-table">我是链接</a>', '前端'],
    [102, 'Test2', '男', 28, '<img height="40" src="https://vxeui.com/resource/img/546.gif">', '后端'],
    [103, 'Test1', '女', 22, '<div><span style="color: red">我是 Html 片段</span></div>', '设计师'],
    [104, 'Test3', '女', 20, '<img height="40" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif">', '程序员鼓励师']
  ]
})
</script>
