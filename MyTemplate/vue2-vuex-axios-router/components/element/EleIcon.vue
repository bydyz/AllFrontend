<template>
  <el-image v-if="/^http/.test(src)" class="width-18 height-18" :src="src"></el-image>
  <i v-else :class="src"></i>
</template>

<script>
export default {
  name: 'EleIcon',
  props: {
    src: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>