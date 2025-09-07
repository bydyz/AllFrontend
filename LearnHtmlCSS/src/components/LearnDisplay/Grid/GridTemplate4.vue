<template>
  <div class="dashboard">
    <div class="widget stats">统计数据</div>
    <div class="widget chart">图表</div>
    <div class="widget tasks">任务列表</div>
    <div class="widget calendar">日历</div>
    <div class="widget notifications">通知</div>
    <div class="widget activity">活动流</div>
  </div>
</template>

<script setup></script>

<style scoped lang="stylus">
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12列网格系统 */
  grid-template-rows: 200px 300px 200px;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
}

.widget {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.stats {
  grid-column: 1 / span 6; /* 占6列 */
  grid-row: 1;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.chart {
  grid-column: 7 / span 6; /* 占6列 */
  grid-row: 1 / span 2; /* 占两行 */
  background: #2c3e50;
  color: white;
}

.tasks {
  grid-column: 1 / span 3;
  grid-row: 2;
  background: #27ae60;
  color: white;
}

.calendar {
  grid-column: 4 / span 3;
  grid-row: 2;
  background: #e67e22;
  color: white;
}

.notifications {
  grid-column: 1 / span 4;
  grid-row: 3;
  background: #9b59b6;
  color: white;
}

.activity {
  grid-column: 5 / span 8;
  grid-row: 3;
  background: #e74c3c;
  color: white;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .dashboard {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, auto);
  }

  .stats { grid-column: 1 / span 6; grid-row: 1; }
  .chart { grid-column: 1 / span 6; grid-row: 2; }
  .tasks { grid-column: 1 / span 3; grid-row: 3; }
  .calendar { grid-column: 4 / span 3; grid-row: 3; }
  .notifications { grid-column: 1 / span 3; grid-row: 4; }
  .activity { grid-column: 4 / span 3; grid-row: 4; }
}
</style>
