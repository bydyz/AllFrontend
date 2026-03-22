export default {
  props: {
    // 预览ID
    id: {}
  },
  watch: {
    // 预览证书详情
    id: {
      immediate: true,
      async handler(id) {
        this.elMaps = {}
        if (this.info.isEdit) return false
        if (!id) return false

        this.loading.page = true
        let { code, data } = await this.$api.StandardTemplate.preview({ id })
        this.loading.page = false

        if (code !== 200) return false

        let { configList } = data.certTemplateConfig
        let { customStyle } = configList.find(a => a.code === 'backgroundUrl') || {}

        if (customStyle) {
          customStyle = JSON.parse(customStyle)
          this.backgroundWidth = customStyle.width
          this.backgroundHeight = customStyle.height
        }

        await this.parseElementList(configList)
      }
    }
  }
}
