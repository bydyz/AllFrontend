<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function onCreateExcel() {
  // 1. 创建一个工作簿
  const workbook = new ExcelJS.Workbook();
  
  // 2. 添加一个工作表
  const worksheet = workbook.addWorksheet('员工信息');
  
  // 3. 设置列标题
  worksheet.columns = [
    { header: '姓名', key: 'name', width: 15 },
    { header: '年龄', key: 'age', width: 10 },
    { header: '部门', key: 'department', width: 20 }
  ];
  
  // 6. 设置表头样式
  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' } // 黄色背景
    };
    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle'
    }
  });
  worksheet.getRow(1).height = 30;
  
  // 7. 导出Excel文件
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), '员工信息表.xlsx');
}
</script>

<style scoped></style>
