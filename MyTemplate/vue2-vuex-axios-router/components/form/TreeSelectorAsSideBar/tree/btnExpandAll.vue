<template>
  <el-button type="text" :title="info.title" @click.stop="onClick">
    <iconpark-icon :name="info.icon"></iconpark-icon>
  </el-button>
</template>

<script>
export default {
  name: 'btnExpandAll',
  methods: {
    onClick() {
      let { onExpandAll } = this.parentNodeFind
      onExpandAll && onExpandAll()
    }
  },
  computed: {
    parentNodeFind() {
      // 查找父组件是否有onExpandAll的方法
      if (this.$parent.onExpandAll) return this.$parent
      if (this.$parent.$parent?.onExpandAll) return this.$parent.$parent
      return this
    },
    info() {
      let { isExpandAll } = this.parentNodeFind

      if (isExpandAll)
        return {
          title: '收起全部二级分类',
          icon: 'fold-up-one'
        }

      return {
        title: '展开全部二级分类',
        icon: 'drop-down-list'
      }
    }
  }
}
</script>

<style scoped lang="stylus"></style>
