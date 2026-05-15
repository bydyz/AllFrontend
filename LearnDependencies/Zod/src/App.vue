<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  { name: 'String', label: 'String', path: '/string' },
  { name: 'Number', label: 'Number', path: '/number' },
  { name: 'Boolean', label: 'Boolean', path: '/boolean' },
  { name: 'Object', label: 'Object', path: '/object' },
  { name: 'Array', label: 'Array', path: '/array' },
  { name: 'Union', label: 'Union', path: '/union' },
  { name: 'Enum', label: 'Enum', path: '/enum' },
  { name: 'Literal', label: 'Literal', path: '/literal' },
  { name: 'Optional', label: 'Optional', path: '/optional' },
  { name: 'Nullable', label: 'Nullable', path: '/nullable' },
  { name: 'Refine', label: 'Refine', path: '/refine' },
  { name: 'Transform', label: 'Transform', path: '/transform' },
  { name: 'Infer', label: 'Infer', path: '/infer' },
  { name: 'Date', label: 'Date', path: '/date' },
  { name: 'Bigint', label: 'Bigint', path: '/bigint' },
  { name: 'Tuple', label: 'Tuple', path: '/tuple' },
  { name: 'Record', label: 'Record', path: '/record' },
  { name: 'Intersection', label: 'Intersection', path: '/intersection' },
  { name: 'DiscriminatedUnion', label: 'DiscriminatedUnion', path: '/discriminatedunion' },
  { name: 'Z_Example1', label: 'Z_Example1', path: '/Z_Example1' },
]
</script>

<template>
  <div class="container">
    <nav class="nav">
      <button
        v-for="item in navItems"
        :key="item.name"
        @click="router.push(item.path)"
      >
        {{ item.label }}
      </button>
    </nav>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.nav button {
  padding: 8px 16px;
  cursor: pointer;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>