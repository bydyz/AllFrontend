<template>
  <el-tooltip effect="light" placement="left" popper-class="question-count">
    <el-button class="fixed-button" type="primary" @click="onCreateExam">
      <div>
        {{ paperQuestionList.length }}
        <!--/{{ maxQuestionNum }}-->
      </div>
      <div class="v-text padding-8 padding-top-4 padding-bottom-4 line-height-16">
        {{ isEdit ? '继续组卷' : '进入组卷' }}
      </div>
      <el-image class="width-16 height-16" :src="require('@/assets/icons/enter.png')"></el-image>
    </el-button>
    <div slot="content">
      <div class="text-center" v-if="paperQuestionList.length">
        <div class="padding-4">
          <div class="flex center-center margin-bottom-6" v-for="item in paperQuestionTypeList" :key="item.id">
            <div class="padding-top-2">{{ item.questionTypeName }} {{ item.questionIdList.length }} 题</div>
            <el-button class="margin-left-4 padding-0" type="text" @click="remove(item.questionIdList)">移除</el-button>
          </div>
        </div>
        <div>注：试题总量不能超过<span class="text-error">{{ maxQuestionNum }}</span>道哦！</div>
        <el-button class="margin-right-6 margin-top-8" @click="clear" size="mini">清空试题</el-button>
      </div>
      <div v-else>试题篮还未有任何题目，快去添加题目吧~</div>
    </div>
  </el-tooltip>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'QuestionCount',
  computed: {
    ...mapGetters({
      questionType: 'common/questionType'
    }),
    ...mapState('paper', {
      maxQuestionNum: 'maxQuestionNum'
    }),
    ...mapGetters({
      paperQuestionList: 'paper/paperQuestionList',
      paperQuestionTypeList: 'paper/paperQuestionTypeList'
    }),
    isEdit() {
      return this.$route.query.type === 'Edit'
    }
  },

  methods: {
    ...mapActions({
      remove: 'paper/remove',
      clear: 'paper/clear'
    }),
    onCreateExam() {
      if (this.paperQuestionList.length > this.maxQuestionNum) return this.$message.warning(`总题量不得超过${this.maxQuestionNum}道`)
      if (this.paperQuestionList.length === 0) return this.$message.warning(`试题篮还未有任何题目，快去添加题目吧~`)

      let obj = {
        name: 'PaperCreate',
        params: {
          type: 'Create',
          cache: true
        }
      }
      if (this.isEdit) {
        obj.name = 'PaperEdit'
        obj.params.type = 'Edit'
        obj.query = {
          id: this.$route.query.id,
          mixin: 1
        }
      }
      this.$router.push(obj)
    }
  }
}
</script>

<style scoped lang="stylus">
.fixed-button
  position fixed
  bottom 10vh
  right 8px
  z-index 100
  width 40px
  height 130px
  padding 0
  background-color SUB_COLOR
  border-color SUB_COLOR
  box-shadow 0 2px 10px rgba(27, 206, 200, 0.4)

  &:hover
    background-color lighten(SUB_COLOR, 5%)
    border-color lighten(SUB_COLOR, 5%)

  .v-text
    white-space normal

.el-input-number
  >>> .el-input__inner
    padding-right 15px
</style>

<style lang="stylus">
.question-count
  width 210px
  //min-height 150px
  padding-bottom 16px
</style>
