<script setup>
import { ref, computed, defineAsyncComponent } from "vue";

// ✨ 定义一个辅助函数，避免重复写 defineAsyncComponent
function lazyLoad(loader) {
  return defineAsyncComponent({
    loader,
    // 可选：加载中组件
    loadingComponent: { template: "<div>加载中...</div>" },
    // 可选：错误组件
    errorComponent: { template: "<div>加载失败</div>" },
    // 延迟显示 loading（毫秒）
    delay: 200,
    // 超时时间（毫秒）
    timeout: 5000,
  });
}

// 🚀 组件配置：只存加载函数，不实际加载
const componentsConfig = [
  { name: "拖曳", value: "JustCSSAndJs", loader: () => import("./1DropChangeDivSize/index.vue") },
  { name: "滚动", value: "RealizeScroll", loader: () => import("./2ScrollRealize/index.vue") },
  { name: "input集合", value: "InputGather", loader: () => import("./3InputGather/index.vue") },
  { name: "自定义虚拟滚动", value: "CustomizedVirtualScrolling", loader: () => import("./4CustomizedVirtualScrolling/index.vue") },
  { name: "自定义日历", value: "CustomCalender", loader: () => import("./ACustomCalendar/index.vue") },
  { name: "双色球摇号机", value: "DoubleColorBall", loader: () => import("./6DoubleColorBall/index.vue") },
];
const componentsArray = ref(componentsConfig);

// 当前选中的标识（字符串）
const componentValue = ref("CustomizedVirtualScrolling");

// ✅ 计算属性：返回对应的异步组件（不是字符串！）
const currentComponent = computed(() => {
  const config = componentsArray.value.find(item => item.value === componentValue.value);
  if (!config) return null;
  // 返回异步组件定义
  return lazyLoad(config.loader);
});
</script>

<template>
  <div class="app-container">
    <div class="nav-bar">
      <div id="myDivButton" class="cursor-pointer" :class="componentValue === item.value ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentValue = item.value">{{ item.name }}</div>
    </div>

    <!-- 渲染动态异步组件 -->
     <div class="component-container">
      <component :is="currentComponent" />
     </div>
    
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.nav-bar {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.component-container {
  margin-top: 20px;
  background-color: #f7e4e7;
}
</style>
