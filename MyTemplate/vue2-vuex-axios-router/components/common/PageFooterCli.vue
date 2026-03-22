<template>
  <div class="icp-footer" :class="data.id">

    <div class="nav-list" v-if="data.navVisible">
      <div class="nav-item" v-for="item in navbarList" :key="item.id">
        <span class="pointer" @click="onLink(item)">{{ item.navbarName }}</span>
      </div>
    </div>

    <div class="text-icp">
      <span v-if="preview">{{ data.textICP }}</span>
      <a href="https://beian.miit.gov.cn" target="_blank" v-else>{{ data.textICP }}</a>
    </div>

    <div class="text-support">
      <el-image class="ico" :src="logo"></el-image>
      <span>{{ data.textSupport }}</span>
    </div>

  </div>
</template>

<script>

export default {
  name: 'PageFooterCli',
  props: {
    data: {
      type: Object,
      required: true
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logo: require('@/assets/logo/minLogo.png')
    }
  },
  computed: {
    navbarList() {
      if (this.data.navbarList&&this.data.navbarList.length) return this.data.navbarList
      if (this.preview) return [
        {id: 1, navbarName: '一级导航1'},
        {id: 2, navbarName: '一级导航2'},
        {id: 3, navbarName: '一级导航3'},
        {id: 4, navbarName: '一级导航4'},
        {id: 5, navbarName: '一级导航5'}
      ]
      return []
    }
  },
  methods: {
    onLink(item) {
      // if (this.preview) return false
      // window.open(item.url, '_blank')
    }
  }
}
</script>

<style scoped lang="stylus">
.icp-footer
  width 100%
  background-color #21252B
  overflow hidden
  text-align center

  .nav-list
    padding-top 32px
    height 60px
    display flex
    justify-content center

    .nav-item
      padding 0 40px
      color NEUTRAL_COLOR_C
      line-height 20px
      font-size 13px
      word-break keep-all

      & + .nav-item
        &:before
          content ''
          height 16px
          width 1px
          background-color NEUTRAL_COLOR_9
          display block
          margin-bottom -16px
          margin-left -40px


  .text-icp
    line-height 16px
    color NEUTRAL_COLOR_9
    font-size 12px
    height 28px
    margin-top 16px

  .text-support
    display flex
    justify-content center
    line-height 16px
    font-size 12px
    color NEUTRAL_COLOR_9
    padding-bottom 16px

    .ico
      width 14px
      height 14px
      margin-right 2px

  &.NavbarFooter
    .text-icp
      height 36px

    .text-support
      padding-bottom 12px
</style>