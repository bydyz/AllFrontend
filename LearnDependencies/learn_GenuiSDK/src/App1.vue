<script setup lang="ts">
import { ref } from 'vue';
import { GenuiChat } from '@opentiny/genui-sdk-vue';

const url = 'https://your-chat-backend/api';
const model = ref('deepseek-v3.2');
const temperature = ref(0.7);
</script>

<template>
  <GenuiChat>    
      <template #empty>
        <div class="empty-text">欢迎使用生成式UI</div>
      </template>
    </GenuiChat>
</template>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
#app {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
.tiny-config-provider {
  height: 100%;
}
</style>