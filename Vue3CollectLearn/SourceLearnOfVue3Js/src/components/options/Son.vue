<script>

export default {
  name: 'Son',
  data() {
    return {
      textValue: 'Options-Son'
    }
  },
  methods: {
    onChange() {
      this.textValue = this.textValue + '-Change'
    }
  },
  beforeCreate() { console.log('ChildOptions beforeCreate'); },
  created() { console.log('ChildOptions created'); },
  beforeMount() { console.log('ChildOptions beforeMount'); },
  mounted() { console.log('ChildOptions mounted'); },
  beforeUpdate() { console.log('ChildOptions beforeUpdate'); },
  updated() { console.log('ChildOptions updated'); },
  beforeUnmount() { console.log('ChildOptions beforeUnmount'); },
  unmounted() { console.log('ChildOptions unmounted'); }
};
</script>

<template>
  <div>
    <button @click="onChange">ChangeSon</button>
    <div>{{ textValue }}</div>
  </div>
</template>

<style scoped>
</style>
