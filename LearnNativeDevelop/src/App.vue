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
  { name: "拖曳", value: "JustCSSAndJs", loader: () => import("./1拖曳修改div尺寸/index.vue") },
  { name: "滚动", value: "RealizeScroll", loader: () => import("./2滚动实现/index.vue") },
  { name: "input集合", value: "InputGather", loader: () => import("./3InputGather/index.vue") },
];
const componentsArray = ref(componentsConfig);

// 当前选中的标识（字符串）
const componentValue = ref("InputGather");

// ✅ 计算属性：返回对应的异步组件（不是字符串！）
const currentComponent = computed(() => {
  const config = componentsArray.value.find(item => item.value === componentValue.value);
  if (!config) return null;
  // 返回异步组件定义
  return lazyLoad(config.loader);
});
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap">
      <div id="myDivButton" class="cursor-pointer" :class="componentValue === item.value ? 'bg-[pink]' : ''" v-for="(item, index) in componentsArray" :key="index" @click="componentValue = item.value">{{ item.name }}</div>
    </div>

    <!-- 渲染动态异步组件 -->
    <component :is="currentComponent" />
  </div>
</template>

<style scoped></style>
