<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function onCreateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("多层表头示例");

  worksheet.properties.defaultAlignment = {
    horizontal: 'center',
    vertical: 'middle'
  };

  worksheet.addRow(["省份", "一月", "二月", "三月", "合计"]);

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "多层表头示例.xlsx");
}
</script>

<style scoped></style>
