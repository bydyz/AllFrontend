<template>
  <div>

    <!-- tabs切换 -->
    <el-tabs type="border-card" stretch v-model="activeName">
      <el-tab-pane name="account">
        <template #label>
          <div class="label">
            <el-icon><UserFilled /></el-icon>
            <span class="text">帐号登录</span>
          </div>
        </template>

        <pane-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <div class="label">
            <el-icon><Cellphone /></el-icon>
            <span class="text">手机登录</span>
          </div>
        </template>

        <pane-phone />
      </el-tab-pane>
    </el-tabs>




  </div>
</template>

<script setup lang="ts">
// Session、localStorage的封装
import { localCache } from './utils/cache'
import { ref, watch } from 'vue'

// 两个自写组件
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'







// 空值合并运算符 （ ?? ）是一个逻辑运算符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。 与 逻辑或运算符（ || ） 不同，逻辑或运算符会在左侧操作数为 假值 时返回右侧操作数。
// <boolean>：这是 TypeScript 中的泛型语法，用于指定该引用所包含的值的类型。在这里，它表示该引用中的值是布尔类型。即ref<boolean>() 传入的数值类型只能是布尔类型
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})







const activeName = ref('account')
// typeof PaneAccount：获取 PaneAccount 类的类型。这并不是 PaneAccount 类的实例，而是表示该类的类型。
// InstanceType<>：这是 TypeScript 中的一个内置工具类型。它接受一个类的类型，并返回该类的实例类型。
const accountRef = ref<InstanceType<typeof PaneAccount>>()

// 被ref修饰的变量，在script中使用时，需要加一个value，在HTML中可以直接用
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}





</script>

<style lang="less" scoped></style>
