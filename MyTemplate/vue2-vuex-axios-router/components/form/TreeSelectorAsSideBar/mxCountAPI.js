export default {
  data() {
    return {
      timer: {
        count: null
      }
    }
  },
  methods: {
    onEnterTips(item) {
      let { countAPI, countParams } = this.paneInfo
      if (!countAPI) return false

      this.$set(item, 'visible', true)

      clearTimeout(this.timer.count)
      this.timer.count = setTimeout(async () => {

        // 默认参数
        let idList = this.$utils.ArrayFlat([item]).map(a => a.id)
        let eParams = null

        // 参数 插槽
        if (typeof countParams === 'object') {
          eParams = countParams
        } else if (typeof countParams === 'function') {
          eParams = countParams(item, idList)
        }

        let { code, data } = await countAPI({
          idList,
          ...eParams
        })
        if (code !== 200) return false

        this.$set(item, 'countInner', data)

      }, 300)
    },

    onLeaveTips(item) {
      this.$set(item, 'visible', false)
    }
  }
}
