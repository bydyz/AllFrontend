export default {
  activated () {
    console.log('%c生命周期 activated' + this.$route.name, 'font-size: 16px;color: #36d;')
    clearTimeout(this.timer.table)
    this.timer.table = setTimeout(() => {
      this.getTableData().then()
    }, 300)
  },
  data () {
    return {
      options: {
        total: 0
      },
      filterData: {},
      selectionList: [],
      tableData: [],

      loading: {
        table: false
      },
      timer: {
        table: null
      }
    }
  },
  computed: {
    params () {
      return {
        ...this.filterData
      }
    },
    permissions () {
      return this.$route.meta.childPermissions || {}
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
        clearTimeout(this.timer.table)
        this.timer.table = setTimeout(() => {
          this.getTableData().then()
        }, 300)
      }
    }
  },
  methods: {
    async getTableData () {
      let data = await this.callTableDataAPI()
      if (data) {
        this.tableData = data.records
        this.options.total = data.total
      }
    },
    // 获取 - 列表
    async callTableDataAPI () {
      if (!this.tableDataAPI) return false
      this.loading.table = true
      let { code, data } = await this.tableDataAPI(this.params)
      this.loading.table = false
      if (code !== 200) return false
      return data
    }
  }
}