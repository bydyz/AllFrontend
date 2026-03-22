<template>
  <div class="cert-template-view" :class="{dev: isDev}" v-show="info.isEdit || id || value">
    <!--模板选择区域-->
    <div v-if="info.isEdit" class="flex margin-bottom-12"
         :class="certTemplateTypeList[2]&&certTemplateTypeList[2].value ? 'start-center':''">
      <div class="template-wrap flex center-start el-icon-check relative pointer margin-right-16 width-140 height-100"
           :class="{active: modelType === item.id,'image-bg': !item.value}" v-for="item in certTemplateTypeList"
           :key="item.id" @click="onSelectModal(item)">
        <el-image class="height-100" v-if="item.value" :src="item.value"></el-image>
        <div class="absolute text-center width-100p line-height-20 font-15 text-bold">{{ item.name }}</div>
      </div>
    </div>

    <div class="flex start-start">
      <!--预览、编辑区域-->
      <div>
        <div class="border-9" :class="{overflow: !info.isEdit}">
          <div class="cert-wrapper relative" :style="{zoom: info.viewZoom}" @mousedown="onMouseDown" @wheel="onWheel"
               v-loading="loading.page">
            <!--元素-->
            <template v-for="(el,code) in elMaps">
              <el-image ref="backgroundUrl" class="flex" v-if="code === 'backgroundUrl'"
                        :style="parseStyle(el)"
                        :src="backgroundUrl || el.value" :key="code">
                <div slot="error" class="width-100p text-bold">
                  <div class="font-36 flex center-center column bg-background text-6"
                       :class="{'image-bg': modelType === 100}"
                       :style="{width: backgroundWidth + 'px',height: `${backgroundWidth * .75}px`}">
                    <div v-if="modelType === 100"></div>
                    <div v-else class="el-image__inner flex center-center">加载失败</div>
                  </div>
                </div>
              </el-image>
              <div v-else :key="code" :code="code" v-show="el.visible" class="element break-all"
                   :class="{'is-active': code === activeIndex,edit: info.isEdit}" :style="parseStyle(el)">
                <template v-if="code === 'headImg'">
                  <el-image class="width-100p height-100p flex" :src="images.avatar" fit="cover"></el-image>

                  <!--拖拽点 - 缩放大小-->
                  <div class="se-resize" @mousedown.stop="onSeResize">
                    <span class="mdi-set mdi-arrow-top-left-bottom-right"></span>
                  </div>
                </template>
                <template v-else>
                  <div>{{ el.text }}</div>

                  <!--拖拽点 - 缩放大小-->
                  <div class="e-resize right" @mousedown.stop="onEResizeFromRight">
                    <span class="mdi-set mdi-arrow-split-vertical"></span>
                  </div>
                  <div class="e-resize left" @mousedown.stop="onEResizeFromLeft">
                    <span class="mdi-set mdi-arrow-split-vertical"></span>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="width-160 padding-left-16 padding-right-16 controls" v-if="info.isEdit">
        <!--功能控制区域-->
        <div v-show="modelType === 100">
          <ImageUpload ref="ImageUpload" :is-edit="false" :auto-upload="false" v-model="currentModel.value"
                       @input="onSelectModal(currentModel)" accept=".png,.jpg,.jpeg" :options="{
                         autoCrop: false,
                         centerBox: false,
                         canScale: false,
                         editMode: 'fixedImage',
                         canMove: false
                       }">
            <el-tooltip effect="light" content="支持png和jpg，图片大小不超过5MB，图片宽度建议不小于800">
              <el-button type="primary" icon="el-icon-upload" size="small">
                {{ backgroundUrl ? '更换证书图片' : '上传证书图片' }}
              </el-button>
            </el-tooltip>
            <div slot="tips"></div>
          </ImageUpload>
          <div class="margin-top-8 margin-bottom-4 font-12 text-6">
            上传提示：图片宽度建议不小于800
          </div>
        </div>

        <!--样式控制区域-->
        <div class="font-12">
          <div class="text-6 padding-bottom-8">
            <div>
              操作提示：可拖拽改变位置，可滚轮缩放字体
            </div>
          </div>

          <div>
            <div class="line-height-32">字体</div>
            <el-select v-model="fontFamily" size="small" @change="onSelectFontFamily">
              <el-option v-for="item in fontFamilyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>

          <div v-for="(item,index) in elMaps" :key="index" v-show="index === activeIndex">
            <div v-show="item.code === 'awardDate'">
              <div class="line-height-32">时间格式</div>
              <el-select v-model="item.style.dateFormat" size="small">
                <el-option v-for="item in formatDateList" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </div>

            <div>
              <div class="line-height-32">字体大小</div>
              <el-input-number size="small" controls-position="right" v-model="item.style.fontSize" :min="12" :max="80"
                               class="width-88"></el-input-number>
            </div>


            <!--头像缩放-->
            <div v-if="item.code === 'headImg'">
              <div class="line-height-32">头像缩放</div>
              <el-input-number size="small" controls-position="right" class="width-88"
                               v-model="item.style.width" :min="headImgConfig.minScale" :max="headImgConfig.maxScale"
                               @input="item.style.height = $event * 1.5" @blur="onHeadImgBlur(item)"></el-input-number>
              <span class="margin-left-4">%</span>
            </div>


            <div>
              <div class="line-height-32">水平位置</div>
              <el-input-number size="small" controls-position="right" class="width-88" v-model="item.style.x" :min="0"
                               :max="backgroundWidth * info.zoom - 10"></el-input-number>
            </div>

            <div>
              <div class="line-height-32">垂直位置</div>
              <el-input-number size="small" controls-position="right" v-model="item.style.y" :min="0" class="width-88"
                               :max="backgroundHeight > 200 ? backgroundHeight * info.zoom - 10: 9999"></el-input-number>
            </div>

            <template v-if="item.code !== 'headImg'">

              <div>
                <div class="line-height-32">宽度</div>
                <el-input-number size="small" controls-position="right"
                                 v-model="item.style.width" :min="0"
                                 :max="backgroundWidth - item.style.x"></el-input-number>
              </div>

              <!--
                          <div>
                            <div class="line-height-32">高度</div>
                            <el-input-number size="small" controls-position="right"
                                             v-model="item.style.height" :min="0"
                                             :max="backgroundHeight > 200 ? backgroundHeight - 10 : 999"></el-input-number>
                          </div>
              -->

              <div class="format-align">
                <div class="line-height-32">对齐方式</div>
                <el-radio-group v-model="item.style.textAlign" size="small">
                  <el-radio-button v-for="a in textAlignList" :key="a.id" :label="a.id" :title="a.name">
                    <span :class="a.icon"></span>
                  </el-radio-button>
                </el-radio-group>
              </div>


            </template>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mxIndex from './mxIndex'
