<template>
  <el-dialog :visible.sync="visible" append-to-body title="选择协议" :close-on-click-modal="false" :before-close="onClose" top="5vh" width="1200px">

    <!-- 上 -->
    <div class="flex between-center">
      <!-- 筛选 -->
      <div class="flex start-center">
        <el-form :model="formData" ref="formData" label-width="0" :inline="true" size="small">
          <el-form-item>
            <el-input class="width-140 margin-bottom-2" v-model="formData.title" placeholder="协议标题" clearable @keydown.enter.native.stop.prevent="searchTitle"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="height-30 margin-bottom-12" type="primary" size="small" @click="searchTitle">搜索</el-button>
      </div>
      <!-- 选择统计 -->
      <div>
        <div class="font-14 text-6 margin-bottom-10">已选协议({{selectionList.length}})</div>
      </div>
    </div>

    <!-- 中 -->
    <div class="flex between-center">
      <!-- 左边供选择的table -->
      <el-table v-loading="loading.table" :data="tableData" :height="scalingRatio >= 1.5 ? $utils.FullViewHeight(154) : $utils.FullViewHeight(330)">
        <template v-slot:empty>
          <Results v-if='!loading.table'></Results>
          <span v-else></span>
        </template>
        <el-table-column label="协议标题" prop="title" show-tooltip-when-overflow></el-table-column>
        <el-table-column label="备注" prop="remark" show-tooltip-when-overflow></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot="header">
            <el-button type="primary" size="mini" @click="onAddAll">全部添加</el-button>
          </template>
          <template slot-scope="{row}">

            <span class="text-9 font-14" v-if="selectionList.map(v => v.id).includes(row.id) || haveBeenSelectList.map(v => v.id).includes(row.id) ">已添加</span>
            <span class="text-main font-14 pointer" @click="onAdd(row)" v-else>添加</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 右边选中的展示 -->
      <el-table class="margin-left-16" :data="selectionList" :height="scalingRatio >= 1.5 ? $utils.FullViewHeight(154) : $utils.FullViewHeight(330)">
        <template v-slot:empty>
          <Results></Results>
        </template>
        <el-table-column label="协议标题" prop="title" show-tooltip-when-overflow></el-table-column>
        <el-table-column label="备注" prop="remark" show-tooltip-when-overflow></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot="header">
            <el-button type="primary" size="mini" @click="onRemoveAll">全部移除</el-button>
          </template>
          <template slot-scope="{row}">
            <span class="text-main font-14 pointer" @click="onRemove(row)" v-if="selectionList.map(v => v.userId).includes(row.userId)">移除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 下 -->
    <div class="flex between-center">
      <PaginationControl class="padding-16" :total="total" :pagination.sync="pagination"></PaginationControl>
      <div class="margin-top-8">
        <el-button class="width-64" size="small" @click="onClose">取消</el-button>
        <el-button class="width-64" type="primary" size="small" @click="onSubmit" :loading="loading.submit">确定</el-button>
      </div>
    </div>

    <template v-slot:footer>

    </template>
  </el-dialog>
</template>

<script>
import PaginationControl from '@/components/form/PaginationControl'

export default {
  name: 'DialogSelectAgreement',
  components: {
    PaginationControl
  },
  data () {
    return {
      visible: false, // 弹窗开关
      formData: {
        title: ''
      },
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      selectionList: [],
      loading: {
        table: true,
        submit: false
      },
      timer: null,
      haveBeenSelectList: [], // 已经被选择到外面的协议
      courseId: null,
      scalingRatio: window.devicePixelRatio
    }
  },
  computed: {
    params () {
      return {
        ...this.formData,
        current: this.pagination.pageNum,
        size: this.pagination.pageSize,
        courseId: this.courseId || null,
        type: 1
      }
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      const devicePixelRatio = window.devicePixelRatio
      this.scalingRatio = devicePixelRatio
    })
  },
  watch: {
    params: {
      deep: true,
      handler () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getTableData()
        }, 300)
      }
    }
  },
  methods: {
    // 打开弹窗
    open (data = {}) {
      this.visible = true
      this.formData = Object.assign(this.formData, data.formData)
      this.haveBeenSelectList = data.haveBeenSelectList
      console.log(this.haveBeenSelectList);
      this.courseId = data.courseId
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getTableData()
      }, 300)

      return new Promise(async (resolve, reject) => {
        this.$once('close', ({ type, data }) => {
          if (type === 'success') return resolve(data)
          reject('取消')
        })
      })
    },
    // 操作 - 获取列表数据
    async getTableData () {
      this.loading.table = true
      let { code, data } = await this.$api.Course.agreementSelectPage(this.params)
      this.loading.table = false
      if (code !== 200) return false
      this.tableData = data.records.map(item => {
        return {
          ...item,
          edited: true
        }
      })
      this.total = data.total
    },
    // 操作 - 单个添加
    onAdd (row) {
      this.selectionList.push(row)
    },
    // 操作 - 添加全部
    onAddAll () {
      this.tableData.forEach(item => {
        // 判断右边是否已有选中的,已有选中的就不用再添加
        if (this.selectionList.some(a => a.id === item.id)) return false
        if (this.haveBeenSelectList.some(a => a.id === item.id)) return false
        this.selectionList.push(item)
      })
    },
    // 操作 - 单个删除
    onRemove (row) {
      let index = this.selectionList.findIndex(item => item.id === row.id)
      if (index < 0) return false
      this.selectionList.splice(index, 1)
    },
    // 操作 - 删除全部
    onRemoveAll () {
      this.selectionList = []
    },
    // 操作 - 关闭窗口
    onClose () {
      this.tableData = []
      this.selectionList = []
      this.$emit('close', { type: 'failed' })
      this.visible = false
    },
    // 操作 - 保存！！
    async onSubmit () {
      if (!this.selectionList.length) return this.$message.warning('请选择协议')
      this.loading.submit = true
      let data = [...this.haveBeenSelectList, ...this.selectionList]
      this.$emit('close', { type: 'success', data })
      this.loading.submit = false
      this.onClose()
    },
    searchTitle () {
      this.formData.title = this.formData.title
    }
  }
}
</script>

<style scoped lang="stylus">
>>>.el-dialog
  .el-dialog__header
    padding-left 32px
    margin 0
  .el-dialog__body
    padding 16px 32px
    .el-form
      .el-form-item.el-form-item--small
        margin-bottom 12px
>>>.el-pagination
  padding 8px 16px 0px 16px
</style>
