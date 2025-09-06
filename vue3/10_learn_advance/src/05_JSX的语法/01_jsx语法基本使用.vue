<script lang="jsx">

// ◼ 如果我们希望在项目中使用jsx，那么我们需要添加对jsx的支持：
//    jsx我们通常会通过Babel来进行转换（React编写的jsx就是通过babel转换的）；
//    对于Vue来说，我们只需要在Babel中配置对应的插件即可；


// ◼ 安装Babel支持Vue的jsx插件：
  // npm install @vue/babel-plugin-jsx -D

  // 如果是Vite环境，需要安装插件：
  // npm install @vitejs/plugin-vue-jsx -D



// 在babel.config.js配置文件中配置插件：

// module.export = {
//   presets: [
//     "@vue/cli-plugin-babel/preset"
//   ],
//   plugins: [
//     "@vue/babel-plugin-jsx"
//   ]
// }


  export default {
    render() {
      return (
        <div class="app">
          <h2>我是标题</h2>
          <p>我是内容, 哈哈哈</p>
        </div>
      )
    }
  }
</script>

<style lang="less" scoped>

</style>
