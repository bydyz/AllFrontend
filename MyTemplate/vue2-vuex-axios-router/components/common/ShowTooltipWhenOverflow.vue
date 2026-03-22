<template>
  <el-tooltip :content="content" :disabled="!visible" placement="top" effect="light">
    <div ref="dom" class="text-ellipsis-2" :style="style" @mouseenter="onMouseEnter">
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ShowTooltipWhenOverflow',
  props: {
    rows: {
      // 最多显示多少行
      type: [Number, String],
      default: 2
    }
  },
  data() {
    return {
      visible: false,
      content: null
    }
  },
  computed: {
    style() {
      return {
        '-webkit-line-clamp': this.rows
      }
    }
  },
  methods: {
    onMouseEnter() {
      let dom = this.$refs.dom

      if (!dom.innerText) return this.visible = false
      this.content = dom.innerText

      // 创建选中对象
      let range = document.createRange()
      // 选择dom内所有内容（文本）
      range.setStart(dom, 0)
      range.setEnd(dom, dom.childNodes.length)
      // 获取选择文本高度
      let textHeight = range.getBoundingClientRect().height

      // 文本高度 大于 容器高度，则显示tips
      this.visible = textHeight > dom.offsetHeight
    }
  }
}
</script>

<style>
</style>
