<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { Person } from "../../types";

const emit = defineEmits<{
  closeDrawerChangePage: []
}>()

const form = ref<Person>({ id: 0, name: "", city: "", address: "" });
const formRef = ref<FormInstance>();

const rules = ref<FormRules<Person>>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
});

const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate();

  form.value.id = Date.now();

  const data = localStorage.getItem("person-data");
  let tableData = data ? JSON.parse(data) : [];
  tableData.push({ ...form.value });

  localStorage.setItem("person-data", JSON.stringify(tableData));

  // 此处发射的是 xxxxxx 事件，则定义该自定义渲染组件时，事件的 property 为 onXxxxxx
  // 例如 E:\Project\AAA_All_MINE\all-frontend\LearnDependencies\GenuiSDK\2\src\genui\chat\custom-components.ts 中的 onOnCloseDrawerChangePage
  emit('closeDrawerChangePage')
};
</script>

<template>
  <div class="container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item>
        <div class="title">个人信息表单</div>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.container {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}

.title {
  color: #000;
  font-weight: bold;
}
</style>
