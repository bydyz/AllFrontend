<template>
  <div>

  </div>
</template>


<script setup lang="ts">

import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()


const id = Number(route.params.id)

router.push({
  name: 'NewsDetail',
  query: {
    id: id,
  },
})



// 一级页面
// export const BaseCollege = {
//   path: '/Base/College',
//   name: 'BaseCollege',
//   component: () => import('@/views/Base/College'),
//   meta: { title: '学院管理', icon: '' },
//   permission: 'System:Base:College'
// }
// 二级页面
// export const SpecialtyDetail = {
//   path: '/Base/College/SpecialtyDetail/:id/:name',
//   name: 'SpecialtyDetail',
//   component: () => import('@/views/Base/College/SpecialtyDetail'),
//   meta: { title: '专业明细', icon: '' },
//   permission: 'System:Base:College:SpecialtyDetail'
// }
// params 会拼接到url之上，不再会随着刷新而消失
// /VC/Org/Issue/110      id 为 110
router.push({
  name: 'NewsDetail',
  params: {
    id: id,
  },
})









// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()


</script>

<style lang="less" scope></style>

