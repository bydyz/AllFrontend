<template>
  <el-pagination background :page-sizes="pageSizes" :current-page.sync="paginationInner.pageNum"
                 :page-size.sync="paginationInner.pageSize" :total="total"
                 :pager-count="5" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</template>

<script>
export default {
  name: 'PaginationControl',
  data() {
    return {
      paginationInner: {
        pageNum: 1,
        pageSize: this.pageSizes[0]
      }
    }
  },
  props: {
    pageSizes: {
      type: Array,
      default() {
        return [10, 25, 50, 100]
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pagination: {
      type: Object
    }
  },
  watch: {
    paginationInner: {
      deep: true,
      handler(val) {
        this.$emit('update:pagination', val)
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="stylus">
/*样式穿透 >>> 相当于 sass/less 的/deep/ */
/*同代&写法*/
.el-pagination >>>
&.is-background
  .btn-next, .btn-prev, .el-pager li
    width 28px
    min-width auto
    padding 0
    margin 0 2px
    background-color NEUTRAL_COLOR_F2
    color NEUTRAL_COLOR_9

  .el-input.el-input--suffix
    margin 0
    width 88px

  .el-icon-arrow-up:before
    content "\e6e1"

  .el-pagination__total
    word-spacing -4px
    margin-right 12px

  .el-pagination__jump
    margin-left 10px

    .el-input
      margin 0 6px
      width 48px
      padding 0
</style>