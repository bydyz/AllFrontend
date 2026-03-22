<template>
  <TableView :options="options" :params.sync="filterData">
    <template v-slot:main>
      <el-button class="margin-bottom-8 margin-right-12" icon="el-icon-plus" size="small" type="primary" @click="onCreate"> 新增发布班级 </el-button>
    </template>

    <el-table
      class="margin-top-16"
      :data="tableData"
      :height="$utils.FullViewHeight(186)"
      v-loading="loading.table"
      @selection-change="selectionList = $event.map((item) => item.id)"
    >
      <template v-slot:empty>
        <Results v-if="!loading.table"></Results>
        <span v-else></span>
      </template>

      <el-table-column prop="orgName" min-width="100">
        <template slot="header">
          <span>机构名称</span>
        </template>

        <template slot-scope="{ row }">
          {{ '' }}
        </template>
      </el-table-column>

      <el-table-column label="审批状态" prop="status" width="120">
        <EleDot slot-scope="{ row }" :id="row.status" type="approvalStatus"></EleDot>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="" class="margin-left-10">详情</el-button>
          <el-button type="text" size="small" @click="" class="margin-left-10">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
  </TableView>
</template>

<script>
export default {
  name: 'CertList',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      options: {
        total: 0
        // main: {
        //   status: {
        //     label: '审批状态',
        //     options: 'approvalStatus',
        //     value: 11
        //   },
        // },

        // side: 'name:班级名称',

        // side: {
        //   name: {
        //     label: '班级名称'
        //   }
        // }
      },

      filterData: {},
      selectionList: [],
      tableData: [],

      loading: {
        table: true
      },
      timer: {
        table: null
      }
    }
  },
  created() {},
  computed: {
    params() {
      return {
        ...this.filterData
      }
    },
    permissions() {
      return this.$route.meta.childPermissions || {}
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler() {
        clearTimeout(this.timer.table)
        this.timer.table = setTimeout(() => {
          this.getTableData().then()
        }, 300)
      }
    }
  },
  methods: {
    async getTableData() {
      this.loading.table = true
      let { code, data } = await this.tableDataAPI(this.params)
      this.loading.table = false
      if (code !== 200) return false
    }
  }
}
</script>

<style lang="stylus" scoped></style>
