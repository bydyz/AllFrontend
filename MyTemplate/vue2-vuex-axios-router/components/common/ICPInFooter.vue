<template>
  <div class="text-center line-height-24 icp-footer text-3 padding-bottom-16">
    <div class="line-height-22">
      <a href="https://beian.miit.gov.cn" target="_blank" class="rich-text" v-html="$xss(ICP)"></a>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ICPInFooter',
  computed: {
    ...mapState('config', {
      ICP: 'ICP'
    })
  }
}
</script>

<style scoped lang="stylus">
.icp-footer
  //height 350px
  background-color NEUTRAL_COLOR_1C
</style>