<template>
  <el-dialog
    :visible.sync="visible"
    append-to-body
    :title="dialogInfo.title"
    :close-on-click-modal="false"
    :before-close="close"
    width="1100px">

    <TableView :params.sync="filterData" :options="options" class="is-overflow">
      <el-table :data="tableData" @row-click="onformData" :row-class-name="rowClassName" v-loading="loading.table">
        <el-table-column type="index" label="序号" width="55"> </el-table-column>
        <el-table-column prop="id" label="试卷ID" min-width="88"></el-table-column>
        <el-table-column prop="name" label="试卷名称" min-width="176">
          <template slot-scope="{ row }"></template>
        </el-table-column>
        <el-table-column prop="createByName" label="创建人" min-width="120"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120"> </el-table-column>
        <el-table-column prop="questionCount" label="题目" min-width="88"></el-table-column>
        <el-table-column prop="totalScore" label="总分" min-width="88"></el-table-column>
      </el-table>
    </TableView>

    <template v-slot:footer>
      <div class="flex end-center">
        <el-button type="primary" size="medium" @click="onSubmit" :loading="loading.submit">确定</el-button>
        <el-button class="margin-right-14" size="medium" @click="close">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DialogSelectClass',
  data() {
    return {
      visible: false, // 弹窗开关

      dialogType: 'Paper',
      typeMapping: {
        Paper: {
          title: '选择试卷',
          // 模拟后台接口
          dataAPI: this.$api.Paper.search,
          // 后台接口固定参数
          params: null,
          // 初始参数与传递参数
          formData: {
            paperId: null,
          },
        },
      },

      filterData: {},

      options: {
        total: 0,
        side: {
          keyword: {
            label: '试卷名称',
          },
        },
      },
      tableData: [],

      formData: {
        paperId: null,
      },
      loading: {
        submit: false,
        table: false,
      },
      timer: {
        table: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      // paperCategory: 'common/paperCategory'
    }),
    dialogInfo() {
      let dialogInfo = this.typeMapping[this.dialogType];
      return dialogInfo || {};
    },
    outputData() {
      let formData = {};
      for (const formDataKey in this.dialogInfo.formData) {
        formData.name = this.formData.name;
        formData.originalName = this.formData.originalName;
        formData[formDataKey] = this.formData[formDataKey];
        formData.totalScore = this.formData.totalScore;
      }
      return formData;
    },
    params() {
      return {
        ...this.filterData,
        pageNum: this.filterData.current,
        pageSize: this.filterData.size,
      };
    },
  },
  watch: {
    params: {
      deep: true,
      handler() {
        clearTimeout(this.timer.table);
        this.timer.table = setTimeout(() => {
          this.getTableData();
        });
      },
    },
  },

  methods: {
    ...mapActions({
      getPaperQuestionList: 'paper/getPaperQuestionList',
    }),
    // 选择某一行
    onformData(row) {
      this.formData.paperId = row.id;
      this.formData.name = row.name;
      this.formData.originalName = row.originalName;
      this.formData.totalScore = row.totalScore;
    },
    async getTableData() {
      if (!this.visible) return false;
      this.loading.table = true;
      let { code, data } = await this.dialogInfo.dataAPI(this.params);
      this.loading.table = false;
      if (code !== 200) return false;
      this.tableData = data.list;
      this.options.total = data.total;
    },
    // 打开弹窗
    async open(data = {}) {
      this.dialogType = data.type;

      if (data.data) {
        let formData = {
          ...this.dialogType.formData,
          ...data.data,
        };
        for (const formDataKey in formData) {
          this.$set(this.formData, formDataKey, formData[formDataKey]);
        }
      }

      this.visible = true;
      return new Promise(async (resolve, reject) => {
        this.$once('handle', (type) => {
          if (type === 'submit') return resolve(this.outputData);
          reject('取消');
        });
      });
    },
    // 关闭弹窗
    close() {
      this.visible = false;
      this.$emit('handle', 'close');
    },
    // 确定提交
    async onSubmit() {
      if (!this.formData.paperId) return this.$message.warning('请选择试卷');
      this.visible = false;
      this.$emit('handle', 'submit');
    },
    rowClassName({ row }) {
      if (row.id === this.formData.paperId) return 'is-active';
    }
  },
};
</script>

<style scoped lang="stylus">
>>> .el-dialog
  .el-dialog__body
    padding-top 0
    padding-bottom 0

    .is-active
      td
        background-color BACKGROUND_COLOR !important
</style>
