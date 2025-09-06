<template>
  <div>watchPage</div>

  <div>afterDom: {{ afterDom }}</div>

  <button @click="message = '你好啊,李银河!'">修改message</button>
  <!-- 总之，修改普通值或者ref的值，前后值不同；修改reactive的值，前后相同 -->
  <!-- 似乎经过 () => ({ ...info }) 处理后，info外层的数据变为普通值，不会响应修改，修改前后是不同的 
      info.friend里面的数据依旧是reactive的，修改其内的值，新值和旧值是一样的 -->
  <button @click="info.name = 'james'">修改info.name</button>
  <button @click="info.friend.name = 'james'">修改info.friend.name</button>
  <button @click="state.count++">修改state.count</button>
  <button @click="state.isOver = true">修改state.isOver</button>
  <button @click="data1 = 3">修改data1</button>
  <button @click="data3 = 6">修改data3</button>

  <button @click="handleStop++">手动停止监听</button>

  <button @click="changeAfterDom">修改afterDom</button>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute } from 'vue-router';

// 1.定义数据
const message = ref("Hello World");
// 2.侦听数据的变化  似乎默认 immediate和deep的值为false
watch(message, (newValue, oldValue) => {
  console.log("监听message的回调函数执行了")
  console.log(newValue, oldValue);
  console.log("");
});



const info = reactive({
  name: "why",
  age: 18,
  friend: {
    name: "kobe",
  },
});
// 此处默认会监听到对象的内部变化，且不需要设置 deep: true
watch(
  info,
  (newValue, oldValue) => {
    console.log("监听info的回调函数执行了")
    console.log(newValue, oldValue);
    console.log(newValue === oldValue);
    console.log("");
  },
  {
    immediate: true,
  }
);

// 此处只会监听解构后的几项，且默认不会监听到结构后的内部变化
watch(
  () => ({ ...info }),
  (newValue, oldValue) => {
    console.log("监听info解构的回调函数执行了")
    console.log(newValue, oldValue);
    console.log("");
  },
  {
    immediate: true,
    // deep: true,
  }
);

watch(
  () => info.name,
  (newValue, oldValue) => {
    console.log("监听info.name的回调函数执行了")
    console.log(newValue, oldValue);
    console.log("");
  },
  {
    immediate: true,
    deep: true,
  }
);



const state = reactive({ 
  count: 0,
  isOver: false
});
watch(
  state,
  (newCount) => {
    console.log('监听整个state的count 变化:', newCount);
  }
);
watch(
  () => state.count, // getter 函数
  (newCount) => {
    console.log('监听state的count 变化:', newCount);
  },
  {
    // 此种情急下，此时也不会监听到
    deep: true,
  }
);



// let data1 = 1        // 或报warn  Invalid watch source  且监听失效
let data1 = ref(1);
let data2 = ref(2);

// 监听多个数据源
watch([data1, data2], (newValues, oldValues) => {
  console.log("监听多个数据源的回调函数执行了")
  // 打印的是数组 [data1, data2]
  console.log(newValues, oldValues);
});



let data3 = ref(3);
let data4 = ref(4);
// 监听多个数据源
watch([data3, data4], ([newData3, newData4], [oldData3, oldData4]) => {
  console.log("监听 data3 data4的回调函数执行了")
  console.log(newData3, newData4, oldData3, oldData4)
});



const handleStop = ref(0);
const stopWatch = watch(handleStop, (newValue) => {
  console.log('handleStop 变化:', newValue);
  if (newValue >= 3) {
    stopWatch(); // 当 count >= 3 时停止监听
  }
});



let afterDom = ref('1');
let currentTime = 0
function changeAfterDom() {
  afterDom.value = "666"
  currentTime = new Date().getTime()
  delay(3)
}
watch(
  afterDom,
  (newQuery) => {
    console.log("Dom更新完了", newQuery)
  },
  { flush: 'post' } // DOM 更新后触发 回调函数
);



const route = useRoute();
watch(
  () => route.params.id,
  (newId) => {
    console.log('路由参数 id 变化:', newId);
  }
);



const props = defineProps(['userId']);
watch(
  () => props.userId,
  (newId) => {
    console.log('userId 变化:', newId);
  }
);



const list = reactive([1, 2, 3]);
watch(
  () => [...list], // 返回新数组
  (newList, oldList) => {
    console.log('数组变化:', oldList, '=>', newList);
  }
);











function delay(param) {
  while(new Date().getTime() - currentTime < param * 1000) {
    console.log(new Date().getTime(), currentTime, new Date().getTime() - currentTime)
    console.log("重复执行js")
  }
}
</script>

<style scoped></style>
