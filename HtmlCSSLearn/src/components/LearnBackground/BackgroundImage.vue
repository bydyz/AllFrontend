<template>
  <div>
    <h1>background-image引入图片方式</h1>

    <h2>1.写在 style 标签里（最常用，推荐）</h2>
    <div class="hero-box1">背景图内容</div>
    <div class="hero-box2">背景图内容</div>

    <h2>2.写在 template 行内样式里（适合动态背景）</h2>
    <div :style="{ height: '500px', backgroundImage: `url(${bgUrl1})` }">动态背景</div>
    <div :style="{ height: '500px', backgroundImage: `url(${bgUrl2})` }">动态背景</div>
  </div>
</template>

<script setup>
import bgUrl2 from './a.jpg';

// ✅ 正确：使用 new URL 动态构造路径（图片需在同层或 assets 下）
const bgUrl1 = new URL('./a.jpg', import.meta.url).href;
</script>

<style scoped>
.hero-box1 {
  /* ✅ 正确：使用 @ 别名，Vite 会自动处理并加上哈希值 */
  background-image: url('/image@1x.jpg');
  
  /* 也可以使用相对路径（相对于当前 Vue 文件） */
  /* background-image: url('./bg.jpg'); */
  
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 500px;
}
.hero-box2 {
  /* ✅ 正确：使用 @ 别名，Vite 会自动处理并加上哈希值 */
  background-image: url('./a.jpg');
  
  /* 也可以使用相对路径（相对于当前 Vue 文件） */
  /* background-image: url('./bg.jpg'); */
  
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 500px;
}
</style>
