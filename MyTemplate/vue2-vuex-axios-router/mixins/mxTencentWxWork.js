import { mapActions, mapState } from 'vuex'

export default {
  async created() {
    if (this.getWwOrgInfo) await this.getWwOrgInfo()
  },
  data() {
    return {
      wwPath: {
        login: '/wwLogin.html',
        install: '/wwInstall.html',
        download: '/wwDownload.html',
        sync: '/WxWork/SyncData'
      }
    }
  },
  computed: {
    ...mapState('config', {
      domain: 'domain'
    }),
    ...mapState('wxWork', {
      wwOrgInfo: 'wwOrgInfo'
    }),
    wwInstallUrl() {
      let oBusiness = new URL(this.domain.platform)
      oBusiness.pathname = '/WxWorkParse'
      let businessPath = oBusiness.toString()

      let oUrl = new URL(this.domain.wxWork)
      oUrl.pathname = this.wwPath.install
      oUrl.searchParams.set('businessPath', businessPath)
      return oUrl.toString()
    },
    wwSyncUrl() {
      let oUrl = new URL(this.domain.wxWork)
      oUrl.pathname = this.wwPath.sync
      return oUrl.toString()
    }
  },
  methods: {
    ...mapActions({
      getWwOrgInfo: 'wxWork/getWwOrgInfo'
    }),
    // 获取 - ticket [agentTicket] - 提供给 wx.agentConfig 使用
    async getAgentTicket() {
      let { code, data } = await this.$api.QywxJsapi.agentTicket()
      if (code !== 200) return false
      return data
    },
    // 获取 - ticket - 提供给 wx.config 使用
    async getTicket() {
      let { code, data } = await this.$api.QywxJsapi.ticket()
      if (code !== 200) return false
      return data
    },
    // 操作 - 安装
    async onWWInstall() {
      window.open(this.wwInstallUrl, '_self')
    }
  }
}
