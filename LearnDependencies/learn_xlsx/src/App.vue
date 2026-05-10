<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      :class="{ active: activeTab === tab.name }"
      @click="activeTab = tab.name"
    >
      {{ tab.label }}
    </button>
  </div>
  <div class="content">
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Export1 from './components/export1.vue';
import Export2 from './components/export2.vue';
import Import1 from './components/import1.vue';

const tabs = [
  { name: 'export1', label: '导出1', component: Export1 },
  { name: 'export2', label: '导出2', component: Export2 },
  { name: 'import1', label: '导入', component: Import1 },
];

const activeTab = ref('export1');

const currentComponent = computed(() => {
  const tab = tabs.find(t => t.name === activeTab.value);
  return tab?.component;
});
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.tabs button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
}

.tabs button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.content {
  border: 1px solid #ddd;
  padding: 16px;
}
</style>
