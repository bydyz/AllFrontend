<template>
  <el-empty class="text-center flex center-center column" :description="alt || d.alt" :image="d.src" :image-size="imageSize">
    <slot></slot>
  </el-empty>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Results',
  props: {
    type: {
      type: [String, Object],
      default: 'NoData'
    },
    alt: {
      type: String
    },
    imageSize: {
      type: Number,
      default: 160
    }
  },
  computed: {
    ...mapState('config', {
      results: 'results'
    }),
    d () {
      if (this.results[this.type]) return this.results[this.type]
      return this.type
    }
  }
}
</script>

<style scoped lang="stylus">
::v-deep img
  width 100%
</style>