<template>
  <div>
    <el-radio-group v-model="visible" @change="onVisibleChange">
      <el-radio v-for="item in visibleOptions" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-radio>
    </el-radio-group>

    <div class="flex overflow" :class="{'is-hide':visible !== 2}">
      <div class="flex-1 overflow-auto min-width">
        <el-tree ref="tree" :data="employeeList" node-key="id" :props="{label:'name'}" show-checkbox
                 @check-change="onTreeCheck" :default-checked-keys="value">
          <div slot-scope="{data,node}">
            <b class="el-icon-office-building" v-if="data.isDept"></b>
            <b class="el-icon-user-solid" v-else></b>
            {{ data.name }}
          </div>
        </el-tree>
      </div>
      <div class="width-200 margin-left-16">
        <h3 class="margin-0 font-14">已选{{ selectionList.length }}人</h3>
        <ul>
          <li class="flex between-center" v-for="(item,index) in selectionList" :key="index">
            {{ item.name }}
            <el-button type="text" icon="el-icon-remove-outline" @click="onRemove(index)">移除</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'VisibleUserList',
  data({$props}) {
    return {
      visibleOptions: [
        {id: 1, name: '所有人可见'},
        {id: 2, name: '部分可见'}
      ],

      selectionList: [],
      timer: null
    }
  },
  props: {
    visible: {
      default: 1
    },
    value: {
      default() {
        return []
      }
    }
  },
  watch: {
    deptEmployeeTree() {
      this.init()
    }
  },
  computed: {
    ...mapGetters({
      deptEmployeeTree: 'common/deptEmployeeTree'
    }),
    employeeList() {
      if (!this.deptEmployeeTree.length) return []
      let mapFn = (data, arr) => {

        data.map(item => {
          let obj = {
            isDept: true,
            id: `dept-${item.id}`,
            name: item.deptName,
            children: [
              ...mapFn(item.children || [], []),
              ...(item.employees || []).map(emp => ({
                id: emp.userId,
                employeeId: emp.id,
                name: emp.realName,
                children: []
              }))
            ]
          }
          if (obj.children.length) {
            arr.push(obj)
          }
          return obj
        })

        return arr
      }
      return mapFn(this.deptEmployeeTree, [])
    },
    employeeFlat() {
      return this.$utils.ArrayFlat(this.employeeList).filter(item => !item.isDept)
    },
    selectionIdList() {
      return this.selectionList.map(item => item.id)
    },
    selectionDoubleIdList() {
      return this.selectionList.map(item => ({
        userId: item.id,
        employeeId: item.employeeId
      }))
    }
  },
  methods: {
    init() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.deptEmployeeTree.length && this.value.length) {
          this.selectionList = this.employeeFlat.filter(item => this.value.includes(item.id))
          this.updateValue()
        }
      }, 100)
    },
    onVisibleChange(d) {
      this.$emit('update:visible', d)
      if (d === 1) {
        this.$emit('input', [])
      }
    },
    onTreeCheck() {
      let idList = this.$refs.tree.getCheckedKeys()
      this.selectionList = this.employeeFlat.filter(item => idList.includes(item.id))
      this.updateValue()
    },
    onRemove(index) {
      this.selectionList.splice(index, 1)
      this.$refs.tree.setCheckedKeys(this.selectionIdList)
      this.updateValue()
    },
    updateValue() {
      this.$emit('input', this.selectionIdList)
      this.$emit('update:selectionList', this.selectionList)
    }
  }

}
</script>

<style scoped lang="stylus">
.min-width
  min-width 100px

.is-hide
  height 0
</style>
