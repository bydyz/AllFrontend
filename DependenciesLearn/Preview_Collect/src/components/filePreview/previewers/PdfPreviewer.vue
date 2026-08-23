<script setup>
defineProps({
  fileData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="pdf-previewer">
    <iframe
      :src="fileData.fileUrl"
      class="pdf-frame"
    />
  </div>
</template>

<style scoped>
.pdf-previewer {
  height: 100%;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
