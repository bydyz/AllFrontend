<template>
  <div class="font-14" :class="{border,'padding-right-16':!isShowView}" :style="{'width':width}">
    <div class="nav-tree overflow-auto flex column" :style="{'maxHeight':maxHeight}" :class="{'isShowView':isShowView}">
      <div class="tree-header flex between-center" v-if="!noHeader">
        <slot name="header">
          <div></div>
        </slot>
        <div v-if="!isWPage" class="col-handle">操作</div>
        <div v-else class="col-handle">
          <slot name="operation">
            <div>操作</div>
          </slot>
        </div>
      </div>
      <div class="tree-frame overflow-auto flex-1">
        <el-tree :data="value" ref="tree" :draggable="draggable" :allow-drop="allowDropInner" :allow-drag="allowDragInner" @node-drop="nodeDropInner" default-expand-all>
          <div slot-scope="{node,data}" class="tree-row flex between-center">
            <slot name="row" :data="data">
              <div></div>
            </slot>

            <!--操控区域-->
            <div class="col-handle" :style="{'width': isEditIcon ? 'auto' : ''}">
              <slot name="handle" :data="data"></slot>
              <el-button class="text-main" type="text" size="normal" @mousedown.native="data.edited && (draggable = true)" @mouseup.native="data.edited && (draggable = false)" :disabled="!data.edited">
                <span v-if="!isEditIcon">拖拽排序</span>
                <i v-else class="el-icon-rank font-16 text-6"></i>
              </el-button>

              <el-button class="text-main" type="text" size="normal" @click.stop="onDelete(data,node)" :disabled="!data.edited">
                <span v-if="!isEditIcon">移除</span>
                <i v-else class="el-icon-delete font-16 text-6"></i>
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
  name: 'BaseTreeEdit',
  data() {
    return {
      draggable: false,
      deleteList: []
    }
  },
  props: {
    // v-model值
    value: {
      type: Array,
      default() {
        return []
      }
    },
    // 最大个数（暂时没用）
    max: {
      type: Number,
      default: 10
    },
    // 最大高度
    maxHeight: {
      type: String
    },
    // 是否有边框
    border: {
      type: Boolean,
      default: false
    },
    // 
    add: {
      type: Function
    },
    allowDrop: {
      type: Function
    },
    allowDrag: {
      type: Function
    },
    // 是否是编辑图标
    isEditIcon: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: {
      type: String
    },
    handleText: {
      type: String
    },
    // 是否有头部
    noHeader: {
      type: Boolean,
      default: false
    },
    isWPage: {
      type: Boolean,
      default: false
    },
    // 自适应高度
    isShowView: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
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
    async onDelete(data, node) {
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
      this.value.forEach((item, index) => (item.sort = index))
      this.draggable = false
      this.$emit('nodeDrop')
    }
  }
}
</script>

<style scoped lang="stylus">
.isShowView
  height auto !important
  min-height auto !important
.nav-tree
  height 60vh
  min-height 300px
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
  background-color NEUTRAL_COLOR_F2
  height 46px
  font-weight bold
  padding 0 16px
  border-radius 4px 4px 0 0
.tree-row
  width 100%
  padding 0 16px
  &:hover
    background-color GLOBAL_BACKGROUND_COLOR
    > div
      background-color GLOBAL_BACKGROUND_COLOR
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
  width 98px
  text-align right
  flex-shrink 0
  padding 12px 0
.tree-frame
  border 1px solid NEUTRAL_COLOR_E6
  border-radius 0 0 4px 4px
.el-icon-rank
  transform rotate(45deg)
</style>
