<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function onCreateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("多层表头示例");

  worksheet.addRow(["省份", "一月", "二月", "三月", "合计"]);

  for (let i = 1; i <= 2; i++) {
    const row = worksheet.getRow(i);
    row.eachCell(cell => {
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    });
    row.height = 25; // 可选：统一设置行高
  }

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "多层表头示例.xlsx");
}
</script>

<style scoped></style>
