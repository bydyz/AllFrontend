import mxExpandAll from './mxExpandAll'  // 二级分类展示与收起混合
import mxSearch from './mxSearch' //搜索框混合

export default {
  mixins: [mxExpandAll, mxSearch],
  created() {
    this.$on('dataAPIEnd', () => {
      this.getTreeList()

      this.emptyItem = {
        ...this.treeList[0],
        id: -1,
        children: undefined
      }

      // 选中状态
      this.$nextTick(() => {
        // 1. 上次选中项
        if (this.selection) {
          return this.$refs.tree.setCurrentKey(this.selection?.id)
        }

        // 2. 全部选择项
        if (this.units.selectAllBar.visible) {
          this.onSelect()
          return this.$refs.tree.setCurrentKey(null)
        }

        // 3. 第一项
        this.onSelect(this.treeList[0])
        this.$refs.tree.setCurrentKey(this.treeList[0]?.id)
      })
    })
  },
  data() {
    return {
      treeList: [],

      // 未选择分类
      emptyItem: {
        id: -1
      },
      // 选中对象
      selection: null
    }
  },
  props: {
    props: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    propsInner() {
      // 添加默认值
      return {
        label: 'name',
        children: 'children',
        enabled: 'enabled',
        ...this.props
      }
    }
  },
  methods: {
    // 操作 - 选择节点
    onSelect(item = null, node) {
      if (!item || (!node && item.id === -1)) {
        // 全部课程分类 || 未选择分类
        this.selection = item
        this.$refs.tree.setCurrentKey(null)
        this.$emit('update:selection', item)
        this.$emit('update:selections', null)

      } else {
        // 树节点分类
        this.selection = item

        let idList = this.$utils.ArrayFlat([item]).map(a => a.id)
        this.$emit('update:selectId', idList)

        this.$emit('update:selection', item)
        if (node && node.data.parentId) {
          this.$emit('update:selections', [node.data.parentId, item.id])
        } else {
          this.$emit('update:selections', item ? [item.id] : [])
        }
      }
    },

    getTreeList() {
      let { dataResultParse } = this.paneInfo
      let treeList = this.dataAPIResult
      if (dataResultParse) treeList = dataResultParse(this.dataAPIResult) || []
      this.$emit('update:treeList', treeList)
      this.treeList = treeList
    }
  }
}
