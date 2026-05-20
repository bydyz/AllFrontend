<template>
  <div class="containerNew">
    <div class="first-div">
      <p class="first-p">div 1 中的内容1</p>
      <p class="second-p">div 1 中的内容2</p>
    </div>
    <div class="second-div">
      <p>div 2 中的内容1</p>
      <p>div 2 中的内容2</p>
    </div>
    <p>ppp 111</p>
    <p>ppp 222</p>
  </div>
</template>

<script setup></script>

<style scoped>
.containerNew {
  color: pink;

  .first-div {
    color: lightgray;

    &:hover {
      .first-p {
        color: lightcoral;
      }
    }
    &:hover .second-p {
      color: lightgreen;
    }
  }

  & .second-div {
    color: lightblue;
  }

  &:hover {
    color: #000;
  }
}
</style>
