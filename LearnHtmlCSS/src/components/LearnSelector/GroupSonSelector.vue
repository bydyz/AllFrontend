<template>
  <div>
    <div class="sonSelector">
      <p>后代选择器</p>
    </div>

    <div class="groutSelector1">
      <p>群组1</p>
    </div>
    <div class="groutSelector2">
      <p>群组2</p>
    </div>
  </div>
</template>


<script setup>
</script>

<style scoped>
.sonSelector p {
  color: rgb(196, 236, 196);
}

.groutSelector1 p, .groutSelector2 p {
  color: rgb(234, 181, 181);
}
</style>