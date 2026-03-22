<template>
  <el-form-item class="margin-bottom-0">
    <el-button class="width-80 margin-right-6" type="primary" @click="$emit('submit')"
               :loading="loading.submit">
      {{ $t('common.Save') }}
    </el-button>
    <el-button class="width-80" @click="$emit('cancel')" :loading="loading.cancel">
      {{ $t('common.Cancel') }}
    </el-button>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormSaveBarInDialog',
  props: {
    loading: {
      type: Object,
      default() {
        return {
          submit: false,
          cancel: false
        }
      }
    }
  }
}
</script>