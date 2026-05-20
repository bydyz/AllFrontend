<template>
  <div class="father-one-container-class">
    <FatherOne class="myClass" style="background-color: pink;" id="myId" aaa="aaa" bbb="bbb" @click="onClick" key="list-item"
  ref="compRef"></FatherOne>

    <br>
    
    <FatherTwo class="myClass" style="background-color: pink;" id="myId" aaa="aaa" bbb="bbb" @click="onClick" key="list-item"
  ref="compRef"></FatherTwo>
  </div>
</template>


<script setup>
import FatherOne from './FatherOne.vue'
import FatherTwo from './FatherTwo.vue'

const onClick = () => {
  console.log('绑定的点击事件触发了')
}
</script>

<style scoped lang="scss"></style>