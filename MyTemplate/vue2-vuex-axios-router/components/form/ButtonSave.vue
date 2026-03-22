<template>
  <div class="height-60 bg-f flex padding-left-10 padding-right-10 between-center absolute width-100p btn-flex">
    <div class="flex start-center">
      <template>
        <slot name="leftBtn"></slot>
      </template>
    </div>
    <div class="flex center-center">
      <template>
        <slot name="default">
          <el-button class="width-96 margin-right-6" type="primary" size="medium" @click="$emit('submit')"
                     :loading="loading.submit">
            {{ $t('common.Save') }}
          </el-button>
          <el-button v-if="isCancel" class="width-96" size="medium" @click="$emit('cancel')" :loading="loading.cancel">
            {{ $t('common.Cancel') }}
          </el-button>
        </slot>
      </template>
    </div>
    <div class="flex end-center">
      <template>
        <slot name="rightBtn"></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSaveBar',
  props: {
    loading: {
      type: Object,
      default() {
        return {
          submit: false,
          cancel: false
        }
      }
    },
    isCancel: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-flex {
  box-shadow: 2px 0px 10px 1px #E6F3FF;
  left: 0;
  bottom: 0;
  z-index: 999;
}
</style>