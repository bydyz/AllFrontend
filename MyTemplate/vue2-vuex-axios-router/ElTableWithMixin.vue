<template>
  <TableView :options="options" :params.sync="filterData">
    <template v-slot:main>
      <div class="margin-bottom-8 margin-right-12">
        <el-button class="margin-bottom-8 margin-right-12" icon="el-icon-plus" size="small" type="primary" @click="onCreate"> 新增发布班级 </el-button>

        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="开班日期"
          size="small"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          style="width: 140px">
        </el-date-picker>

        <span class="font-12 margin-left-4 margin-right-4">至</span>

        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="结班日期"
          size="small"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          style="width: 140px">
        </el-date-picker>
      </div>

      <el-select v-model="courseLabelId" placeholder="课程标签" multiple clearable size="small" class="width-140 margin-bottom-8 margin-right-12">
        <el-option v-for="item in courseLabelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </template>

    <el-table
      class="margin-top-16"
      :data="tableData"
      :height="$utils.FullViewHeight(186)"
      v-loading="loading.table"
      @selection-change="selectionList = $event.map((item) => item.id)">
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
import mxTableView from '@/components/mixins/mxTableView';

export default {
  name: 'CertList',
  components: {},
  mixins: [mxTableView],
  props: {},
  data() {
    return {
      // options的total，以及下方的五个均有，可以不要；main、side根据需要添加
      options: {
        // total: 0,
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

      // filterData: {},
      // selectionList: [],
      // tableData: [],

      // loading: {
      //   table: true
      // },
      // timer: {
      //   table: null
      // }

      // startDate: null,
      // endDate: null

      // courseLabelId: [],
      // courseLabelList: []
    };
  },
  created() {
    // this.getCourseLabelList()
  },
  computed: {
    // 下方的这两个也有
    // params() {
    //   return {
    //     ...this.filterData,
    //     startDate: this.startDate,
    //     endDate: this.endDate
    //     labelIdList: this.courseLabelId
    //   }
    // },
    // permissions() {
    //   return this.$route.meta.childPermissions || {}
    // }
  },
  watch: {
    // 下方的这个也有
    // params: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     clearTimeout(this.timer.table)
    //     this.timer.table = setTimeout(() => {
    //       this.getTableData().then()
    //     }, 300)
    //   }
    // }
  },
  methods: {
    // async getCourseLabelList() {
    //   let { code, data, msg } = await this.$api.CourseManage.labelPage({
    //     type: 'course',
    //     size: 999999
    //   })
    //   if(code !== 200) return false
    //   this.courseLabelList = (data.records || []).map(item => {
    //     return {
    //       id: item.id,
    //       name: item.labelName
    //     }
    //   })
    // }

    // async getTableData() {
    //   if((this.startDate && this.endDate) && new Date(this.startDate).getTime() > new Date(this.endDate).getTime()) return this.$message.warning("选择的结班日期不得早于开班日期！")

    //   let data = await this.callTableDataAPI()
    //   if (data) {
    //     this.tableData = data.records
    //     this.options.total = data.total
    //   }
    // },

    // 下方的这两个有
    // async getTableData () {
    //   let data = await this.callTableDataAPI()
    //   if (data) {
    //     this.tableData = data.records
    //     this.options.total = data.total
    //   }
    // },
    // // 获取 - 列表
    // async callTableDataAPI () {
    //   if (!this.tableDataAPI) return false
    //   this.loading.table = true
    //   let { code, data } = await this.tableDataAPI(this.params)
    //   this.loading.table = false
    //   if (code !== 200) return false
    //   return data
    // }
  },
};
</script>

<style lang="stylus" scoped></style>
