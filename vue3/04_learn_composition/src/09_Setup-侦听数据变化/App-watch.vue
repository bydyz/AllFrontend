<template>
  <div>AppContent</div>
  <button @click="message = '你好啊,李银河!'">修改message</button>
  <!-- 总之，修改普通值或者ref的值，前后值不同；修改reactive的值，前后相同 -->
  <!-- 似乎经过 () => ({ ...info }) 处理后，info外层的数据变为普通值，不会响应修改，修改前后是不同的 
                                          info.friend里面的数据依旧是reactive的，修改其内的值，新值和旧值是一样的 -->
  <button @click="info.name = 'james'">修改info.name</button>
  <button @click="info.friend.name = 'james'">修改info.friend.name</button>
  <button @click="data1 = 3">修改data1</button>
</template>

<script>
  import { reactive, ref, watch } from 'vue'

  export default {
    setup() {
      // 1.定义数据
      const message = ref("Hello World")
      const info = reactive({
        name: "why",
        age: 18,
        friend: {
          name: "kobe"
        }
      })
      // let data1 = 1        // 或报warn  Invalid watch source  且监听失效
      let data1 = ref(1)
      let data2 = ref(2)

      // 2.侦听数据的变化  似乎默认 immediate和deep的值为false
      watch(message, (newValue, oldValue) => {
        console.log(newValue, oldValue)
        console.log('')
      })

      watch(info, (newValue, oldValue) => {
        console.log(newValue, oldValue)
        console.log(newValue === oldValue)
        console.log('')
      }, {
        immediate: true
      })

      // 3.监听reactive数据变化后, 获取普通对象？？？？？？？？？？？？？？？？？？？？
      watch(() => ({ ...info }), (newValue, oldValue) => {
        console.log(newValue, oldValue)
        console.log('')
      }, {
        immediate: true,
        deep: true
      })

      // 监听多个数据源
      watch([data1, data2], (newValues, oldValues) => {
        // 打印的是数组 [data1, data2]
        console.log(newValues, oldValues)
      })

      // 监听多个数据源
      watch([data3, data4], ([newData3, newData4], [oldData3, oldData4]) => {
        
      })

      return {
        message,
        info,
        data1,
        data2
      }
    }
  }
</script>

<style scoped>
</style>

