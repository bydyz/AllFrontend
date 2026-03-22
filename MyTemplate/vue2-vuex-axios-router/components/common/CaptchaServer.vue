<template>
  <div :style="{width: `${width}px`,height: `${height}px`}">
    <el-image class="width-100p height-100p" v-if="url" :src="url"></el-image>
  </div>
</template>

<script>
export default {
  name: 'CaptchaServer',
  data() {
    return {
      requestId: null,
      url: null
    }
  },
  props: {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 60
    }
  },
  methods: {
    async getCaptcha() {
      this.requestId = Date.now()
      this.$emit('update:requestId', this.requestId)
      let data = await this.$api.Token.getCaptcha({
        requestId: this.requestId
      })
      this.url = data
    }
  }
}
</script>