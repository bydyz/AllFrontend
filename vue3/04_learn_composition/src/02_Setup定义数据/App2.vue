<template>
  <div>
    <form>
      账号: <input type="text" v-model="account.username">
      密码: <input type="password" v-model="account.password">
    </form>
    
    <form>
      账号: <input type="text" v-model="username">
      密码: <input type="password" v-model="password">
    </form>

    <hr>

    <div>{{ message }}</div>
    <div>{{ message1 }}</div>

    <button @click="age = 20">修改传入子组件的数据1</button>
    <button @click="onChangeName">修改传入子组件的数据2</button>
    <button @click="onChangeHeight">修改传入子组件的数据3</button>

    <hr>

    <show-info :name="name" :age="age" :height="height"></show-info>
  </div>
</template>

<script>
  import { onMounted, reactive, ref } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  export default {
    components: {
      ShowInfo
    },
    data() {
      return {
        message: "Hello World111"
      }
    },
    setup() {
      // 定义响应式数据: reactive/ref
      // 强调: ref也可以定义复杂的数据
      const info = ref({})
      console.log(info.value)

      // 1.reactive的应用场景
      // 1.1.条件一: reactive应用于本地的数据
      // 1.2.条件二: 多个数据之间是有关系/联系(聚合的数据, 组织在一起会有特定的作用)
      const account = reactive({
        username: "coderwhy",
        password: "1234567"
      })

      const username = ref("coderwhy")
      const password = ref("123456")

      // 2.ref的应用场景: 其他的场景基本都用ref(computed)
      // 2.1.定义本地的一些简单数据
      const message = ref("Hello World222")
      message.value = 'Hello World333'
      const message1 = ref('666')

      const counter = ref(0)
      let name = ref("why")
      const onChangeName = () => {
        // 此处需要用value
        name.value = 'rc'
      }
      const age = ref(18)
      // 向子组件传入非响应式的数据也可显示，只是无法响应式改变
      let height = 1.8
      const onChangeHeight = () => {
        height = 1.7
      }

      // 2.定义从网络中获取的数据也是使用ref
      // const musics = reactive([])
      const musics = ref([])
      onMounted(() => {
        const serverMusics = ["海阔天空", "小苹果", "野狼"]
        musics.value = serverMusics
        musics.value = ['666']
        console.log(musics.value)
        console.log(musics.value[0])
      })


      return {
        account,
        username,
        password,

        // composition API的同名的数据会取代options API 的变量;  两者的变量可以共存
        message,
        message1,
        name,
        onChangeName,
        height,
        onChangeHeight,
        
        age
      }
    }
  }
</script>

<style scoped>
</style>

