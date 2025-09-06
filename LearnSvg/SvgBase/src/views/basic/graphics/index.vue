<script setup>
</script>

<template>
  <div>
    <p>矩形</p>
    <svg xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" rx="5" ry="5" width="150" height="100" stroke="pink" fill="none"></rect>
    </svg>

    <p>园</p>
    <svg xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="70" r="50" stroke="pink" fill="none"></circle>
    </svg>

    <p>椭圆</p>
    <svg xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="70" rx="70" ry="50" stroke="pink" fill="none"></ellipse>
    </svg>

    <p>线</p>
    <svg xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="10" x2="100" y2="100" stroke="pink"></line>
    </svg>

    <p>折线</p>
    <svg xmlns="http://www.w3.org/2000/svg">
      <polyline points="10 10 100 10 100 80 10 80" stroke="pink" fill="none"></polyline>
    </svg>

    <p>多边形</p>
    <svg xmlns="http://www.w3.org/2000/svg">
      <polygon points="10 10 100 10 120 80 60 80" stroke="pink" stroke-width="5" fill="none"></polygon>
    </svg>
  </div>
</template>

<style scoped>
</style>
