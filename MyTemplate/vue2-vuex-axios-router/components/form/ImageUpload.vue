<template>
  <div class="upload-avatar flex start-end">

    <el-upload
        ref="upload"
        action="/"
        :show-file-list="false"
        :accept="accept"
        :before-upload="checkFile"
        :http-request="afterSelectFile"
    ></el-upload>

    <div @click="onSelectFile">
      <slot>
        <div class="upload-button">
          <el-image :width="width" :height="height" :style="styleObj" class="avatar" :src="value" fit="cover"
                    v-if="value"></el-image>
          <i :style="styleObj" class="el-icon-plus avatar-uploader-icon flex center-center" v-loading="loading.upload"
             v-else></i>
        </div>
      </slot>
    </div>


    <slot name="tips" :data="{accept,name:fileOption.name}">
      <div class="font-12 text-6 margin-left-12 margin-bottom-2">
        支持 {{ accept }} 格式图片，大小不超过 {{ fileOption.name }}
      </div>
    </slot>

    <DialogUploadImage ref="DialogUploadImage" @SelectFile="onSelectFile"></DialogUploadImage>
  </div>
</template>

<script>
import DialogUploadImage from '@/components/dialog/DialogUploadImage'
import {TencentCos} from '@/lib'

export default {
  name: 'ImageUpload',
  components: {
    DialogUploadImage
  },
  mounted() {
    this.cos = new TencentCos()
    this.$emit('saveContext', this)
  },
  data() {
    return {
      loading: {
        upload: false
      },
      progress: 0,
      // 保存源文件
      oFile: null,
      fileBlob: null
    }
  },
  props: {
    // 是否编辑图片
    isEdit: {
      type: Boolean,
      default: false
    },
    // 自动上传到 COS
    autoUpload: {
      type: Boolean,
      default: true
    },

    value: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 120
    },
    height: {
      type: [String, Number],
      default: 120
    },
    accept: {
      type: String,
      default: '.png,.jpg,.jpeg,.gif,.webp'
    },
    fileSize: {
      type: Number,
      default: 5
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    fileReg() {
      return new RegExp(`(${'.png,.jpg,.jpeg,.gif,.webp'.split(',').join('|').replace(/\./g,'\\.')})$`, 'i')
    },
    fileOption() {
      return {
        size: this.fileSize * 1024 * 1024,
        name: `${this.fileSize}M`
      }
    },
    styleObj() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },
  methods: {
    // 操作 - 手动触发选择图片
    onSelectFile() {
      let children = this.$refs.upload.$el.children[0].children
      let input = children[children.length - 1]
      input.click()
    },
    // 步骤1 - 上传校验
    checkFile(file) {
      if (this.loading.upload) {
        return false
      }
      if (!this.fileReg.test(file.name)) {
        this.$message.warning('图片格式不正确，请重新上传')
        return false
      }
      if (file.size > this.fileOption.size) {
        this.$message.warning(`上传图片大小不能超过 ${this.fileOption.name}`)
        return false
      }
      return true
    },

    // 步骤2 - 选择图片之后
    // 1. 可预览、编辑
    // 2. 可直接上传
    async afterSelectFile({file}) {
      this.oFile = file // 源文件
      // 模式: 不编辑 + 自动上传  - 返回url
      if (!this.isEdit && this.autoUpload) {
        let url = await this.uploadFile()
        return this.$emit('input', url)
      }

      // 读取文件
      let fd = new FileReader()
      fd.readAsDataURL(file)
      fd.onload = async () => {
        // 模式: 不编辑 + 不自动上传  - 返回base64
        if (!this.isEdit && !this.autoUpload) {
          return this.$emit('input', fd.result)
        }


        // 模式: 编辑 +
        let {fileData, fileBlob} = await this.$refs.DialogUploadImage.open({
          options: {
            img: fd.result,
            autoCropWidth: this.width,
            autoCropHeight: this.height,
            ...this.options
          }
        })
        this.fileBlob = fileBlob

        // 自动上传 - 返回url
        if (this.autoUpload) {
          let url = await this.uploadFile()
          return this.$emit('input', url)
        } else {
          // 不自动上传 - 返回base64
          return this.$emit('input', fileData)
        }
      }
    },

    // 步骤3 - 确认上传
    uploadFile() {
      let file = this.oFile
      if (this.isEdit) {
        // 编辑场景，没有修改图片，value为url
        // 不是base64文件流，则不用上传，
        if (!/^data/.test(this.value)&&!this.autoUpload) return this.value
        file = {name: this.oFile.name, Body: this.fileBlob}
      }

      return new Promise((resolve, reject) => {
        this.loading.upload = true
        this.cos.uploadFile({
          file,
          onProgress: (progressData) => {
            this.progress = Math.floor(progressData.percent * 100)
            this.$emit('update:progress', this.progress)
          },
          onSuccess: (url) => {
            resolve(url)
            setTimeout(() => {
              this.loading.upload = false
            }, 1000)
          },
          onError: (err) => {
            this.$message.error(err)
            reject(err)
            setTimeout(() => {
              this.loading.upload = false
            }, 1000)
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-button
  border 1px dashed NEUTRAL_COLOR_E6
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
  vertical-align middle

  &:hover
    border-color HOVER_COLOR

  .avatar-uploader-icon
    font-size 28px
    color NEUTRAL_COLOR_6
    text-align center

    .el-loading-spinner
      top 26%

  .avatar
    display block

.upload-avatar
  .icon
    position absolute
    left 120px
    bottom 120px
</style>
