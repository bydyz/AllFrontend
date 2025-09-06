<template>
  <div class="app">
    <!-- 1.tab-control -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick"/>

    <!-- <tab-control :titles="['流行', '最新', '优选']"/> -->

    <!-- 2.展示内容 -->
    <h1>{{ pageContents[currentIndex] }}</h1>

    <!-- 1.tab-control: button -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <!-- 这里不必须用props，此处只是设置一个值，接受子组件传过来的值并使用 -->
      <!-- 此处在 v-slot 后用 default，是因为子组件中没有给 slot 命名 -->
      <!-- 倘若我们要给子组件中的某一个slot使用作用域插槽，则我们需要给slot设置name，且父组件的v-slot后需要就就加上该name   就像是具名的作用域插槽 -->
      <template v-slot:default="props">
        <button>{{ props.item }} - {{ props.abc }}</button>
      </template>
    </tab-control>

    
    <!-- 2.tab-control: a元素(重要) -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <template #default="props">
        <a href="#">{{ props.item }}</a>
      </template>
    </tab-control>

    <!-- 3.独占默认插槽的简写(了解) -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <template v-slot="props">
        <button>{{ props.item }}</button>
      </template>
    </tab-control>

    <!-- 4.如果只有一个默认插槽, 那么template可以省略 -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick"
                 v-slot="props">
      <button>{{ props.item }}</button>
    </tab-control>




    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <template v-slot:default="props">
        <button>{{ props }}</button>
      </template>
    </tab-control>
  </div>
</template>

<script>
  import TabControl from './TabControl.vue'

  export default {
    components: {
      TabControl
    },
    data() {
      return {
        pageContents: [ "衣服列表", "鞋子列表", "裤子列表" ],
        currentIndex: 0
      }
    },
    methods: {
      tabItemClick(index) {
        console.log("app:", index)
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
</style>

