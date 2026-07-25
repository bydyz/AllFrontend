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
    { header: '部门', key: 'department', width: 20 },
    { header: '入职日期', key: 'hireDate', width: 15 }
  ];
  
  // 4. 添加数据行
  worksheet.addRow({ name: '张三', age: 28, department: '技术部', hireDate: new Date('2020-05-15') });
  worksheet.addRow({ name: '李四', age: 32, department: '市场部', hireDate: new Date('2018-11-03') });
  worksheet.addRow({ name: '王五', age: 25, department: '人事部', hireDate: new Date('2021-02-20') });
  
  // 5. 设置日期格式
  worksheet.getColumn('hireDate').numFmt = 'yyyy-mm-dd';
  
  // 6. 设置表头样式
  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' } // 浅灰色背景
    };
  });
  
  // 7. 导出Excel文件
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), '员工信息表.xlsx');
}
</script>

<style scoped></style>
