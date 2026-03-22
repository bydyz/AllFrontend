
<template>
  <el-switch class="margin-left-10" :width="20" :value="value" @input="$emit('input',$event)"
             :active-value="list.find(({id}) => id).id"
             :inactive-value="list.find(({id}) => !id).id"
             :active-text="activeValue.name" @change="$emit('change')" :disabled="disabled"></el-switch>
</template>

<script>

export default {
  name: 'EleEnabledSwitch',
  props: {
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'enabled'
    }
  },
  computed: {
    activeValue() {
      return this.list.find(a => a.id === this.value) || {}
    },
    list() {
      return this.$store.getters[`common/${this.type}`] || []
    }
  }
}
</script>

<style scoped lang="stylus">
.el-switch
  height 16px
  line-height 16px

  &.is-checked
    >>> .el-switch__core
      //background-color SHADOW_COLOR
      //border-color SHADOW_COLOR
      background-color MAIN_COLOR
      border-color MAIN_COLOR

      &:after
        left 100%
        margin-left -10px
        background-color NEUTRAL_COLOR_F
    
  //background-color MAIN_COLOR

  >>> .el-switch__core
    height 12px
    background-color NEUTRAL_COLOR_C
    border-color NEUTRAL_COLOR_C

    &:after
      top 0
      left 0
      width 10px
      height 10px

  //background-color NEUTRAL_COLOR_95

  >>> .el-switch__label
    height 18px
    margin-left 6px
    color ERROR_COLOR
    user-select none

    & span 
        font-size: 14px

    &.is-active
      color MAIN_COLOR
</style>