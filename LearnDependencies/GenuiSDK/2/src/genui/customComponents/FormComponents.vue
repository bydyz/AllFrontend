<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Person {
  id: number
  name: string
  city: string
  address: string
}

const STORAGE_KEY = 'person-data'

const form = ref<Person>({ id: 0, name: '', city: '', address: '' })
</script>

<template>
  <div class="container">
    <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
  </div>
</template>

<style scoped>
</style>