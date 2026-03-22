<template>
  <el-dialog
    :visible.sync="visible"
    append-to-body
    title="颁发证书"
    :close-on-click-modal="false"
    :before-close="close"
    width="600px">

    <!-- 替代上面的title -->
    <div class="text-3 font-16" slot="title">
      <span>{{ dialogInfo.title }}</span>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" :loading="loading.submit">确定</el-button>
      <el-button size="small" @click="close">取 消</el-button>
    </span>

    <ButtonSave>
      <el-button type="primary" size="medium" @click="onSubmit" :loading="loading.submit">保存</el-button>
      <el-button size="medium" @click="$router.back()">取消</el-button>
    </ButtonSave>

  </el-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'DialogSendCert',
  data() {
    return {
      visible: false,

      loading: {
        submit: false
      },

      outputData: true
    }
  },
  computed: {
    
  },

  methods: {
    // 打开弹窗
    async open(data = {}) {
      this.visible = true;

      return new Promise(async (resolve, reject) => {
        this.$once('handle', type => {
          if (type === 'submit') return resolve(this.outputData)
          reject('取消')
        })
      })
    },
    // 操作 - 关闭弹窗
    close() {
      this.visible = false
      this.$emit('handle', 'close')
    },
    // 确定提交
    async onSubmit() {
      

      this.close()

      this.visible = false
      this.$emit('handle', 'submit')
    },
  },
};
</script>

<style scoped lang="stylus"></style>
