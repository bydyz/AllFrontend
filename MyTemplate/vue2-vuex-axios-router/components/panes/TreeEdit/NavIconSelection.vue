<template>
  <el-dialog :visible.sync="visible" append-to-body :title="dialogInfo.title"
             :before-close="close" width="900px">
    <div class="icon-list-wrapper overflow-auto">

      <div v-for="(iconList,index) in navIconList" :key="index"
           class="flex">
        <el-button class="icon-image relative border-c margin-bottom-20 padding-left-24 padding-right-24 flex"
                   v-for="(item,i) in iconList" :key="i"
                   @click="onSubmit(item)"
                   :disabled="Boolean(selectionList.find(a => a.focusIconUrl === item.focusIconUrl))">
          <div class="height-80">
            <el-image :src="item.iconUrl"></el-image>
            <el-image :src="item.focusIconUrl"></el-image>
          </div>
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'NavIconSelection',
  data() {
    return {
      loading: false,
      visible: false,
      selectionList: [],
      // 存储弹窗所需数据
      dialogType: 'AddCategory',
      typeMapping: {
        AddCategory: {title: `选择图标`, submitFn: this.$api.CourseCategory.add, type: 'Create', showCommon: true}
      }
    }
  },
  computed: {
    dialogInfo() {
      let dialogInfo = this.typeMapping[this.dialogType]
      return dialogInfo || {}
    },
    navIconList() {
      let navList = [
        'home',
        'mine',
        'course',
        'study',
        'train',
        'cert'
      ]
      return navList.map(name => {
        // 生成图片路径
        let getPath = i => `/static/navIcon/${name} (${i}).png`
        return [
          {iconUrl: getPath(1), focusIconUrl: getPath(2)},
          {iconUrl: getPath(1), focusIconUrl: getPath(3)},
          {iconUrl: getPath(1), focusIconUrl: getPath(4)}
        ]
      })
    }
  },
  methods: {
    // 打开弹窗
    async open(data) {
      this.visible = true
      this.dialogType = data.type

      this.selectionList = data.selectionList || []

      return new Promise((resolve, reject) => {
        this.$once('handle', ({type, data}) => {
          if (type === 'success') {
            resolve(data)
          } else {
            reject('取消')
          }
        })
      })
    },

    // 关闭弹窗
    close() {
      this.visible = false
      this.$emit('handle', 'close')
    },

    // 选择图标
    onSubmit(data) {
      this.$emit('handle', {
        type: 'success',
        data
      })
      this.visible = false
    },
  }
}
</script>

<style lang="stylus" scoped>
.icon-image
  width 224px
  height 112px
  cursor pointer

  &.is-disabled
    opacity .4

  & + .icon-image
    margin-left 32px

.icon-list-wrapper
  height 500px
</style>
