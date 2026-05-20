<script>
import SlotSon from './SlotSon.vue';
import Son from './Son.vue';

export default {
  name: 'Parent',
  data() {
    return {
      textValue: 'Options-Parent'
    }
  },
  components: { SlotSon, Son },
  methods: {
    onChange() {
      this.textValue = this.textValue + '-Change'
    }
  },
  beforeCreate() { console.log('ParentOptions beforeCreate'); },
  created() { console.log('ParentOptions created'); },
  beforeMount() { console.log('ParentOptions beforeMount'); },
  mounted() { console.log('ParentOptions mounted'); },
  beforeUpdate() { console.log('ParentOptions beforeUpdate'); },
  updated() { console.log('ParentOptions updated'); },
  beforeUnmount() { console.log('ParentOptions beforeUnmount'); },
  unmounted() { console.log('ParentOptions unmounted'); }
};
</script>

<template>
  <div>
    <button @click="onChange">ChangeParent</button>
    <div>{{ textValue }}</div>

    <Son></Son>

    <slot>
      <SlotSon></SlotSon>
    </slot>
  </div>
</template>

<style scoped>
</style>
