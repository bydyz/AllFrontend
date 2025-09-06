<template>
  <div>
    <h2>message: {{ message }}</h2>
    <button @click="changeMessage">修改message</button>



    <hr>
    <h2>账号: {{ account.username }}</h2>
    <h2>密码: {{ account.password }}</h2>
    <button @click="changeAccount">修改账号</button>
    <hr>



    <!-- 默认情况下在template中使用ref时, vue会自动对其进行解包(取出其中value)        此时不可加  .value -->
    <!-- 修改counter，在template中不能用 .value，在setup()中需要用 .value  -->
    <h2>当前计数（单纯）: {{ counter }}-{{ counter.value }}</h2>
    <button @click="increment">+1</button>
    <button @click="counter++">+1</button>



    <!-- 此处统一一下：ref放入一个普通的object里，无论是在template还是setup中，均要使用  .value -->
    <hr>
    <!-- 使用的时候不需要写.value     写也可 -->
    <h2>当前计数（counter放入info）: {{ info.counter.value }}-{{ info.counter }}</h2>
    <!-- 修改的时候需要写.value     注意：上面修改counter时，  没有用  .value  ，当时将其放入一个普通的对象中，不会自动解包，需要加  .value -->
    <button @click="info.counter.value++">+1</button>
    <button @click="changeInfoCounterInSetUp">+1</button>

    <hr>
    <h2>当前计数（counter、newCounter放入info）: {{ info.newCounter }}</h2>
    <button @click="onLog">+1</button>



    <hr>
    <!-- 这里同上面一样，不可再用  .value -->
    <h2>当前计数（counter放入reactiveInfo）: {{ reactiveInfo }}-{{ reactiveInfo.counter }}-{{ reactiveInfo.counter.value }}</h2>
    <!-- counter放入reactiveInfo  修改counter不需  .value  -->
    <button @click="reactiveInfo.counter++, reactiveInfo.newCounter++">+1</button>
    <button @click="changeReactiveInfoCounter">+1</button>


    <!-- 
      对于单纯ref  
        在setup函数使用时，均要使用  .value
        在template中使用时，不加  .value   无论是在 {{  }}  或是在  template中的函数里

      对于放在普通对象中的ref
        无论是在template还是setup中，均要使用  .value

      对于放到reactive的ref
        无论是在template还是setup中，均不要使用  .value

    -->
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  export default {
    setup() {
      // 1.定义普通的数据: 可以正常的被使用
      // 缺点: 数据不是响应式的  即，用函数修改数据后，不会响应式修改
      let message = "Hello World"
      function changeMessage() {
        message = "你好啊,李银河!"
        console.log(message)
      }

      
      // 2.定义响应式数据
      // 2.1.reactive函数: 定义复杂类型的数据  对传入的类型是有限制的，它要求我们必须传入的是一个对象或者数组类型  如果我们传入一个基本数据类型（String、Number、Boolean）会报一个警告 value cannot be made reactive: XXX
      const account = reactive({
        username: "coderwhy",
        password: "123456"
      })
      function changeAccount() {
        account.username = "kobe"
        account.password = '888888'
      }


      
      // 2.2.ref函数: 定义简单类型的数据(也可以定义复杂类型的数据)   ref 会返回一个可变的响应式对象，该对象作为一个 响应式的引用 维护着它内部的值，这就是ref名称的来源；它内部的值是在ref的 value 属性中被维护的；在模板中引入ref的值时，Vue会自动帮助我们进行解包操作，所以我们并不需要在模板中通过 ref.value 的方式来使用； 但是在 setup 函数内部，它依然是一个 ref引用， 所以对其进行操作时，我们依然需要使用 ref.value的方式
      // ref的解包是浅层的解包，如果我们将ref放到一个reactive的属性当中，那么在模板中使用时，它会自动解包
      // counter定义响应式数据
      const counter = ref(0)
      function increment() {
        counter.value++
      }



      // 3.ref是浅层解包      这个多注意！！！！！！！！！！！！！！！！！ 这里的info只是个寻常的对象，也会自动解包？？？？？？？？？？
      const info = {
        counter,
        // 这里需要用字符串，否则会当做变量解析
        'newCounter': counter.value
      }

      function changeInfoCounterInSetUp() {
        info.counter.value++
      }

      function onLog() {
        console.log(info)
        console.log(info.newCounter)
        // 倘若这里修改响应式的counter，  由其而来的 newCounter 在dom中会响应式  但是即使下面又直接更改了newCounter，但是此时的值非响应的
        info.counter.value++
        info.newCounter++
        console.log(info)
        // info.newCounter++ 确实有作用，但是 不会响应式展示
      }



      // 4.将ref放入reactive里
      // 这种写法是没有响应式的效果的！！！！！！！！！！！！！或许这种写法就是错误的！！！！！！！！！！   ref才可以用这种方式，因此会用于接受返回的数据
      // let reactiveInfo = reactive({})
      // reactiveInfo = {
      //   'counter': counter,
      //   'newCounter': 0
      // }

      // 将ref放到一个reactive的属性当中，那么在模板中使用时，它会自动解包  此时使用
      let reactiveInfo = reactive({})
      reactiveInfo.counter = counter
      reactiveInfo.newCounter = 0

      // 将ref放到一个reactive的属性当中，那么在模板中使用时，它会自动解包  此时使用
      // let reactiveInfo = reactive({
      //   counter,
      //   'newCounter': 0
      // })

      function changeReactiveInfoCounter() {
        reactiveInfo.counter++
      }

      const decrement = () => {
        counter.value--
      }

      return {
        message,
        changeMessage,
        account,
        changeAccount,
        counter,
        increment,
        info,
        changeInfoCounterInSetUp,
        onLog,
        reactiveInfo,
        changeReactiveInfoCounter
      }
    }
  }
</script>

<style scoped>
</style>

