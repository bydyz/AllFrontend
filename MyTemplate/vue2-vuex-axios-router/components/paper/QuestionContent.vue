
<!--
  试题 - 题干
-->

<template>
  <div class="font-14 flex line-height-24 margin-left-8">
    <slot>
      <div>{{ index }}.</div>
    </slot>
    <QuesContent :content="content"></QuesContent>
  </div>
</template>

<script>
import QuesContent from '@/components/paper/base/QuesContent'

export default {
  name: 'QuestionContent',
  components: {
    QuesContent
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    index: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style scoped>
</style>