<template>
  <div>
    <vxe-button status="primary" @click="insertEvent">新增</vxe-button>
    <vxe-button status="primary" @click="onSeeData">查看</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="error" @click="removeRow(row)">删除</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { VxeUI } from "vxe-pc-ui";
const gridRef = ref();
const meanObj = reactive({
  seq: "平均",
  name: "-",
  age: "",
  rate: "",
  num: "",
});
const sumNObj = reactive({
  seq: "和值",
  name: "-",
  age: "",
  rate: "",
  num: "",
});
const meanNum = (list, field) => {
  let count = 0;
  list.forEach(item => {
    count += Number(item[field]);
  });
  return (count / list.length).toFixed(2);
};
const sumNum = (list, field) => {
  let count = 0;
  list.forEach(item => {
    count += Number(item[field]);
  });
  return count.toFixed(2);
};
// 在值发生改变时更新表尾合计
const updateFootEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    const fullData = $grid.getFullData();
    updateFootCount(fullData);
  }
};
const ageEditRender = reactive({
  name: "VxeNumberInput",
  props: {
    type: "integer",
    min: 1,
    max: 120,
  },
  events: {
    change: updateFootEvent,
  },
});
const numEditRender = reactive({
  name: "VxeNumberInput",
  events: {
    change: updateFootEvent,
  },
});
const rateEditRender = reactive({
  name: "VxeNumberInput",
  events: {
    change: updateFootEvent,
  },
});
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  showFooter: true,
  height: 400,
  editConfig: {
    trigger: "click",
    mode: "row",
  },
  columns: [
    { field: "seq", type: "seq", width: 60 },
    {
      title: "统计信息",
      children: [
        { field: "name", title: "Name", editRender: { name: "VxeInput" } },
        { field: "age", title: "Age", editRender: ageEditRender },
        { field: "num", title: "Num", editRender: numEditRender },
        { field: "rate", title: "Rate", editRender: rateEditRender },
      ],
    },
    { title: "操作", width: 100, slots: { default: "action" } },
  ],
  data: [
    { id: 10001, name: "Test1", role: "Develop", age: 10, num: 28, rate: 5, address: "test abc" },
    { id: 10002, name: "Test2", role: "Test", age: 34, num: 22, rate: 4, address: "Guangzhou" },
    { id: 10003, name: "Test3", role: "PM", age: 56, num: 32, rate: 3, address: "Shanghai" },
    { id: 10004, name: "Test4", role: "Designer", age: 45, num: 24, rate: 1, address: "Shanghai" },
    { id: 10005, name: "Test5", role: "PM", age: 56, num: 32, rate: 4, address: "Shanghai" },
    { id: 10006, name: "Test6", role: "Designer", age: 45, num: 24, rate: 1, address: "Shanghai" },
  ],
  footerData: [meanObj, sumNObj],
});
const insertEvent = async () => {
  const record = {
    name: "New name",
  };
  const $grid = gridRef.value;
  if ($grid) {
    const { row: newRow } = await $grid.insert(record);
    $grid.setEditCell(newRow, "age");
  }
};
const onSeeData = async () => {
  const $grid = gridRef.value;
  const tableData = $grid.getTableData();
  console.log("11111111111111111111111111111111111111111111111111111111", tableData);
};
const removeRow = async row => {
  const $grid = gridRef.value;
  if ($grid) {
    const type = await VxeUI.modal.confirm("您确定要删除该数据?");
    if (type === "confirm") {
      await $grid.remove(row);
      updateFootEvent();
    }
  }
};
const updateFootCount = (list = []) => {
  meanObj.age = meanNum(list, "age");
  meanObj.num = meanNum(list, "num");
  meanObj.rate = meanNum(list, "rate");
  sumNObj.age = sumNum(list, "age");
  sumNObj.num = sumNum(list, "num");
  sumNObj.rate = sumNum(list, "rate");
};
updateFootCount(gridOptions.data);
</script>
