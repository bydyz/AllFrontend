export default {
  data() {
    return {
      key: 'id',
      addedKey: 'added',
      selectionList: []
    }
  },
  methods: {
    // 操作 - 添加
    onSelectionAdd(item) {
      this.isSelectionSelected(item) || this.selectionList.push(item)
    },
    // 操作 - 移除
    onSelectionRemove(index) {
      this.selectionList.splice(index, 1)
    },
    // 操作 - 添加全部
    onSelectionAddAll() {
      this.tableData.forEach(this.onSelectionAdd.bind(this))
    },
    // 操作 - 移除全部
    onSelectionRemoveAll() {
      this.selectionList = []
    },
    // 判断 - 元素是否被选中
    isSelectionSelected(item) {
      return this.selectionList.some(a => item.id === a.id) || item.added
    }
  }
}