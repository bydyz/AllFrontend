<template>
  <h2 style="margin-bottom: 12px;">UniversalSelector.vue</h2>
  
  <div class="container text-[red]">
    <div>第一个div</div>

    <br>

    <div>
      第二个div1
      <p>666</p>
      第二个div2
    </div>

    <br>

    <div>第三个div</div>

    <br>

    <p>第一个p</p>

    <br>

    <p>第二个p1</p>
  </div>
</template>

<script setup></script>

<style scoped>
/*   通用选择器  * ：表示每一个元素   */
.container * {
  width: 500px;
  aspect-ratio: 5 / 3;

  @apply border-[1px] border-solid border-[#999] rounded-[4px]
}
</style>