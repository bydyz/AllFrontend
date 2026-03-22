export default {
  async created() {
    if (this.$route.meta.keepAlive) return false
    await this.callDataAPI()
  },
  async activated() {
    await this.callDataAPI()
  },

  data() {
    return {
      dataAPIResult: [],

      loading: {
        dataAPI: false
      }
    }
  },

  methods: {
    async callDataAPI() {
      let { dataAPI, dataParams } = this.paneInfo
      if (!dataAPI) return false

      this.loading.dataAPI = true
      let { data, code } = await dataAPI(dataParams || {})
      this.loading.dataAPI = false
      if (code !== 200) return false

      if (JSON.stringify(this.dataAPIResult) === JSON.stringify(data || [])) return false

      this.dataAPIResult = data || []

      this.$emit('dataAPIEnd', this.dataAPIResult)
    }
  }
}
