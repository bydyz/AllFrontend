<template>
  <h2>{{ fullname }}</h2>
  <button @click="setFullname">设置fullname</button>
  <h2>{{ scoreLevel }}</h2>
  <button @click="setScore">设置Score</button>
</template>

<script setup>
import { reactive, computed, ref } from "vue";

// 1.定义数据
const names = reactive({
  firstName: "kobe",
  lastName: "bryant",
});

/* 
  这里的  不变、可变  如何使用呢？？？？？？？？？？
    使用computed
      方式一：接收一个getter函数，并为 getter 函数返回的值，返回一个不变的 ref 对象；
      方式二：接收一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象
  */

// const fullname = computed(() => {
//   return names.firstName + " " + names.lastName
// })

// computed 传入 对象
const fullname = computed({
  set: function (newValue) {
    const tempNames = newValue.split(" ");
    names.firstName = tempNames[0];
    names.lastName = tempNames[1];
  },
  get: function () {
    return names.firstName + " " + names.lastName;
  },
});

console.log(fullname);

function setFullname() {
  fullname.value = "coder why";
  console.log(names);
}

// 2.定义score
const score = ref(89);
// computed 传入 函数
const scoreLevel = computed(() => {
  return score.value >= 60 ? "及格" : "不及格";
});
function setScore() {
  score.value = 50;
}
</script>

<style scoped></style>
