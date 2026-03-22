<template>
  <div>
    {{ props.isFold }}

    {{ content }}
  </div>
</template>


<script setup lang="ts">

// defineProps的用法
props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

console.log(props.isFold)

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()











// 可以不用给  defineProps  赋值，则其中的变量可以直接使用
defineProps({
  content: {
    type: [Object, Array],
    default: () => { },
  },
  height: {
    type: String,
    default: '480px',
  },
})

console.log(content)











// 创建函数
const InitPage = async() => {

}
// 写在此处 大致相当于 created 里调用
InitPage()


</script>

<style lang="less" scope></style>

