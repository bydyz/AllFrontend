<template>
  <ol class="flex start-center list">
    <li>
      <el-dropdown>
        <span class="flex center-center el-dropdown-link">
          <template v-if="userInfo">
            <el-avatar class="margin-right-4" :size="24" :src="userInfo.headImgUrl"
                       v-if="userInfo.headImgUrl"></el-avatar>
            <el-avatar class="margin-right-4" :size="24" v-else>{{ (userInfo.realName || '').substr(0, 1) }}</el-avatar>
          </template>
          <span v-if="userInfo">{{ userInfo.userAccount }}</span>
          <span v-else>用户</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="clearOrgId" v-if="$route.name !== 'Index' && myOrgList.length >= 2">切换机构</el-dropdown-item>
          <!-- <el-dropdown-item @click.native="$router.push({ name: 'Management' })">管理中心</el-dropdown-item> -->
          <el-dropdown-item @click.native="goToUnion('Main')">管理中心</el-dropdown-item>
          <!-- <el-dropdown-item @click.native="$router.push({ name: 'Account' })">账号设置</el-dropdown-item> -->
          <el-dropdown-item @click.native="goToUnion('Setting')">账号设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ol>
</template>

<script>
import {mapActions, mapMutations, mapState,mapGetters} from 'vuex'

export default {
  name: 'DropMenu',
  computed: {
    ...mapGetters('common',{
      myOrgList:'myOrgList'
    }),
    ...mapState('system', {
      userInfo: 'userInfo'
    }),
    ...mapState('config', {
      domain: 'domain'
    })
  },
  methods: {
    ...mapMutations({
      setOrgId: 'system/setOrgId',
      permissionMenuUpdate: 'system/permissionMenuUpdate',
    }),
    ...mapActions({
      logout: 'system/logout'
    }),
    clearOrgId() {
      this.setOrgId(null)
      this.permissionMenuUpdate([])
      window.open(`${origin}/`, '_self')
      // this.$router.push({ name: 'Index' })
    },
    goToUnion(path){
      window.open(`${this.domain.uniOrg}/${path}`, '_blank');
    },
    logout(){
      this.$router.push({name: 'Logout'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  li
    padding 0 8px
    cursor pointer
    line-height 48px

    &:hover
      background-color BACKGROUND_COLOR
</style>