<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
let headButtonList = ref(["Graphics", "DisplayAttributes"]);

function onChangeApiType(item) {
  router.push(item);
}
</script>

<template>
  <div>
    <div>
      <button v-for="(item, index) in headButtonList" :key="index" @click="onChangeApiType(item)">{{ item }}</button>
    </div>

    <p><strong>当前路由路径:</strong> {{ $route.fullPath }}</p>
    <RouterView />
  </div>
</template>

<style scoped>
button {
  margin-right: 8px;
}
</style>
