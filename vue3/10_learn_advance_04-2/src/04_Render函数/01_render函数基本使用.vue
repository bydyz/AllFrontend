<script>
  import { h } from 'vue'
  // h() 函数是一个用于创建 vnode 的一个函数；
  // 其实更准备的命名是 createVNode() 函数，但是为了简便在Vue将之简化为 h() 函数；

  // h(tag, props, children) 函数  接受三个参数
  // 第一个tag       必须的   要创建的元素的标签名或组件。可以是字符串（HTML 标签名）或一个组件选项对象。  
  // 第二个props     可选的   {}，要添加到元素的属性，以键值对的形式提供
  // 第三个children  可选的   表示元素的子节点，可以是文本、子元素数组、其他虚拟 DOM 节点 或者 插槽内容

          // 如果 children 是字符串或数字，它将被视为元素的文本内容。 h('div', null, 'Hello, Vue!')

          // 如果 children 是数组，数组中的每个元素都会被视为元素的子节点。数组的每个元素可以是字符串、数字、其他虚拟 DOM 节点或组件。
                // h('ul', null, [
                //                 h('li', null, 'Item 1'),
                //                 h('li', null, 'Item 2'),
                //               ])

          // children 可以是其他通过 h 函数创建的虚拟 DOM 节点。这样可以构建嵌套的元素结构
                // const childNode = h('p', null, 'Nested Element');
                // h('div', null, childNode)

          // children 可以包含插槽内容。插槽内容通常是通过 v-slot 或 slot API 提供的。
                // const slotContent = h('span', null, 'Slot Content');
                // h('div', null, slotContent)


  // ◼ 注意事项：
  //    如果没有props，那么通常可以将children作为第二个参数传入；
  //    如果会产生歧义，可以将null作为第二个参数传入，将children作为第三个参数传入；

  // ◼ h函数可以在两个地方使用：
  //    render函数选项中；
  //    setup函数选项中（setup本身需要是一个函数类型，函数再返回h函数创建的VNode）；



  // 写成这个样子，已经就可以当成组件来用了
  export default {
    render() {
      return h("div", { className: "app" }, [
        h("h2", { className: "title" }, "我是标题"),
        h("p", { className: "content" }, "我是内容, 哈哈哈"),
      ])
    }
  }
</script>

<style scoped>

</style>
