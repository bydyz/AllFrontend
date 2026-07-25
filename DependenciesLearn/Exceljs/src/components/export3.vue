<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function onCreateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("多层表头示例");

  // 1. 定义主表头（第一行）
  worksheet.addRow(["销售报表", "", "", "", ""]); // 合并单元格需要占位

  // 2. 定义二级表头（第二行）
  worksheet.addRow(["地区", "第一季度", "", "", "年度汇总"]);

  // 3. 定义三级表头（第三行）
  worksheet.addRow(["省份", "一月", "二月", "三月", "合计"]);

  // 4. 合并单元格创建多层表头效果
  worksheet.mergeCells("A1:E1"); // 合并第一行作为主标题
  worksheet.mergeCells("B2:D2"); // 合并"第一季度"单元格
  worksheet.mergeCells("E2:E3"); // 合并"年度汇总"垂直方向

  // 5. 设置表头样式
  // 主标题样式
  worksheet.getCell("A1").style = {
    font: { bold: true, size: 16, color: { argb: "FF0000" } },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    },
  };

  // 二级表头样式
  ["A2:E2"].forEach(cell => {
    worksheet.getCell(cell).style = {
      font: { bold: true, size: 12 },
      alignment: { horizontal: "center" },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" },
      },
    };
  });

  // 三级表头样式
  ["A3:E3"].forEach(cell => {
    worksheet.getCell(cell).style = {
      font: { bold: true },
      alignment: { horizontal: "center" },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
      },
    };
  });

  // 6. 设置列宽
  worksheet.columns = [
    { header: "省份", key: "province", width: 15 },
    { header: "一月", key: "jan", width: 10 },
    { header: "二月", key: "feb", width: 10 },
    { header: "三月", key: "mar", width: 10 },
    { header: "合计", key: "total", width: 12 },
  ];

  // 7. 导出Excel文件
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "多层表头示例.xlsx");
}
</script>

<style scoped></style>
