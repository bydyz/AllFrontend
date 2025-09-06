import { ref, watch } from "vue";

export default function useTitle(titleValue) {
  // 可以这样修改title的值，但是无法在外面的组件中修改
  // document.title = titleValue
  // document.title = ref(titleValue).value



  // 定义ref的引入数据
  const title = ref(titleValue)

  // 监听title的改变
  // watch 和 它监听的变量放到一个hook里面，要使用变量，自会监听
  watch(title, (newValue) => {
    console.log('useTitle execute!', newValue)
    document.title = newValue
  }, {
    immediate: true
  })

  // 返回ref值
  return {
    title
  }
}

