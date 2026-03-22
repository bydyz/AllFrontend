<template>
  <BaseTreeEdit :value="value" @input="$emit('input')" @update:deleteList="$emit('update:deleteList', $event)" :add="add" :allowDrop="allowDrop" :max="max" :border="border">

    <template slot="header">
      <div class="col-name">导航名称</div>
      <div class="col-link">跳转链接</div>
      <!--默认图标-->
      <div class="col-icon">默认图标</div>
      <!--选中图标-->
      <div class="col-icon">选中图标</div>
    </template>

    <template slot="row" slot-scope="{data}">

      <div class="col-name">
        <el-input v-if="data.edited" v-model="data.navbarName" placeholder="导航名称" size="small" ref="input" maxlength="4" show-word-limit></el-input>
        <div v-else>{{ data.navbarName }}</div>
      </div>
      <div class="col-link">
        <template v-if="data.edited">
          <!--1. 下拉选择-->
          <el-select v-model="data.linkUrl" size="small" class="width-120" @change="onSave(data)">
            <el-option v-for="(item,index) in navbarSelectList" :key="index" :label="item.navbarName" :value="item.linkUrl"></el-option>
          </el-select>

          <!--2.2 自定义链接输入-->
          <el-input v-if="data.linkUrl === customUrl" v-model="data.customLinkUrl" size="small" @blur="onSave(data)" placeholder="请输入自定义链接" class="width-240" maxlength="100" show-word-limit></el-input>

          <!--2.3 微页面-->
          <el-select v-else-if="data.linkUrl === wPageUrl" v-model="data.linkId" size="small" class="width-240" @change="onSave(data)">
            <el-option v-for="(item,index) in wPages" :key="index" :label="item.pageName" :value="item.id"></el-option>
          </el-select>
        </template>
        <template v-else>{{ data.navbarName }}</template>
      </div>

      <!--默认图标-->
      <div class="col-icon">
        <el-image class="width-40 height-40 flex center-center" :src="data.iconUrl">
          <template slot="error">
            <i class="el-icon-picture-outline"></i>
          </template>
        </el-image>
      </div>

      <!--选中图标-->
      <div class="col-icon">
        <el-image class="width-40 height-40 flex center-center" :src="data.focusIconUrl">
          <template slot="error">
            <i class="el-icon-picture-outline"></i>
          </template>
        </el-image>
      </div>
    </template>

    <template slot="handle" slot-scope="{data}">
      <el-button class="text-main text-bold" type="text" size="mini" @click.stop="onIconSelect(data)">
        选择图标
      </el-button>
    </template>

    <NavIconSelection ref="NavIconSelection"></NavIconSelection>
  </BaseTreeEdit>
</template>

<script>
import BaseTreeEdit from '@/components/panes/TreeEdit/BaseTreeEdit'
import NavIconSelection from '@/components/panes/TreeEdit/NavIconSelection'
import { mapGetters } from 'vuex'

export default {
  name: 'H5NavTreeEdit',
  components: {
    BaseTreeEdit,
    NavIconSelection
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      customUrl: 'nav:custom',
      wPageUrl: 'nav:wpage'
    }
  },
  computed: {
    ...mapGetters({
      navbarSelectList: 'common/navbarH5SelectList',
      wPages: 'common/waH5Pages'
    })
  },
  methods: {
    async onSave(data) {
      // 给linkType赋值
      if (data.linkUrl === this.wPageUrl) {
        // 微页
        data.linkType = 2
      } else if (data.linkUrl === this.customUrl) {
        // 自定义链接
        data.linkType = 3
      } else {
        // 页面路由
        data.linkType = 1
      }
    },

    add() {
      // 导航项 数据结构
      let child = {
        sort: this.value.length,
        edited: 1
      }

      if (this.value.length >= this.max) return this.$message.warning(`最多可设置${this.max}个导航`)
      this.value.splice(this.value.length - 1, 0, child)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.sortName === 'first' && type === 'prev') return false
      if (dropNode.data.sortName === 'last' && type === 'next') return false
      return true
    },
    async onIconSelect(data) {
      let { iconUrl, focusIconUrl } = await this.$refs.NavIconSelection.open({
        type: 'AddCategory',
        selectionList: this.value
      })
      this.$set(data, 'iconUrl', iconUrl)
      this.$set(data, 'focusIconUrl', focusIconUrl)
    }
  }
}
</script>

<style scoped lang="stylus">
.col-name
  flex 1
  min-width 150px
  margin-right 12px
  .el-input
    width 150px
.col-link
  flex 2
  min-width 360px
.col-icon
  width 64px
  flex-shrink 0
  margin-left 12px
</style>