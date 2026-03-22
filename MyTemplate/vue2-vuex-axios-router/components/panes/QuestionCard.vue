<template>
  <div class="question-card" v-if="data.enabled || choiceId2 !== 'CustomTest'">

    <div class="flex between-start margin-top-8">
      <slot name="select"></slot>
      <div class="flex-1 font-14 line-height-20">
        <QuesHtml class="text-3" :content="data.content"></QuesHtml>
        <div class="flex text-6 column padding-top-16">
          <div class="flex-1 padding-left-16 padding-bottom-8 flex wrap start-center" v-for="(item,index) in data.options" :key="item.id">
            <span class="padding-right-8">{{ item.option }}</span>
            <span v-if="data.answer.includes(item.option)" class="el-icon-circle-check text-success"></span>
            <span v-else class="el-icon-circle-close text-error"></span>
            <QuesHtml class="padding-left-4" :content="item.content"></QuesHtml>
          </div>
        </div>
      </div>
      <el-image :src="require('@/assets/exam/question_disable.png')" fit="fill" v-if="!data.enabled"></el-image>
    </div>

    <div class="padding-16 padding-top-8 padding-bottom-8 border-top flex between-center margin-top-16">
      <div class="font-12 text-9 flex start-center">
        <span>ID：{{ data.id }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>收录：{{ data.createTime }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>题型：{{ data.questionTypeName }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>分类：{{ data.categoryList.map(item => item.name).join('、') }}</span>
      </div>

      <div>
        <el-button :type="data.enabled ? 'primary' : 'info'" size="medium" @click="onRemove(data)" v-if="paperQuestionList.includes(data.id)">移除组卷</el-button>
        <el-button :type="data.enabled ? 'primary' : 'info'" size="medium" @click="onAdd(data)" v-else-if="!(choiceId2 === 'QuestionBank')">加入组卷</el-button>
        <template v-if="permission.Edit">
          <el-button type="text" size="medium" @click="onEdit(data)" v-if="choiceId2 === 'QuestionBank'">编辑</el-button>
        </template>
        <el-button type="text" size="medium" @click="onDisable(data)" v-if="data.enabled" v-show="choiceId2 === 'QuestionBank'">禁用</el-button>
        <el-button type="text" size="medium" @click="onEnable(data)" v-else v-show="choiceId2 === 'QuestionBank'">启用</el-button>
        <el-button :loading="loading.delete" type="text" size="medium" @click="onDelete(data)" v-show="choiceId2 === 'QuestionBank'">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'QuestionCard',
  data () {
    return {
      loading: {
        delete: false
      }
    }
  },
  props: {
    permission: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    choiceId2: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      paperQuestionList: 'paper/paperQuestionList'
    })
  },
  methods: {
    ...mapActions({
      add: 'paper/add',
      remove: 'paper/remove'
    }),
    onAdd (data) {
      if (!data.enabled) return this.$message.warning('该试题已被禁用，无法加入组卷')
      this.add(data)
    },
    onRemove (data) {
      if (!data.enabled) return this.$message.warning('该试题已被禁用，无法移除组卷')
      this.remove(data)
    },
    onEdit (item) {
      this.$router.push({
        name: 'QuestionEdit',
        // params: {
        //   type: 'Edit'
        // },
        query: {
          id: item.id
        }
      })
    },
    onDisable (item) {
      this.$confirm('试题禁用后，将不能新添加组卷，但不影响已添加组卷的试题正常使用。', '确定要禁用该试题？', {
        confirmButtonText: '确定禁用'
      })
        .then(async () => {
          let { code } = await this.$api.Question.enable({
            idList: [item.id],
            enabled: 0
          })
          if (code !== 200) return false
          this.$msg.Disabled()
          this.$emit('deleteSuccess')
        })
        .catch(() => { })
    },
    async onEnable (item) {
      let { code } = await this.$api.Question.enable({
        idList: [item.id],
        enabled: 1
      })
      if (code !== 200) return false
      this.$msg.Enabled()
      this.$emit('deleteSuccess')
    },
    async onDelete (item) {
      await this.$confirm(`确认删除该题目吗？`, {
        title: '删除确认'
      })
      this.loading.delete = true
      let { code } = await this.$api.Question.delete({ idList: [item.id] })
      this.loading.delete = false
      if (code !== 200) return false
      setTimeout(() => {
        this.$msg.Delete()
        this.$emit('deleteSuccess')
      }, 1000)
    }
  }
}
</script>

<style scoped lang="stylus">
.question-card
  border-bottom 1px solid NEUTRAL_COLOR_E6
  + .question-card
    margin-top 16px
.border-top
  border-top 1px dotted NEUTRAL_COLOR_E6
.el-button--info:focus, .el-button--info:hover
  color rgba(255, 255, 255, 0.5)
  border-color NEUTRAL_COLOR_C
  background-color NEUTRAL_COLOR_C
</style>
