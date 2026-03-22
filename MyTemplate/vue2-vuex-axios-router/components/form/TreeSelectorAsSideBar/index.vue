<template>
  <el-aside v-if="paneInfo" v-loading="loading.dataAPI" :style="sideStyle" class="bg-f margin-right-8 padding-top-16 font-14 overflow wrapper">

    <div :style="sideInnerStyle" class="height-100p flex column">

      <div v-if="isDev">type: {{ type }}</div>

      <!--【插槽 innerAround 】 主体内容的前后， 在滚动范围之外-->
      <slot name="innerAround"></slot>

      <!--搜索栏-->
      <div v-if="units.searchBar.visible" :style="{order: 10}" class="flex padding-left-16 padding-right-8 padding-bottom-6">

        <!--搜索框-->
        <el-input v-model="searchValue" :placeholder="units.searchBar.title" clearable size="small" suffix-icon="el-icon-search" @input="onSearch"></el-input>

        <!--展开|收起 分类-->
        <btnExpandAll v-if="units.searchBar.expandAll"></btnExpandAll>

        <!--收起 侧边栏-->
        <div v-if="units.searchBar.close" class="font-16 el-icon-s-fold text-main padding-8 padding-right-0 pointer" @click="close"></div>

      </div>

      <!--主体内容-->
      <div class="overflow-auto flex-1 flex column" :style="{order: 20}">

        <!--【插槽 treeAround 】 树结构的前后， 可通过order排序-->
        <slot name="treeAround"></slot>

        <!--全部选择栏-->
        <div v-if="units.selectAllBar.visible" :style="{order: 10}" :class="{active: selection === null}" class="padding-left-8 line-height-44 flex start-center tree-item" @click="onSelect()">

          <!--主体文案-->
          <b>{{ units.selectAllBar.title }}</b>

          <!--展开|收起 分类-->
          <btnExpandAll v-if="units.selectAllBar.expandAll"></btnExpandAll>

          <!--编辑分类 - 页面对应的路由对象-->
          <div v-if="units.selectAllBar.editRoute" class="text-right flex-1">
            <el-button icon="el-icon-s-tools" title="管理" type="text" @click.stop="$router.push(units.selectAllBar.editRoute)"></el-button>
          </div>

        </div>

        <!--未选择分类-->
        <div v-if="units.unselectedBar.visible" :style="{order: 20}" :class="{active: selection && selection.id === -1}" class="padding-left-24 line-height-44 tree-item text-6" @click="onSelect(emptyItem)">

          <el-tooltip v-model="emptyItem.visible" :enterable="false" effect="light" manual @mouseenter.native="onEnterTips(emptyItem)" @mouseleave.native="onLeaveTips(emptyItem)">

            <!--主体文案-->
            <div>{{ units.unselectedBar.title }}</div>

            <!--tips - 单项分类数量-->
            <div slot="content" class="flex start-center">
              <div>{{ units.unselectedBar.title }}</div>

              <div v-if="paneInfo.countAPI">
                <div v-if="emptyItem.countInner === undefined" class="el-icon-loading margin-left-4"></div>
                <div v-else>({{ emptyItem.countInner }})</div>
              </div>
            </div>
          </el-tooltip>
        </div>

        <!--树-->
        <el-tree ref="tree" :data="treeList" :expand-on-click-node="false" :filter-node-method="filterNode" :props="propsInner" :style="{order: 30}" :default-expanded-keys="defaultExpandedList" class="tree-style-main overflow-auto" highlight-current node-key="id" @node-click="onSelect" @node-expand="onNodeExpand" @node-collapse="onNodeExpand">
          <template slot-scope="{ data }">
            <el-tooltip v-model="data.visible" :disabled="!paneInfo.countAPI" :enterable="false" effect="light" manual @mouseenter.native="onEnterTips(data)" @mouseleave.native="onLeaveTips(data)">
              <div class="flex start-center width-100p overflow">

                <!--【插槽 content 】 主体内容-->
                <slot name="content" :data="data" :o="{richTextFormat}">
                  <div class="text-ellipsis height-100p line-height-44 flex-1">
                    <span class="rich-text" v-html="richTextFormat(data[propsInner.label])"></span>
                  </div>
                  
                  <iconpark-icon v-if="!data[propsInner.enabled]" class="margin-right-12" color="#ccc" name="jinzhiforbid"></iconpark-icon>
                </slot>

              </div>

              <div slot="content" class="flex start-center">
                <div>{{ data[propsInner.label] }}</div>
                <div v-if="paneInfo.countAPI">
                  <div v-if="data.countInner === undefined" class="el-icon-loading margin-left-4"></div>
                  <div v-else>({{ data.countInner }})</div>
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-tree>
      </div>
    </div>

  </el-aside>
</template>

<script>
import mxPaneInfo from './mxPaneInfo'
import mxTree from './tree/mxTree'  
import mxVisible from './mxVisible' //控制tree显示与隐藏的混合
import { mapGetters } from 'vuex'

export default {
  name: 'TreeSelectorAsSideBar',
  mixins: [mxPaneInfo, mxTree, mxVisible],
  computed: {
    ...mapGetters({
      isDev: 'isDev'
    })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  transition width 0.3s
  .tree-item
    cursor pointer
    &.active, &:hover
      background-color BACKGROUND_COLOR
      color MAIN_COLOR
.el-button--text
  margin-left 5px
</style>
