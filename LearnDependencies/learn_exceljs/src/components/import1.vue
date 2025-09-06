<template>
  <div class="excel-uploader">
    <h2>Excel 文件导入解析</h2>
    
    <!-- 文件上传 input -->
    <input
      type="file"
      id="excelFile"
      accept=".xlsx, .xls"
      @change="handleFileUpload"
      ref="fileInput"
    />
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">解析中，请稍候...</div>
    
    <!-- 解析结果展示 -->
    <div v-if="sheets.length > 0" class="results">
      <h3>解析结果</h3>
      
      <!-- 工作表选择 -->
      <div class="sheet-selector">
        <label for="sheet-select">选择工作表：</label>
        <select id="sheet-select" v-model="currentSheetIndex">
          <option
            v-for="(sheet, index) in sheets"
            :key="index"
            :value="index"
          >
            {{ sheet.name }} ({{ sheet.data.length }} 行)
          </option>
        </select>
      </div>
      
      <!-- 数据表格 -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th v-for="(header, colIndex) in currentSheet.headers" :key="colIndex">
                {{ header || `列${colIndex + 1}` }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in currentSheet.data" :key="rowIndex">
              <td v-for="(cell, colIndex) in row" :key="colIndex">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ExcelJS from 'exceljs';

export default {
  name: 'ExcelUploader',
  data() {
    return {
      loading: false,
      sheets: [], // 所有工作表数据
      currentSheetIndex: 0, // 当前选中的工作表索引
    };
  },
  computed: {
    // 当前选中的工作表数据
    currentSheet() {
      return this.sheets[this.currentSheetIndex] || { headers: [], data: [] };
    },
  },
  methods: {
    // 处理文件上传
    async handleFileUpload(event) {
      console.log('00000000000000000000000000000000000000000000000000000000', )
      const file = event.target.files[0];
      if (!file) return;

      this.loading = true;
      this.sheets = []; // 清空之前的数据

      try {
        // 读取文件为 ArrayBuffer
        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        
        // 使用 ExcelJS 解析
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        
        // 处理每个工作表
        workbook.eachSheet((worksheet, sheetId) => {
          const sheetData = {
            id: sheetId,
            name: worksheet.name,
            headers: [],
            data: [],
          };
          
          // 获取表头（假设第一行是表头）
          const headerRow = worksheet.getRow(1);
          if (headerRow && headerRow.values) {
            sheetData.headers = headerRow.values.slice(1); // 去掉第一个空值
          }
          
          // 获取数据行
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 2) { // 跳过表头行
              sheetData.data.push(row.values.slice(1)); // 去掉第一个空值
            }
          });
          
          this.sheets.push(sheetData);
        });
        
        // 默认选择第一个工作表
        this.currentSheetIndex = 0;
      } catch (error) {
        console.error('解析Excel文件失败:', error);
        alert('解析Excel文件失败，请检查文件格式');
      } finally {
        this.loading = false;
        // 清空input值，允许重复选择同一文件
        this.$refs.fileInput.value = '';
      }
    },
    
    // 将文件读取为 ArrayBuffer
    readFileAsArrayBuffer(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
  },
};
</script>

<style scoped>
.excel-uploader {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

input[type="file"] {
  display: block;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading {
  margin: 20px 0;
  color: #666;
  font-style: italic;
}

.results {
  margin-top: 30px;
}

.sheet-selector {
  margin-bottom: 15px;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>