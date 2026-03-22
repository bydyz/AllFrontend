<template>
  <el-dialog
    :visible.sync="visible"
    append-to-body
    :title="dialogInfo.title"
    :close-on-click-modal="false"
    :before-close="close"
    width="600px">

    <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">

      <el-form-item label="排序" prop="sort">
        <el-input-number class="width-100p" v-model="formData.sort" :min="0" :max="9999"
                         controls-position="right"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button
          class="width-80 margin-right-14"
          type="primary"
          size="medium"
          @click="onSubmit"
          :loading="loading.submit"
          >保存
        </el-button>
        <el-button class="width-80" size="medium" @click="close">取消</el-button>
      </el-form-item>
      
    </el-form>

  </el-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: '',
  data() {
    let { required, Name, Phone, Password, idNumber } = this.$rules;
    let defaultFormData = {
      name: null
    };
    return {
      visible: false, // 弹窗开关

      // 存储弹窗所需数据
      dialogType: 'OrgStudentCreate',
      typeMapping: {
        create: {
          title: '新增学员',
          submitFn: '',
          type: 'Create',
        },
        edit: {
          title: '编辑学员',
          submitFn: '',
          type: 'Edit',
        },
      },
      defaultFormData,
      formData: {
        ...defaultFormData,
      },
      rules: {
        name: [required]
      },

      loading: {
        submit: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      enabled: 'common/enabled',
      sex: 'common/sex'
    }),
    ...mapState('system', {
      orgId: 'orgId',
    }),
    ...mapGetters({
      isDev: 'isDev',
    }),
    dialogInfo() {
      let dialogInfo = this.typeMapping[this.dialogType];
      return dialogInfo || {};
    },
    submitFormData() {
    },
  },

  methods: {
    reset() {
      this.formData = { ...this.defaultFormData };
      this.$refs.form && this.$refs.form.resetFields();
    },
    // 打开弹窗
    async open(data = {}) {
      this.reset();

      this.visible = true;

      this.dialogType = data.type;

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
      if (this.$refs.form) await this.$refs.form.validate()
      
      this.loading.submit = true
      let {code} = await this.dialogInfo.submitAPI(this.submitFormData)
      this.loading.submit = false
      if (code !== 200) return false
      
      this.$msg[this.dialogInfo.type]()

      this.visible = false
      this.$emit('handle', 'submit')
    },
  },
};
</script>

<style scoped lang="stylus"></style>
