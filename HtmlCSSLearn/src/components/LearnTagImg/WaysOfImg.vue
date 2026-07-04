<template>
  <div>
    <h1>图片的引入方式</h1>

    <h2>1.使用 import 导入（最推荐，支持缓存哈希）</h2>
    <img :src="img2x" :srcset="`${img1x} 1x, ${img2x} 2x`" alt="响应式图片" />

    <h2>2.图片放在 public 目录（最简单，不处理哈希）</h2>
    <img src="/image@2x.jpg" srcset="/image@1x.jpg 1x, /image@2x.jpg 2x" alt="响应式图片" />

    <h2>3.通过相对路径引入</h2>
    <img src="./img1/image@1x.jpg" srcset="./img1/image@1x.jpg 1x, ./img1/image@2x.jpg 2x" alt="响应式图片" />

    <h2>4.使用 new URL（适合动态拼接路径）</h2>
    <img :src="img2x4" :srcset="`${img1x4} 1x, ${img2x4} 2x`" alt="响应式图片" />
  </div>
</template>

<script setup>
import img1x from "./img1/image@1x.jpg";
import img2x from "./img1/image@2x.jpg";

const img1x4 = new URL("./img1/image@1x.jpg", import.meta.url).href;
const img2x4 = new URL("./img1/image@2x.jpg", import.meta.url).href;

// 创建函数
const InitPage = async () => {};
// 写在此处 大致相当于 created 里调用
InitPage();
</script>

<style lang="less" scope></style>
