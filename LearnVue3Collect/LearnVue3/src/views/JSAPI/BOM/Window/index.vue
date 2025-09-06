<script setup>
import { ref } from "vue";

function run1() {
  // window.innerHeight 和 window.innerWidth：获取浏览器窗口的内部高度和宽度（不包括工具栏/地址栏等）。
  // window.outerHeight 和 window.outerWidth：获取整个浏览器窗口的高度和宽度（包括工具栏/地址栏等）。
  console.log(`Inner width: ${window.innerWidth}, Inner height: ${window.innerHeight}`);
  console.log(`Outer width: ${window.outerWidth}, Outer height: ${window.outerHeight}`);
}

function run2() {
  // 显示一个警告框
  window.alert("这是一个警告信息");
}

function run3() {
  // 提示用户输入
  let userInput = window.prompt("请输入您的名字", "默认名字");
  console.log(userInput);
}

function run4() {
  // 确认操作
  let confirmed = window.confirm("您确定要执行此操作吗？");
  console.log(confirmed ? "用户点击了确定" : "用户点击了取消");
}


</script>

<template>
  <div>window 对象是浏览器中最高层次的对象，代表当前浏览器窗口或标签页。几乎所有通过 JavaScript 操作浏览器的功能都是从 window 对象开始的。</div>

  <button @click="run1">run1</button>
  <button @click="run2">run2</button>
  <button @click="run3">run3</button>
  <button @click="run4">run4</button>
</template>

<style scoped lang="scss">
</style>
