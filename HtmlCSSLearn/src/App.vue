<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'

// ✨ 定义一个辅助函数，避免重复写 defineAsyncComponent
function lazyLoad(loader) {
  return defineAsyncComponent({
    loader,
    // 可选：加载中组件
    loadingComponent: { template: '<div>加载中...</div>' },
    // 可选：错误组件
    errorComponent: { template: '<div>加载失败</div>' },
    // 延迟显示 loading（毫秒）
    delay: 200,
    // 超时时间（毫秒）
    timeout: 5000
  })
}

// 🚀 组件配置：只存加载函数，不实际加载
const componentsConfig = [
  { name: "简便写法", value: "ASimpleWrite", loader: () => import("./components/ASimpleWrite.vue") },
  { name: "center", value: "LearnCenter", loader: () => import("./components/LearnCenter.vue") },
  { name: "img", value: "LearnTagImg", loader: () => import("./components/LearnTagImg/index.vue") },
  { name: "常见标签", value: "CommonTags", loader: () => import("./components/CommonTags.vue") },
  { name: "LearnHr", value: "LearnHr", loader: () => import("./components/LearnHr.vue") },
  { name: "特殊符号", value: "SpecificSymbol", loader: () => import("./components/SpecificSymbol.vue") },
  { name: "列表", value: "LearnOlUl", loader: () => import("./components/LearnOlUl/index.vue") },
  { name: "自定义列表", value: "CustomList", loader: () => import("./components/CustomList.vue") },
  { name: "a标签", value: "LearnTagA", loader: () => import("./components/LearnTagA/index.vue") },
  { name: "原生Table", value: "LearnTable", loader: () => import("./components/LearnTable/index.vue") },
  { name: "form标签", value: "LearnTagForm", loader: () => import("./components/LearnTagForm/index.vue") },
  { name: "字体样式", value: "LearnFont", loader: () => import("./components/LearnFont/index.vue") },
  { name: "display", value: "LearnDisplay", loader: () => import("./components/LearnDisplay/index.vue") },
  { name: "滚动条样式", value: "LearnScrollbar", loader: () => import("./components/LearnScrollbar/index.vue") },
  { name: "CSS选择器", value: "LearnSelector", loader: () => import("./components/LearnSelector/index.vue") },
  { name: "精灵图", value: "LearnEIFPicture", loader: () => import("./components/LearnEIFPicture/index.vue") },
  { name: "间距", value: "LearnSpacing", loader: () => import("./components/LearnSpacing/index.vue") },
  { name: "background", value: "LearnBackground", loader: () => import("./components/LearnBackground/index.vue") },
  { name: "CSSCollect", value: "CSSCollect", loader: () => import("./components/CSSCollect/index.vue") },
]
const componentsArray = ref(componentsConfig)

// 当前选中的标识（字符串）
const componentValue = ref("CSSCollect")

// ✅ 计算属性：返回对应的异步组件（不是字符串！）
const currentComponent = computed(() => {
  const config = componentsArray.value.find(item => item.value === componentValue.value)
  if (!config) return null
  // 返回异步组件定义
  return lazyLoad(config.loader)
})
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