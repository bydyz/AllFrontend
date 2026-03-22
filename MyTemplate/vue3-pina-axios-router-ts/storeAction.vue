<template>
  <div>

  </div>
</template>


<script setup lang="ts">


// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()

systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)








// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()

</script>

<style lang="less" scope></style>

