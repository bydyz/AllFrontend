<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import * as XLSX from "xlsx";

const onCreateExcel = () => {
  // 创建工作簿和工作表
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([
    { 姓名: "张三", 年龄: 28, 城市: "北京" },
    { 姓名: "李四", 年龄: 32, 城市: "上海" },
  ]);
  console.log('11111111111111111111111111111111111111111111111111111111', ws)

  // 添加样式 (通过单元格对象)
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4472C4" } },
    alignment: { horizontal: "center" },
  };

  // 应用表头样式
  ws["A1"].s = headerStyle;
  ws["B1"].s = headerStyle;
  ws["C1"].s = headerStyle;

  // 设置列宽
  ws["!cols"] = [{ wch: 15 }, { wch: 10 }, { wch: 15 }];

  // 添加边框
  const borderStyle = { style: "thin", color: { rgb: "000000" } };
  for (let cell in ws) {
    console.log('22222222222222222222222222222222222222222222222222222222', cell)
    if (cell !== "!ref") {
      ws[cell].s = ws[cell].s || {};
      ws[cell].s.border = {
        top: borderStyle,
        bottom: borderStyle,
        left: borderStyle,
        right: borderStyle,
      };
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, "员工表");
  XLSX.writeFile(wb, "带样式的员工表.xlsx");
};
</script>

<style scoped></style>
