<template>
  <div class="not-found">
    <!-- 倘若路由是  login2/doIt3  ,  则 $route.params.pathMatch  是 [ "login2", "doIt3" ] -->
    <h2>NotFound: 您当前的路径{{ $route.params.pathMatch }}不正确, 请输入正确的路径!</h2>
  </div>
</template>

<script setup>
</script>

<style scoped>

  .not-found {
    color: red;
  }

</style>
