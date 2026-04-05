<template>
  <div class="calendar-container">
    <div class="calendar">
      <div class="calendar-header">
        <button class="nav-btn" @click="prevMonth">&lt;</button>
        <span class="current-month">{{ currentYear }} 年 {{ currentMonth }} 月</span>
        <button class="nav-btn" @click="nextMonth">&gt;</button>
      </div>
      
      <div class="weekday-header">
        <span v-for="day in weekDays" :key="day" class="weekday">{{ day }}</span>
      </div>
      
      <div class="days-grid">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="day-cell"
          :class="{ 
            'other-month': day.isOtherMonth,
            'today': day.isToday,
            'disabled': day.isDisabled,
            'completed-false': day.completed === false,
            'completed-true': day.completed === true
          }"
        >
          <span class="day-number">{{ day.day }}</span>
          <div v-if="day.tasks && day.tasks.length" class="day-content">
            <div v-for="(task, i) in day.tasks" :key="i" class="task-item" :class="'status-' + task.status">
              <span class="task-text">{{ i + 1 }}. {{ task.text }}</span>
              <span class="task-status" :class="'status-' + task.status">{{ task.status === 1 ? '✓' : (task.status === 2 ? '' : 'x') }}</span>
            </div>
          </div>
          <div v-else class="day-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dateData from './dates.json'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentYear = ref(dateData.startDate.year)
const currentMonth = ref(dateData.startDate.month)

const getMonthDays = (year, month) => {
  const result = dateData.dates.filter(d => d.year === year && d.month === month)
  console.log('getMonthDays:', year, month, result)
  return result
}

const calendarDays = computed(() => {
  const days = []
  const monthDays = getMonthDays(currentYear.value, currentMonth.value)
  
  if (monthDays.length === 0) return days
  
  const firstDay = monthDays[0]
  const firstWeekday = dateData.weekdays.indexOf(firstDay.weekday)
  
  for (let i = 0; i < firstWeekday; i++) {
    days.push({
      day: '',
      isOtherMonth: true,
      isToday: false,
      isDisabled: true,
      date: null
    })
  }
  
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  
  monthDays.forEach(d => {
    const dateStr = `${d.year}-${d.month}-${d.day}`
    days.push({
      day: d.day,
      year: d.year,
      month: d.month,
      weekday: d.weekday,
      isOtherMonth: false,
      isToday: dateStr === todayStr,
      isDisabled: d.disabled === true,
      date: dateStr,
      tasks: d.tasks || [],
      completed: d.completed
    })
  })
  
  const totalCells = 42
  const remainingCells = totalCells - days.length
  for (let i = 0; i < remainingCells; i++) {
    days.push({
      day: '',
      isOtherMonth: true,
      isToday: false,
      isDisabled: true,
      date: null
    })
  }
  
  return days
})

const prevMonth = () => {
  if (currentMonth.value === dateData.startDate.month && currentYear.value === dateData.startDate.year) {
    return
  }
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === dateData.endDate.month && currentYear.value === dateData.endDate.year) {
    return
  }
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<style scoped lang="scss">
.calendar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  overflow: hidden;
}

.calendar {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  height: 100%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
}

.current-month {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.nav-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;
  color: #1a1a1a;
  
  &:hover {
    background: #f0f0f0;
  }
}

.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
  flex-shrink: 0;
}

.weekday {
  text-align: center;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  padding: 8px 0;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0;
  flex: 1;
}

.day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  transition: all 0.15s ease;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
  position: relative;
  overflow: hidden;
  padding: 4px;
  
  &.other-month {
    .day-number {
      color: rgba(0, 0, 0, 0.03);
    }
    background: #fafafa;
  }
  
  &.today {
    .day-number {
      color: rgba(0, 120, 212, 0.15);
    }
    background: #e6f7ff;
  }
  
  &.completed-false {
    background: #fff1f0;
  }
  
  &.completed-true {
    background: #f6ffed;
  }
}

.day-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.06);
  pointer-events: none;
  z-index: 0;
  line-height: 1;
}

.day-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #888;
  width: 100%;
  padding: 1px 2px;
  box-sizing: border-box;
  
  &.status-1 {
    color: #bbb;
    .task-status {
      color: #52c41a;
    }
  }
  
  &.status-2 {
    color: #888;
    .task-status {
      color: transparent;
    }
  }
}

.task-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-status {
  flex-shrink: 0;
  width: 14px;
  text-align: center;
  
  &.status-1 {
    color: #52c41a;
  }
  
  &.status-2 {
    color: transparent;
  }
  
  &.status-0 {
    color: #ff4d4f;
  }
}
</style>
