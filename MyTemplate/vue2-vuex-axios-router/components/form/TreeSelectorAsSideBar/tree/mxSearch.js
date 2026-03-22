export default {
  data() {
    return {
      // 搜索输入值
      searchValue: null
    }
  },
  methods: {
    // 操作 - 搜索节点
    onSearch(item) {
      this.$refs.tree.filter(item)
    },

    // 方法 - 过滤节点
    filterNode(value, data) {
      if (value) return data[this.propsInner.label].includes(value.trim())
      return true
    },

    richTextFormat(text) {
      return this.$xss(text.toString()).replace(new RegExp(`(${this.searchValue})`, 'g'), `<b class='text-main'>$1</b>`)
    }
  }
}
