<template>
  <div class="website-layout">
    <header>网站头部</header>
    <nav>导航菜单</nav>
    <main>主要内容区域</main>
    <aside>侧边栏</aside>
    <footer class="bg-[#999]">网站底部</footer>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.website-layout {
  display: grid;
  grid-template-columns: 250px 1fr; /* 侧边栏250px，主内容自适应 */
  grid-template-rows: 80px auto 60px; /* 头部、内容、底部 */
  height: 60vh;
  gap: 0;
}

header {
  grid-column: 1 / -1; /* 横跨所有列 */
  grid-row: 1; /* 占据第一行 */
  background: #3498db;
  color: white;
  padding: 20px;
}

nav {
  grid-column: 1; /* 占据第一列 */
  grid-row: 2;
  background: #2c3e50;
  color: white;
  padding: 20px;
}

main {
  grid-column: 2;
  grid-row: 2;
  background: #ecf0f1;
  padding: 20px;
}

// aside 占满  故会导致 footer 移到下一行  造成设置3行，出现4行，且 2 、4 的高度异常的问题
aside {
  grid-column: 1 / -1;
  grid-row: 3;
  background: #34495e;
  color: white;
  padding: 15px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .website-layout {
    grid-template-columns: 1fr; /* 单列布局 */
    grid-template-rows: 60px auto auto 40px;
  }

  nav,
  main,
  aside {
    grid-column: 1;
  }

  nav {
    grid-row: 2;
  }
  main {
    grid-row: 3;
  }
  aside {
    grid-row: 4;
  }
}
</style>
