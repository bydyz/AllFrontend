<template>
  <el-dialog
    :visible.sync="visible"
    append-to-body
    :title="dialogInfo.title"
    :close-on-click-modal="false"
    :before-close="close"
    top="5vh"
    width="800px">

    <TableView :params.sync="filterData" :options="dialogInfo.options">
      <el-table ref="classTable" :data="tableData" v-loading="loading.table" @selection-change="selectionList = $event" :height="$utils.FullViewHeight(426)">
        <el-table-column type="selection" min-width="88" :selectable="(row) => {return !alreadySelectList.includes(row.id)}"></el-table-column>

        <el-table-column prop="name" label="班级名称" min-width="176"></el-table-column>

        <el-table-column prop="orgName" label="机构名称" min-width="130"> </el-table-column>
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
  name: 'DialogSelectStudents',
  data() {
    return {
      visible: false, // 弹窗开关

      dialogType: 'class',
      typeMapping: {
        class: {
          title: '选择班级',
          // 分页接口
          dataAPI: this.$api.CertManage.classPage,
          // 后台接口固定参数
          params: undefined,

          options: {
            total: 0,
            side: {
              name: {
                label: '班级名称',
              },
            },
          },
        },
      },

      filterData: {},

      tableData: [],

      alreadySelectList: [],
      selectionList: [],

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
    // 确认是返回除去的数据
    outputData() {
      return this.selectionList
    },
    params() {
      return {
        ...this.filterData
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
      // getPaperQuestionList: 'paper/getPaperQuestionList',
    }),
    async getTableData() {
      if (!this.visible) return false;
      this.loading.table = true;
      let { code, data } = await this.dialogInfo.dataAPI(this.params);
      this.loading.table = false;
      if (code !== 200) return false;
      this.tableData = data.records;
      this.dialogInfo.options.total = data.total;
    },
    reset() {
      this.$nextTick(() => {
        // 清除选择
        this.$refs.classTable.clearSelection()
      })
      
      this.selectionList = []
    },
    // 打开弹窗
    async open(data = {}) {
      this.visible = true;
      // this.reset()
      this.dialogType = data.type;
      // 已选中的加入到 this.alreadySelectList ，后面每次用的是已选的内容
      // this.alreadySelectList = data.selectionList.map(item => item.id)

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
      if (!this.selectionList.length) return this.$message.warning('请选择班级');
      this.visible = false;
      this.$emit('handle', 'submit');
    }
  },
};
</script>

<style scoped lang="stylus"></style>
