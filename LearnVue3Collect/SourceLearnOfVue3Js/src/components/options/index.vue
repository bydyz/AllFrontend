<script>
import Parent from './Parent.vue';

export default {
  name: 'CompositionLearn',
  components: { Parent }
};
</script>

<template>
  <Parent></Parent>
</template>

<style scoped>
/* 
在 Parent 的template 中那个在前，那个先解析、初始化

ParentComponent beforeCreate
ParentComponent created
ParentComponent beforeMount

ChildComponent beforeCreate
ChildComponent created
ChildComponent beforeMount

SlotComponent beforeCreate
SlotComponent created
SlotComponent beforeMount

ChildComponent mounted
SlotComponent mounted
ParentComponent mounted

*/
</style>
