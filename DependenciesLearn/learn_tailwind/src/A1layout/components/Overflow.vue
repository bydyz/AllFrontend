<template>
  <div class="w-[1200px]">
    <!-- 此处的 宽度 100% 说明此dom宽度为定值，内部有两个 dom 一个dom为定值，则相当于另一个dom也为 定值，故用 overflow: auto 时有效果 -->
    <div style="display: flex; width: 100%">
      <div style="width: 600px; height: 500px; flex-shrink: 0; background-color: rgb(193, 148, 148)"></div>
      <div style="flex: 1; background-color: rgb(185, 193, 148); height: 500px; overflow: auto">
        <span>上方的文字</span>
        <img src="./aaa.jpg" width="1500px" alt="" />
        <span>下方的文字</span>
      </div>
    </div>

    <div class="h-[20px] w-full"></div>

    <!-- 此处 父级的宽度少了一个 width: 100% 的属性，overflow 无效 -->
    <div style="display: flex; width: 100%">
      <div style="display: flex; flex: 1; flex-shrink: 0">
        <div style="width: 600px; height: 500px; flex-shrink: 0; background-color: rgb(193, 148, 148)"></div>
        <div style="flex: 1; background-color: rgb(185, 193, 148); height: 500px; overflow: auto">
          <span>上方的文字</span>
          <img src="./aaa.jpg" width="1500px" alt="" />
          <span>下方的文字</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scope></style>
