<!--
  试题 - 题干
-->

<template>
  <div>
    <div class="ques-content" @click="onClick"
         v-html="$xss((content || '').replace(/○/g, '〇').replace(/□/g, '囗').replace(/<input[^>]+>/g,'<u>&nbsp;&nbsp;&nbsp;&nbsp;</u>'))">
    </div>
    <!--大图预览载体-->
    <el-image ref="image" class="width-0 height-0 overflow display-none" :preview-src-list="srcList"></el-image>
  </div>
</template>

<script>
export default {
  name: 'QuesContent',
  data(){
    return {
      srcList:[]
    }
  },
  props: {
    content: {
      type: String,
      default: ''
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
.ques-content
  word-break break-all

  >>> p
    margin 0 !important
    text-indent: 0 !important

  >>> img
    max-width 120px
    max-height 120px
    cursor pointer

.display-none{
  display none
}
</style>