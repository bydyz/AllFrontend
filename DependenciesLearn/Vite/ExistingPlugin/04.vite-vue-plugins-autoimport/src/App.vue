<script setup>
// ========================================
// 自动导入示例
// ========================================
// 使用 unplugin-auto-import 自动导入 API
// 无需手动 import { ref, computed, watch } from 'vue'

// ========================================
// Vue 3 API 自动导入
// ========================================
// 以下 API 无需手动 import，直接使用即可
const count = ref(0)                    // ref 自动导入
const doubled = computed(() => count.value * 2) // computed 自动导入
const message = ref('Hello Auto Import!')

// watch 自动导入
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})

// watchEffect 自动导入
watchEffect(() => {
  console.log(`当前 count: ${count.value}`)
})

// ========================================
// Vue Router API 自动导入
// ========================================
const route = useRoute()      // useRoute 自动导入
const router = useRouter()    // useRouter 自动导入

// ========================================
// Pinia API 自动导入
// ========================================
// const store = useStore()  // 如果有 store 的话

// ========================================
// 自定义函数自动导入
// ========================================
// 如果在 src/composables 目录下定义了 composable 函数
// 也会被自动导入
// import { useCounter } from '../composables/useCounter'  // 无需手动导入
// const { count, increment } = useCounter()

const increment = () => count.value++
const decrement = () => count.value--
</script>

<template>
  <div class="autoimport-demo">
    <h1>项目4: 自动导入插件演示</h1>
    <p>插件: unplugin-auto-import/vite + vite-plugin-style-import</p>

    <!-- ======================================== -->
    <!-- Vue 3 API 自动导入示例 -->
    <!-- ======================================== -->
    <section>
      <h2>Vue 3 API 自动导入</h2>
      <p>无需手动 import，直接使用 ref, computed, watch 等</p>

      <div class="demo-block">
        <h3>响应式数据</h3>
        <p>count: {{ count }}</p>
        <p>doubled (computed): {{ doubled }}</p>
        <p>message: {{ message }}</p>

        <div class="button-group">
          <el-button type="primary" @click="increment">+1</el-button>
          <el-button type="danger" @click="decrement">-1</el-button>
          <el-button @click="count = 0">重置</el-button>
        </div>
      </div>
    </section>

    <!-- ======================================== -->
    <!-- Vue Router 自动导入示例 -->
    <!-- ======================================== -->
    <section>
      <h2>Vue Router 自动导入</h2>
      <p>useRoute, useRouter 无需手动 import</p>

      <div class="demo-block">
        <p>当前路由: {{ route.path }}</p>
        <p>路由参数: {{ route.params }}</p>
        <p>查询参数: {{ route.query }}</p>

        <el-button type="primary" @click="router.push('/')">
          跳转到首页
        </el-button>
        <el-button @click="router.back()">
          返回上一页
        </el-button>
      </div>
    </section>

    <!-- ======================================== -->
    <!-- vite-plugin-style-import 示例 -->
    <!-- ======================================== -->
    <section>
      <h2>样式按需导入</h2>
      <p>vite-plugin-style-import 自动导入组件样式</p>

      <div class="demo-block">
        <p>Element Plus 组件样式已自动导入:</p>

        <el-input v-model="message" placeholder="输入内容" style="width: 300px; margin: 10px;" />

        <div>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            style="width: 300px;"
          />
        </div>

        <div style="margin-top: 10px;">
          <el-select placeholder="请选择" style="width: 300px;">
            <el-option label="选项1" value="1" />
            <el-option label="选项2" value="2" />
            <el-option label="选项3" value="3" />
          </el-select>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.autoimport-demo {
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

.button-group {
  margin-top: 10px;
}
</style>
