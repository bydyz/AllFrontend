
<template>
  <el-carousel :height="height" width :autoplay="false">
    <el-carousel-item v-for="(item,index) in list" :key="index" class="flex center-center">
      <slot item="item">
        <el-image :src="item.filePath" fit="cover" class="image-item">
          <div :style="{height}" class="error-box width-100p flex center-center column bg-wbg" :class="isWeb ? 'radius-4': 'radius-12'" slot="error">
            <div class="err-img flex center-center">
              <el-image :class="isWeb ? 'radius-4': 'radius-12'" :src="require('@/assets/wpage/no_banner.png')" fit="fill" style="width:84px;height:84px;"></el-image>
            </div>
            <!-- <div class="font-16 margin-top-8" style="color:#A7B4CF;">图片广告</div> -->
          </div>
        </el-image>
      </slot>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '380px'
    },
    isWeb: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="stylus">
.err-img
  width 200px
  height 114px
  background #DFE5F2
.el-image
  width 100%
  // min-width 1920px
  >>> .error-box
    font-size 120px
    color SHADOW_COLOR
.el-carousel
  >>> .el-carousel__indicators
    .el-carousel__indicator
      &.is-active
        .el-carousel__button
          width 60px
      .el-carousel__button
        background-color #c4c4c4
        height 12px
        width 12px
        border-radius 6px
>>>.el-image__inner
  border-radius 12px
  // border-radius 20px
>>> .el-carousel__arrow--right
  right 40px
>>> .el-carousel__arrow--left
  left 40px
>>>.el-carousel__indicators--horizontal
  bottom 15px
</style>

