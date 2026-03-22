<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="120px" size="small">
    <el-form-item label="排序" prop="sort">
      <el-input-number
        class="width-100p"
        v-model="formData.sort"
        :min="0"
        :max="9999"
        controls-position="right"></el-input-number>
    </el-form-item>

    <el-form-item label="排序" prop="sort">
      <el-select v-model="formData.groupIds" placeholder="请选择" size="small" class="width-300">
        <el-option v-for="item in 3" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="排序" prop="sort">
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="开始时间"
        size="small"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="排序" prop="sort">
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="结束时间"
        size="small"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="排序" prop="sort">
      <el-date-picker
        v-model="endTime"
        type="date"
        placeholder="结束时间"
        size="small"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>

    <el-input class="width-100p" v-model.trim="formData.phone" placeholder="请输入手机号" :maxlength="11" show-word-limit></el-input>

    <el-radio-group v-model="formData.isimpproject" class="shrink-0">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>

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
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: '',
  data() {
    let { required, Name, Phone, Password, idNumber } = this.$rules;
    let defaultFormData = {
      name: null,
    };
    return {
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
        name: [required],
      },

      loading: {
        submit: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      enabled: 'common/enabled',
      sex: 'common/sex',
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
    submitFormData() {},
  },

  methods: {
    // 确定提交
    async onSubmit() {
      if (this.$refs.form) await this.$refs.form.validate();

      this.loading.submit = true;
      let { code } = await this.dialogInfo.submitAPI(this.submitFormData);
      this.loading.submit = false;
      if (code !== 200) return false;

      this.$msg[this.dialogInfo.type]();

      this.visible = false;
      this.$emit('handle', 'submit');
    },
  },
};
</script>

<style scoped lang="stylus">

</style>
