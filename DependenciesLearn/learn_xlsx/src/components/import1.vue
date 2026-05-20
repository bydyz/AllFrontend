<template>
  <div>
    <input type="file" accept=".xlsx,.xls" @change="onFileChange" />
    <button @click="onParseExcel" :disabled="!file">解析Excel</button>
    <pre v-if="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const file = ref(null);
const result = ref('');

const onFileChange = (e) => {
  file.value = e.target.files[0];
};

const onParseExcel = () => {
  if (!file.value) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array', cellNF: true });

    const parsedData = {};
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      parsedData[sheetName] = jsonData;
    });

    result.value = JSON.stringify(parsedData, null, 2);

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      console.log(`Sheet: ${sheetName}`, XLSX.utils.sheet_to_json(sheet));
    });
  };
  reader.readAsArrayBuffer(file.value);
};
</script>

<style scoped>
</style>
