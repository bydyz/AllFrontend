<template>
  <!-- <div class="font-14" :class="{border, h5: type === 'H5'}"> -->
  <div class="font-14 border">
    <div class="nav-tree overflow-auto">
      <slot v-if="header" name="header">
        <div class="tree-header flex between-center text-bold">
          <!--标题-->
          <div class="col-name">导航名称</div>
          <!--自定义标题名称-->
          <div class="col-link">
            <!-- <el-tooltip effect="light" content="i hate you" plasement="top"></el-tooltip>
            自定义名称 -->

            <ToolTip placement="top">
              自定义名称
              <div slot="content">
                未填写时，显示导航名称。<br />已填写时，显示自定义名称
              </div>
            </ToolTip>
          </div>

          <!--控制显示与否-->
          <div class="col-show">是否显示</div>
          <!--操控区域-->
          <div class="col-handle">操作</div>
        </div>
      </slot>

      <el-tree
        :data="value"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-drop="onNodeDrop"
        default-expand-all
      >
        <div
          slot-scope="{ data }"
          class="flex between-center width-100p tree-row"
        >
          <!--导航名称-->
          <div class="col-name">
            <!-- <el-input :placeholder="data.navbarName" size="small" disabled></el-input> -->
            {{ data.navbarName }}
          </div>

          <!--自定义导航名称-->
          <div class="col-link">
            <!-- <div v-if=" data.navbarName == '个人资料' || data.navbarName == '账号设置' || (data.navbarName == '我的订单' && type == 'H5')">{{data.navbarName}}</div> -->
            <el-input
              v-model="data.customNavbarName"
              :placeholder="data.navbarName"
              size="small"
              clearable
              maxlength="6"
              show-word-limit
            ></el-input>
          </div>

          <!--控制显示与否-->
          <div class="col-show">
            <el-radio-group v-model="data.hided">
              <el-radio :label="0">显示</el-radio>
              <el-radio
                :label="1"
                >隐藏</el-radio
              >
            </el-radio-group>
          </div>

          <!--操控区域-->
          <div class="col-handle">
            <el-button
              class="text-main text-bold"
              type="text"
              size="mini"
              :disabled="!data.draggable && type == 'H5'"
            >
              拖拽排序
            </el-button>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavIconSelection from "./NavIconSelection";

export default {
  name: "PersonalAreaEdit",
  components: { NavIconSelection },
  activated() {
    this.editItem = {};
  },
  data() {
    return {
      editItem: {},
      customUrl: "nav:custom",
      wPageUrl: "nav:wpage",
      loading: {
        delete: false,
      },
    };
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    groupCode: {
      type: String,
      default: "navbarOrg",
    },
    header: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "PC",
    },
  },

  computed: {
    ...mapGetters({
      waOrgPages: "common/waOrgPages",
      waH5Pages: "common/waH5Pages",
    }),
    wPages() {
      if (this.type === "H5") return this.waH5Pages;
      return this.waOrgPages;
    },
  },
  methods: {
    ...mapActions({
      getDictionary: "common/getDictionary",
    }),

    // 拖拽时判定目标节点能否被放置
    allowDrop(draggingNode, dropNode, type) {
      if (
        (dropNode.data.linkUrl === "/StudentInfo" ||
          dropNode.data.linkUrl === "/Business/Order/" ||
          dropNode.data.linkUrl === "/StudentAcount") &&
        this.type === "H5"
      )
        return false;
      if (type === "inner") return false;
      return true;
    },
    // 判断节点能否被拖曳
    allowDrag(node) {
      // return (node.data.sort !== 0 && node.data.sort !== 1) && ((this.type == 'H5' && node.data.sort !== 7) || this.type === 'PC')
      return (
        (node.data.linkUrl !== "/StudentInfo" &&
          node.data.linkUrl !== "/Business/Order/" &&
          node.data.linkUrl !== "/StudentAcount") ||
        this.type == "PC"
      );
    },
    // 拖拽成功完成时触发的事件
    onNodeDrop() {
      let arr = [];
      this.value.forEach((item, sort) => {
        this.$api.PersonalCenterNavbar.pcnUpdate({
          ...item,
          sort,
        }).then();
        arr.push({
          ...item,
          sort,
        });
      });
      this.$emit("input", arr);
    },
  },
};
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

.tree-row
  &:hover
    background-color GLOBAL_BACKGROUND_COLOR

    > div
      background-color GLOBAL_BACKGROUND_COLOR


.tree-header, .tree-row
  min-width 710px

  .col-name
    width 120px
    height 32px
    padding 0
    padding-left 16px

  .col-link
    width 160px
    // margin-left 36px
    padding 0

  .col-show
    width 140px

  .col-handle
    width 120px



  > div
    flex-shrink 0
    height 50px
    display flex
    align-items center
    padding-left 8px

.h5
  .tree-header, .tree-row
    min-width 656px

    .col-name
      width 120px

      >>> .el-input__inner
        padding-right 24px
        padding-left 12px

    .col-link
      width 320px

    .col-handle
      min-width 88px
      max-width 200px

.border
  .tree-header
    border 1px solid GLOBAL_BACKGROUND_COLOR
    border-bottom none

  >>> .el-tree-node
    .tree-row
      border 1px solid GLOBAL_BACKGROUND_COLOR

    & + .el-tree-node .tree-row
      border-top none
</style>
