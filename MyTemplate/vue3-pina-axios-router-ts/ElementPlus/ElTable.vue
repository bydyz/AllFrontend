<template>
  <OriginElTable ref="table" v-bind="$attrs">
    <!--通用继承 使用时传插槽才继承-->
    <!--    <template v-for="(item, name) in $slots" :key="name" v-slot:[name]="scoped">
          <slot :name="name" v-bind="scoped"></slot>
        </template>-->

    <!--选择性继承 自定义继承插槽、修改默认值-->
    <template v-for="name in slotNames" :key="name" v-slot:[name]="scoped">
      <template v-if="name === 'default'">
        <component v-for="item in columnVisibleList" :is="item.vNode"></component>
      </template>
      <slot v-else-if="name === 'empty'" :name="name" v-bind="scoped">
        <el-empty :description="'暂无数据'"></el-empty>
      </slot>
      <slot v-else :name="name" v-bind="scoped"></slot>
    </template>
  </OriginElTable>
</template>


<script setup lang="ts">
import {ElTable as OriginElTable} from 'element-plus';

OriginElTable.name = 'OriginElTable'





// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()


</script>

<style lang="less" scope></style>
