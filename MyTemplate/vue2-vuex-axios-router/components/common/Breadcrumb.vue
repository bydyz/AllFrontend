<!--面包屑-->
<template>
  <div class="flex start-center font-14">
    <el-breadcrumb :class="theme" separator-class="el-icon-arrow-right">
      <template v-for="(item, index) in breadcrumb">
        <template v-if="index < breadcrumb.length - 1">
          <el-breadcrumb-item :to="{ path: item.path }" :key="index" v-if="item.path">{{
              item.meta.title
            }}
          </el-breadcrumb-item>
        </template>
        <template v-else>
          <el-breadcrumb-item :to="{ path: element.path }" v-for="(element, idx) in extraCrumb"
                              :key="index + '_' + idx">{{ element.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :key="index">{{ lastCrumb || item.meta.title }}</el-breadcrumb-item>
        </template>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    // 根据背景决定深色还是浅色
    theme: {
      type: String,
      default: 'dark' // light | dark
    },
    // 自定义最后一级
    lastCrumb: {
      type: String
    },
    // 额外路由
    extraCrumb: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    breadcrumb() {
      let list = this.$route.matched || []
      list = list.filter(item => !/^(Education|Management)$/.test(item.name))
      return list
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-breadcrumb
  &.dark
    >>> .el-breadcrumb__inner
      color #333

    >>> .el-breadcrumb__separator
      color #666

  &.light
    >>> .el-breadcrumb__inner
      color #fff

    >>> .el-breadcrumb__separator
      color #eee
</style>