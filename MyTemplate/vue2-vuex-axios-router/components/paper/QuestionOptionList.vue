<!--
  试题 - 选项列表
-->

<template>
  <ul class="font-13 padding-8 flex start-center wrap" v-if="options.length">
    <li class="padding-4 width-100p flex" v-for="(option,oIndex) in options"
        :key="oIndex">
      <slot>
        <b class="margin-right-8">{{ option.option }}.</b>
      </slot>
      <QuesHtml :content="option.content"></QuesHtml>
    </li>
  </ul>
</template>

<script>
import QuesHtml from './base/QuesHtml'

export default {
  name: 'QuestionOptionList',
  components: {
    QuesHtml
  },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>