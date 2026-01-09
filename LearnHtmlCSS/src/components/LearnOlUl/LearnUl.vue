<template>
  <div>
    <!-- 1. ul里面只能放li，li里面可以放其他
    2. 默认是黑色实心圆
    3. type: disk(默认), circle, square, none -->
    <ul>
      <li>1</li>
    </ul>
    <!-- ul + > + li{1} -->

    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
    <!-- ul + > li{1}*3 -->

    <ul type="circle">
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>

    <ul type="square">
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>

    <ul type="none">
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>

    <ul type="disk">
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>

    <ul type="disk" style="list-style: none">
      <li>11</li>
      <li>11</li>
      <li>11</li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="less" scope></style>
