<script setup>
import { ref } from 'vue'

const props = defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})

const imageScale = ref(1)
</script>

<template>
  <div class="image-previewer">
    <img
      :src="fileData.fileUrl"
      :alt="fileData.fileName"
      :style="{ transform: `scale(${imageScale})`, transformOrigin: 'top left' }"
      class="preview-image"
    />
  </div>
</template>

<style scoped>
.image-previewer {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.preview-image {
  max-width: 100%;
  height: auto;
}
</style>
