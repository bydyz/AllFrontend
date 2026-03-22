<!--技巧试行【组件继承】-->
<template>
  <TreeSelectorAsSideBar :type="type"
                         :props="props"
                         :width="width"
                         :visible="visible"
                         @update:treeList="$emit('update:treeList', $event)"
                         @update:selection="$emit('update:selection', $event)"
                         @update:selections="$emit('update:selections', $event)"
                         @update:selectId="$emit('update:selectId', $event)"
                         @update:visible="$emit('update:visible', $event)"
  >

    <!--【插槽 innerAround 】 主体内容的前后， 在滚动范围之外-->
    <template v-slot:innerAround="d">
      <slot name="innerAround">
        <div class="padding-left-8 line-height-44">
          <b>企微通讯录({{ 1 }}人)</b>
        </div>
      </slot>
    </template>

    <!--【插槽 treeAround 】 树结构的前后， 可通过order排序-->
    <template v-slot:treeAround="d">
      <slot name="treeAround"></slot>
    </template>

    <!--【插槽 content 】 主体内容-->
    <template v-slot:content="d">
      <slot name="content" :data="d.data" :o="d.o">
        <div class="text-ellipsis height-100p line-height-44 flex-1">
          <span class="rich-text" v-html="d.o.richTextFormat(d.data.name)"></span>
        </div>
      </slot>
    </template>

  </TreeSelectorAsSideBar>
</template>

<script>
import TreeSelectorAsSideBar from './index.vue'

export default {
  name: 'WxWorkTreeSelectorAsSideBar',
  components: {
    TreeSelectorAsSideBar
  },
  props: {
    type: {
      type: String,
      required: true
    },

    props: {
      type: Object,
      default() {
        return {}
      }
    },

    width: {
      type: Number,
      default: 200
    },
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
