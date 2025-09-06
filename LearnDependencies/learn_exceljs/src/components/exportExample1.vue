<template>
  <button @click="onCreateExcel">点击生成excel</button>
</template>

<script setup>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

let input = [
  {
    name: "输入变量1",
    dataType: 0,
    unit: "Double",
  },
  {
    name: "输入变量2",
    dataType: 0,
    unit: "Boolean",
  },
  {
    name: "输入变量3",
    dataType: 0,
    unit: "Boolean",
  },
  {
    name: "输入变量4",
    dataType: 0,
    unit: "Boolean",
  },
  {
    name: "输入参数1",
    dataType: 1,
    unit: "String",
  },
  {
    name: "输入参数2",
    dataType: 1,
    unit: "Int",
  },
  {
    name: "输入参数3",
    dataType: 1,
    unit: "Int",
  },
];
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let finalLetters = JSON.parse(JSON.stringify(uppercaseLetters));
uppercaseLetters.forEach(a => {
  uppercaseLetters.forEach(b => {
    let newLetter = a + b;
    finalLetters.push(newLetter);
  });
});

let variableArray = input.filter(a => a.dataType === 0);
let paramArray = input.filter(a => a.dataType === 1);

const getFirstRow = () => {
  let b = [];
  variableArray.forEach((item, index) => {
    if (index === 0) {
      b.push("输入变量");
    } else {
      b.push("");
    }
  });
  let c = [];
  paramArray.forEach((item, index) => {
    if (index === 0) {
      b.push("输入参数");
    } else {
      b.push("");
    }
  });

  return ["时间"].concat(b).concat(c).concat(["用例判断逻辑"]);
};

const getSecondRow = () => {
  let a = [""];
  variableArray.forEach(item => a.push(item.name));
  paramArray.forEach(item => a.push(item.name));
  a.push("");

  return a;
};

async function onCreateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  let secondRowArray = getSecondRow();
  worksheet.addRow(getFirstRow());
  worksheet.addRow(secondRowArray);

  let firstIndex = 1 + variableArray.length;
  worksheet.mergeCells("A1:A2");
  worksheet.mergeCells(`B1:${finalLetters[firstIndex - 1]}1`);
  worksheet.mergeCells(`${finalLetters[firstIndex]}1:${finalLetters[firstIndex + paramArray.length - 1]}1`);
  worksheet.mergeCells(`${finalLetters[firstIndex + paramArray.length]}1:${finalLetters[firstIndex + paramArray.length]}2`);

  secondRowArray.forEach((item, index) => {
    if (index === 0) {
      worksheet.getColumn(1).width = 5 * 3;
    }
    worksheet.getColumn(index + 1).width = (item.length + 3) * 3;
    if (index === secondRowArray.length - 1) {
      worksheet.getColumn(index + 1).width = 9 * 3;
    }
  });
  worksheet.getRow(1).height = 40;
  worksheet.getRow(2).height = 40;

  const centerStyle = {
    alignment: {
      horizontal: "center",
      vertical: "middle",
    },
  };
  for (let i = 1; i <= 2; i++) {
    worksheet.getRow(i).style = centerStyle;
  }

  // 7. 导出Excel文件
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "用例导入模板.xlsx");
}
</script>

<style scoped></style>
