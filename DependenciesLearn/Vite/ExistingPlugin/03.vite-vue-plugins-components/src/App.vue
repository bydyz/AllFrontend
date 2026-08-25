<script setup>
// ========================================
// 组件自动导入示例
// ========================================
// 使用 unplugin-vue-components 自动导入组件
// 无需手动 import 和注册

import { ref } from 'vue'

// Element Plus 组件自动导入，无需手动 import
// 例如: ElButton, ElInput, ElTable 等组件会自动注册

const input = ref('')
const tableData = [
  { name: '张三', age: 28, address: '北京' },
  { name: '李四', age: 32, address: '上海' },
  { name: '王五', age: 25, address: '广州' },
]

const handleClick = () => {
  alert(`输入的内容: ${input.value}`)
}
</script>

<template>
  <div class="components-demo">
    <h1>项目3: 组件自动导入演示</h1>
    <p>插件: unplugin-vue-components/vite + unplugin-vue-components/resolvers + unplugin-element-plus/vite</p>

    <!-- ======================================== -->
    <!-- Element Plus 组件示例 -->
    <!-- ======================================== -->
    <section>
      <h2>Element Plus 组件</h2>
      <p>组件自动导入，无需手动 import</p>

      <!-- 按钮组件 -->
      <div class="demo-block">
        <h3>按钮 (ElButton)</h3>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <el-button type="info">信息按钮</el-button>
      </div>

      <!-- 输入框组件 -->
      <div class="demo-block">
        <h3>输入框 (ElInput)</h3>
        <el-input v-model="input" placeholder="请输入内容" style="width: 300px;" />
        <el-button type="primary" @click="handleClick">获取输入</el-button>
      </div>

      <!-- 表格组件 -->
      <div class="demo-block">
        <h3>表格 (ElTable)</h3>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="age" label="年龄" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>

      <!-- 开关组件 -->
      <div class="demo-block">
        <h3>开关 (ElSwitch)</h3>
        <el-switch v-model="input" active-text="开启" inactive-text="关闭" />
      </div>

      <!-- 日期选择器 -->
      <div class="demo-block">
        <h3>日期选择器 (ElDatePicker)</h3>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          style="width: 300px;"
        />
      </div>
    </section>

    <!-- ======================================== -->
    <!-- 本地组件示例 -->
    <!-- ======================================== -->
    <section>
      <h2>本地组件</h2>
      <p>src/components 目录下的组件也会自动导入</p>

      <!-- 本地组件会自动注册 -->
      <!-- <LocalComponent /> -->
    </section>
  </div>
</template>

<style scoped>
.components-demo {
  padding: 20px;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.demo-block {
  margin: 15px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  color: #409eff;
}
</style>
