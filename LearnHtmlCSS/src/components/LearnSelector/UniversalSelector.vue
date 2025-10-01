<template>
  <div class="container text-[red]">
    <div>第一个div</div>
    <div>
      第二个div1
      <p>666</p>
      第二个div2
    </div>
    <div>第三个div</div>

    <p>第一个p</p>
    <p>第二个p1</p>
  </div>
</template>

<script setup></script>

<style scoped>
.container * {
  width: 500px;
  aspect-ratio: 5 / 3;

  @apply border-[1px] border-solid border-[#999] rounded-[4px]
}
</style>