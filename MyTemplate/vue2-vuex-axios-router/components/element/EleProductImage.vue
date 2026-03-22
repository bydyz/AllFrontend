<template>
  <div class="product-icon" :class="/:(\w+)/.exec(id)[1]">
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'EleProductImage',
  props: {
    id: {
      type: [Number, String],
      default: 'xxx:basic'
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
.product-icon
  width 80px
  height 24px
  padding-right 9px
  text-align right
  font-size 12px
  line-height 24px
  background-size cover

  &.basic
    background-image url("/static/product/basic.png")
    color #758AA1

  &.standard
    background-image url("/static/product/standard.png")
    color #1D61F2

  &.ultra
    background-image url("/static/product/ultra.png")
    color #EB801C

  &.special
    background-image url("/static/product/special.png")
    color #D38274
    width 103px
</style>
