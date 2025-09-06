<template>
  <h2>第一个组件</h2>
  <nav-bar>
    <template #left>
      <button>{{ leftText }}</button>
    </template>

    <!-- v-slot:center   简写   #center -->
    <template #center>
      <span>内容</span>
    </template>

    <template v-slot:right>
      <a href="#">登录</a>
    </template>

    <h2>这是替代默认插槽，即name为default的slot</h2>
  </nav-bar>

  <br><br><br>

  <!-- nav-bar只给一个插槽传入数据  通过 [] 并设置其中的值，来给某一个插槽赋值 -->
  <h2>第二个组件</h2>
  <nav-bar>
    <template v-slot:[position]>
      <a href="#">注册</a>
    </template>
  </nav-bar>

  <button @click=" position = 'left' ">左边</button>
  <button @click=" position = 'center' ">中间</button>
  <button @click=" position = 'right' ">右边</button>
</template>

<script>
  import NavBar from './NavBar.vue'

  export default {
    components: {
      NavBar
    },
    data() {
      return {
        position: "center",
        leftText: "返回"
      }
    }
  }
</script>

<style scoped>
</style>

