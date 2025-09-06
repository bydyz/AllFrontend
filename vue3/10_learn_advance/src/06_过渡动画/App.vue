<template>
  <div class="app">
    <button @click="addNumber">添加数字</button>
    <button @click="removeNumber">删除数字</button>
    <button @click="shuffleNumber">打乱数字</button>
    
    <transition-group tag="div" name="why">
      <template v-for="item in nums" :key="item">
        <span>{{ item }}</span>
      </template>
    </transition-group>

    <hr>

    <firstVue></firstVue>

    <hr>

    <secondVue></secondVue>

    <hr>

    <thirdVue></thirdVue>

    <hr>

    <forthVue></forthVue>

    <hr>

    <fifthVue></fifthVue>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { shuffle } from "underscore";
import firstVue from "./01_transition动画.vue"
import secondVue from './02_animation动画.vue'
import thirdVue from './03_动画属性设置(一).vue'
import forthVue from './04_动画属性设置(二)'
import fifthVue from './05_动画组件动画'

const nums = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

const addNumber = () => {
  nums.value.splice(randomIndex(), 0, nums.value.length)
}

const removeNumber = () => {
  nums.value.splice(randomIndex(), 1)
}

const shuffleNumber = () => {
  // shuffle()  传入数组，会有随机打乱数组顺序的作用
  nums.value = shuffle(nums.value)
}

// Math.random() = [0, 1)     Math.floor向下取整
const randomIndex = () => {
  return Math.floor(Math.random() * nums.value.length)
}

</script>

<style scoped>
hr {
  margin: 30px 0;
}

span {
  margin-right: 10px;
  display: inline-block;
}

/* 
  from  表示开始状态
  to    表示结束状态
 */
.why-enter-from,
.why-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.why-enter-to,
.why-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.why-enter-active,
.why-leave-active {
  transition: all 2s ease;
}

/* 不加这个属性，则移除时 后面的元素会等着完全移除后移动 */
.why-leave-active {
  position: absolute;
}


/* 针对其他移动的阶段需要的动画 */
/* 
虽然新增的或者删除的节点是有动画的，但是对于哪些其他需要移动的节点是没有动画的：
   我们可以通过使用一个新增的 v-move 的class来完成动画；
   它会在元素改变位置的过程中应用；
   像之前的名字一样，我们可以通过name来自定义前缀；
*/
.why-move {
  transition: all 2s ease;
}

</style>
