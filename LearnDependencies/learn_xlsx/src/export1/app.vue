<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import * as XLSX from 'xlsx';

const onCreateExcel = () => {
  // 准备数据
  const data = [
    ["姓名", "年龄", "城市"]
  ];

  // 创建工作簿
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // 导出文件
  XLSX.writeFile(wb, "员工信息.xlsx");
}
</script>

<style scoped>
</style>
