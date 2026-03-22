import mxTencentWxWork from '@/mixins/mxTencentWxWork'
import WxWorkSyncData from '@/views/Home/Management/WxWork/WxWorkSyncData.vue'
import { isEmptyArray, WxWorkSyncDataTime } from '@/lib'
import { mapActions, mapGetters, mapState } from 'vuex'
import { Local } from 'mf-lib'

export default {
  mixins: [mxTencentWxWork],
  data() {
    return {
      syncCoolTime: 60 * 60 * 1000,
      loading: {
        sync: false
      }
    }
  },
  components: {
    WxWorkSyncData
  },
  computed: {
    ...mapGetters({
      serverTime: 'serverTime'
    }),
    ...mapState('system', {
      orgId: 'orgId'
    })
  },
  methods: {
    // 操作 - 自动同步企业微信组织和人员
    async autoSyncWxWork() {
      let cache = new Local(`WxWorkSyncDataTime-${this.orgId}`)

      // 上次同步时间
      let lastSyncTime = new Date(cache.get()).getTime() || 0
      // 下次同步的倒计时
      let delay = this.syncCoolTime - (this.serverTime - lastSyncTime)

      // 倒计时已经结束， 直接同步
      if (delay <= 0) {
        console.log('%c 执行自动同步企业微信组织和人员', 'line-height: 40px;color: #e295d6;')

        if (this.getWwOrgInfo) await this.getWwOrgInfo()
        if (!this.wwOrgInfo) return console.log('%c 未绑定企业微信,不用同步', 'line-height: 40px;color: #e295d6;')
        await this.onSyncWxWork('auto')
        cache.set(this.serverTime)

        await this.autoSyncWxWork()
      } else {
        console.log(`%c ${(delay / 60 / 1000).toFixed(2)}分钟后，自动同步企业微信组织和人员`, 'line-height: 40px;color: #e295d6;')
        // 继续倒计时
        setTimeout(() => {
          this.autoSyncWxWork()
        }, delay)
      }
    },
    // 操作 - 同步企业微信组织和人员
    async onSyncWxWork(type) {
      if (!this.wwOrgInfo) return false

      // 发起同步
      this.$set(this.loading, 'sync', true)

      // 同步id数据
      let { code: c1, data: d1 } = await this.$api.QywxCompany.sync()
      if (c1 !== 200) return this.loading.sync = false


      // 获取 待同步列表（用户名）
      let { code, data } = await this.$api.QywxCompany.getToBeUpdatedNamesList()
      if (code !== 200) return this.loading.sync = false
      if (!data || (isEmptyArray(data.deptIdList) && isEmptyArray(data.userIdList))) {
        if(type !== 'auto') this.$message.success('同步企业微信成功')
        return this.loading.sync = false
      }


      // 获取转换后的同步数据
      let syncData = await this.$refs.WxWorkSyncData.onSyncData(data)

      if (!syncData) {
        if(type !== 'auto') this.$message.error('同步失败')
        return this.loading.sync = false
      }
      let { code: c2 } = await this.$api.QywxCompany.updateDeptAndUserName(syncData)
      if (c2 !== 200) return this.loading.sync = false

      this.loading.sync = false
      if(type !== 'auto') this.$message.success('同步企业微信成功')
    }
  }
}
