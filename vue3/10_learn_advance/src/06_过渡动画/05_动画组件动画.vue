<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">切换</button>
    </div>

    <!-- mode属性掌握 -->
    <!-- 
      如果我们不希望同时执行进入和离开动画，那么我们需要设置transition的过渡模式：
         in-out: 新元素先进行过渡，完成之后当前元素过渡离开；
         out-in: 当前元素先进行过渡，完成之后新元素过渡进入；

     -->


    <!-- 
    默认情况下，首次渲染的时候是没有动画的，如果我们希望给他添加上去动画，那么就可以增加另外一个属性appear
    -->

    <!-- 
      transition  渲染一个节点

      渲染的是一个列表，并且该列表中添加删除数据也希望有动画执行呢？
         这个时候我们要使用 <transition-group> 组件来完成
      -->

    <!-- ◼ 使用<transition-group> 有如下的特点：
       默认情况下，它不会渲染一个元素的包裹器，但是你可以指定一个元素并以 tag attribute 进行渲染；
       过渡模式不可用，因为我们不再相互切换特有的元素；
       内部元素总是需要提供唯一的 key attribute 值；
       CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身； -->
      
    <transition name="why" mode="out-in" appear="" type="animation">
      <component :is="isShow ? 'home' : 'about'"></component>
    </transition>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import About from './pages/About.vue'
export default {
  components: {
    Home,
    About
  }
}
</script>

<script setup>
import { ref } from 'vue';

const isShow = ref(true)

</script>

<style scoped>

h2 {
  display: inline-block;
}

/* transition */
.why-enter-from,
.why-leave-to {
  opacity: 0;
}

.why-enter-to,
.why-leave-from {
  opacity: 1;
}


.why-enter-active {
  animation: whyAnim 2s ease;
  transition: opacity 2s ease;
}

.why-leave-active {
  animation: whyAnim 2s ease reverse;
  transition: opacity 2s ease;
}


@keyframes whyAnim {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

</style>
