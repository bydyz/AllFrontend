<template>
  <div>


    <!-- 表单 -->
    <el-form
      :model="form"
      :rules="rules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <!-- 自定义el-form的label -->
      <el-form-item prop="officialWebsite" label="门户网站地址：">
        <template #label>
          <div>
            <div class="leading-5">门户网站地址：</div>
            <div class="leading-5">（非必填）</div>
          </div>
        </template>
        <el-input v-model.trim="formData.officialWebsite" :maxlength="200" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password show-word-limit maxlength="10" />
      </el-form-item>

      <el-form-item prop="sort" label="排序">
        <el-input-number controls-position="right" v-model="formData.sort"
                         :min="0"></el-input-number>
      </el-form-item>

      <el-form-item prop="enabled" label="角色状态">
        <el-radio-group v-model="formData.enabled">
          <el-radio v-for="item in enabled" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>


  </div>
</template>

<script setup lang="ts">
// Session、localStorage的封装
import { localCache } from './utils/cache'
import { ref, reactive} from 'vue';
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

interface IAccount {
  name: string
  password: string
}
// 定义account数据
const form = reactive<IAccount>({
  name: localCache.getCache("name") ?? '',
  password: localCache.getCache("password") ?? ''
})


// 定义校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}


// 执行帐号的登录逻辑
// const accountRef = ref<InstanceType<typeof PaneAccount>>()
const formRef = ref<InstanceType<typeof ElForm>>()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = form.name
      const password = form.password

      // 2.向服务器发送网络请求(携带账号和密码)

    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}



//!!! 是只有 defineExpose 的内容，外面可以通过组件实例拿到
//！ 可以在 <script setup> 中使用 defineExpose，而不需要显式导出它。Vue 3 会处理这一切。
defineExpose({
  loginAction
})
</script>

<style lang="less" scope></style>

