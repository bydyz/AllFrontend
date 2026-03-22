export default {
  created() {
    this.defaultData = this.$utils.DeepClone(this.$data)
    this.currentRouteName = this.$route.name
  },
  activated() {
    if (!this.$route.params.cache) {
      this.$utils.InitDefaultData.call(this)
      this.$refs.form && this.$refs.form.resetFields()
    }
  },
  methods: {
    routerDeleteCurrent() {
      this.$store.commit('router/delete', { name: this.currentRouteName })
    }
  }
}
