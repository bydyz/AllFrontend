
<template>
  <div class="padding-bottom-16 flex center-center">
    <el-button class="width-96 margin-right-6" type="primary" size="medium" @click="$emit('submit')"
               :loading="loading.submit">
      {{ $t('common.Save') }}
    </el-button>
    <el-button v-if="isCancel" class="width-96" size="medium" @click="$emit('cancel')" :loading="loading.cancel">
      {{ $t('common.Cancel') }}
    </el-button>
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