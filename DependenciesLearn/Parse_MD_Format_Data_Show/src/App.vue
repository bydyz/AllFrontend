<template>
  <div>
    <nav class="nav-bar">
      <span class="logo">MD Parser Demo</span>
      <button
        v-for="tab in tabs"
        :key="tab.path"
        class="nav-link"
        :class="{ active: currentTab === tab.path }"
        @click="currentTab = tab.path"
      >
        {{ tab.label }}
      </button>
    </nav>
    <main id="content">
      <HomePage v-if="currentTab === '/'" :md="sampleMd" />
      <MarkdownItDemo v-else-if="currentTab === '/markdown-it'" :md="sampleMd" />
      <MarkedDemo v-else-if="currentTab === '/marked'" :md="sampleMd" />
      <RemarkDemo v-else-if="currentTab === '/remark'" :md="sampleMd" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sampleMd from './sample.md?raw'
import HomePage from './components/HomePage.vue'
import MarkdownItDemo from './components/MarkdownItDemo.vue'
import MarkedDemo from './components/MarkedDemo.vue'
import RemarkDemo from './components/RemarkDemo.vue'

const tabs = [
  { path: '/', label: '首页' },
  { path: '/markdown-it', label: 'markdown-it ★' },
  { path: '/marked', label: 'marked' },
  { path: '/remark', label: 'remark' },
]

const currentTab = ref('/')
</script>
