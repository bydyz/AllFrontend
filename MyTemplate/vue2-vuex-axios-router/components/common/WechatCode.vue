<template>
  <div class="wechat-code flex center-center">
    <div :id="id"></div>
  </div>
</template>

<script>
import {WxLogin} from '@/lib'
import url from 'url'
import {mapState} from 'vuex'
import store from '@/store'
export default {
  name: 'WechatCode',
  mounted() {
    setTimeout(() => {
      this.createWeiXinCode()
    }, 1)
  },
  data() {
    return {
      id: 'wx' + Date.now(),
      domain: store.state.config.domain.wechat,
      redirectUrlMaps: {
        login: '/wechat/login',
        bind: '/wechat/bind'
      }
    }
  },
  props: {
    query: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'login'
    }
  },

  computed: {
    ...mapState('config', {
      wxAppId: 'wxAppId'
    }),
    ...mapState('system', {
      token: 'token'
    }),
    redirect_url() {
      let path = this.redirectUrlMaps[this.type]
      return path || this.redirectUrlMaps.login
    }
  },

  methods: {
    createWeiXinCode() {
      console.log(this.domain);
      let query = {
        ...this.query,
        redirect_url: this.redirect_url
      }
      new WxLogin({
        self_redirect: true,
        id: this.id,
        appid: this.wxAppId,
        scope: 'snsapi_login',
        redirect_uri: url.format({
          pathname: this.domain,
          query: {
            json: JSON.stringify(query).replace(/"/g,'')
          }
        }),
        state: 'wa-admin'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.wechat-code
  width 275px
  height 275px
  margin 0 auto
  overflow hidden

  > div
    margin-top 27px
</style>