<template>
  <div>
    <h2>ShowInfo: {{ info }}</h2>

    <!-- 代码没有错误, 但是违背规范(单项数据流) -->
    <button @click="info.name = 'kobe'">ShowInfo按钮</button>

    <!-- 正确的做法: 符合单项数据流-->
    <button @click="showInfobtnClick">ShowInfo按钮</button>

    <hr>

    <!-- 使用readonly的数据 -->
    <h2>ShowInfo: {{ roInfo }}</h2>
    <!-- 代码就会无效(报警告) -->
    <!-- <button @click="roInfo.name = 'james'">ShowInfo按钮</button> -->
    <!-- 正确的做法 -->
    <button @click="roInfoBtnClick">roInfo按钮</button>
  </div>
</template>

<script>
  export default {
    props: {
      // reactive数据
      info: {
        type: Object,
        default: () => ({})
      },
      // readonly数据
      roInfo: {
        type: Object,
        default: () => ({})
      }
    },
    // 向父组件传递数据，是通过事件来的，先要用  emits  加以声明
    emits: ["changeInfoName", "changeRoInfoName"],
    /* 
      setup函数的参数，它主要有两个参数：
        第一个参数：props
        第二个参数：context

      props非常好理解，它其实就是父组件传递过来的属性会被放到props对象中，我们在setup中如果需要使用，那么就可以直接通过props参数获取：
        对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义；
        并且在template中依然是可以正常去使用props中的属性，比如message；
        如果我们在setup函数中想要使用props，那么不可以通过 this 去获取（后面我会讲到为什么）；
        因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可

      context，我们也称之为是一个SetupContext，它里面包含三个属性：
        attrs：所有的非prop的attribute；
        slots：父组件传递过来的插槽（这个在以渲染函数返回时会有作用，后面会讲到）；
        emit：当我们组件内部需要发出事件时会用到emit（因为我们不能访问this，所以不可以通过 this.$emit发出事件）



      setup的返回值可以在模板template中被使用
      可以通过setup的返回值来替代data选项，即return 变量名
      可以返回一个执行函数来代替在methods中定义的方法，即return 函数名
    */
    setup(props, context) {
      function showInfobtnClick() {
        context.emit("changeInfoName", "kobe")
      }

      function roInfoBtnClick() {
        context.emit("changeRoInfoName", "james")
      }

      return {
        showInfobtnClick,
        roInfoBtnClick
      }
    }
  }
</script>

<style scoped>
</style>

