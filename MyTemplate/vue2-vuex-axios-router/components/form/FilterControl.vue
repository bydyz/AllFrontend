<template>
  <el-card class="filter-control">
    <el-form :model="formDataInner" size="small" :label-width="labelWidth + 'px'">
      <div class="flex column">
        <slot name="other"></slot>

        <div class="flex wrap between-center">
          <!--main-->
          <div class="flex wrap start-center">
            <el-form-item class="inherit" v-for="item in mainList" :label="labelWidth?item.label : ''" :key="'main'+item.name" :prop="item.name" :style="{order: item.order}">
              <!--控件 - 时间-->
              <el-date-picker v-if="item.name==='tradeDate'" v-model="formDataInner.tradeDate" type="daterange" start-placeholder="起始日期" end-placeholder="截至日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
              <el-date-picker v-else-if="item.name === 'date'" v-model="formDataInner.date" placeholder="请选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
              <!--控件 - 下拉选框-->
              <el-select v-else class="select-auto-width" :title="item.label" v-model="formDataInner[item.name]" :placeholder="item.placeholder || item.label" :clearable="item.clearable" filterable :multiple="item.multiple" collapse-tags>
                <template ref="prefix" slot="prefix">
                  {{ (item.options.find(i => i.id === formDataInner[item.name])|| {}).name || item.label}}
                </template>
                <el-option v-for="(v, i) in item.options" :key="i" :label="v.name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>

            <!--            <el-form-item class="search-box" :prop="searchType" v-if="sideList.length > 0" style="order: 100"
                                      label-width="0">
                          <el-input v-model.trim="inputValue"
                                    :placeholder="`请输入${(sideList.find(item=>item.value === searchType) || {name:'内容'}).name}`"
                                    clearable
                                    @keyup.enter.native.stop="formDataInner[searchType]=inputValue"
                                    @clear="formDataInner[searchType]=inputValue">
                            <el-select v-if="sideList.length>1" v-model="searchType" slot="prepend"
                                       @change="sideList.forEach(v => formDataInner[v.value] = null);inputValue =null">
                              <el-option v-for="item in sideList" :key="item.id" :label="item.name"
                                         :value="item.value"></el-option>
                            </el-select>
                            <el-button type="primary" slot="append" icon="el-icon-search"
                                       @click="formDataInner[searchType]=inputValue"></el-button>
                          </el-input>
                        </el-form-item>-->

            <!--搜索框列表-->
            <el-form-item class="inherit search-wrapper" v-for="item in sideList" :label="labelWidth?item.label : ''" :key="'side'+item.name" :prop="item.name" :style="{order: item.order + 100}">
              <el-input class="width-140" v-model.trim.lazy="formDataInnerCache[item.name]" :placeholder="item.placeholder || item.label" :clearable="item.clearable" filterable :title="item.label" :maxlength="127" @keydown.enter.native.stop.prevent="formDataInner[item.name]=formDataInnerCache[item.name]" @change="formDataInner[item.name]=formDataInnerCache[item.name]">
                <template v-slot:suffix>
                  <div class="line-height-32 text-c font-14 el-icon-search margin-right-6 absolute"></div>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item size="medium" class="inherit" v-if="sideList.length" :style="{order: 200}">
              <el-button class="width-48 height-32 padding-0" type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>

            <slot name="main"></slot>
          </div>

          <!--side-->
          <div class="flex">
            <!--侧边搜索框-->
            <!--            <el-form-item class="search-box" :prop="searchType" v-if="sideList.length > 0">
                          <el-input v-model.trim="inputValue"
                                    :placeholder="`请输入${(sideList.find(item=>item.value === searchType) || {name:'内容'}).name}`"
                                    clearable
                                    @keyup.enter.native="formDataInner[searchType]=inputValue">
                            <el-select v-if="sideList.length>1" v-model="searchType" slot="prepend"
                                       @change="sideList.forEach(v => formDataInner[v.value] = null);inputValue =null">
                              <el-option v-for="item in sideList" :key="item.id" :label="item.name"
                                         :value="item.value"></el-option>
                            </el-select>
                            <el-button type="primary" slot="append" icon="el-icon-search"
                                       @click="formDataInner[searchType]=inputValue"></el-button>
                          </el-input>
                        </el-form-item>-->

            <slot name="side"></slot>
          </div>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'FilterControl',
  data() {
    return {
      inputValue: null, // 中转 输入容器，避免频繁请求
      searchType: null, // 搜索框 选择字段

      formDataInner: {
        // 特殊类 - 日期
        tradeDate: null, // 起止日期
        date: null // 选择日期
      },
      // 缓存控件
      formDataInnerCache: {},

      // 时间规则 - 禁选未来时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  props: {
    main: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    side: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    labelWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    mainList() {
      return this.parseList(this.main)
    },
    sideList() {
      return this.parseList(this.side, true)
    }
  },
  watch: {
    formDataInner: {
      deep: true,
      handler(val) {
        let obj = {}
        for (const key in val) {
          // if (val[key] !== null && val[key] !== '') obj[key] = val[key]
          // 搜索框bug
          if (val[key] !== null) obj[key] = val[key]
        }
        if (obj.tradeDate && obj.tradeDate.length > 0) {
          obj.startDate = obj.tradeDate[0]
          obj.endDate = obj.tradeDate[1]
          delete obj.tradeDate
        }
        this.$emit('update:filterData', obj)
      },
      immediate: true
    }
  },
  methods: {
    parseList(inputData, hasCache) {
      let main = []
      let mainObj = {}

      switch (typeof inputData) {
        case 'string':
          let arr = inputData.trim().split(/\s*,\s*/)
          arr.forEach((v, order) => {
            let result = v.split(':')
            mainObj[result[0]] = { order }
            if (result[1]) mainObj[result[0]].label = result[1]
          })
          break
        case 'object':
          mainObj = inputData
          break
        default:
          return main
      }

      for (const mainKey in mainObj) {
        let item = mainObj[mainKey]
        let options = []
        if (typeof item.options === 'string') {
          options = this.$store.getters[`common/${item.options}`] || []
        } else if (typeof item.options === 'object') {
          options = item.options
        } else {
          options = this.$store.getters[`common/${mainKey}`] || []
        }

        let defaultItem = {
          name: mainKey,
          order: 100,
          clearable: true
        }
        main.push({
          ...defaultItem,
          ...item,
          options
        })
        // 初始值
        if (this.formDataInner[mainKey] === undefined) {
          if (item.value === undefined) {
            ;/^(tradeDate|date)$/.test(mainKey) || this.$set(this.formDataInner, mainKey, null)
          } else {
            this.$set(this.formDataInner, mainKey, item.value)
            if (hasCache) this.$set(this.formDataInnerCache, mainKey, item.value)
          }
        }
      }
      return main
    },

    onSearch() {
      for (const k in this.formDataInnerCache) {
        this.formDataInner[k] = this.formDataInnerCache[k]
      }
    },

    // 初始化数据
    reset() {
      this.mainList.forEach(item => {
        this.$set(this.formDataInner, item.name, item.value === undefined ? null : item.value)
      })

      this.sideList.forEach(item => {
        let value = item.value === undefined ? null : item.value
        this.$set(this.formDataInner, item.name, value)
        this.$set(this.formDataInnerCache, item.name, value)
      })
    }
  }
}
</script>


<style scoped lang="stylus">
.filter-control
  >>> .el-card__body
    padding 16px 8px 4px 16px
    .el-form-item
      margin 0 12px 8px 0
      // .el-form-item__label
      // padding 0
      .select-auto-width
        min-width 100px
        text-align start
        .el-input__prefix
          white-space nowrap
          position relative
          box-sizing border-box
          padding 0 32px
          padding-left 10px
          height 32px
          line-height 32px
          left 0
          visibility hidden
        .el-input__inner
          padding 0 32px 0 8px
          position absolute
      .el-date-editor
        width 160px
        &.el-range-editor
          width 240px
    .search-wrapper
      .el-input
        .el-input__inner
          padding 0 32px 0 8px
      .absolute
        right 0
      .el-input__clear
        margin-top 1px
        height 30px
        background-color NEUTRAL_COLOR_F
        position relative
        z-index 10
</style>





