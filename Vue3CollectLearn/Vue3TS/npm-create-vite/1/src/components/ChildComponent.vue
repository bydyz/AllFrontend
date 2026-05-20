<template>
  <div>
    <p>{{ localMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface Props {
  message: string;
}

const props = defineProps<Props>();

const localMessage = computed(() => `${props.message} (from child)`);
</script>