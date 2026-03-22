<!--
  试题 - 选项、答案、解析
-->

<template>
  <div>
    <div class="ques-html"
         v-html="$xss(formatHtml)"
         @click="onClick">
    </div>

    <!--大图预览载体-->
    <el-image ref="image" class="width-0 height-0 overflow display-none" :preview-src-list="srcList"></el-image>
  </div>
</template>

<script>
export default {
  name: 'QuesHtml',
  data() {
    return {
      srcList: []
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    formatHtml() {
      return (this.content || '-').replace(/\$###\$/g, ', ').replace(/○/g, '〇').replace(/□/g, '囗')
    }
  },
  methods: {
    onClick(ev) {
      if (ev.target.tagName === 'IMG') {
        // 大图预览功能
        this.srcList = [ev.target.src]
        this.$refs.image.showViewer = true
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.ques-html
  word-break break-all
  
  >>> p
    margin-top 0 !important
    margin-bottom 0 !important

  >>> img
    max-width 120px
    max-height 120px
    cursor pointer

  >>> b
    color #000   
.display-none{
  display: none;
}
</style>