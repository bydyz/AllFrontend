<template>
    <keep-alive :include="keepAliveNameList">
      <router-view></router-view>
    </keep-alive>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'RouterAlive',
  computed: {
    ...mapGetters({
      keepAliveNameList: 'router/keepAliveNameList',
      isDev: 'isDev'
    })
  }
}
</script>