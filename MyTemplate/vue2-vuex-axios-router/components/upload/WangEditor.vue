<template>
  <div id="editor">
  </div>
</template>

<script>
import WangEditorFn from 'wangeditor'
import { TencentCos } from '@/lib'

export default {
  name: 'WangEditor',
  data() {
    return {
      editor: null
    }
  },
  props: {
    content: {
      type: String,
      required: true
    },
    destroy: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    synchronization: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    content(val) {
      this.setContent(val)
    },
    destroy(val) {
      if (val) this.editor.destroy()
    },
    disable(val) {
      if (val) this.editor.disable()
    }
  },
  mounted() {
    this.create()
  },
  methods: {
    create() {
      if (this.editor) return false
      this.editor = new WangEditorFn('#editor')
      this.editor.config.zIndex = 500
      this.editor.config.menus = [
        'head',
        'fontSize',
        // 'fontName',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        // 'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        // 'emoticon',
        'image',
        // 'video',
        'table',
        // 'code',
        'splitLine',
        'undo',
        'redo'
      ]
      this.editor.config.showFullScreen = false
      this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024
      this.editor.config.uploadImgMaxLength = 1
      if (this.synchronization) {
        console.log("synchronization");
        this.editor.config.onchange = function (newHTML) {
          if (newHTML) {
            this.$emit('update:content', newHTML)
          }
        }.bind(this)
      }
      this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        const cos = new TencentCos()
        cos.uploadFile({
          file: resultFiles[0],
          onSuccess: url => {
            insertImgFn(url)
          },
          onError: err => {
            this.$message.error(err)
          }
        })
      }
      this.editor.create()
      console.log(`%c WangEditor初始化成功！`, 'color: #f2f;background-color: #f2f2f2')
      // console.log("WangEditor初始化成功！");
    },
    setContent(content) {
      this.editor.txt.html(content)
    },
    getContent() {
      return this.editor.txt.html()
    },
    getText() {
      return this.editor.txt.text()
    }
  }
}
</script>

<style lang="stylus" scoped></style>
