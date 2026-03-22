<template>
  <div class="font-14" :class="{border}">

    <div class="nav-tree overflow-auto">
      <div class="tree-header flex between-center">
        <slot name="header">
          <div></div>
        </slot>

        <div class="col-handle">操作</div>
      </div>

      <el-tree :data="value"
               ref="tree"
               :draggable="draggable"
               :allow-drop="allowDropInner"
               :allow-drag="allowDragInner"
               @node-drop="nodeDropInner"
               default-expand-all>
        <div slot-scope="{node,data}" class="tree-row flex between-center">
          <slot name="row" :data="data">
            <div></div>
          </slot>

          <!--操控区域-->
          <div class="col-handle">
            <slot name="handle" :data="data"></slot>
            <el-button class="text-main text-bold" type="text" size="mini" :class="!data.edited ? 'text-c allow' : ''"
                       @mousedown.native="toDrag(data)"
                       @mouseup.native="data.edited && (draggable = false)"
                       >
              拖拽排序
            </el-button>

            <el-button class="text-main text-bold" type="text" size="mini" @click.stop="onDelete(data,node)"
                       :disabled="!data.edited">
              删除
            </el-button>
          </div>
        </div>
      </el-tree>
    </div>

    <slot name="footer">
      <div class="margin-top-12 text-right">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="onAdd()">添加导航</el-button>
      </div>
    </slot>

    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'BaseTreeEdit',
  data() {
    return {
      draggable: false,
      deleteList: []
    }
  },
  props: {
    value: {
      type: Array,
      default() {
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
    }
  },
  methods: {
    // 操作 - 添加导航
    onAdd() {
      if (this.add) {
        this.add()
      } else {
        // 导航项 数据结构
        let child = {
          sort: this.value.length,
          edited: 1
        }

        if (this.value.length >= this.max) return this.$message.warning(`最多可设置${this.max}个导航`)
        this.value.push(child)
      }


      this.$nextTick(() => {
        try {
          this.$refs.input.$el.children[0].focus()
        } catch (e) {
        }
      })
    },

    // 操作 - 删除
    async onDelete(data, node) {
      if (data.id) {
        this.deleteList.push(data)
        this.$emit('update:deleteList', this.deleteList)
      }

      let parent = node.parent
      let children = parent.data.children || parent.data
      let index = children.findIndex(d => d.$treeNodeId === data.$treeNodeId)
      children.splice(index, 1)
    },

    // 拖拽时判定目标节点能否被放置
    allowDropInner(draggingNode, dropNode, type) {
      if (type === 'inner') return false
      if (this.allowDrop) return this.allowDrop(draggingNode, dropNode, type)
      return true
    },
    // 判断节点能否被拖曳
    allowDragInner(node) {
      if (this.allowDrag) return this.allowDrag(node)
      return true
    },
    // 拖拽成功完成时触发的事件
    nodeDropInner() {
      this.value.forEach((item, index) => item.sort = index)
      this.draggable = false
      this.$emit('nodeDrop')
    },
    toDrag(data){
      if(data.edited){
        this.draggable = true
      }else{
        this.draggable = false
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.nav-tree
  >>> .el-tree
    > .el-tree-node
      &:focus .el-tree-node__content
        background-color transparent

      .el-tree-node__content
        width 100%
        height auto

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
  background-color GLOBAL_BACKGROUND_COLOR
  height 44px
  font-weight bold
  padding 0 16px

.tree-row
  width 100%
  padding 0 16px

  &:hover
    background-color GLOBAL_BACKGROUND_COLOR

    > div
      background-color GLOBAL_BACKGROUND_COLOR

.border
  .tree-header
    border 1px solid GLOBAL_BACKGROUND_COLOR
    border-bottom none

  >>> .el-tree-node
    .tree-row
      border 1px solid GLOBAL_BACKGROUND_COLOR

    & + .el-tree-node .tree-row
      border-top none

.col-handle
  width 200px
  text-align right
  flex-shrink 0
  padding 16px 0

.allow
  cursor not-allowed
  &:hover
    color #ccc
  &:focus
    color #ccc
</style>