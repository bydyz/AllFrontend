<template>
  <el-dialog :visible.sync="visible" :title="dialogInfo.title"
             :width="ui.width[0]" :close-on-click-modal="true" :before-close="close">
    <div class="line-height-24" v-loading="loading.page">
      <div class="font-14 text-6 margin-bottom-16">截止{{ isExpire ? formData.endTime : nowDate }}</div>
      <div class="font-14 text-3 text-bold margin-bottom-8">
        实际直播时长累计{{ usageMap.totalLive / 3600 | number }}小时;课件库使用量{{ usageMap.used | ByteConvert('GB') }}GB
      </div>
      <div class="font-14 text-6">
        其中视频{{ usageMap.video | ByteConvert('GB') }}GB，
        音频{{ usageMap.audio | ByteConvert('GB') }}GB，
        图片{{ usageMap.picture | ByteConvert('MB') }}MB，
        文档{{ usageMap.doc | ByteConvert('MB') }}MB
      </div>
    </div>
  </el-dialog>
</template>

<script>
import mxBaseDialog from '@/mixins/mxBaseDialog'

export default {
  name: 'DialogOrgProductUsage',
  mixins: [mxBaseDialog],
  data() {
    return {
      typeMapping: {
        UsageView: {
          title: '使用情况',
          detailAPI: this.$api.OrgProduct.usage
        }
      },
      endTimeMillisecond:null
    }
  },
  computed: {
    usageMap() {
      return {
        ...this.formData.usageMap?.teach_resource_usage,
        ...this.formData.usageMap?.teach_live_usage
      }
    },
    detailAPIParams() {
      return {
        id: this.formData.id,
        orgId: this.formData.orgId
      }
    },
    // 判断是否过期
    isExpire() {
      return new Date(this.endTimeMillisecond).getTime() < new Date().getTime()
    },
     // 当前时间
     nowDate(){
      return new Date().toLocaleString().replace(/\//g,'-')
    }
  },
  methods:{
    async getDetail() {
      let formData = await this.callDetailAPI()
      if (formData) this.formData = formData
      if(this.formData.endTime){
        this.endTimeMillisecond = this.formData.endTime.replace(new RegExp("-","gm"),"/")
      }
    },
  }
}
</script>

<style scoped lang="stylus">
</style>
