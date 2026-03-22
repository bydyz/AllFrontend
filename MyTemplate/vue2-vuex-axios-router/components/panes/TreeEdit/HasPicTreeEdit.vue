<template>
  <div class="font-14" :class="{border}" :style="{'width':width}">
    <div class="nav-tree overflow-auto">
      <div class="tree-header flex between-center" v-if="!noHeader">
        <slot name="header">
          <div></div>
        </slot>
        <div class="col-handle">操作</div>
      </div>
      <div class="tree-frame overflow-auto padding-10 padding-bottom-0 radius-6" :style="{height:customHeight}">
        <el-tree :data="value" ref="tree" :draggable="draggable" :allow-drop="allowDropInner" :allow-drag="allowDragInner" @node-drop="nodeDropInner" default-expand-all>
          <div slot-scope="{node,data}" class="tree-row flex between-center radius-6">
            <slot name="row" :data="data">
              <div></div>
            </slot>

            <!--操控区域-->
            <div class="col-handle">
              <slot name="handle" :data="data"></slot>
              <el-button class="text-main" type="text" size="normal" @mousedown.native="data.edited && (draggable = true)" @mouseup.native="data.edited && (draggable = false)" :disabled="!data.edited">
                <span v-if="!isEditIcon">拖拽排序</span>
                <i v-else class="el-icon-rank"></i>
              </el-button>

              <el-button class="text-main" type="text" size="normal" @click.stop="onDelete(data,node)" :disabled="!data.edited">
                <span v-if="!isEditIcon">移除</span>
                <i v-else class="el-icon-delete"></i>
              </el-button>
            </div>
          </div>
        </el-tree>
      </div>
    </div>

    <slot name="footer">
      <!-- <div class="margin-top-12 text-right">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd()">添加导航</el-button>
      </div> -->
    </slot>

    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'HasPicTreeEdit',
  data () {
    return {
      draggable: false,
      deleteList: []
    }
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    max: {
      type: Number,
      default: 10
    },
    border: {
      type: Boolean,
      default: false
    },
    add: {
      type: Function
    },
    allowDrop: {
      type: Function
    },
    allowDrag: {
      type: Function
    },
    customHeight: {
      type: String | Number,
      default: '342px'
    },
    isEditIcon: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    handleText: {
      type: String
    },
    noHeader: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // 拖拽事件对象，修改鼠标样式
    this.$refs.tree.$on('tree-node-drag-over', event => {
      event.dataTransfer.dropEffect = 'move'
    })
  },
  methods: {
    // 操作 - 添加导航
    // onAdd() {
    //   if (this.add) {
    //     this.add()
    //   } else {
    //     // 导航项 数据结构
    //     let child = {
    //       sort: this.value.length,
    //       edited: 1
    //     }

    //     if (this.value.length >= this.max) return this.$message.warning(`最多可设置${this.max}个导航`)
    //     this.value.push(child)
    //   }


    //   this.$nextTick(() => {
    //     try {
    //       this.$refs.input.$el.children[0].focus()
    //     } catch (e) {
    //     }
    //   })
    // },

    // 操作 - 删除
    async onDelete (data, node) {
      if (data.id) {
        this.deleteList.push(data)
        this.$emit('update:deleteList', this.deleteList)
      }
      let parent = node.parent
      let children = parent.data.children || parent.data
      let index = children.findIndex(d => d.$treeNodeId === data.$treeNodeId)
      children.splice(index, 1)
      this.$emit('delNode')
    },

    // 拖拽时判定目标节点能否被放置
    allowDropInner (draggingNode, dropNode, type) {
      if (type === 'inner') return false
      if (this.allowDrop) return this.allowDrop(draggingNode, dropNode, type)
      return true
    },
    // 判断节点能否被拖曳
    allowDragInner (node) {
      if (this.allowDrag) return this.allowDrag(node)
      return true
    },
    // 拖拽成功完成时触发的事件
    nodeDropInner () {
      this.value.forEach((item, index) => item.sort = index)
      this.draggable = false
      this.$emit('nodeDrop')
    }
  }
}
</script>

<style scoped lang="stylus">
.nav-tree
  >>> .el-tree
    background transparent
    > .el-tree-node
      &:focus .el-tree-node__content
        background-color transparent
      .el-tree-node__content
        margin-bottom 10px
        width 100%
        height 70px
      .el-tree-node__children
        border-radius 4px
        background-color BACKGROUND_COLOR
      .el-tree-node__expand-icon
        width 0
        padding 0
  >>> .el-input-group__append
    padding 0
    width 32px
    .el-button
      margin 0
.tree-header
  background-color NEUTRAL_COLOR_F2
  height 46px
  font-weight bold
  padding 0 16px
.tree-row
  width 100%
  padding 0 10px
  height 70px
  background-color #fff
  // &:hover
  // background-color GLOBAL_BACKGROUND_COLOR
  // > div
  // background-color GLOBAL_BACKGROUND_COLOR
.border
  .tree-header
    border 1px solid NEUTRAL_COLOR_E6
    border-bottom none
    color #313131
  >>> .el-tree-node
    .tree-row
      border-bottom 1px solid NEUTRAL_COLOR_E6
    & + .el-tree-node .tree-row
      border-top none
.col-handle
  min-width 60px
  text-align right
  flex-shrink 0
  padding 13px 0
.tree-frame
  background-color NEUTRAL_COLOR_TB
  height 342px
  // border 1px solid NEUTRAL_COLOR_E6
</style>
