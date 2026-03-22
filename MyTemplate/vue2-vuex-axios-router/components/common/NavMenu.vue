<template>
  <header class="relative bg-f flex start-center font-16 text-6 padding-left-12 overflow-auto"
          :style="{height: constant.headerHeight}">

    <!--Logo 区域-->
    <div class="logo-wrapper overflow margin-right-32">
      <el-image class="pointer" :src="logo.Full" :alt="logo.alt" fit="cover"
                @click="onLogoClick">
        <template slot="error" class="image-slot">
          <!-- <img class="width-224 height-56" v-if="userInfo.orgId" src="../../assets/logo/defaultLogo.png"> -->
          <div class="width-100p height-100p bg-e flex center-center text-unselect">LOGO</div>
        </template>
      </el-image>
    </div>

    <!--导航菜单-->
    <el-menu ref="menu" class="header-menu flex" mode="horizontal" :default-active="activePageIndex"
             @select="onSelectMenu">
      <el-menu-item v-for="(item,index) in navbarList" :key="item.id" :index="`${index}`">
        <span>{{ item.navbarName }}</span>
      </el-menu-item>
      <!-- <el-menu-item v-if="navBar.hide.length===1" index="5">
        <span>{{ navBar.hide[0].navbarName }}</span>
      </el-menu-item> -->
    </el-menu>
    <!-- <el-dropdown v-if="navBar.hide.length>1" @command="onSelectMenu" class="margin-right-36" trigger="click"
                 placement="bottom">
      <span class="font-24 el-icon-more"></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :key="index" :class="{'dropdown-active':activePageIndex==index+5}" :command="`${index+5}`"
                          v-for="(item,index) in navBar.hide">{{ item.navbarName }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->


    <!--填充块-->
    <div class="flex-1"></div>

    <div class="text-3 shrink-0 text-bold margin-right-12 pointer font-14" v-if="basicInfo.customLinkVisible">
      <a :href="basicInfo.customLink" target="_blank">意见反馈</a>
    </div>



    <div class="margin-right-20 relative" v-show="isLogin">
      <span class="el-icon-bell font-18 pointer" slot="reference"></span>
    </div>



    <!--其他-->
    <div class="margin-right-22 userinfo-wrapper shrink-0">
      <el-dropdown v-if="isLogin">
        <span class="flex center-center el-dropdown-link">
          <template v-if="userInfo">
            <el-avatar class="margin-right-4" :size="24" :src="userInfo.headImgUrl">
              <span v-if="userInfo.realName">{{ userInfo.realName[0] }}</span>
              <b v-else class="el-icon-user margin-right-8"></b>
            </el-avatar>
            <span>{{ userInfo.realName }}</span>
          </template>
          <span v-else>用户</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in pcnList" :key="item.id">{{item.navbarName}}</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="pointer select-none font-14" @click="onLogin" v-else>
        <b class="el-icon-user margin-right-8"></b>
        注册/登录
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'NavMenu',
  props: {
    basicInfo: {
      type: Object,
      required: true
    },
    navbarList: {
      type: Array,
      required: true
    },
    pcnList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activePageIndex: '0',
      searchValue: null,
      constant: {
        headerHeight: '88px'
      }
    }
  },
  computed: {
    navBar() {
      let hide = [...this.navbarList]
      let show = hide.splice(0, 5)
      return {
        hide,
        show
      }
    },
    ...mapState('config', {
      defaultLogo: 'logo'
    }),
    ...mapState('system', {
      userInfo: 'userInfo'
    }),
    ...mapGetters({
      isLogin: 'system/isLogin'
    }),
    logo() {
      return {
        Full: this.userInfo.pcLogoUrl
      }
    }
  },
  methods: {
    onLogoClick() {
    },
    onSearch() {
    },
    logout() {
    },
    onLogin() {
    },
    onSelectMenu() {
    }
  }
}
</script>

<style scoped lang="stylus">
header
  z-index 199
  box-sizing border-box

  .logo-wrapper
    flex-shrink 0
    transition all .6s
    width 224px

    .el-image
      width 224px
      height 56px
      margin-top 8px

  >>> .header-menu
    border none

    .el-menu-item
      padding 0
      margin-right 32px
      border none
      font-size 16px
      color NEUTRAL_COLOR_3
      transition all .6s

      &.is-active
        font-weight bold
        color MAIN_COLOR

      &.menu-hide
        width 0
        overflow hidden
        margin 0

  .search-wrapper
    border-radius 50px
    align-items center
    transition all .6s

    .search_btn {
      transform translateX(-36px)
      flex-shrink 0
      text-align center
      line-height 32px
      width: 32px;
      height: 32px;
      font-size 16px
      border-radius 50%
      background-color MAIN_COLOR

      &:hover {
        background-color #3471f3
      }
    }

    .el-input
      transition all .6s

      >>> .el-input__inner
        border none
        background-color NEUTRAL_COLOR_F2
        padding-right 50px
        border-radius 80px
        width 240px

      >>> .el-input-group__append
        border-radius 0 8px 8px 0

  .userinfo-wrapper
    transition all .6s
</style>

