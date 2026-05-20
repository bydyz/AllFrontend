<template>
  <div class="page">
    <h2>z.object() - 对象类型</h2>
    <pre>{{ code }}</pre>
    <button @click="run">验证</button>
    <div v-if="result2" class="result">结果: {{ result2 }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const code = `const User = z.object({
  name: z.string(),
  age: z.number(),
})

User.parse({ name: "张三", age: 20 })`

const ProductActionSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  image: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  rating: z.number().optional(),
  ratingCount: z.number().optional(),
  inStock: z.boolean().optional(),
  badgeText: z.string().optional(),
})

const result1 = ref()
const result2 = ref()

const run = () => {
  try {
    result1.value = z.object({ product: ProductActionSchema })
    console.log('result1.value: ', result1.value)
    result2.value = result1.value.safeParse({
      product: {
        id: 'id',
        title: 'title',
        price: 520,
        image: 'image',
        description: 'description',
        tags: ['tags'],
        rating: 2,
        ratingCount: 1,
        inStock: true,
        badgeText: 'badgeText'
      }
    })
    console.log('result2.value: ', result2.value)
  } catch (e: any) {
    result1.value = e.message
  }
}
</script>

<style scoped>
.page { padding: 20px; }
pre { background: #f5f5f5; padding: 10px; margin: 10px 0; }
.result { margin-top: 10px; color: green; }
</style>