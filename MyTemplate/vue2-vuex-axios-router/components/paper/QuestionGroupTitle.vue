<!--
  试题 - 分类标题
-->

<template>
  <div class="font-15 line-height-32 text-bold">
    {{ group.sortNum | numToCn }}.{{ group.questionTypeName }}
    <template v-if="scoreVisible">(共{{ group.questionList.length || 0 }}题， 共{{ group.questionList.Sum('score') || 0 }}分)</template>
  </div>
</template>

<script>
export default {
  name: 'QuestionTypeTitle',
  props: {
    group: {
      type: Object
    },
    scoreVisible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>