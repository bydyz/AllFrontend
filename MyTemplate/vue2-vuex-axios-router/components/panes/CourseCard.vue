<template>
  <div class="course-card radius-4 overflow relative">

    <div class="image-wrapper overflow" :class="{pointer: !preview}" @click="onLink">
      <el-image class="flex" :src="item.coverUrl" fit="cover"></el-image>
    </div>

    <div class="break-all padding-16 padding-top-6 bg-f">
      <div class="text-bold height-64 line-height-32 text-ellipsis-2">{{ item.courseName }}</div>

      <div class="flex between-center">
        <div class="text-9 font-13">
          {{ item.signUpNum }}人已报名
        </div>

        <div class="text-bold">
          <template v-if="!item.coursePrice">
            <span class="text-success">免费</span>
          </template>
          <span v-else class="text-error">
            ￥{{ item.coursePrice / 100 | number }}
          </span>
        </div>

        <div class="linear-gradient-box right margin-8 mask">
          {{ item.courseType | courseType('name1','-','value') }}
        </div>

        <div v-if="item.gooded" class="linear-gradient-box is-gooded font-13">精品</div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'CourseCard',
  props: {
    type: {
      type: String,
      default: 'Task'
    },
    item: {
      type: Object,
      required: true
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('system', {
      innerDomain: 'innerDomain'
    })
  },
  methods: {
    onLink(item) {
      window.open(`${this.innerDomain}/Course/Detail?id=${item.courseId}`, '_blank')
    }
  }
}
</script>

<style scoped lang="stylus">
.course-card
  width 326px
  transition all 0.6s

  .image-wrapper
    width 100%
    height 0
    padding-bottom 56.25%

  >>> img
    transition all 0.6s

  &:hover
    box-shadow 0 0 12px 0 SHADOW_COLOR
    z-index 99

    >>> img
      transform scale(1.1)

.linear-gradient-box
  position absolute
  top 0
  left 0
  font-size 12px
  border-radius 4px 0 4px 0
  line-height 28px
  width 56px
  text-align center
  color NEUTRAL_COLOR_F

  &.type-live
    background-image linear-gradient(90deg, #FFBE26 0%, #F87220 100%)

  &.type-record
    background-image linear-gradient(90deg, #00d2fc 0%, #0a89ff 100%)

  &.type-mix
    background-image linear-gradient(133deg, #955CFF 0%, #7029FF 100%)

  &.is-gooded
    font-size 13px
    background-image linear-gradient(227.53deg, #0a89ff 0%, #00d2fc 100%)

  &.right
    left auto
    right 0

  &.mask
    border-radius 4px
    width 48px
    background-color rgba(0, 0, 0, 0.4)
</style>