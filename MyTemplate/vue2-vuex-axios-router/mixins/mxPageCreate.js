export default {
  created () {
    this.getDetail && this.getDetail()
  },
  props: {
    type: {
      type: String,
      default: 'Create'
    }
  },
  data () {
    return {
      formData: {},
      rules: {},

      loading: {
        page: false,
        submit: false
      },
      defaultFormData: {}
    }
  },
  computed: {
    permissions () {
      return this.$route.meta.childPermissions || {}
    },
    pageInfo () {
      return this.typeMapping[this.type] || {}
    },
    detailAPIParams () {
      if (!Number.isSafeInteger(Number(this.$route.query.id))) return false
      return {
        id: Number(this.$route.query.id)
      }
    },
    submitFormData () {
      return {
        ...this.formData
      }
    }
  },
  methods: {
    // 获取 - 详情
    async getDetail () {
      let formData = await this.callDetailAPI()
      if (formData) this.formData = formData
    },
    async callDetailAPI () {
      if (!this.detailAPIParams || !this.pageInfo.detailAPI) return false
      this.loading.page = true
      let { code, data } = await this.pageInfo.detailAPI(this.detailAPIParams)
      this.loading.page = false
      if (code !== 200) return false
      return data
    },
    // 操作 - 确定提交
    async onSubmit () {
      if (this.$refs.form) await this.$refs.form.validate()
      if (!this.pageInfo.submitAPI) return false
      this.loading.submit = true
      let { code } = await this.pageInfo.submitAPI(this.submitFormData)
      this.loading.submit = false
      if (code !== 200) return false

      this.$msg(this.pageInfo.msgText || '')
      this.onSubmitAfter && this.onSubmitAfter()
      this.formData = {
        ...this.defaultFormData
      }
    },
    onCancel () {
      this.$router.back()
    }
  }
}
