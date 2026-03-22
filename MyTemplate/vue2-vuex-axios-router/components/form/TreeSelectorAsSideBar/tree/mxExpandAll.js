import btnExpandAll from './btnExpandAll.vue'

export default {
  components: {
    btnExpandAll
  },
  data() {
    return {
      // 节点是否全部展开
      isExpandAll: false,
      defaultExpandedList: []
    }
  },
  computed: {
    // 二级节点列表
    rootChildNodes() {
      if (this.$refs.tree) return this.$refs.tree.store.root.childNodes
      return []
    }
  },
  methods: {
    // 操作 - 展开/收起全部二级节点
    async onExpandAll() {
      await this.$nextTick()

      this.isExpandAll = !this.isExpandAll
      if (this.isExpandAll) {
        // 遍历 - 二级节点 - 展开
        this.rootChildNodes.forEach(node => node.expand())
        this.saveExpandedList()
      } else {
        // 遍历 - 二级节点 - 收起
        this.rootChildNodes.forEach(node => node.collapse())
        this.defaultExpandedList = []
      }
    },
    // 监听 - 二级节点是否全部展开
    async onNodeExpand(eData, eNode) {
      await this.$nextTick()
      // 二级遍历
      this.isExpandAll = this.rootChildNodes.every(node => node.expanded)

      this.saveExpandedList()
    },

    // 保存 - 展开节点id
    saveExpandedList() {
      // 父节点收起， 子节点展开时， defaultExpandedList 不能包含子节点，否则父节点实际展示也会是展开
      // 因此， 需要重写 递归方法
      let list = []
      let loop = (arr) => arr.map(node => {
        if (node.expanded) {
          list.push(node.data.id)
          loop(node.childNodes)
        }
      })

      loop(this.rootChildNodes)
      this.defaultExpandedList = list
    }
  }
}
