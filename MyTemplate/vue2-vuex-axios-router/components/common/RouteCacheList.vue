<template>
  <div class="route-cache-list overflow" :style="{height: constant.routeCacheHeight + 'px'}">
    <el-button v-for="(item,index) in queue" :key="index" :type="$route.name === item.name?'primary':'default'" size="small" @click="onSelect(item)">
      <span>{{ item.meta.title }}</span>
      <i class="el-icon-close font-14 margin-left-8" @click.stop="delBtn(item)" v-if="!item.isFixed && index"></i>
    </el-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'RouteCacheList',
  data () {
    return {
      paint: null
    }
  },
  computed: {
    ...mapState('config', {
      constant: 'constant'
    }),
    ...mapState('router', {
      queue: 'queue'
    })
  },
  methods: {
    ...mapMutations({
      routerDelete: 'router/delete'
    }),
    onSelect (item) {
      this.$router.push({
        name: item.name,
        query: item.query,
        params: {
          cache: true
        }
      })
    },
    delBtn (item) {
      this.routerDelete({ queue: this.queue, name: item.name })
    }
  }
}
</script>

<style scoped lang="stylus">
.el-button
  +.el-button
    margin-left 8px
.route-cache-list
  padding 4px 8px
  .el-button
    padding 0 8px
    height 28px
    line-height 28px
    margin-bottom 4px
</style>
