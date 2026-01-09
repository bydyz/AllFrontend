<template>
  <div class="ml-[50px]">
    <ol>
      <!-- <li>把冰箱打开</li> -->
      <!-- 选择后，ctrl + / ，即可将语句变为注释 -->
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
      <!-- li里面可以随意放标签，数字是自动生成的 -->
    </ol>
    <!-- ol标签中只能放li标签，这个是有序列表 -->
    <!-- ol的属性
        1. type="1/a/A/i/I" （仅有这五个，出现其他字母则默认从1开始）
        2. start: 取值只能是一个数字
    
    -->

    <ol type="a">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
      <!-- 要写三个li标签，也可以用前面div的方法 -->
    </ol>

    <ol type="A">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>
    <!-- 选定全部，然后shift + alt + 向下箭头，可进行复制 -->

    <ol type="i">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>

    <ol type="I">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>

    <ol type="1">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>

    <ol type="a" start="5">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>

    <ol type="a" start="30">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>

    <ol type="1" start="3">
      <li>把冰箱打开</li>
      <li>大象放进去</li>
      <li>冰箱关上</li>
    </ol>
  </div>
</template>

<script setup></script>

<style lang="less" scope></style>
