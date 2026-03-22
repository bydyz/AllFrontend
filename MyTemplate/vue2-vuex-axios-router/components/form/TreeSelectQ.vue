<template>
  <TreeSelect class="width-200  margin-right-16" v-model="valueInner" :options="options"
              :normalizer="node => ({id: node.id,label: node.name,children: node.children.length ? node.children:undefined})"
              :clearable="false" :defaultExpandLevel="Infinity"
              :value-consists-of="'ALL_WITH_INDETERMINATE'"
              :placeholder="placeholder"
              append-to-body
              clearable
              z-index="2000"
              @select="onSelect"
              :multiple="multiple"
              :flat="multiple"
              noResultsText="没有找到结果..." noOptionsText="无数据"
  ></TreeSelect>
</template>

<script>
export default {
  name: 'TreeSelectQ',
  data({$props}) {
    return {
      valueInner: $props.value
    }
  },
  props: {
    value: {},
    multiple: {
      default: false
    },
    options: {},
    placeholder: {}
  },
  watch: {
    valueInner(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    onSelect(data) {
      this.$emit('select', {
        id: data.id,
        data,
        list: this.$utils.ArrayFlat([data]).map(item => item.id)
      })
    }
  }
}
</script>

<style scoped>

</style>
