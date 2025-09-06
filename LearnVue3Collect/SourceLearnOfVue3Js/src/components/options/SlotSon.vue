<script>

export default {
  name: 'SlotSon',
  data() {
    return {
      textValue: 'Options-SlotSon'
    }
  },
  methods: {
    onChange() {
      this.textValue = this.textValue + '-Change'
    }
  },
  beforeCreate() { console.log('SlotOptions beforeCreate'); },
  created() { console.log('SlotOptions created'); },
  beforeMount() { console.log('SlotOptions beforeMount'); },
  mounted() { console.log('SlotOptions mounted'); },
  beforeUpdate() { console.log('SlotOptions beforeUpdate'); },
  updated() { console.log('SlotOptions updated'); },
  beforeUnmount() { console.log('SlotOptions beforeUnmount'); },
  unmounted() { console.log('SlotOptions unmounted'); }
};
</script>

<template>
  <div>
    <button @click="onChange">ChangeSlot</button>
    <div>{{ textValue }}</div>
  </div>
</template>

<style scoped>
</style>
