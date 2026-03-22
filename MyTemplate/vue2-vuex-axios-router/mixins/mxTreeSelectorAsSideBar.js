import TreeSelectorAsSideBar from '@/components/form/TreeSelectorAsSideBar/index.vue'

export default {
  components: {
    TreeSelectorAsSideBar
  },
  data() {
    return {
      categoryVisible: true,
      categoryTree: [],
      categorySelection: null,
      categoryIdKey: 'id'
    }
  },
  computed: {
    categoryIdList() {
      let categoryIdList = []
      if (this.categorySelection) {
        categoryIdList = this.$utils.ArrayFlat([this.categorySelection]).map(item => item[this.categoryIdKey])
      }
      return categoryIdList
    },
    categoryIdsWithParent() {;
      if (!this.categorySelection) return [-1]
      if (this.categorySelection.parentCode) return [...this.categorySelection.parentCode.split(',').slice(1).map(Number), this.categorySelection[this.categoryIdKey]]
      return [this.categorySelection[this.categoryIdKey]]
    },
    categoryIdsWithoutParent() {
      if (!this.categorySelection) return [-1]
      return [this.categorySelection[this.categoryIdKey]]
    }
  }
}
