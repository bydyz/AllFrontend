<template>
  <div>
    <Use$slots>
      <template #header>
        <h1>Here might be a page title</h1>
      </template>

      <template #default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>

      <template #footer>
        <p>Here's some contact info</p>
      </template>
    </Use$slots>
  </div>
</template>

<script setup>
import Use$slots from "./Use$slots.vue";
</script>

<style scoped lang="scss"></style>
