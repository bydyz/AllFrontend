<template>
  <div>{{ formatString }}</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'StrategyMapPane',
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    filter: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    ...mapGetters({
      productStrategyMaps: 'common/productStrategyMaps'
    }),
    formatString() {
      let value = this.value || {}
      let maps = this.productStrategyMaps
      if (this.filter) {
        if (this.filter === true) {
          maps = maps.filter(a => value[a.id] !== undefined)
        } else {
          maps = maps.filter(a => a.id === this.filter)
        }
      }
      return maps.map(a => a.format.replace('$value', Math.floor((value[a.id] || 0) / a.unit))).join(';')
    }
  }
}
</script>

<style scoped>

</style>