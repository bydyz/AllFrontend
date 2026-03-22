<template>
  <div class="padding-top-4 padding-bottom-4">
    <el-tree :class="type.toLowerCase()+'-tree'" ref="tree" show-checkbox :data="permissionTreeComputed" :props="{children: 'children',label: 'menuName',disabled: disabled? 'id':''}" node-key="id" @check-change="onCheckChange" :default-expanded-keys="app.map(item=>'app-'+item.id)">
      <template slot-scope="{node, data}">
        <div class="font-14 flex">
          <slot>{{ data.menuName || data.name }}</slot>
          <!--          <el-button class="width-40" v-if="!node.isLeaf" type="text" size="mini"
                               @click.stop="onSelectAll(node)" :disabled="disabled">
                      {{
                        (node.checked || /^app/.test(data.id)) && $utils.ArrayFlat(node.childNodes, 'childNodes').every(item => item.checked) ? '取消' : '全选'
                      }}
                    </el-button>-->
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PermissionTree',
  created () {
    this.getData()
  },
  data () {
    return {
      permissionTree: [],
      timer: null,
      selectIdList: [],
      checkChanging: false
    }
  },
  props: {
    value: {
      type: Array
    },
    type: {
      type: String,
      default: 'App'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val?.length) this.setCheckedKeys()
      }
    },
    permissionFlat: {
      handler (val) {
        if (val?.length) this.setCheckedKeys()
      }
    }
  },
  computed: {
    ...mapGetters({
      app: 'common/app'
    }),
    permissionTreeComputed () {
      let mapFn = () => this.app.map(fItem => {
        let children = this.permissionTree.filter(item => item.appId === fItem.id)
        return {
          id: 'app-' + fItem.id,
          menuName: fItem.name,
          children
        }
      })
      switch (this.type) {
        case 'App':
          // App - 全部菜单(平台) - 暂时没用
          return mapFn()
        case 'PlatMenu':
          // PlatMenu - 平台管理菜单(平台) - 新增/编辑平台角色
          return mapFn().filter(item => item.children.length)
        case 'Org':
        // Org - 全部菜单(机构) - 新增/编辑机构
        case 'OrgRole':
          // OrgRole - 机构权限菜单(机构) - 新增/编辑机构角色
          return mapFn().filter(item => item.children?.length)
        default:
          return []
      }
    },
    permissionFlat () {
      return this.$utils.ArrayFlat(this.permissionTreeComputed)
    }
  },
  methods: {
    async getAdminPermission () {
      let { code, data } = await this.$api.Role.adminRolePermission()
      if (code !== 200) return false
      this.permissionTree = data.menu
    },
    async getOrgPermission () {
      let { code, data } = await this.$api.Role.orgRolePermission()
      if (code !== 200) return false
      this.permissionTree = data.menu
    },
    async getOrgRolePermission () {
      let { code, data } = await this.$api.OrganizationMenu.list({})
      if (code !== 200) return false
      this.permissionTree = data
    },
    async getData () {
      switch (this.type) {
        case 'App':
        // App - 全部菜单(平台)
        case 'PlatMenu':
          // PlatMenu - 平台管理菜单(平台)
          return this.getAdminPermission()
        case 'Org':
          // Org - 全部菜单(机构)
          return this.getOrgPermission()
        case 'OrgRole':
          // OrgRole - 机构权限菜单(机构)
          return this.getOrgRolePermission()
      }
    },
    onSelectAll (node) {
      let flat = this.$utils.ArrayFlat(node.childNodes, 'childNodes')
      let checked = !((node.checked || typeof node.key === 'string') && flat.every(item => item.checked))
      flat.forEach(item => item.checked = checked)
      if (node.checked === checked) {
        this.onCheckChange()
      } else {
        node.checked = checked
      }
    },
    onCheckChange () {
      this.checkChanging = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.selectIdList = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]

        this.$emit('input', this.selectIdList.filter(id => typeof id === 'number'))
      }, 100)
    },
    setCheckedKeys () {
      if (!this.value) return false
      if (!this.permissionFlat.length) return false
      if (this.checkChanging) return this.checkChanging = false
      let leafIdList = this.value.filter(id => {
        let fItem = this.permissionFlat.find(item => item.id === id)
        return fItem && !fItem.children?.length
      })
      this.$refs.tree.setCheckedKeys(leafIdList)
    }
  }
}
</script>

<style scoped lang="stylus">







/*>>> .el-tree:not(.platmenu-tree)







  > .el-tree-node > .el-tree-node__content > .el-checkbox







    display none*/







</style>