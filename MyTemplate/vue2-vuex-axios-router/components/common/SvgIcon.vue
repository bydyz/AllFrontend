<!--
 * @Description: svg图标加载组件
 * props
 *   iconName: String 和src/assets/icons/svg文件夹下的名称相对应
 *   className: String 样式类名, 用来添加自定义样式
 * @Date: 2021-10-27 17:20:31
 * @LastEditTime: 2021-10-27 17:56:41
-->

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgName() {
      return `#icon-${this.iconName}`
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`
      }
      return 'svg-icon'
    }
  }
}
</script>

<style lang="stylus" scoped>
.svg-icon
  width 1em
  height 1em
  vertical-align -0.1em
  fill currentColor
  overflow hidden
</style>
