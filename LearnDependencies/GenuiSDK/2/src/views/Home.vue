<script setup lang="ts">
import { useRouter } from 'vue-router'
import {ElButton} from "element-plus";
import SmartAddDialog from "./SmartAddDialog.vue";
import {ref} from "vue";

const router = useRouter()

const toTable = () => {
  router.push('/table')
}

const smartAddDialogRef = ref();
const smartHandleAdd = async () => {
  await smartAddDialogRef.value.open();
};
</script>

<template>
  <div class="container">
    <div>
      <h2>首页</h2>

      <el-button @click="toTable">跳转到table</el-button>

      <el-button type="success" @click="smartHandleAdd" style="margin-top: 20px; margin-left: 0">智能助手</el-button>
    </div>

    <SmartAddDialog ref="smartAddDialogRef"></SmartAddDialog>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 600px;
  color: #333333;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h2 {
    margin-bottom: 20px;
  }
}
</style>