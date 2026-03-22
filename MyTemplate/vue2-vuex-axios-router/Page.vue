<template>
  <div class="padding-16 bg-f radius-10 height-100p">
    <!-- 倘若 el-tab-pane 里放的是一个一个组件，切换时，会两次调用 created 可以通过 :isActive="activeName === item.id" 向组件中传参 isActive，然后在子组件组件中

      watch: {
        params: {
          handler() {
            if (!this.isActive) return false
            clearTimeout(this.timer.table)
            this.timer.table = setTimeout(() => {
              this.getTableData()
            }, 300)
          }
        }
      },

      或者

      created() {
        if (!this.isActive) return false
        this.getQuestionCount()
      },




      监听 isActive 无效
    -->
    <!-- tabs -->
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, index) in finalTabsList" :key="index" :label="item.name" :name="item.id"></el-tab-pane>

      <!-- 占位符 -->
      <el-tab-pane disabled label="" name="Place1" v-if="finalTabsList.length == 1"></el-tab-pane>
    </el-tabs>





    <!-- 图片 -->
    <el-image style="width: 16px; height: 16px" :src="images.collect"></el-image>





    <!-- 利用a标签下载 -->
    <a class="padding-left-10" :href="xlsxHref" download="客房可用与占用">
      <el-button class="normal" size="small" icon="el-icon-download">下载导入模板</el-button>
    </a>





    <!-- 上传的html -->
    <!-- 没有 :auto-upload="true" ， 不会主动触发上传，即 before-upload  http-request 均无效 -->
    <el-upload class="upload-demo" :auto-upload="true" action="" :show-file-list="false" :accept="'.xls, .xlsx'" :before-upload="beforeUpload" :http-request="httpRequest">
      <el-button size="small" type="primary" :loading="loading.submit">点击上传</el-button>
    </el-upload>





    <!-- 弹窗 -->
    <DialogForCOrE ref="DialogForCOrE"></DialogForCOrE>




    <!-- 用代码实现 el-image 的preview功能 -->
    <el-image ref="headImageViewer" :preview-src-list="headImageList" :src="row.headImgUrl" class="width-0 height-0" fit="cover">
      <div slot="error">
        <span class="font-13 text-9">&lt;未上传&gt;</span>
      </div>
    </el-image>
    <el-button type="text" @click="toSeeHeadPic(row.headImgUrl)" v-if="row.headImgUrl">查看</el-button>

  </div>
</template>

<script>
import DialogForCOrE from './DialogForCOrE'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {},
  data() {
    return {
      images: {
        collect: require('@/assets/project/collect.png'),
        noCollect: require('@/assets/project/noCollect.png')
      },

      xlsxHref: `${location.pathname}客房可用与占用.xls`,


      accept: '.png,.jpg,.jpeg',
      fileSize: 5
    }
  },
  computed: {
    ...mapGetters('common', {
      myOrgList: 'myOrgList'
    }),
    ...mapState('system', {
      userInfo: 'userInfo'
    }),

    fileReg() {
      return new RegExp(`(${this.accept.split(',').join('|').replace(/\./g, '\\.')})$`, 'i')
    },
    fileOption() {
      return {
        size: this.fileSize * 1024 * 1024,
        name: `${this.fileSize}M`
      }
    },
  },
  created() {},
  methods: {
    // 打开弹窗
    async openDialog(row) {
      let isSubmit = await this.$refs.DialogForCOrE.open({
        type: 'Edit',
        formData: {}
      })
      if (!isSubmit) return false

      this.getTableData()
    },





    onSwitch() {
      switch (expression) {
        case 'value1':
          console.log()
          break
        case 'value2':
          console.log()
          break
        default:
        // 默认代码块
      }
    },





    // 路由跳转
    routerPush(row) {
      this.$router.push({
        name: '',
        query: {},
        params: {}
      })
    },





    // 排序
    sortChange({ prop, order }) {
      this.sort.sortField = prop || undefined
      this.sort.sortOrder = order ? order.replace('ending', '') : undefined
    },
    // sort: {
    //   sortField: 'createTime',
    //   sortOrder: 'desc'
    // },





    // 上传前格式校验
    beforeUpload(file) {
      // 方式一
      let isExcel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(file.type)
      if (!isExcel) this.$message.warning('请选择.xls, .xlsx格式文件上传')
      return isExcel


      // 方式二
      if (this.loading.upload) {
        return false
      }
      if (!this.fileReg.test(file.name)) {
        this.$message.warning('图片格式不正确，请重新上传')
        return false
      }
      if (file.size > this.fileOption.size) {
        this.$message.warning(`上传图片大小不能超过 ${this.fileOption.name}`)
        return false
      }
      return true
      
    },
    // 上传
    async httpRequest({ file }) {
      let fileFormData = new FormData()
      fileFormData.append('file', file)

      this.loading.submit = true

      let { code, data, msg } = await this.$api.Exam.importScore({
        fileFormData,
        examId: this.examId
      })
      this.loading.submit = false
      if (code !== 200) return false

      this.$message.success('上传成功')

      this.visible = false
      this.$emit('handle', 'submit')
    },



    // 用代码实现 el-image 的preview功能
    toSeeHeadPic(url) {
      this.headImageList = [url]
      this.$nextTick(() => {
        this.$refs.headImageViewer.showViewer = true
      })
    },

    ...mapMutations({
      setOrgId: 'system/setOrgId',
      permissionMenuUpdate: 'system/permissionMenuUpdate'
    }),
    ...mapActions({
      logout: 'system/logout'
    })
  }
}
</script>

<style lang="stylus" scoped></style>