import ImageUpload from '@/components/form/ImageUpload'
import { mapGetters } from 'vuex'

export default {
  name: 'CertTemplateView',
  mixins: [mxIndex],
  components: {
    ImageUpload
  },
  computed: {
    ...mapGetters({
      isDev: 'isDev'
    })
  }
}
</script>

<style scoped lang="stylus">
.image-bg
  background-image radial-gradient(#eee 0%, #fff 33%)
  background-size 10px 10px

>>> .el-input-number.is-controls-right .el-input__inner
  padding-right 32px
  padding-left 8px

.cert-template-view
  min-height 100%
  color #000

  .template-wrap
    .text-center
      top 50%
      margin-top -10px

    &::before
      position absolute
      right 0
      bottom 0
      z-index 1
      border-bottom 20px solid NEUTRAL_COLOR_9
      border-left 30px solid transparent
      width 0
      height 0
      text-indent -15px
      line-height 28px
      font-size 12px
      color NEUTRAL_COLOR_F
      font-weight bold

    &.active::before
      border-bottom-color MAIN_COLOR

  .cert-wrapper
    transform-origin 0 0
    -webkit-user-select none

    &.el-loading-parent--relative
      min-height 300px

    .element
      position absolute
      z-index 20
      overflow hidden
      line-height 1.5

      .se-resize
        position absolute
        width 8px
        height 8px
        right -4px
        bottom -4px
        cursor se-resize

        .mdi-set
          display block
          width 12px
          position absolute
          top 50%
          line-height 12px
          margin -6px 0 0 -2px
          font-size 12px
          opacity 0

      .e-resize
        position absolute
        width 8px
        height 100%
        top 0
        cursor e-resize

        .mdi-set
          display block
          width 12px
          position absolute
          top 50%
          line-height 12px
          margin -6px 0 0 -2px
          font-size 12px
          opacity 0

        &.right
          right -4px

        &.left
          left -4px

      &.edit
        cursor move
        overflow visible

        &:hover, &.is-active
          box-shadow 0 0 1px 1px NEUTRAL_COLOR_3

          .e-resize, .se-resize
            .mdi-set
              opacity 1


  .controls
    .format-align
      >>> .el-radio-button__inner
        width 42px
        line-height 30px
        padding 0
        font-size 16px

  &.dev
    .cert-wrapper
      .se-resize
        background-color lightyellow

      .e-resize
        &.right
          background-color red

        &.left
          background-color lime


</style>
